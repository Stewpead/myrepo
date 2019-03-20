const base64toimage = require('base64-to-image');
const path = require('path');
const {ipcRenderer} = require('electron');
const fs = require('fs'); 

// Object Asset Chain Audio
var objAC = fs.readFileSync('./json/audiosection-temp.json'); 
var jsonAC = JSON.parse(objAC);
// Object Asset Chain Audio

var keys64 = Object.keys(jsonAC);
var imgname = 'decodedimg';
var imgpath = path.join(__dirname,'/decodedimg/');
var data64 = "data:image/jpg;base64,";
var audioname;
const Store = require('electron-store');
const store = new Store();  

$(document).ready( () => {

    // Get File Name from store()
    audioname = store.get('set-dashboard-file-selected-audio' );

    audionameF();

    document.getElementById('bandMembers').style.display = 'none';

});

$('#btnSearch').click(() => {
    location.href = "audio-download.html";
});

function audionameF() {
    var filename;

    // get search results  
    filefound = getFiledata(audioname);
    // get search results 
    
    filename = jsonAC[filefound]['metadata']['filename'];
    document.getElementById('filetitle').innerHTML = filename;

    var imgString = "";
    img64 = data64 + jsonAC[filefound]['metadata']['thumbnail'];
    imgString = '<img src="' + img64 + '" class="fileimage" />';
    $('#fileImage').append(imgString);
    
}

function getFiledata(filename) {

    for(var key in jsonAC) {
        if(jsonAC[key]['metadata']['filename'] == filename) {
            return key;
        }
    }

}

