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

 


function audionameF() {
    var filename;
    // get search results 
    filefound = getFiledata(audioname);
    // get search results 

    filename = jsonAC[filefound]['metadata']['filename'];
    var fileyear = jsonAC[filefound]['metadata']['year'];
    document.getElementById('filetitle').innerHTML = filename;
    document.getElementById('fileyear').innerHTML = fileyear;

    var imgString = "";
    img64 = data64 + jsonAC[filefound]['metadata']['thumbnail'];
    imgString = '<img src="' + img64 + '" class="fileimage" />';
    $('#fileImage').append(imgString);
    
}