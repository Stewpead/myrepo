const base64toimage = require('base64-to-image');
const path = require('path');
const {ipcRenderer} = require('electron');
const fs = require('fs');

const Store = require('electron-store');
const store = new Store(); 

// Movie Content
var obj1 = fs.readFileSync('./json/base64img-2.json'); 
var json1 = JSON.parse(obj1);
// Movie Content

// Audio Content
var obj2 = fs.readFileSync('./json/audiosection-temp.json'); 
var json2 = JSON.parse(obj2);
// Audio Content 

var imgpath = path.join(__dirname,'/decodedimg/');
var data64 = "data:image/jpg;base64,";


$(document).ready( () => {

	trendingVids();

	trendingAudios();


	json = {
		status : 1136,
		type : 0
	}
	
	let jsonString = JSON.stringify(json);
	
	ipcRenderer.send('request-dashboard-cards', jsonString);
	
	trendingTVSeries();

	// $(function () {
	// 	$('[data-toggle="tooltip"]').tooltip()
	// })

	
	$('.section-divider ul li span#recentTab').addClass('clicked');

	$('.section-divider ul li span').click(function () {
		
		$('.section-divider ul li span').removeClass("clicked");


		$(this).addClass("clicked");


	});


});

//Generate Movie cards
 function trendingVids(){

}        


// Generate Audio cards
function trendingAudios(){
	var trendingAcards = "";

	for (var key in json2) {
		trendingAcards += '<div class="col-lg-2 col-sm-4 col-6">';
		trendingAcards += '<div class="grid-cards-audio" onclick="getAudioInfo(\''+ json2[key]['metadata']['filename'] +'\')">';
		trendingAcards += '<div class="container-card">';
		trendingAcards += '<img class="img-fluid" draggable="false" src="' + data64 + json2[key]['metadata']['thumbnail'] + '" />';
		trendingAcards += '</div>';
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



var movies;
ipcRenderer.on('response-dashboard-cards', (event, arg) => {

	let moviesArray = {};

	moviesArray = arg;

	var trendingVcards = "";

	console.log(moviesArray['data']['movies']);

	movies = JSON.parse(moviesArray['data']['movies']);

	for( var key in movies) {

		trendingVcards += '<div class="col-lg-2 col-sm-4 col-6"  data-toggle="tooltip" title="' + movies[key]['title'] + '">';
		trendingVcards += '<div class="grid-cards-video" onclick="getMovieInfo(\'' + key + '\')">';
		trendingVcards += '<div class="container-card">';
		trendingVcards += '<img class="img-fluid" draggable="false" src="' + movies[key]['poster'] + '" />';
		trendingVcards += '<div class="card-data mt-3">';
		trendingVcards += '<p class="thumb-title text-truncate">' + movies[key]['title'] + '</p>';
		trendingVcards += '<p class="thumb-year" >' + movies[key]['date'].replace(/\((\d{4})\)/g, "$1") + '</p>';
		trendingVcards += '</div>';
		trendingVcards += '</div>';
		trendingVcards += '</div>';
		trendingVcards += '</div>';
	}
	$('#trendingMovies').append(trendingVcards);

});	


// Send data of selected card
function getMovieInfo(keys) {

	if(keys) {
		let jData = {
			poster : movies[keys]['poster'],
			year : movies[keys]['date'],
			title : movies[keys]['title']
		};
	
		let json = {
			status : 1129,
			title : movies[keys]['title'],
			type : 0
		};
	
	
		json = JSON.stringify(json);
		ipcRenderer.send('request-specific-asset', json);
	
		store.set('specific-data-asset', jData);
	
	
		ipcRenderer.on('response-filelist-specific-asset', (event, arg) => {
	
			arg = JSON.parse(arg['data']);
	
			store.set('metadata-specific-asset', arg);
	
			location.href = "video-details.html";
	
		});
	}

}
function trendingTVSeries() {

	var trendingTVcards = "";
	for (var key in json1) {
		trendingTVcards += '<div class="col-lg-2 col-sm-4 col-6">';
		trendingTVcards += '<div class="grid-cards-video" onclick="getTVseries(\''+ key +'\')">';
		trendingTVcards += '<div class="container-card">';
		trendingTVcards += '<img class="img-fluid" draggable="false" src="' + data64 + json1[key]['metadata']['thumbnail'] + '" />';
		trendingTVcards += '</div>';
		trendingTVcards += '<p id="video-title" class="thumb-title">' + json1[key]['metadata']['filename'] + '</p>';
		trendingTVcards += '</div>';
		trendingTVcards += '</div>';
	} 
	$('#tvSeriesSection').append(trendingTVcards);

}

// Send data of selected card
function getTVseries(keys) {
	if(keys) {
		let jData = {
			poster : movies[keys]['poster'],
			year : movies[keys]['date'],
			title : movies[keys]['title']
		};
	
		let json = {
			status : 1129,
			title : movies[keys]['title'],
			type : 0
		};
	
		json = JSON.stringify(json);
		ipcRenderer.send('request-specific-asset', json);
	
		store.set('specific-data-asset', jData);
	
		ipcRenderer.on('response-filelist-specific-asset', (event, arg) => {
	
			arg = JSON.parse(arg['data']);
			store.set('metadata-specific-asset', arg);
			location.href = "tvseries-details.html";
		});
	}
	
}

// Send data of selected card
