var net = require('net');
const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const url = require('url');
const path = require('path');
const ipcMain = require('electron').ipcMain;

var filename = ipcMain.addListener.toString;
var temp;
let defaultWindow; 
let notDefaultWindow;
let prevWindow;
var IMG_DIR = './images/';
var app_dir = './winPage/';
var tmpStr = '';

var walletBalance = 0;
var walletAddress = '';


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
			pathname: path.join(__dirname, app_dir,'loginWindow.html'),
			protocol: 'file:',
			slashes: true
		}));

		defaultWindow.once('ready-to-show', () => {
			defaultWindow.show();
		});
		
		defaultWindow.on('close', () => {
			defaultWindow.show();
		});
	},
	
	popupWindow: function () {
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

		popupWindows.once('ready-to-show', () => {
			popupWindows.show();
		});
	}
}	
	
