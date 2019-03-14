const base64toimage = require('base64-to-image');
const path = require('path');
const {ipcRenderer} = require('electron');
const fs = require('fs');
var obj64 = fs.readFileSync('./json/audiosection-temp.json'); 
var json64 = JSON.parse(obj64);
var keys64 = Object.keys(json64);
var imgname = 'decodedimg';
var imgpath = path.join(__dirname,'/decodedimg/');
var data64 = "data:image/jpg;base64,";


