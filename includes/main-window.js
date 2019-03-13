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
	
  showWindow: function (client) {
		var data = {
			status: 7001
		};
		data = JSON.stringify(data);
		client.write(data);
	// =====================================================================================================
  },
  avxLogin: function (client) {
	ipcMain.on('avx-login',(event, arg) => {
		client.write(arg);
	});	
	},
	avxWalletData: function (client) {
		ipcMain.on('get-wallet-data', (event, arg) => {
			client.write(arg);
			console.log("1130 SENT");
		});
	},
	avxSignup: function (client) {
	// store.set('directory.wallet', 'D:\\wallet');
	ipcMain.on('avx-signup',(event, arg) => {
		client.write(arg);
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