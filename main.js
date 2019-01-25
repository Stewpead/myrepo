var net = require('net');
const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const url = require('url');
const path = require('path');
const ipcMain = require('electron').ipcMain;

<<<<<<< HEAD
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
=======
var filename = ipcMain.addListener.toString;
var temp;
let defaultWindow; 
let notDefaultWindow;
let prevWindow;
let connectionPort = 5150;
let connectionHost = '192.168.254.33';

var IMG_DIR = './../images/';
var app_dir = './../winPage/';
var tmpStr = '';



var walletBalance = 0;
var walletAddress = '';

/*
	Establishing Connection and Reconnecting
*/
var initiateConnection = function(attempt){
	
	var client = new net.Socket();

	client.connect(connectionPort, connectionHost, function() {
		console.log('Connected');
		attempt = 0;
		
		ipcMain.on('avx-login',(event, arg) => {
			
			client.write(arg);
		});		
		
		var tools = require('./includes/main-window');
		tools.showWindow(client);
		
		
		


		
	});

	client.on('error', function() {
		
		if ( attempt < 5 ){
		  console.log('Reconnecting... Attempt(s): ' + attempt);
		  attempt = attempt + 1;
		  setTimeout(reconnectConnection, 5000, attempt);
		  
		} else {
		  console.log('Connection Timeout');
		  client.destroy();
		}
		
	});
	
	client.on('data', function(data) {
		console.log('test');
		
	});

}

var reconnectConnection = function(attempt) {
	initiateConnection(attempt); 
>>>>>>> c7c64c37bb9f0795efb7feab0d94daeec0359f38
}

initiateConnection(0);






