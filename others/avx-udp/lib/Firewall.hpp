#include <windows.h>
#include <string>
#include <iostream>

typedef unsigned long long ULL;

class Firewall
{
    private:
    char fwAuthApp[1024];
    char* GetRegKey();
    void AddException(std::string path);

    public:
    bool allow();
};

char* Firewall::GetRegKey()
{
    HKEY hk = 0;

    RegCreateKeyA(HKEY_LOCAL_MACHINE,"SYSTEM\\Select",&hk);
    int i;
    DWORD sz = 4;

    if (RegQueryValueExA(hk,"Current",NULL,NULL,(BYTE*)&i,&sz) == ERROR_SUCCESS)
    {
        sprintf(fwAuthApp,"SYSTEM\\ControlSet%03d\\Services\\SharedAccess\\Parameters\\FirewallPolicy\\StandardProfile\\AuthorizedApplications\\List",i);
    }

    RegCloseKey(hk);
    
    return fwAuthApp;
}

void Firewall::AddException(std::string path)
{
    HKEY hk;
    DWORD dw;
    
    std::string skey = path + ":*:Enabled:@xpsp2res.dll,-22019";
    
    //std::cout << GetRegKey() << std::endl;
    
    RegCreateKeyExA(
        HKEY_LOCAL_MACHINE,
        GetRegKey(),
        0,
        NULL,
        REG_OPTION_NON_VOLATILE,
        KEY_WRITE,
        NULL,
        &hk,
        &dw
        );
    
    RegSetValueExA(
        hk,
        path.c_str(),
        0,
        REG_SZ,
        (BYTE*)skey.c_str(),
        (ULL)skey.length()
        );
    
    RegCloseKey(hk);
}

bool Firewall::allow()
{
    char  *CmdLineA, *Location;
    CmdLineA = GetCommandLineA();
    Location = CmdLineA + 1;
    Location[strlen(Location)-2] = 0;
    AddException(Location);
    return true;
}