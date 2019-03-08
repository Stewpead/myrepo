const base64toimage = require('base64-to-image');
const path = require('path');
const {ipcRenderer} = require('electron');
const fs = require('fs');
var obj64 = fs.readFileSync('./json/base64img-2.json'); 
var json64 = JSON.parse(obj64);
var keys64 = Object.keys(json64);
var imgname = 'decodedimg';
var imgpath = path.join(__dirname,'/decodedimg/');
var data64 = "data:image/jpg;base64,";

const Store = require('electron-store');
const store = new Store(); 

$(document).ready( () => {
    trendingVids();
});

//Generate cards
 function trendingVids(){
	var trendingVcards = "";
	for (var key in json64) {
		trendingVcards += '<div class="col-lg-3 grid-cards" onclick="getFileInfo(\''+ json64[key]['metadata']['filename'] +'\')">';
		trendingVcards += '<div class="container">';
		trendingVcards += '<img src="' + data64 + json64[key]['metadata']['thumbnail'] + '" />';
		trendingVcards += '<p id="video-title" class="thumb-title">' + json64[key]['metadata']['filename'] + '</p>';
		trendingVcards += '<p id="video-year" class="thumb-year" >(2000)</p>';
		trendingVcards += '</div>';
		trendingVcards += '</div>';
	} 
	$('#trendingMovies').append(trendingVcards);
}        

// Send data of selected card
function getFileInfo(hash) {
	store.set('set-dashboard-file-selected', hash );
	location.href = "video-details.html";
}
	


