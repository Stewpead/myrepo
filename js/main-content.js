const base64toimage = require('base64-to-image');
const path = require('path');
const {ipcRenderer} = require('electron');
const fs = require('fs');

// Movie Content
var obj1 = fs.readFileSync('./json/base64img-2.json'); 
var json1 = JSON.parse(obj1);
// Movie Content

// Audio Content
var obj2 = fs.readFileSync('./json/audiosection-temp.json'); 
var json2 = JSON.parse(obj2);
// Audio Content

// var keys64 = Object.keys(json64);
// var imgname = 'decodedimg';
var imgpath = path.join(__dirname,'/decodedimg/');
var data64 = "data:image/jpg;base64,";


const Store = require('electron-store');
const store = new Store(); 

$(document).ready( () => {

	trendingVids();

	trendingAudios();

});

//Generate Movie cards
 function trendingVids(){

	var trendingVcards = "";

	for (var key in json1) {
		trendingVcards += '<div class="col-lg-3 grid-cards-video" onclick="getMovieInfo(\''+ json1[key]['metadata']['filename'] +'\')">';
		trendingVcards += '<div class="container">';
		trendingVcards += '<img src="' + data64 + json1[key]['metadata']['thumbnail'] + '" />';
		trendingVcards += '<p id="video-title" class="thumb-title">' + json1[key]['metadata']['filename'] + '</p>';
		trendingVcards += '<p id="video-year" class="thumb-year" >(2000)</p>';
		trendingVcards += '</div>';
		trendingVcards += '</div>';
	} 
	$('#trendingMovies').append(trendingVcards);

}        

// Send data of selected card
function getMovieInfo(hash) {
	store.set('set-dashboard-file-selected-movie', hash );
	location.href = "video-details.html";
}
	
// Generate Audio cards
function trendingAudios(){
	var trendingAcards = "";
	for (var key in json2) {
		trendingAcards += '<div class="col-lg-3 grid-cards-audio" onclick="getAudioInfo(\''+ json2[key]['metadata']['filename'] +'\')">';
		trendingAcards += '<div class="container">';
		trendingAcards += '<img src="' + data64 + json2[key]['metadata']['thumbnail'] + '" />';
		trendingAcards += '<p id="video-title" class="thumb-title">' + json2[key]['metadata']['filename'] + '</p>';
		trendingAcards += '</div>';
		trendingAcards += '</div>';
	} 
	$('#trendingArtist').append(trendingAcards);
}        

// Send data of selected card
function getAudioInfo(hash) {
	store.set('set-dashboard-file-selected-audio', hash );
	location.href = "audio-details.html";
}

