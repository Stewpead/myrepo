#ifdef _WIN32
#include <Winsock2.h>
#include <ws2tcpip.h>

#include <windows.h>
#include <string>
#include <iostream>
#include <thread>
#include <unordered_map>
#include <vector>
#include <iterator>
#include <random>

#include "../TimeManager.hpp"
#include "../json.hpp"
#include "../Firewall.hpp"

using json = nlohmann::json;

#define NS_INADDRSZ  4
#define NS_IN6ADDRSZ 16
#define NS_INT16SZ   2
#define WIN32_LEAN_AND_MEAN

#define MAX(a, b) a > b ? a : b
#define MIN(a, b) a < b ? a : b

const int BUFFERLENGTH = 4096;
char buffer[BUFFERLENGTH + 512];

struct StunInfo
{
	//Credentials of the STUN
	std::string ip;
    int port;

	//Credentials of the Node
	int publicPort = 0;
	std::string publicIP;

	SOCKADDR_IN socket;
    int socketSize;
};

struct NodeInfo
{
	int remotePort;
	std::string publicIP;
    std::string privateIP;
	bool isPeer = false;
	bool isCandidateConnected = false; //for heartbeat, send to the candidate that its connection is success
	bool isDisconnect = false;

	SOCKADDR_IN socketAddress;
	int socketAddressSize;

	//This must be changed, however the time manager is 
	//constructed for only one timer, interval, and deltatime 
	TimeManager* tm = new TimeManager();

	int connectionStatus = 0;
	/*
		Connectoin Status:
		0 = Using Private IP
		1 = Using Public IP
		2 = Using Remote Port Prediction 
	*/

	std::string getIP()
	{
		return std::string(inet_ntoa(socketAddress.sin_addr));
	}
	
	void setStatus(int status)
	{
		switch(status)
		{
			case 0: //Private IP
			socketAddress.sin_port = htons(remotePort);
			socketAddress.sin_family = AF_INET;
			socketAddress.sin_addr.s_addr = inet_addr(privateIP.c_str());
			socketAddressSize = sizeof(socketAddress);
			break;

			case 1: //Public IP
			socketAddress.sin_port = htons(remotePort);
			socketAddress.sin_family = AF_INET;
			socketAddress.sin_addr.s_addr = inet_addr(publicIP.c_str());
			socketAddressSize = sizeof(socketAddress);
			break;

			case 2: //Port Prediction

			break;
		}

		connectionStatus = status;
	}

	std::string getKey()
	{
		return privateIP + ":" + publicIP + ":" + std::to_string(remotePort);
 	}
};

/*
	Status Description:
	1 = Stun Request Tracker
	2 = Candidate Heartbeat
	3 = Peer Heartbeat
	4 = Request Port Prediction
*/

class Node
{
    private:
	std::string privateIP;
	const float candidatePrivateIPTime = 20; //Time in Seconds for Private IP Testing (Seconds)
	const float candidatePublicIPTime = 30;
	const float candidatePredictIPTime = 40;
	const float peerDisconnectTime = 50;

	Firewall firewall;
    WSADATA wsaData;
	SOCKADDR_IN clientAddr;
	SOCKET userSocket;

	bool stunTrackerReceived = false;
	bool stunError = false;

	std::vector<StunInfo> stunServers;
	std::unordered_map<std::string, NodeInfo> nodes;
	std::vector<NodeInfo> peers;

	std::vector<std::string*> pendingMessages;

	int val;

	int deltaP(std::vector<int> ports);
    std::string getPrivateIP();
	void addPeer(NodeInfo& nI);
	void addCandidate(std::string privateIP, std::string publicIP, int remotePort);

	int getRandom0ToN(int n);
	int peerCount();
	
    public:
    Node();
    bool init();
    bool requestTracker();
    void sendMessage(NodeInfo&, std::string);
	void sendToPeers(std::string);
	NodeInfo& sendToRandomPeer(std::string);

	void heartBeat();
	void nodeTimeUpdate();
	void addStun(std::string, int);
	void sendStun(int stunIndex, std::string message);
	StunInfo& getStun(int index);

	void (*onPeerDisconnect)(NodeInfo& nI);
	void (*onNewPeer)(NodeInfo&);
	void (*onPeerMessage)(NodeInfo&, std::string&);
	void (*onUnfilteredMessage)(std::string&) = NULL;

