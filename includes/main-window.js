var net = require('net');
const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const url = require('url');
const path = require('path');



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

  }

};
