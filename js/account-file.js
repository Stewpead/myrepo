const {ipcRenderer} = require('electron');


var x = document.getElementById('completedFiles');
x.style.display = "none";

var fileDownloadList = {};


$(document).ready( () => {
    let jMessage = {
        status : 5003
    };
    jMessageD = JSON.stringify(jMessage);
	
	
		
	jMessage = {
		status : 5006
	};
	jMessageU = JSON.stringify(jMessage);
	
	setInterval(function(){
		ipcRenderer.send('request-filetransfer-stats', jMessageD);
		ipcRenderer.send('request-sourcing-stat', jMessageU);
	}, 2000);
    
});

ipcRenderer.on('receive-filetransfer-stats', (event, arg) => {
    console.log(JSON.stringify(arg));
	//console.log( Object.keys(arg).length );
	let fn  = arg["filename"];

	//if (!fileDownloadList[fn]) {
		fileDownloadList[fn] = {
			data_rate: arg["data_rate"],
			progress: arg["progress"],
			peers: arg["peers"]
		};
	//}

	let row = '';

	for (var key in fileDownloadList) {
		row += '<tr>';
		row += '<th scope="row"></th>';
		row += '<td id="stat-filename" >' + key + '</td>';
		row += '<td><div id="stat-datarate">' + fileDownloadList[key].data_rate + '</div></td>';
		row += '<td>';
		row += '<div class="container">';
		row += '<span class="progress-label">'+fileDownloadList[key].progress.toFixed(2) + "%"+'</span>';
		row += '<div class="progress">';
		row += '<div id="stat-progress" class="progress-bar bg-success" style="width:'+ fileDownloadList[key].progress +'%" id="prog-bar" role="progressbar" aria-valuemin="0" aria-valuenow="'+ fileDownloadList[key].progress +'" aria-valuemax="100">';
		row += '</div>';
		row += '</div>';
		row += '</div>';
		row += '</td>';
		row += '<td><div id="stat-peers"> ' + fileDownloadList[key].peers + '</div></td>';
		row += '<td class="action-col" id="action-col-id-1">';
		row += '<a href="#"><span class="icon-segoe segoe-v-player">&nbsp;</span></a>';
		row += '<a href="#"> <span class="mdi mdi-pause">&nbsp;</span></a>';
		row += '<a href="#"> <span class="mdi mdi-trash-can-outline">&nbsp;</span></a>';
		row += '<a href="#"> <span class="mdi mdi-file-remove">&nbsp;</span></a>';
		row += '</td>';
		row += '</tr>';
	}
	
	$("#dtVerticalScroll tbody").html(row);
	console.log('true');
	
	/*else {
		for (var key in fileDownloadList) {
			$("#stat-filename").html(key);
			$("#stat-datarate").html(fileDownloadList[key].data_rate);
			$("#stat-progress").attr("style", "width: " + fileDownloadList[key].progress + "%");
			$("#stat-progress").attr("aria-valuenow", fileDownloadList[key].progress );
			$(".progress-label").html(fileDownloadList[key].progress.toFixed(2) + "%");
			$("#stat-peers").html(fileDownloadList[key].peers);
		}
	}*/
	
	
	
});

ipcRenderer.on('receive-sourcing-stat', (event, arg) => {
   // console.log(arg);

	let fn  = arg["data"];


	let row = '';
	fileDownloadList= [];
	for ( key in fn) {
		let fndata  = fn[key]["filename"];
		
		if ( typeof fileDownloadList[fndata] == "undefined" ) {
			fileDownloadList[fndata] = {
				assetkey: fn[key]['assetkey'],
				hoarders :  1
			};
		} else {
			fileDownloadList[fndata] = {
				assetkey: fn[key]['assetkey'],
				hoarders :  parseInt(fileDownloadList[fndata]['hoarders']) + 1
			};
		}

	}


	for (var keyList in fileDownloadList) {
		row += '<tr>';
		row += '<th scope="row"></th>';
		row += '<td id="stat-filename" >' + keyList + '</td>';
		row += '<td id="stat-filename" >' + fileDownloadList[keyList].hoarders + '</td>';
		row += '<td>';
		row += '<div class="progress">';
		row += '<div id="stat-progress" class="progress-bar bg-success" style="width:100%" id="prog-bar" role="progressbar" aria-valuemin="0" aria-valuenow="100%" aria-valuemax="100">';
		row += 'Sharding...';
		row += '</div>';
		row += '</td>';

		row += '</tr>';
	}
	
	$("#activeFiles #tables tbody").html(row);

	
});
document.getElementById('activeFiles').style.display = "block";
document.getElementById('DDetails').style.display = "block";
document.getElementById("DFiles").style.display = "none";
document.getElementById("DPeers").style.display = "none";
document.getElementById("DSpeed").style.display = "none";

$('#btnHideCF').click( () => {
    document.getElementById('activeFiles').style.display = "block";
    document.getElementById("completedFiles").style.display = "none";
});
$('#btnHideAF').click(() => {
    document.getElementById("activeFiles").style.display = "none";
    document.getElementById("completedFiles").style.display = "block";
});

$('#viewDD').click(() => {
    document.getElementById('DDetails').style.display = "block";
    document.getElementById("DFiles").style.display = "none";
    document.getElementById("DPeers").style.display = "none";
    document.getElementById("DSpeed").style.display = "none";  
})
$('#viewDFiles').click(() => {
    document.getElementById('DDetails').style.display = "none";
    document.getElementById("DFiles").style.display = "block";
    document.getElementById("DPeers").style.display = "none";
    document.getElementById("DSpeed").style.display = "none";
});
$('#viewDPeers').click(() => {
    document.getElementById('DDetails').style.display = "none";
    document.getElementById("DFiles").style.display = "none";
    document.getElementById("DPeers").style.display = "block";
    document.getElementById("DSpeed").style.display = "none";
});
$('#viewDspeed').click(() => {
    document.getElementById('DDetails').style.display = "none";
    document.getElementById("DFiles").style.display = "none";
    document.getElementById("DPeers").style.display = "none";
    document.getElementById("DSpeed").style.display = "block";
});

