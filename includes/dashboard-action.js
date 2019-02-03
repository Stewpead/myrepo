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
  shareUploadResponse: function (data) {

			console.log(data);
	
  },
  getWalletBalance: function (data) {
		  console.log(data);
  }

};