	std::string (*onMessageValidation)(std::string&) = NULL;

	int getRemotePort();
	std::string getKey();

	void udpReceive();
	void acknowledgeMessages();

	SOCKET getUserSocket();
};

Node::Node()
{
    val = BUFFERLENGTH + 512;
}

SOCKET Node::getUserSocket()
{
	return userSocket;
}

void Node::acknowledgeMessages()
{
	int i = 0;
	for(auto& msg : this->pendingMessages)
	{
		std::string nodeKey = msg[0];
		std::string message = msg[1];

		if(this->nodes.count(nodeKey))
		{
			if(this->nodes[nodeKey].isPeer)
			{
				if(!this->nodes[nodeKey].isDisconnect)
					this->onPeerMessage(this->nodes[nodeKey], message);

				//if the peer is disconnected then delete that message
				this->pendingMessages.erase(this->pendingMessages.begin() + i);
				break;
			}
		}

		i++;
	}
}

std::string Node::getKey()
{
	return this->privateIP + ":" + getStun(0).publicIP + ":" + std::to_string(getStun(0).publicPort);
}

int Node::peerCount()
{
	return this->peers.size();
}

int Node::getRemotePort()
{
	return getStun(0).publicPort;
}

void Node::addPeer(NodeInfo& node)
{
	node.isPeer = true;
	peers.push_back(node);
	this->onNewPeer(node);
	printf("%d Node Size: %d -> %s\n", node.isPeer, this->nodes.size(), node.getKey().c_str());
}

void Node::addCandidate(std::string privateIP, std::string publicIP, int remotePort)
{
	NodeInfo nI;
	nI.privateIP = privateIP;
	nI.publicIP = publicIP;
	nI.remotePort = remotePort;
	nI.setStatus(0);
	this->nodes[nI.getKey()] = nI;
	printf("New Candidate: %d\n", remotePort);
}

StunInfo& Node::getStun(int index)
{
	return stunServers[index];
}

int Node::deltaP(std::vector<int> ports)
{
	int s1 = ports[0] - ports[1];
	int s2 = ports[1] - ports[2];
	
	return (s1 == s2) ? -s1 : 0;
}

void Node::addStun(std::string ip, int port)
{
	StunInfo stun;
	stun.ip = ip;
	stun.port = port;
	stun.socket.sin_port = htons(stun.port);
	stun.socket.sin_family = AF_INET;
	stun.socket.sin_addr.s_addr = inet_addr(stun.ip.c_str());
	stun.socketSize = sizeof(stun.socket);
	this->stunServers.push_back(stun);
}

void Node::sendStun(int stunIndex, std::string message)
{
	sendto(userSocket, message.c_str(), message.length(), 0, (sockaddr*)&stunServers[stunIndex].socket, stunServers[stunIndex].socketSize);
}

std::string Node::getPrivateIP()
{
    char ac[80];
    std::string privateIP = "";

    if (gethostname(ac, sizeof(ac)) == SOCKET_ERROR)
        return "";

    struct hostent *phe = gethostbyname(ac);

    if (phe == 0)
        return "";

    for (int i = 0; phe->h_addr_list[i] != 0; ++i)
    {
        struct in_addr addr;
        memcpy(&addr, phe->h_addr_list[i], sizeof(struct in_addr));
        privateIP = inet_ntoa(addr);
    }

    return privateIP;
}

bool Node::init()
{
	if(firewall.allow())
	{
		printf("Firewall Allowed!\n");

		if (WSAStartup(MAKEWORD(2, 2), &wsaData) != 0)
        return false;

		privateIP = getPrivateIP();

		userSocket = socket(AF_INET, SOCK_DGRAM, IPPROTO_UDP);

		clientAddr.sin_port = 0;
		clientAddr.sin_family = AF_INET;
		clientAddr.sin_addr.s_addr = INADDR_ANY;

		if (bind(userSocket, (LPSOCKADDR)&clientAddr, sizeof(clientAddr)) == SOCKET_ERROR)
			return false;

		setsockopt(userSocket, SOL_SOCKET, SO_SNDBUF, (char*)&val, sizeof(val));
		setsockopt(userSocket, SOL_SOCKET, SO_RCVBUF, (char*)&val, sizeof(val));
		
		return true;
	}
	
	return false;
}

