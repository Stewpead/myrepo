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

var trendingVideos;
var trendingAudios;
var popularVideos;
var popularArtists;

$(document).ready( () => {
     
    // var getAsset = {
    //     status : 1122
    // };
    // getAsset = JSON.stringify(getAsset);


    // ipcRenderer.send('get-asset-chain', getAsset);
	// store.delete('set-dashboard-file-selected');
    trendingVids();

});


 function trendingVids(){
        var trendingVcards = "";
        // setTimeout( () => {
        //     let data = store.get('get-asset-chain');
        //     store.delete('get-asset-chain');

		
		// 	if (typeof data != "undefined") {
		// 		var json64 = JSON.parse(data["assets"]);
		// 		console.log(json64);
				//' + data64 + json64[key]['thumbnail'] + ' 
		for (var key in json64) {
			trendingVcards += '<div class="col-lg-3 grid-cards" onclick="getFileInfo(\''+ json64[key]['metadata']['filename'] +'\')">';
			trendingVcards += '<div class="container">';
			trendingVcards += '<img src="' + data64 + json64[key]['metadata']['thumbnail'] + '" />';
			trendingVcards += '<p id="video-title" class="thumb-title">' + json64[key]['metadata']['filename'] + '</p>';
			trendingVcards += '<p id="video-year" class="thumb-year" >(2000)</p>';
			trendingVcards += '</div>';
			trendingVcards += '</div>';

			// ' + json64['metadata']['thumbnail'] + '
			// trendingVcards += '<div class="col-lg-3 grid-cards" onclick="getFileInfo(\''+ json64[key]['trackingHash'] +'\')">';
			// trendingVcards += '<div class="container">';
			// trendingVcards += '<img src="../images/thumbnail1.jpg" />';
			// trendingVcards += '<p id="video-title" class="thumb-title">' + json64[key]['title'] + '</p>';
			// trendingVcards += '<p id="video-year" class="thumb-year" >(2000)</p>';
			// trendingVcards += '</div>';
			// trendingVcards += '</div>';

			} 
			
		$('#trendingMovies').append(trendingVcards);
			}        
		// }, 1000);

    // }

function getFileInfo(hash) {
	store.set('set-dashboard-file-selected', hash );
	location.href = "video-details.html";
}
	
// for (var i = 0; i < 14; ++i) {
//     var movieThumbs = '<div class="col-lg-3 grid-cards">';
//     movieThumbs += '<div class="container">';
//     movieThumbs += '<img src="' + data64 + json64[i]['thumbnail'] + '" />';
//     movieThumbs += '<p id="video-title" class="thumb-title">' + json64[i]['title'] + '</p>';
//     movieThumbs += '<p id="video-year" class="thumb-year" >(' + json64[i]['year'] + ')</p>';
//     movieThumbs += '<p id="video-description">' + json64[i]['description'] + '</p>';
//     movieThumbs += '</div>';
//     movieThumbs += '</div>';
    
//     $("#trending-movies").append(movieThumbs);
// }