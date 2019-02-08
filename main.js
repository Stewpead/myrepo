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
let connectionHost = '192.168.254.103';

var IMG_DIR = './../images/';
var app_dir = './../winPage/';
var tmpStr = '';



var walletBalance = 0;
var walletAddress = '';

var Status = {
	SIGNUP: 1112,
	SIGNIN: 1113,
	SENDFUND: 1115,
	ASSET_UPLOAD_DATA: 15,
	WALLET_BALANCE: 2000
};

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
		module.avxSendAVX(client);
		
		
		var module = require('./includes/dashboard');
		module.shareUpload(client);
		module.executeUploadFile(client);
		module.sendFundAVX(client);
		module.checkStatus(client);
		
		
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
		
		var moduleAccount = require('./includes/login-signup');
		var moduleDashboard = require('./includes/dashboard-action');
		
		switch(data["status"])
		{
			case Status.SIGNUP:
				moduleAccount.signupResponse(data);
				break;
			
			case Status.SIGNIN:
				moduleAccount.signinResponse(data);
				break;
				
			case Status.ASSET_UPLOAD_DATA:
				moduleDashboard.shareUploadResponse(data);
				break;
				
			case Status.WALLET_BALANCE:
				moduleDashboard.getWalletBalance(data);
				break;
		}

	});

}

var reconnectConnection = function(attempt) {
	initiateConnection(attempt); 
}

initiateConnection(0);

// POPUP POPUP
let popupWindow;



