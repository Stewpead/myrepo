const base64toimage = require('base64-to-image');
const path = require('path');
const fs = require('fs');
var obj64 = fs.readFileSync('./json/base64img.json'); 
var json64 = JSON.parse(obj64);
var keys64 = Object.keys(json64);
var imgname = 'decodedimg';
var imgpath = path.join(__dirname,'/decodedimg/');
var data64 = "data:image/jpg;base64,";



// loadimg();

function loadimg() {
	alert('sss');
 
	var x;
	
	for (var i = 0; i < 14; ++i) {
		var movieThumbs = '<div class="col-lg-3 grid-cards" id="card' + i + '">';
		movieThumbs += '<div class="container">';
		movieThumbs += '<img src="' + data64 + json64[i]['thumbnail'] + '" />';
		movieThumbs += '<p id="video-title" class="thumb-title">' + json64[i]['title'] + '</p>';
		movieThumbs += '<p id="video-year" class="thumb-year" >(' + json64[i]['year'] + ')</p>';
		//movieThumbs += '<p id="video-description">' + json64[i]['description'] + '</p>';
		movieThumbs += '</div>';
		movieThumbs += '</div>';
		
		$("#trending-movies").append(movieThumbs);
	}

}
