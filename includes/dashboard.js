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
	});  
  }
};