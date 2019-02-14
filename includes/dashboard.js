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
			client.write(arg);
			event.returnValue = true;
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
				// console.log(arg);		
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
	
	getBalance: function (client) {

		ipcMain.on('avx-account-balance',(event, arg) => {
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

		ipcMain.on('avx-account-history',(event, arg) => {
			client.write(arg);
			event.returnValue = true;
		});		
	},
	
	getAccountWalletAddress: function (client) {

		ipcMain.on('avx-account-wallet-address',(event, arg) => {
			client.write(arg);
			event.returnValue = true;
		});		
	}
	
	
	
};