//need to have timer
bool Node::requestTracker()
{
	json j;
	j["status"] = 1;
	j["data"]["ip"] = privateIP;

    std::string request = j.dump();
	
    //Send Request to STUN
	sendStun(0, request);
	
    bool notFound = true;
	while(!stunTrackerReceived)
    {
		if(stunError)
			return false;
	}

	return true;
}

void Node::heartBeat()
{
	json j;
	std::string msg;

	for (auto& nI : nodes)
	{
		NodeInfo& node = nI.second;
		j["data"]["private_ip"] = node.privateIP;
		j["data"]["public_ip"] = node.publicIP;

		if(!node.isDisconnect)
		{
			if(node.isPeer)
			{
				j["status"] = 3;
				printf("Peer: %d -> %s\n", node.remotePort, node.getIP().c_str());

			}
			else
			{
				j["status"] = 2;
				j["data"]["isCandidateConnected"] = node.isCandidateConnected;
				printf("Candidate: %d\n", node.remotePort);
			}

			msg = j.dump();
			sendto(userSocket, msg.c_str(), msg.length(), 0,
				(sockaddr*)&node.socketAddress, node.socketAddressSize);
		}
	}
}

void Node::sendMessage(NodeInfo& info, std::string msg)
{
	json j;
	j["status"] = 5;
	j["key"] = this->getKey();
	j["data"] = msg;

	std::string message = j.dump();
	sendto(userSocket, message.c_str(), message.length(), 0,
			(sockaddr*)&info.socketAddress, info.socketAddressSize);
}

void Node::nodeTimeUpdate()
{
	for (auto& cI : nodes)
	{
		NodeInfo& node = cI.second;

		if(!node.isDisconnect)
		{
			node.tm->update();

			if(node.isPeer)
			{
				if(node.tm->onInterval(peerDisconnectTime))
				{
					node.isDisconnect = true;
					std::string disconnectPeerKey = node.getKey();

					for(int i = 0; i < this->peers.size(); i++)
					{
						bool found = !this->peers[i].getKey().compare(disconnectPeerKey);

						if(found)
						{
							this->peers.erase(this->peers.begin() + i); //Remove that peer
							break;
						}
					}

					this->onPeerDisconnect(node);
				}
			}
			else
			{
				switch(node.connectionStatus)
				{
					case 0: //Private IP
						if(node.tm->onInterval(candidatePrivateIPTime))
						{
							printf("ooooooooooooooooooooooooo-> Use Public IP Candidate\n");
							node.setStatus(1); //Change to Public IP Connection
						}
					break;

					case 1: //Public IP
						if(node.tm->onInterval(candidatePublicIPTime))
						{
							printf("ooooooooooooooooooooooooo-> Use Port Prediction Candidate\n");
							node.setStatus(2);
						}
					break;

					case 2: //Port Prediction
						if(node.tm->onInterval(candidatePredictIPTime))
						{
							node.isDisconnect = true;
							printf("Candidate Connection Failed: %d!\n", node.remotePort);
						}
					break;
				}
			}
		}
	}
}

int Node::getRandom0ToN(int n) 
{
	return rand() % (n + 1);
}

void Node::sendToPeers(std::string msg)
{
	for (auto& node : peers)
		sendMessage(node, msg);
}

NodeInfo& Node::sendToRandomPeer(std::string msg)
{
	int randomPeerIndex = getRandom0ToN(peers.size() - 1);
	NodeInfo& randomPeer = peers[randomPeerIndex];
	sendMessage(randomPeer, msg);
	return randomPeer;
}

