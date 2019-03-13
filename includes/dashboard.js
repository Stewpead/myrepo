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
	shareUpload: function (client) {
		ipcMain.on('avx-share-upload-file',(event, arg) => {
			console.log(arg);
			client.write(arg);
		});		
	},
  
	executeUploadFile: function (client) {

		ipcMain.on('avx-share-upload-file-finish',(event, arg) => {
			
			event.returnValue = true;
		});		
	},

	sendFundAVX: function (client) {
		
		ipcMain.on('send-token',(event, arg) => {

			client.write(arg);	

			event.returnValue = true;
		});
	},		
	
	checkStatus: function (client) {
		ipcMain.on('checkStatus', (event, arg) => {
			client.write(arg);
		});
	},
	
	sharePayment: function (client) {

		ipcMain.on('avx-share-upload-payment',(event, arg) => {
			client.write(arg);
			event.returnValue = true;
		});		
	},
		
	getSpent: function (client) {

		ipcMain.on('avx-account-spent',(event, arg) => {
			client.write(arg);
			event.returnValue = true;
		});		
	},
	
	getAccountHistory: function (client) {

		ipcMain.on('request-account-history',(event, arg) => {
			client.write(arg);
			event.returnValue = true;
		});		
	},
	
	getAccountWalletAddress: function (client) {

		ipcMain.on('avx-account-wallet-address',(event, arg) => {
			client.write(arg);
			event.returnValue = true;
		});		
	},
  
	getAssset: function (client) {
	  ipcMain.on('get-asset-chain', (event, arg) => {
		client.write(arg);
	  });

	},
  
	getFileInfo: function (client) {
		ipcMain.on('get-file-info', (event, arg) => {
			client.write(arg);
		});

	},
  
	generateDownload: function (client) {
		ipcMain.on('set-generate-download', (event, arg) => {
			client.write(arg);
		});

	},

	requestHoardingSession: function (client) {
		ipcMain.on('request-hoarding-session', (event, arg) => {
			client.write(arg);
		});
	},

	requestFiletransferStats: function (client) {

		ipcMain.on('request-filetransfer-stats', (event, arg) => {
			client.write(arg);
		});
	},

	requestFileMetadata: function (client) {

		ipcMain.on('request-file-metadata', (event, arg) => {
			client.write(arg);
		});
	},

	requestUpdateWalletAfterSending: function (client) {
		ipcMain.on('update-after-sending', (event, arg) => {
			client.write(arg);
		});
	}
	
};