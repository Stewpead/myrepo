#include <stdio.h>
#include <thread>
#include "lib/udp_node/Node.hpp"
#include "lib/udp_node/ElectronNode.hpp"

Node *n;

void receive()
{
	n->udpReceive();
}

int main()
{	
	n = new Node();
	n->addStun("192.168.254.115", 7070);
    //sendToPeers(std::string msg)
    //sendToRandomPeer(std::string msg)

	//onMessageValidation

	n->onPeerMessage = [](NodeInfo& nI, std::string &message)
    {
		printf("%d Peer Message: %s\n", nI.remotePort, message.c_str());
    };

	n->onNewPeer = [](NodeInfo& nI)
    {
		printf("New Peer Connected: %d\n", nI.remotePort);
        n->sendMessage(nI, "I'm Connected!");
    };

	n->onPeerDisconnect = [](NodeInfo& nI)
    {
		printf("Peer Disconnected: %d\n", nI.remotePort);
    };

	n->onUnfilteredMessage = [](std::string &message)
    {
		//Will be useful for receiving message from Electron UDP Nodejs
		//printf("Unfiltered Message: %s\n", message.c_str());
    };

	n->onMessageValidation = [](std::string &message)
	{
		return message;
	};

    if(n->init())
    {
		std::thread t1(receive);
        printf("Node Initialized\n");

		if (n->requestTracker())
		{
			TimeManager *tm = new TimeManager();
			
			std::string str = std::to_string(n->getStun(0).publicPort);
			char *cstr = &str[0u];
			SetConsoleTitle(cstr);

			ElectronNode *en = new ElectronNode("192.168.254.115", 7070, n->getUserSocket());
			json j;
			j["status"] = 10;
			j["data"] = "Hi Electron!!!!";
			en->sendMessage(j.dump());

			while(true)
			{
				tm->update();
				if(tm->onInterval(5)) 
				{
					printf("Send Heartbeat!\n");
					n->heartBeat();
				}
				n->nodeTimeUpdate();
                n->acknowledgeMessages();

				//----------- Start - Other Codes Here ------------

				//----------- End - Other Codes Here ------------
			}
		}
		else printf("Stun Tracker Failed!\n");
    }
    else printf("Node Not Initialized\n");

    exit(0);
}