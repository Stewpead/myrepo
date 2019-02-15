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
    
    var getAsset = {
        status : 1122
    };
    getAsset = JSON.stringify(getAsset);

    ipcRenderer.send('get-asset-chain', getAsset);

    trendingVids();

});


    function trendingVids(){
        var trendingVcards = "";
        setTimeout( () => {
            let data = store.get('get-asset-chain');
            store.delete('get-asset-chain');
            console.log(JSON.parse(data));
        }, 100);
        // for (var key in json64) 
        // {

        //     trendingVcards += '<div class="col-lg-3 grid-cards" id="card' + key + '">';
        //     trendingVcards += '<div class="container">';
        //     trendingVcards += '<img src="' + data64 + json64[key]['metadata']['thumbnail'] + '" />';
        //     trendingVcards += '<p id="video-title" class="thumb-title">' + json64[key]['metadata']['filename'] + '</p>';
        //     trendingVcards += '<p id="video-year" class="thumb-year" >(' + json64[key]['metadata']['year'] + ')</p>';
        //     trendingVcards += '</div>';
        //     trendingVcards += '</div>';

        // }
        // $('#trendingMovies').append(trendingVcards);
    }

    $('#card0').click(() => {
        location.href = "video-details.html";
    });

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