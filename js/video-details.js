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


var jAsset = store.get('metadata-specific-asset');
var thumbtitle = store.get('specific-data-asset');
console.log(jAsset);
function getFiledata(filename) {

    for(var key in jsonAC) {
        if(jsonAC[key]['metadata']['filename'] == filename) {
            return key;
        }
    }

}

$(document).ready(function() {

    // store.delete('specific-data-asset');


    var thumbImg = '<img class="img-fluid" id="imageFile" src="' + thumbtitle['poster'] + '">';
    $('#fileImage').append(thumbImg);

    
    console.log(jAsset);

    let crawl = jAsset;
    let actors = crawl["crawl"]["cast"];
    let actorsData = '';
    let actorsCounter = 0;
    let actorsCounterActive = 0;

    document.getElementById('filetitle').innerHTML = jAsset["info"][0]["title"];
    document.getElementById('movieplot').innerHTML = decodeURIComponent(jAsset["crawl"]["header"]["synopsis"]);
    document.getElementById('fileyear').innerHTML = jAsset["crawl"]["header"]["release_date"];
    document.getElementById('videoDirectors').innerHTML = jAsset["crawl"]["header"]["directors"];
    document.getElementById('videoProducer').innerHTML = jAsset["crawl"]["producer"];
    document.getElementById('fileGenre').innerHTML = jAsset["crawl"]["header"]["genres"];

    let strBanner = jAsset["crawl"]["header"]["banner"];
    // console.log(strBanner);
    $('#mainSearchResult').css({
        'background': 'linear-gradient(to bottom, rgba(0, 0, 0, 0.77) 0%, rgba(0, 0, 0, 0.9) 60%, rgba(0, 0, 0, 1) 100%), url("' + strBanner + '") no-repeat',
        'background-size': '100% 35%'
    });

    generateTable();

    $('#tbodyDetails tr').click(function() {
        nextWindow($(this).attr('data-key'));
    });
    
    $.each( actors, function( i,  actor) {

        if (actorsCounter == 0 )  {
    
            if ( actorsCounterActive == 0) {
                actorsData += '<div class="carousel-item row no-gutters active">';
            } else {
                actorsData += '<div class="carousel-item row no-gutters">';
            }
             
            
        }
        actorsCounterActive++;
        
        actorsData += '<div class="col-2 file-actor-details">';
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
        
    });
    $("#mainSearchResult .actors-section").html(actorsData);

});



$('#tbodyVdetails').on("click","#row1", function() {
    location.href = 'video-download.html';
});

$('#btnSearch').click( () => {
    location.href = 'video-download.html';
});



    
function generateTable() {

    var tableStr = "";

    for(var key1 in jAsset["info"]) {

        tableStr += '<tr data-key="' + key1 + '">'; 
        tableStr += '<td></td>';
        tableStr += '<td>' + jAsset["info"][key1]["metadata"]["filename"] + '</td>';
        tableStr += '<td> 1 </td>';   
        tableStr += '<td>' + jAsset["info"][key1]["price"] + '</td>';
        tableStr += '<td> English </td>';
        tableStr += '<td> English </td>';
        tableStr += '<td> 4.7k </td>';
        tableStr += '<td> ' + getResolution(jAsset["info"][key1]["metadata"]["height"], 1) +' </td>';
        tableStr += '<td> ' + formatBytes(jAsset["info"][key1]["metadata"]["filesize"], 2) +' </td>';
        tableStr += '<td> ' + jAsset["info"][key1]["metadata"]["video_codec_name"] + ' </td>';
        tableStr += '<td style="text-transform: uppercase;"> ' + jAsset["info"][key1]["metadata"]["audio_codec_name"] + ' </td>';
        tableStr += '<td> ' + jAsset["info"][key1]["metadata"]["video_frame_rate"] + ' </td>';
        tableStr += '</tr>';
        
    }

    $('#tbodyDetails').append(tableStr);
}


function nextWindow(key) {
    let json1 = {
        price : jAsset["info"][key]["price"],
        assetKey : jAsset["info"][key]["asset_key"],
        indexKey : key
    }

    store.set('pass-asset-key', json1);
    location.href = "video-download.html";
}





   /* setInterval(() => {

        let json = {

            status : 1139
        };
        json = JSON.stringify(json);
        ipcRenderer.send('request-get-file-list', json);

    }, 9000);
    

    // linear-gradient(to bottom, rgba(0, 0, 0, 0.575) 30%, rgba(0, 0, 0, 1) 60%, rgba(0, 0, 0, 1) 100%), url('../images/avengers_wall.jpg') no-repeat
    ipcRenderer.on('response-get-file-list', (event , arg) => {

            var tableStr = "";
            if (arg) {
                for(var key1 in arg['info']) {

                    tableStr += '<tr data-key="' + key1 + '">'; 
                    tableStr += '<td></td>';
                    tableStr += '<td>' + arg[key1]["title"] + '</td>';
                    tableStr += '<td> 999 </td>';   
                    tableStr += '<td>' + arg[key1]["price"] + '</td>';
                    tableStr += '<td> 4.7 </td>';
                    tableStr += '<td> Language </td>';
                    tableStr += '<td> English </td>';
                    tableStr += '<td> 4k </td>';
                    tableStr += '<td> ' + arg[key1]["metadata"]["filesize"] +' </td>';
                    tableStr += '<td> ' + arg[key1]["metadata"]["video_codec_name"] + ' </td>';
                    tableStr += '<td> ' + arg[key1]["metadata"]["audio_codec_name"] + ' </td>';
                    tableStr += '<td> ' + arg[key1]["metadata"]["video_frame_rate"] + ' </td>';
                    tableStr += '</tr>';
                }
            }
        $('#tbodyDetails').append(tableStr);
    });
    */



    // for( var keys in jAsset[""])

//ACTORS
		
        
// function loadFileSearchResults() { 

//     var searchResult = "";
//     for( var key in jsonFSR[videoname]) {

//         searchResult += '<tr class="fileDetailsData" data="' + key +'">';
//         searchResult += '<th scope="row"></th>';
//         searchResult += '<td id="filename' + key + '">' + filename + '</td>';
//         searchResult += '<td id="downloads' + key + '"> ' + jsonFSR[videoname][key]['downloads'] + '</td>';
//         searchResult += '<td id="cost' + key + '"> ' + jsonFSR[videoname][key]['cost'] + '</td>';
//         searchResult += '<td id="ratings' + key + '"> ' + jsonFSR[videoname][key]['ratings'] + '</td>';
//         searchResult += '<td id="language' + key + '"> ' + jsonFSR[videoname][key]['language'] + '</td>';
//         searchResult += '<td id="subtitle' + key + '"> ' + jsonFSR[videoname][key]['subtitle'] + '</td>';
//         searchResult += '<td id="resolution' + key + '"> ' + jsonFSR[videoname][key]['Resolution'] + '</td>';
//         searchResult += '<td id="filesize' + key + '"> ' + jsonFSR[videoname][key]['filesize'] + '</td>';
//         searchResult += '<td id="videocodec' + key + '"> ' + jsonFSR[videoname][key]['videocodec'] + '</td>';
//         searchResult += '<td id="audiocodec' + key + '"> ' + jsonFSR[videoname][key]['audiocodec'] + '</td>';
//         searchResult += '<td id="videobitrate' + key + '"> ' + jsonFSR[videoname][key]['bitrate'] + '</td>';
//         searchResult += '</tr>';
//     }
//     $('#tbodyDetails').append(searchResult);
// }