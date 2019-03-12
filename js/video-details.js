const base64toimage = require('base64-to-image');
const path = require('path');
const fs = require('fs');
const {ipcRenderer} = require('electron');

// Object Asset Chain
var objAC = fs.readFileSync('./json/base64img-2.json'); 
var jsonAC = JSON.parse(objAC);
// Object Asset Chain

// Object File Search Result
var objFSR = fs.readFileSync('./json/filelist64.json');
var jsonFSR = JSON.parse(objFSR);
// Object File Search Result

var imgpath = path.join(__dirname,'/decodedimg/');
var data64 = "data:image/jpg;base64,";
var img64;

const Store = require('electron-store');
const store = new Store();  

$ = jQuery;

var filefound;
var filename;

$(document).ready(function() {

    // Get File Name from store()
    filename = store.get('set-dashboard-file-selected' );
    console.log(filename);
    store.delete(); 
    // Get File Name from store()

    // get search results 
    filefound = getFiledata(filename);
    // get search results 

    filename = jsonAC[filefound]['metadata']['filename'];
    var fileyear = jsonAC[filefound]['metadata']['year'];
    document.getElementById('filetitle').innerHTML = filename;
    document.getElementById('fileyear').innerHTML = fileyear;

    var imgString = "";
    img64 = data64 + jsonAC[filefound]['metadata']['thumbnail'];
    imgString = '<img src="' + img64 + '" class="fileimage" />';
    $('#fileImage').append(imgString);

    loadFileSearchResults();
});

function getFiledata(filename) {

    for(var key in jsonAC) {
        if(jsonAC[key]['metadata']['filename'] == filename) {
            return key;
        }
    }

}

function loadTableData(data) {
    var countFiles = 1;
    var resultsTableData = "";
	
    // for (var key in data) {
    //     resultsTableData += '<tr id="row' + countFiles + '">';
    //     resultsTableData += '<th scope="row" class="clickable-row"></th>'
    //     resultsTableData += '<td id="filename' + countFiles + '">'+data['asset']['title']+'</td>';
    //     resultsTableData += '<td id="downloads' + countFiles + '"><td id="costavx' + countFiles + '"></td><td id="ratings' + countFiles + '"></td><td id="language' + countFiles + '"></td><td id="subtitle' + countFiles + '"></td><td id="resolution' + countFiles + '"></td><td id="filesize' + countFiles + '"></td><td id="videocode' + countFiles + '"></td><td id="audiocode' + countFiles + '"></td><td id="videobitrate' + countFiles + '"></td>';
    //     countFiles++;
    // }
    // $('#tbodyVdetails').append(resultsTableData);
	
}


function loadFileSearchResults() { 

    var searchResult = "";
    for( var key in jsonFSR[filename]) {

        searchResult += '<tr class="fileDetailsData" data="' + key +'">';
        searchResult += '<th scope="row"></th>';
        searchResult += '<td id="filename' + key + '">' + filename + '</td>';
        searchResult += '<td id="downloads' + key + '"> ' + jsonFSR[filename][key]['downloads'] + '</td>';
        searchResult += '<td id="cost' + key + '"> ' + jsonFSR[filename][key]['cost'] + '</td>';
        searchResult += '<td id="ratings' + key + '"> ' + jsonFSR[filename][key]['ratings'] + '</td>';
        searchResult += '<td id="language' + key + '"> ' + jsonFSR[filename][key]['language'] + '</td>';
        searchResult += '<td id="subtitle' + key + '"> ' + jsonFSR[filename][key]['subtitle'] + '</td>';
        searchResult += '<td id="resolution' + key + '"> ' + jsonFSR[filename][key]['Resolution'] + '</td>';
        searchResult += '<td id="filesize' + key + '"> ' + jsonFSR[filename][key]['filesize'] + '</td>';
        searchResult += '<td id="videocodec' + key + '"> ' + jsonFSR[filename][key]['videocodec'] + '</td>';
        searchResult += '<td id="audiocodec' + key + '"> ' + jsonFSR[filename][key]['audiocodec'] + '</td>';
        searchResult += '<td id="videobitrate' + key + '"> ' + jsonFSR[filename][key]['bitrate'] + '</td>';
        searchResult += '</tr>';
    }
    $('#tbodyDetails').append(searchResult);
}

$("#btnBack").click(function() {
    alert('button back under construction!');
});

// $('#thetable').find('tr').click( function(){
//     alert('You clicked row '+ ($(this).index()+1) );
//     });

setTimeout(() => {
    $('tbody .fileDetailsData').click(function() {
        let jData = {};
        let row = $(this).attr('data');
        jData.img64 = img64;
        jData.fileID = $('#filename' + row).text();
        jData.downloads = $('#downloads' + row).text();
        jData.cost = $('#cost' + row).text();
        jData.ratings = $('#ratings' + row).text();
        jData.language = $('#language' + row).text();
        jData.subtitle = $('#subtitle' + row).text();
        jData.resolution = $('#resolution' + row).text();
        jData.filesize = $('#filesize' + row).text();
        jData.videocodec = $('#videcodec' + row).text();
        jData.audiocodec = $('#audiocodec' + row).text();
        jData.videobitrate = $('#videobitrate' + row).text();
        store.set('file-details-for-download-page', jData);
        location.href = 'video-download.html';
    });    
}, 50);

$('#tbodyVdetails').on("click","#row1", function() {
    location.href = 'video-download.html';
});

$('#btnSearch').click( () => {
    location.href = 'video-download.html';
});

