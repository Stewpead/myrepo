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
/*const {shell} = require('electron');
const { remote } = require('electron');*/
//const {ipcRenderer} = require('electron');


var IMG_DIR = './../images/';
var app_dir = './../winPage/';


module.exports = {
	checkRegisteredUser: function (data) {
		var checkStat = data['has_registered'];
		console.log(data);
		if( checkStat == 1 ) {
			// show login window
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

			defaultWindow.on('closed', () => {
				app.quit();
				//app.close();
			});
		} else if ( checkStat == 0) {
			//showw sign up
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
				pathname: path.join(__dirname, app_dir,'signup-window.html'),
				protocol: 'file:',
				slashes: true
			}));
			defaultWindow.once('ready-to-show', () => {
				defaultWindow.show();
			});
			defaultWindow.on('closed', () => {
				app.close();
			});
		}
	},

  signupResponse: function (data) {
		console.log(data);
		  
		var validate = data['registered'];

		if (validate == 1) {
			//electron.send('signup-response', 'true');
			defaultWindow.webContents.send('signup-response', 'true');

			defaultWindow.loadURL(url.format({
				pathname: path.join(__dirname, app_dir,'login-window.html'),
				protocol: 'file:',
				slashes: true
			}));
		} else {
			defaultWindow.webContents.send('signup-response', 'false');
			//electron.send('signup-response', 'false');
		}


  },
  signinResponse: function (data) {
		var validate = data['login'];

		if (validate == 1 ) {
			//TRIGGER
			defaultWindow.webContents.send('signin-response', 'true');

		}
		else if(validate == 0) {
			//TRIGGER
			defaultWindow.webContents.send('signin-response', 'false');
			
		}
	},

	connectedToSupernode: function(data) {

		var val = data['connected'];
		if( val == 1 ) {
				defaultWindow.loadURL(url.format({
					pathname: path.join(__dirname, app_dir,'main-window.html'),
					protocol: 'file:',
					slashes: true
				}));
		}

	}
};



