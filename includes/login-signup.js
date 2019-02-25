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
	//   var jdata = JSON.parse(data);
		// console.log(jdata);
		var validate = data['registered'];
		console.log(validate);
		// ARJ NOTE UI FOR NOTIFICATION FOR SUCCESS/ERROR 
		if ( validate == 1 ) {

			defaultWindow.loadURL(url.format({
				pathname: path.join(__dirname, app_dir,'login-window.html'),
				protocol: 'file:',
				slashes: true
			}));
		}
		else if( validate == 0 ) {

		}
		// else if( valide == 0 ) {
		// 	ipcMain.on('signup-send', (event, arg) => {
		// 		event.sender.send('signup-response')
		// 	});
		// }

  },
  signinResponse: function (data) {
		var validate = data['data'];
		const store = new Store();	
	

		if (validate == 1 ) {
			//TRIGGER
			store.set('avx-login-true', 1);

			setTimeout(() => {
				defaultWindow.loadURL(url.format({
					pathname: path.join(__dirname, app_dir,'main-window.html'),
					protocol: 'file:',
					slashes: true
				}));
			}, 2000);
			
			// store.set('avx-share-upload-scan-results', data);
			// ipcMain.on('avx-login', (event, arg) => {
			// 	event.sender.send('login-true',)
			// });

		}
		else if(validate != 1) {
			store.set('avx-login-true', 0);
		}
  }
};



