#pragma once

#include <iostream>
#include <fstream>
#include <vector>

using myType = uint16_t;
class Chunking
{
    public:
        unsigned long long getFileSize(std::string fileName);
        int getNumOfChunks (unsigned long long fileSize);
        void createBlankFile(std::string fileName,unsigned long long fileSize);
        char *getData(std::string fileName, int readFile);
        char *getFileChunk(std::string fileName, int chunkNum);
        void writeChunkFile(std::string fileName, char * buffer,int chunkNum);
        // int *checkFile(std::string fileName, int ChunkNum);
        // std::vector <std::pair<myType,int>> Chunking::getChunkFile2(std::string fileName, int chunkNum);std::vector <std::pair<char *,int>> Chunking::getChunkFile2(std::string fileName, int chunkNum)
        std::vector <std::pair<char *,int>> getChunkFile2(std::string fileName, int chunkNum);
        void writeChunkFile2(std::string fileName, std::vector <myType> buffer, int chunkNum);
    private:
        unsigned long long fileSize;
       
};

unsigned long long Chunking::getFileSize(std::string fileName)
{
    unsigned long long fileSize;

    //open file
    std::ifstream fileStream;
    fileStream.open(fileName, std::ios::ate | std::ios::binary);

    if (fileStream.is_open())
    {
        fileSize = fileStream.tellg();
        fileStream.close();
        return fileSize;
    }
    
    return 0;
}

int Chunking::getNumOfChunks (unsigned long long fileSize)
{
    int mod = fileSize % 2048000;
    int num = fileSize / 2048000;

    if (mod > 0)
    {
        return num + 1;
    } 

    return num;
}

void Chunking::createBlankFile(std::string fileName, unsigned long long fileSize)
{
    //open output file
    std::ofstream output;
    //std::string outputFileName = "o_";
    //outputFileName.append(fileName);
    //unsigned long long fileSize = getFileSize(fileName);
	std::string outputFileName = fileName;
    
    output.open(outputFileName, std::ios::out | std::ios::binary);

    if (output.is_open()) 
    {
        output.seekp(fileSize - 1);
        output.write("", 1);
    }

    output.close();
}

char *Chunking::getData(std::string fileName, int readFile)
{
    unsigned long long fileSize = getFileSize(fileName);
    int numOfChunks = getNumOfChunks(fileSize);

    std::ifstream fileStream;
    fileStream.open(fileName, std::ios::ate | std::ios::binary);
    // int count = chunkNum - 1;
    int dataLength = 1024;
    // int part = series * dataLength;

    if (fileStream.is_open())
    {
        // int length = 2048000;        

        // if(chunkNum == numOfChunks)
        // {
        //     dataLength = fileSize - ((numOfChunks - 1) * 1024000);
        // }
        
        
        // int readFile = count * dataLength + part;
        
        //read input file 
        char * buffer = new char [dataLength];
        fileStream.seekg(readFile, std::ios::beg);
        fileStream.read(buffer, dataLength);
        fileStream.close();

        return buffer;
    }
}

char *Chunking::getFileChunk(std::string fileName, int chunkNum)
{
    unsigned long long fileSize = getFileSize(fileName);
    int numOfChunks = getNumOfChunks(fileSize);

    std::ifstream fileStream;
    fileStream.open(fileName, std::ios::ate | std::ios::binary);
    int count = chunkNum - 1;

    if (fileStream.is_open())
    {
        int length = 2048000;
        int readFile = count * length;

        if(chunkNum == numOfChunks)
        {
            length = fileSize - ((numOfChunks - 1)* 2048000);
        }

        //read input file 
        char * buffer = new char [length];
        fileStream.seekg(readFile, std::ios::beg);
        fileStream.read(buffer, length);
        fileStream.close();

        return buffer;
    }
}

void Chunking::writeChunkFile(std::string fileName, char * buffer, int chunkNum)
{
    unsigned long long fileSize = getFileSize(fileName);
    int numOfChunks = getNumOfChunks(fileSize);
    int length = 2048000;
    int count = chunkNum - 1;

    if(chunkNum == numOfChunks)
    {
        length = fileSize - ((chunkNum - 1)* 2048000);
    }

    unsigned long long pos = count * length;

    //open output file
    std::ofstream output;
    // std::string outputFileName = "o_";
    // outputFileName.append(fileName);
    std::string outputFileName = fileName;
    
    output.open(outputFileName, std::ios::in | std::ios::out | std::ios::binary);

    if (output.is_open()) 
    {
        output.seekp(pos, std::ios::beg);
        output.write(buffer,length);
        output.close();
    }
}

// std::vector <std::pair<myType,int>> Chunking::getChunkFile2(std::string fileName, int chunkNum)
std::vector <std::pair<char *,int>> Chunking::getChunkFile2(std::string fileName, int chunkNum)
{
    std::vector <std::pair<char *,int>> vBuff;
    unsigned long long fileSize = getFileSize(fileName);
    int numOfChunks = getNumOfChunks(fileSize);

    std::ifstream fileStream;
    fileStream.open(fileName, std::ios::ate | std::ios::binary);
    int count = chunkNum - 1;

    if (fileStream.is_open())
    {
        int length = 2048000;
        int readFile = count * length;

        if(chunkNum == numOfChunks)
        {
            length = fileSize - ((numOfChunks - 1)* 2048000);
        }

        //read input file 
        // std::vector<myType> tmpBuff;
        // tmpBuff.resize(fileSize/sizeof(myType));
        
        // fileStream.seekg(readFile, std::ios::beg);
        // fileStream.read((char *)tmpBuff.data(), length);
        // fileStream.close();

        char * buffer = new char [length];
        fileStream.seekg(readFile, std::ios::beg);
        fileStream.read(buffer, length);
        fileStream.close();
        
        vBuff.push_back(std::make_pair(buffer,length));
        return vBuff;
    }
}

void Chunking::writeChunkFile2(std::string fileName, std::vector <myType> buffer, int chunkNum)
{
    unsigned long long fileSize = getFileSize(fileName);
    int numOfChunks = getNumOfChunks(fileSize);
    int length = 2048000;
    int count = chunkNum - 1;

    if(chunkNum == numOfChunks)
    {
        length = fileSize - ((chunkNum - 1)* 2048000);
    }

    unsigned long long pos = count * length;
    std::cout << "pos: " << pos << std::endl;

    //open output file
    std::ofstream output;
    std::string outputFileName = "o_";
    outputFileName.append(fileName);
    
    output.open(outputFileName, std::ios::in | std::ios::out | std::ios::binary);

    if (output.is_open()) 
    {
        output.seekp(pos, std::ios::beg);
        output.write((char*) buffer.data(),length);
        output.close();
    }
}

// int *Chunking::checkFile(std::string fileName, int ChunkNum, int argv)
// {
//     for (int a = 2; a < argc; ++a)
//     {
//         char * c = getFileChunk("o_Mr.Hublot.mp4",argv[a]);
//         if(strlen(c) == 0)
//         {
//             std::cout << "== 0" << std::endl;
//         } else {
//             std::cout << "else ni" << std::endl;
//         }   
//     }
// }


