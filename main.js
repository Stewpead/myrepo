var net = require('net');
var client = new net.Socket();

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const url = require('url');
const path = require('path');

const {ipcMain} = require('electron');


var filename;

// filename = ipcMain.addListener.toString;
var temp;
let defaultWindow; 
var IMG_DIR = './images/';
var app_dir = './winPage/';

// var filename;
function hidewindow() {
    BrowserWindow({
        show:false
    });
}

function showWindow() {

defaultWindow = new BrowserWindow({
    frame: false,
    width: 1050,
    height: 750,
    minWidth: 850,
    minHeight: 650,
    icon: path.join(__dirname, IMG_DIR, 'whiteicon.png'),
    show: false,
});
defaultWindow.openDevTools();
    defaultWindow.loadURL(url.format({
        pathname: path.join(__dirname, app_dir,'login-window.html'),
        protocol: 'file:',
        slashes: true
    }));

defaultWindow.once('ready-to-show', () => {
    defaultWindow.show();
});
}

let modalWindow;

function modalWindows(filename) {

    modalWindow = new BrowserWindow({
    frame: false,
    maxHeight:612,
    maxWidth: 632,
    width: 631,
    height: 611,
    minWidth: 630,
    minHeight: 610,
    icon: path.join(__dirname, IMG_DIR, 'whiteicon.png'),
    parent: defaultWindow,
    modal: true
    });
    // notDefaultWindow.openDevTools();
    modalWindow.loadURL(url.format({
    pathname: path.join(__dirname, app_dir, filename),
    protocol: 'file:',
    slashes: true
}));
    modalWindow.once('ready-to-show', () => {
    modalWindow.show();
})
}

let popupWindows;

function popupWindow(filename) {
    popupWindows = new BrowserWindow({
        frame: false,
        maxHeight:312,
        maxWidth: 352,
        width: 351,
        height: 311,
        minWidth: 310,
        minHeight: 350,
        icon: path.join(__dirname, IMG_DIR, 'whiteicon.png'),
        parent: defaultWindow,
        modal: true
    });
    popupWindows.loadURL(url.format({
        pathname: path.join(__dirname, app_dir, filename),
        protocol: 'file:',
        slashes: true
    }));
    popupWindows.show();
}

let filescanresult;
function filescanwindow(filename) {
    filescanresult = new BrowserWindow({
        frame: false,
        maxHeight:412,
        maxWidth: 612,
        width: 611,
        height: 411,
        minWidth: 610,
        minHeight: 410,
        icon: path.join(__dirname, IMG_DIR, 'whiteicon.png'),
        parent: defaultWindow,
        modal: true
    });
    filescanresult.loadURL(url.format({
        pathname: path.join(__dirname, app_dir, filename),
        protocol: 'file:',
        slashes: true
    }));
    filescanresult.show();
}

ipcMain.on('modal', (event, arg) => {
    modalWindows(arg);
});


ipcMain.on('upload-files', (event, arg) => {
    popupWindow(arg);
});

ipcMain.on('file-scan-result', (event, arg) => {
    filescanwindow(arg);
});

app.on('quit', () => {
    console.log("closed");
});

app.on('ready', showWindow);

app.on('window-all-closed', () => {
    if(process.platform !== 'darwin'){
        app.quit();
    }
});

app.on('activate', () => {
    if(mainWindow == null) {
        showWindow();
    }
});


if(process.platform == 'darwin'){
    mainMenuTemplate.unshift({});
}

// add developer tools item if not in production

// if(process.env.NODE_ENV == 'production')
// {
//     mainMenuTemplate.push({
//         label: 'Developer Tools',
//         submenu: [
//             {
//                 label: 'Toggle Devtools',
//                 accelerator: process.platform == 'darwin' ? 'Command+I':
//                 'Ctrl+I',
//                 click(item,focusedWindow)
//                 {
//                     focusedWindow.toggleDevTools();
//                 }
//             },
//             {
//                 role: 'reload'
//             }
//         ]
//     });
// }



// var avxtokens;
// var logindatas;
// ipcMain.on('test', () => {
//     receiveee();
// }
// );
// ipcMain.on('logindata',


// client.connect(5150, '192.168.254.115', function() {
//     console.log('Connected');
// });

// ipcMain.on('logindata',(event, arg) => {
//     logindatas = arg;
//     dataconnect(logindatas);
//   });

//   ipcMain.on('signupdata',(event, arg) => {
//     logindatas = arg;
//     dataconnect(logindatas);
//   });

// ipcMain.on('sendAVX',(event, arg) => {
//     avxtokens = arg;
//     dataconnect(avxtokens);
// });

// function dataconnect(logindatas) {
//    // var msg = JSON.stringify(logindatas);
//     //console.log(msg);

//     client.write(logindatas);
// }
// client.on('close', function() {
// 	console.log('Connection closed');
// });
// client.on('error', function(err) {
// 	console.log('Connection error ' + err);
// });    


// var obj = {}
//  data1;

// client.on('data', function(data) {
//     // console.log(data);
//     var data1 = JSON.parse(data);
//     // console.log(data1);

//     if(data1["status"]==1) {
//         console.log("Status is 1");
//     }
//     else if(data1["status"]==2) {

//         console.log("Status is 2");
//         defaultWindow.loadURL(url.format({
//             pathname: path.join(__dirname, app_dir,'mainWindow.html'),
//             protocol: 'file:',
//             slashes: true
//         }));
//     }
//     else if(data1["status"]==3) {
//         // console.log("Status is 3"); wallet balance
//         console.log(data1["balance"]);

//         ipcMain.on('wballance', (event, arg) => { 
//            // Send value synchronously back to renderer process
//            event.returnValue = data1["balance"];
//            // Send async message to renderer process
//            //mainWindow.webContents.send('ping', 5);

//         });
    
//     }
//     if(data1["status"]==777) {
//         console.log("historyjson")
//         console.log(data1);
//     }
// });

// console.log('Received: ' + data);

