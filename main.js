var net = require('net');
const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const url = require('url');
const path = require('path');
const ipcMain = require('electron').ipcMain;
const chrome = require('selenium-webdriver/chrome');

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
	CONNECT_SUPERNODE : 4,
	ASSET_UPLOAD_DATA: 15,
	SIGNUP: 1113,
	SIGNIN: 1114,
	SEND_FUND: 1115,
	SHARE_PAYMENT: 1116,
	BUY_ASSET: 1117,
	GET_BALANCE: 1121,
	GET_ASSET: 1122,
	// GET_SPENT: 1124,
	// GET_PUBLICKEY: 1125,
	GET_METADATA_DIR_TREE: 1127,
	GET_FOLDER_DETAILS: 1131,
	GET_UPDATED_ACCOUNT_HISTORY: 1132,
	ADD_TRANSACTION_DATA: 1134,
	GET_ACCOUNT_HISTORY: 1124,
	GET_FILE_INFO: 1128,
	GET_SPECIFIC_ASSET: 1129,
	GET_WALLET_DATA: 1130,
	REQUEST_DASHBOARD_CARDS:1136,
	DOWNLOAD_PAYMENT_CONFIRMATION: 1137,
	REQUESST_FILE_LIST: 1139,
	WALLET_BALANCE: 2000,
	START_HOARDING_SESSION: 5002,
	REQUEST_FILETRANSFER_STATS: 5003,
	HAS_REGISTERED_USER : 7001,
	REQUEST_CRAWLING: 9000,
	GET_CRAWLING: 9001,
	GET_FILE_DETAILS:1135,
	REQUEST_PRICE_DATA_POINTS: 1139,
	REQUEST_PRICE_SOURCE: 1140

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
		module.avxWalletData(client);
		
		var module = require('./includes/dashboard');
		module.shareUpload(client);
		module.executeUploadFile(client);
		module.sendFundAVX(client);
		module.checkStatus(client);
		module.sharePaymentAsset(client);
		module.getSpent(client);
		module.getAccountHistory(client);
		module.saveAccountHistory();
		module.getAccountWalletAddress(client);
		module.getAssset(client);
		module.getFileInfo(client);
		module.getFileInfo(client);
		module.sendAllMetadata(client);
		module.generateDownload(client);
		module.triggerCrawlingEvent(client);
		module.requestHoardingSession(client);
		module.requestFiletransferStats(client);
		module.requestFileMetadata(client);
		module.requestUpdateWalletAfterSending(client);
		module.requestFileSelectedMetadata(client);
		module.requestDashboardCards(client);
		module.requestSpecificAsset(client);
		module.requestBuyAsset(client);
		module.requestPriceSource(client);
		module.requestPriceDataPoints(client);

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
		var modulePriceCrawler = require('./seleniumjs/priceCrawler');

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

			case Status.CONNECT_SUPERNODE:
				moduleAccount.connectedToSupernode(data);
				break;
				
			case Status.ASSET_UPLOAD_DATA:
				moduleDashboard.shareUploadResponse(data);
				break;
				
			case Status.GET_METADATA_DIR_TREE:
				moduleDashboard.getMetaDataDIRTREE(data);
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

			case Status.REQUEST_FILETRANSFER_STATS:
				moduleDashboard.receiveFiletransferStats(data);
				break;
				
			case Status.GET_FOLDER_DETAILS: 
				moduleDashboard.receiveFileMetadata(data);
				break;
				
			case Status.GET_UPDATED_ACCOUNT_HISTORY:
				moduleDashboard.getUpdatedAccountHistory(data);
				break;

			case Status.ADD_TRANSACTION_DATA:
				moduleDashboard.addTransactionData(data);
				break;
				
			case Status.REQUEST_CRAWLING:
				moduleDashboard.getRequestCrawlingExternalData(data);
				break;
				
			case Status.GET_FILE_DETAILS: 
				moduleDashboard.receiveFileSelectedMetadata(data);
				break;

			case Status.REQUEST_DASHBOARD_CARDS: 
				moduleDashboard.responseDashboardCards(data);
				break;

			case Status.GET_SPECIFIC_ASSET:
				moduleDashboard.responseSpecificAsset(data);
				break;	
		
			case Status.BUY_ASSET:
				moduleDashboard.requestBuyAsset(data);
				break;	
			
			case Status.DOWNLOAD_PAYMENT_CONFIRMATION:
				moduleDashboard.responseDownloadPayment(data);
				break;	
			
			case Status.REQUEST_PRICE_SOURCE:
				modulePriceCrawler.responsePriceSource(data);
				break;	
			
			case Status.REQUEST_PRICE_DATA_POINTS:
				modulePriceCrawler.responsePriceDataPoints(data);
				break;

			
		}			
	});

}

var reconnectConnection = function(attempt) {
	initiateConnection(attempt); 
}

initiateConnection(0);



