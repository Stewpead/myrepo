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
let connectionHost = '127.0.0.1';

var IMG_DIR = './../images/';
var app_dir = './../winPage/';
var tmpStr = '';



var walletBalance = 0;
var walletAddress = '';

var Status = {
	SIGNUP: 1113,
	SIGNIN: 1114,
	SEND_FUND: 1115,
	ASSET_UPLOAD_DATA: 15,
	WALLET_BALANCE: 2000,
	GET_METADATA_TREE: 1126,
	SHARE_PAYMENT: 1116,
	GET_BALANCE: 1121,
	GET_SPENT: 1124,
	GET_ACCOUNT_HISTORY: 1123,
	GET_PUBLICKEY: 1125,
	GET_ASSET: 1122,
	GET_FILE_INFO: 1128,
	GET_WALLET_DATA: 1129,
	GENERATE_DOWNLOAD: 1117,
	START_HOARDING_SESSION: 5002,
	HAS_REGISTERED_USER : 7001
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
		module.showWindow(client);
		module.avxLogin(client);
		module.avxSignup(client);
		module.avxPopup(client);
		module.avxModal(client);
		module.avxSendAVX(client);
		module.avxWalletData(client);
		
		var module = require('./includes/dashboard');
		module.shareUpload(client);
		module.executeUploadFile(client);
		module.sendFundAVX(client);
		module.checkStatus(client);
		module.sharePayment(client);
		module.getBalance(client);
		module.getSpent(client);
		module.getAccountHistory(client);
		module.getAccountWalletAddress(client);
		module.getAssset(client);
		module.getFileInfo(client);
		module.getFileInfo(client);
		module.generateDownload(client);
		module.requestHoardingSession(client);
		
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
		// var module2 = require('./includes/main-window');
		// module2.showWindow();
	});
	
	client.on('data', function(data) {
		data = JSON.parse(data);

		
		var moduleAccount = require('./includes/login-signup');
		var moduleDashboard = require('./includes/dashboard-action');

		switch(data["status"])
		{
			case Status.HAS_REGISTERED_USER:
				moduleAccount.checkRegisteredUser(data);
				break;

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
			
			case Status.GET_METADATA_TREE:
				moduleDashboard.uploadShareFile(data);
				break;
			
			case Status.SHARE_PAYMENT:
				moduleDashboard.sharePaymentResponse(data);
				break;
			
			case Status.GET_BALANCE:
				moduleDashboard.getAccountBalance(data);
				break;
			
			case Status.GET_SPENT:
				moduleDashboard.getAccountSpent(data);
				break;
			
			case Status.GET_ACCOUNT_HISTORY:
				moduleDashboard.getAccountHistory(data);
				break;
			
			case Status.GET_PUBLICKEY:
				moduleDashboard.getPublicKey(data);
				break;
			
			case Status.SEND_FUND:
				moduleDashboard.sendFund(data);
				break;

			case Status.GET_ASSET:
				moduleDashboard.getAsset(data);
				break;
			
			case Status.GET_WALLET_DATA:
				moduleDashboard.getWalletData(data);
				break;

			case Status.GET_FILE_INFO:
				moduleDashboard.getFileInfo(data);
				break;

			case Status.GENERATE_DOWNLOAD:
				moduleDashboard.generateDownload(data);
				break;
		}			

		

	});

}

var reconnectConnection = function(attempt) {
	initiateConnection(attempt); 
}

initiateConnection(0);



