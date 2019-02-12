
const base64toimage = require('base64-to-image');
const path = require('path');
const fs = require('fs');
var obj64 = fs.readFileSync('./json/base64img-2.json'); 
var json64 = JSON.parse(obj64);
var keys64 = Object.keys(json64);
var imgname = 'decodedimg';
var imgpath = path.join(__dirname,'/decodedimg/');
var data64 = "data:image/jpg;base64,";
$ = jQuery;
$(document).ready(() => {
    loadVideoDetails();
});

function loadVideoDetails() {
    var videoDetails = "";
    videoDetails = '<img src="' + data64 + json64[0]['metadata']['thumbnail'] + '" id="fileimage" style="border-radius:2px;/>';
    $('#videoImage').append(videoDetails);
    document.getElementById('movietitle').innerHTML = json64[0]['metadata']['filename'];
    document.getElementById('movieyear').innerHTML = json64[0]['metadata']['year'];
}

function loadTableData() {
    var countFiles = 1;
    var resultsTableData = "";
    for (var key in json64) {
        resultsTableData += '<tr id="row1">';
        resultsTableData += '<th scope="row" class="clickable-row"></th>'
        resultsTableData += '<td id="filename' + countFiles + '">' + json64[key]['metadata']['filename'] + '</td>';
        resultsTableData += '<td id="costavx' + countFiles + '"></td><td id="ratings' + countFiles + '"></td><td id="language' + countFiles + '"></td><td id="subtitle' + countFiles + '"></td><td id="resolution' + countFiles + '"></td><td id="filesize' + countFiles + '"></td><td id="videocode' + countFiles + '"></td><td id="audiocode' + countFiles + '"></td><td id="videobitrate' + countFiles + '"></td>';
        countFiles++;
    }
    $('#tbodyVdetails').append(resultsTableData);
}


$("#btnBack").click(function() {
    location.href = 'search-detailed.html';
});

$('#row1').click(function() {
    location.href = 'video-download.html';
});
$('#btnSearch').click( () => {
    
});