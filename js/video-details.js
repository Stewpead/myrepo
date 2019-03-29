const base64toimage = require('base64-to-image');
const path = require('path');
const fs = require('fs');
const {ipcRenderer} = require('electron');

// Object Asset Chain Movie
var objAC = fs.readFileSync('./json/base64img-2.json'); 
var jsonAC = JSON.parse(objAC);
// Object Asset Chain Movie

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
var videoname;


$(document).ready(function() {

    // Get File Name from store()
    videoname = store.get('set-dashboard-file-selected-movie' );

    // console.log(filename);
    store.delete('set-dashboard-file-selected-movie'); 
    videonameF();
    loadFileSearchResults();
});

function videonameF() {

    // get search results 
    filefound = getFiledata(videoname);
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
    for( var key in jsonFSR[videoname]) {

        searchResult += '<tr class="fileDetailsData" data="' + key +'">';
        searchResult += '<th scope="row"></th>';
        searchResult += '<td id="filename' + key + '">' + filename + '</td>';
        searchResult += '<td id="downloads' + key + '"> ' + jsonFSR[videoname][key]['downloads'] + '</td>';
        searchResult += '<td id="cost' + key + '"> ' + jsonFSR[videoname][key]['cost'] + '</td>';
        searchResult += '<td id="ratings' + key + '"> ' + jsonFSR[videoname][key]['ratings'] + '</td>';
        searchResult += '<td id="language' + key + '"> ' + jsonFSR[videoname][key]['language'] + '</td>';
        searchResult += '<td id="subtitle' + key + '"> ' + jsonFSR[videoname][key]['subtitle'] + '</td>';
        searchResult += '<td id="resolution' + key + '"> ' + jsonFSR[videoname][key]['Resolution'] + '</td>';
        searchResult += '<td id="filesize' + key + '"> ' + jsonFSR[videoname][key]['filesize'] + '</td>';
        searchResult += '<td id="videocodec' + key + '"> ' + jsonFSR[videoname][key]['videocodec'] + '</td>';
        searchResult += '<td id="audiocodec' + key + '"> ' + jsonFSR[videoname][key]['audiocodec'] + '</td>';
        searchResult += '<td id="videobitrate' + key + '"> ' + jsonFSR[videoname][key]['bitrate'] + '</td>';
        searchResult += '</tr>';
    }
    $('#tbodyDetails').append(searchResult);
}

$("#btnBack").click(function() {
    alert('button back under construction!');
});

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

    ipcRenderer.on('filelist-metadata-response', (event, arg) => {
        let crawl = arg;
        let actors = crawl["cast"];
		let actorsData = '';
		let actorsCounter = 0;
		let actorsCounterActive = 0;
		
		$.each( actors, function( i, actor ) {

			if (actorsCounter == 0 )  {
				if ( actorsCounterActive == 0) {
					actorsData += '<div class="carousel-item row no-gutters active">';
				} else {
					actorsData += '<div class="carousel-item row no-gutters">';
				}
				
				
				
			}
			actorsCounterActive++;
			
			actorsData += '<div class="col-2 file-actor-details ccccc">';
			actorsData += '<div class="img" style="background-image: url('+ "'" + actor["thumb"].replace(/(\r\n|\n|\r|'|")/gm, "") + "'" +')"></div>';
			actorsData += '<label class="name">'+ decodeURIComponent(actor["actor"]) +'</label> ';
			actorsData += '<p class="role">'+ decodeURIComponent(actor["character"]) +'</p>'
			actorsData += '</div>';
			
			if (actorsCounter == 5 ) {
				actorsCounter = 0;
				actorsData += '</div>';
			} else {
				actorsCounter++;
			} 
			
			setTimeout(function() {
				let target = $('[pd-popup="shareConfirmMetadataModal"] .file-movie-details textarea[filepath="'+ encodeURIComponent( data["path"] ) +'"]');
				target.parent().find(".img").click();
			}, 500);
			
		});
		
        $(".popup.scan-result .file-actor-content").html(actorsData);
        
    });

//ACTORS
		
		