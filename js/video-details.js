
const base64toimage = require('base64-to-image');
const path = require('path');
const fs = require('fs');
var obj64 = fs.readFileSync('./json/base64img-2.json'); 
var json64 = JSON.parse(obj64);
var keys64 = Object.keys(json64);
var imgname = 'decodedimg';
var imgpath = path.join(__dirname,'/decodedimg/');
var data64 = "data:image/jpg;base64,";
const {ipcRenderer} = require('electron');
const Store = require('electron-store');
const store = new Store();
$ = jQuery;

$(document).ready(function() {

    setTimeout( () =>{
        let data = store.get('set-dashboard-file-selected' );
    }, 100);
    document.getElementById('')
	 
    // var getFileInfo = {
    //     status : 1128,
	// 	data : {
	// 		trackingHash : data
	// 	}
		
    // };
    // getFileInfo = JSON.stringify(getFileInfo);

    // ipcRenderer.send('get-file-info', getFileInfo);
	
	// setTimeout( () => {
	// 	let data = store.get('get-file-info');
		
	// 	if (typeof data != "undefined") {
	// 		var json64 = JSON.parse(data['asset']);
			
	// 		    loadTableData(data);
	// 			loadVideoDetails(json64);
	// 	}
		
	//  }, 1000);
 
});

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

function loadVideoDetails(json64) {
	console.log(json64);
    var videoDetails = "";
    videoDetails = '<img src="../images/thumbnail1.jpg" id="fileimage" style="border-radius:2px;/>';
    document.getElementById('movietitle').innerHTML = json64['title'];
    document.getElementById('movieyear').innerHTML = '2000';
    console.log(videoDetails);
    $('#videoImage').append(videoDetails);
    // alert('WOW');
}


$("#btnBack").click(function() {
    location.href = 'search-detailed.html';
});

$('#tbodyVdetails').on("click","#row1", function() {
    location.href = 'video-download.html';
});

$('#btnSearch').click( () => {
    location.href = 'video-download.html';
});