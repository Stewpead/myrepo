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
const { remote } = require('electron');


var IMG_DIR = './../images/';
var app_dir = './../winPage/';


module.exports = {
  signupResponse: function (data) {
	if (data['status'] == 7) {
		
	}	
	
  },
  signinResponse: function (data) {
	if (data['status'] == 1) {
        defaultWindow.loadURL(url.format({
            pathname: path.join(__dirname, app_dir,'main-window.html'),
            protocol: 'file:',
            slashes: true
        }));
		//remote.getCurrentWindow().loadURL(app_dir + "main-window.html");

	}
  }

};



