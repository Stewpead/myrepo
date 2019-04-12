const path = require('path');
const {ipcRenderer} = require('electron');
const fs = require('fs'); 

const Store = require('electron-store');
const store = new Store();
var data64 = "data:image/jpg;base64,";
var audioname;

// Object Asset Chain Movie
var objAC = fs.readFileSync('./json/base64img-2.json'); 
var jsonAC = JSON.parse(objAC);
// Object Asset Chain Movie
 
var keyfile = store.get('set-dashboard-file-selected-tvseries');
store.delete('set-dashboard-file-selected-tvseries');
var filename;

$(document).ready( () => {
    tvseriesF();
});

function tvseriesF() {

    // get search results 
    filefound = getFiledata(keyfile);
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

function getFiledata(filename) {

    for(var key in jsonAC) {
        if(jsonAC[key]['metadata']['filename'] == filename) {
            return key;
        }
    }

}

$(".tvseries-season .img").click(function () {

    $(".tvseries-season .img").removeClass('active');

    $(this).addClass('active');

    let imageSrc = $(this).css('background-image');
    
    $('#shareStyleBG').remove();

    imageSrc = imageSrc.replace(/"/g, "'");

    imageSrc = ' background-image: '+ imageSrc;

});

$('#btnSearch').click( () => {
    location.href = "tvseries-download.html";
});

$('#viewFiles').click( () => {
    $('[pd-popup="tvseriesViewFiles"]').fadeIn(100);
});

setTimeout( () => {
    $('#btnClose').click( () => {
        $('[pd-popup="tvseriesViewFiles"]').fadeOut(100);
    });
    $('#btnTopClose').click( () => {
        $('[pd-popup="tvseriesViewFiles"]').fadeOut(100);    
    });
}, 100);