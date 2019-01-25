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
	
	ipcMain.on('avx-load-wallet',(event, arg) => {
	

	});	
	
  },
  avxLogin: function (client) {
	ipcMain.on('avx-login',(event, arg) => {
		client.write(arg);
	});	
  },
  
  avxSignup: function (client) {
	//store.set('directory.wallet', 'D:\myrepo');
	ipcMain.on('avx-signup',(event, arg) => {
		client.write(arg);
	});	
  
  }
  

};



