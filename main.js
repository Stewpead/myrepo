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
		
	
		
		var module = require('./includes/main-window');
		module.showWindow();
		module.avxLogin(client);
		module.avxSignup(client);
        module.avxPopup(client);
        module.avxModal(client);
		
		
		var module = require('./includes/dashboard');
		module.shareUpload(client);
		module.executeUploadFile(client);
		
		
		ipcMain.on('test-btn',(event, arg) => {
			event.returnValue = 1 +arg;
		});	

		
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
		data = JSON.parse(data);
		var module = require('./includes/login-signup');
		module.signupResponse(data);
		module.signinResponse(data);
		
		var module = require('./includes/dashboard-action');
		module.shareUploadResponse(data);
		
	});

}

var reconnectConnection = function(attempt) {
	initiateConnection(attempt); 
}

initiateConnection(0);

// POPUP POPUP
let popupWindow;



