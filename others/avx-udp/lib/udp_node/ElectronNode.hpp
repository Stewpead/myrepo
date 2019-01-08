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

class ElectronNode
{
    private:
    SOCKADDR_IN socket;
    int socketSize;
    std::string ip;
    int port;

    SOCKET userSocket;

    public:
    ElectronNode(std::string ip, int port, SOCKET s);
    void sendMessage(std::string);
};

ElectronNode::ElectronNode(std::string ip, int port, SOCKET s)
{
    this->ip = ip;
    this->port = port;

    userSocket = s;
    socket.sin_port = htons(this->port);
	socket.sin_family = AF_INET;
	socket.sin_addr.s_addr = inet_addr(this->ip.c_str());
	socketSize = sizeof(socket);
}

void ElectronNode::sendMessage(std::string message)
{
	sendto(userSocket, message.c_str(), message.length(), 0, (sockaddr*)&socket, socketSize);
}

#endif