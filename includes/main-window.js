var net = require('net');
const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const url = require('url');
const path = require('path');
const ipcMain = require('electron').ipcMain;
const Store = require('electron-store');
const store = new Store();
var fs = require('fs');
const lstat = require('lstat');
const {shell} = require('electron');
var filename;

var IMG_DIR = './../images/';
var app_dir = './../winPage/';


module.exports = {
  showWindow: function () {
	
	defaultWindow = new BrowserWindow({
		frame: false,
		width: 1050,
		height: 750,
		minWidth: 850,
		minHeight: 600,
		backgroundColor: '#312450',
		icon: path.join(__dirname, IMG_DIR, 'whiteicon.png'),
		show: false,
	});
	
    defaultWindow.loadURL(url.format({
        pathname: path.join(__dirname, app_dir,'login-window.html'),
        protocol: 'file:',
        slashes: true
    }));

	defaultWindow.once('ready-to-show', () => {
		defaultWindow.show();
	});
	
	defaultWindow.on('close', () => {
		defaultWindow.show();
	});
// ============================================================================================


	// =====================================================================================================
	

	
	ipcMain.on('avx-load-wallet',(event, arg) => {
	

	});	
	
  },
  avxLogin: function (client) {
	ipcMain.on('avx-login',(event, arg) => {
		client.write(arg);
	});	
  },
  
	avxSignup: function (client) {
	// store.set('directory.wallet', 'D:\\wallet');
	ipcMain.on('avx-signup',(event, arg) => {
		client.write(arg);
	});	
  
	},
	avxPopup: function (client) {
		ipcMain.on('upload-files', (event, arg) => {
			popupWindows(arg);
		});
	},

	avxModal: function (client) {
		ipcMain.on('file-scan-result', (event, arg) => {
			modalWindows(arg);
		});
	},

	avxSendAVX: function (client) {
		ipcMain.on('send-avx', (event, arg) => {
			modalSends(arg);
		});
	}
	

};

let popupWindow;
function popupWindows(filename) {
		popupWindow = new BrowserWindow({
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
		popupWindow.loadURL(url.format({
				pathname: path.join(__dirname, app_dir, filename),
				protocol: 'file:',
				slashes: true
		}));
		popupWindow.show();
}

let modalWindow;

function modalWindows(filename) {
    modalWindow = new BrowserWindow({
    frame: false,
    maxHeight:312,
    maxWidth: 632,
    width: 631,
    height: 311,
    minWidth: 630,
    minHeight: 310,
    icon: path.join(__dirname, IMG_DIR, 'whiteicon.png'),
    parent: defaultWindow,
    modal: true
		});
		
    modalWindow.loadURL(url.format({
    pathname: path.join(__dirname, app_dir, filename),
    protocol: 'file:',
    slashes: true
}));
    modalWindow.once('ready-to-show', () => {
    modalWindow.show();
})
}

let modalSend;

function modalSends(filename) {

	modalSend = new BrowserWindow({
		frame: false,
		maxHeight:612,
		maxWidth: 532,
		width: 511,
		height: 611,
		minWidth: 530,
		minHeight: 610,
		icon: path.join(__dirname, IMG_DIR, 'whiteicon.png'),
		parent: defaultWindow,
		modal: true
		});
			
		modalSend.loadURL(url.format({
		pathname: path.join(__dirname, app_dir, filename),
		protocol: 'file:',
		slashes: true
	}));
	modalSend.once('ready-to-show', () => {
		modalSend.show();
	});
}