void Node::udpReceive()
{
	bool validMessage;
	while (true)
	{
		SOCKADDR_IN remoteAddr;
		int	remoteAddrLen = sizeof(remoteAddr);

		int iResult = recvfrom(this->userSocket, buffer, BUFFERLENGTH + 512, 0, (sockaddr*)&remoteAddr, &remoteAddrLen);

		int remotePort = ntohs(remoteAddr.sin_port);
		std::string ip = std::string(inet_ntoa(remoteAddr.sin_addr));

		if (iResult > 0)
		{
			std::string message = std::string(buffer, buffer + iResult);
			validMessage = false;

			if(onMessageValidation != NULL)
			{
				message = onMessageValidation(message);
				if(!message.empty()) validMessage = true;
			}
			else validMessage = true;
			
			if(validMessage)
			{
				json jMessage = json::parse(message);
				int status = jMessage["status"].get<int>();
				if(status == 1)
				{
					// printf("%s", jMessage.dump().c_str());
					printf("Node Received Tracker!\n");

					this->stunServers[0].publicPort = jMessage["info"]["public_port"];
					this->stunServers[0].publicIP = jMessage["info"]["public_ip"];
					
					for (auto const& data: jMessage["peers"])
					{
						this->addCandidate(data["private_ip"],
							data["public_ip"],
							data["public_port"]
						);
					}

					this->stunTrackerReceived = true;

					/*int stunIndex = 1;
					json j;
					j["status"] = 4;
					j["data"]["stun_id"] = stunIndex;
					std::string request = j.dump();
					this->sendStun(stunIndex, request);*/
				}
				else if(status == 2) //Candidate Heartbeat
				{
					std::string nodeKey = jMessage["data"]["private_ip"].get<std::string>() + ":" +
						jMessage["data"]["public_ip"].get<std::string>() + ":" +
						std::to_string(remotePort);

					if(this->nodes.count(nodeKey))
					{
						NodeInfo& node = this->nodes[nodeKey];

						if(!node.isCandidateConnected)
						{
							node.isCandidateConnected = true;
							printf("Candidate Connected: %d\n", remotePort);
						}

						if(jMessage["data"]["isCandidateConnected"].get<bool>() && node.isCandidateConnected)
						{
							printf("Peered in Scenario 1\n");
							this->addPeer(node);
						}
					}
					else
					{
						this->addCandidate(jMessage["data"]["private_ip"], 
							jMessage["data"]["public_ip"], 
							remotePort);
					}
				}
				else if(status == 3) //Peer Heartbeat
				{
					std::string nodeKey = jMessage["data"]["private_ip"].get<std::string>() + ":" +
						jMessage["data"]["public_ip"].get<std::string>() + ":" +
						std::to_string(remotePort);
					/*
						Sometimes the other node cannot send isCandidateConnected
					*/
					if(this->nodes.count(nodeKey))
					{
						NodeInfo& node = this->nodes[nodeKey];

						if(!node.isPeer)
						{
							printf("Peered in Scenario 2\n");
							this->addPeer(node);
						}

						node.tm->setIntervalTick(0); //Reset Peer Disconnection Time
						printf("---------------------------Heartbeat: %d\n", remotePort);
					}
				}
				else if(status == 4) //Port Prediction
				{
					/*
					int stunIndex = jMessage["data"]["stun_id"];
					this->stunServers[stunIndex].publicPort = jMessage["data"]["public_port"];

					if(stunIndex == 1)
					{
						int nextStunIndex = 2;
						json j;
						j["status"] = 4;
						j["data"]["stun_id"] = nextStunIndex;
						std::string request = j.dump();
						this->sendStun(nextStunIndex, request);
					}
					else if(stunIndex == 2)
					{
						printf("Received All Public Port From 3 Stun Server!\n");
						int i = 0;
						for(auto& server : this->stunServers)
						{
							printf("Public Port %d: %d\n", i, server.publicPort);
							i++;
						}

						//This will made the node to wait until all public ports were received
						//this->stunTrackerReceived = true;
					}
					*/
				}
				else if(status == 5) //Message
				{
					std::string nodeKey = jMessage["key"].get<std::string>();

					std::string *msg = new std::string[2];
					msg[0] = nodeKey;
					msg[1] = jMessage["data"].get<std::string>();
					pendingMessages.push_back(msg);
				}

				if(onUnfilteredMessage != NULL)
					onUnfilteredMessage(message);
			}
		}
		else
		{
			int error = WSAGetLastError();
			if(error != 0)
				printf("Packet Error: %d\n", WSAGetLastError());
		
			//This means the main stun server is not initialized succesfully
			if(this->getStun(0).publicPort == 0)
			{
				printf("Tracker Request Failed!\n");
				exit(0);
			}
		}
	}
}

#endif