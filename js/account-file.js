const {ipcRenderer} = require('electron');


var x = document.getElementById('completedFiles');
x.style.display = "none";

var fileDownloadList = {};
var fileDownloadListFileReceive = {};
var g_id;


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
		// ipcRenderer.send('request-sourcing-stat', jMessageU);
		getDownloadDetails(g_id);
	}, 2000);
	
	
	// fileDownloadList['fn1'] = {
	// 	data_rate: 80,
	// 	progress: 20,
	// 	peers: 2,
	// 	time_elapsed: 1000,
	// 	downloaded: 300000,
	// 	is_complete: 0,
	// 	remaining_time: 500
	// };

	// fileDownloadList['fn2'] = {
	// 	data_rate: 70,
	// 	progress: 40,
	// 	peers: 1,
	// 	time_elapsed: 2000,
	// 	downloaded: 305500,
	// 	is_complete: 0,
	// 	remaining_time: 650
	// };

	// let row = '';
	// for (var key in fileDownloadList) {
	// 	row += '<tr>';
	// 	row += '<th scope="row"></th>';
	// 	row += '<td id="' + key +'" >' + key + '</td>';
	// 	row += '<td><div id="stat-datarate">' + fileDownloadList[key].data_rate + '</div></td>';
	// 	row += '<td>';
	// 	row += '<div class="container">';
	// 	row += '<span class="progress-label">'+fileDownloadList[key].progress.toFixed(2) + "%"+'</span>';
	// 	row += '<div class="progress">';
	// 	row += '<div id="stat-progress" class="progress-bar bg-success" style="width:'+ fileDownloadList[key].progress +'%" id="prog-bar" role="progressbar" aria-valuemin="0" aria-valuenow="'+ fileDownloadList[key].progress +'" aria-valuemax="100">';
	// 	row += '</div>';
	// 	row += '</div>';
	// 	row += '</div>';
	// 	row += '</td>';
	// 	row += '<td><div id="stat-peers"> ' + fileDownloadList[key].peers + '</div></td>';
	// 	row += '<td class="action-col" id="action-col-id-1">';
	// 	row += '<a href="#"><span class="icon-segoe segoe-v-player">&nbsp;</span></a>';
	// 	row += '<a href="#"> <span class="mdi mdi-pause">&nbsp;</span></a>';
	// 	row += '<a href="#"> <span class="mdi mdi-trash-can-outline">&nbsp;</span></a>';
	// 	row += '<a href="#"> <span class="mdi mdi-file-remove">&nbsp;</span></a>';
	// 	row += '</td>';
	// 	row += '</tr>';
	// }


});

ipcRenderer.on('receive-filetransfer-stats', (event, arg) => {

    console.log(JSON.stringify(arg));

	let fn  = arg["filename"];
	if (typeof g_id == 'undefined') g_id = fn;

	fileDownloadList[fn] = {
		data_rate: arg["data_rate"],
		progress: arg["progress"],
		peers: arg["peers"],
		time_elapsed: arg["time_elapsed"],
		downloaded: arg["downloaded"],
		is_complete: arg["is_complete"],
		remaining_time: arg["remaining_time"]
	};

	let row = '';

	for (var key in fileDownloadList) {
		row += '<tr>';
		row += '<th scope="row"></th>';
		row += '<td id="' + key +'" >' + key + '</td>';
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


	$('#dtVerticalScroll tbody tr').on('click', function() {
		g_id = $("td:eq(0)", this).attr('id');
		getDownloadDetails(g_id);
	});
	
});




ipcRenderer.on('receive-sourcing-stat', (event, arg) => {
    console.log(arg);

	let fn  = arg["data"];


	let row = '';
	
	/*for (key in fn) {
		let fndata  = fn[key]["filename"];		
		fileDownloadList[fndata] = {
			assetkey: fndata[key]['assetkey'],
			hoarders : fndata[key]['hoarders']
		};

	}*/
	
	for (let i = 0; i < fn.length; ++i) {
		fileDownloadListFileReceive[fn[i].assetkey] = {
			filename: fn[i].filename,
			assetkey: fn[i].assetkey,
			shards : fn[i].shards
		};
	}
	
	console.log(fileDownloadListFileReceive);


	for (var keyList in fileDownloadListFileReceive) {
		row += '<tr>';
		row += '<th scope="row"></th>';
		row += '<td id="stat-filename" >' + fileDownloadListFileReceive[keyList].filename + '</td>';
		row += '<td id="stat-filename" >' + fileDownloadListFileReceive[keyList].shards + '</td>';
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

$('.header-links ul li a#viewDD').addClass('clicked');

$('.header-links ul li a').click( function() {

	$('.header-links ul li a').removeClass("clicked");

	$(this).addClass("clicked");

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

function getDownloadDetails(id) {
	console.log(g_id);
	if (typeof g_id != 'undefined') {
		let status = fileDownloadList[id].is_complete ? 'complete' : 'in progress';

		$('#time-elapse').html(getDuration(fileDownloadList[id].time_elapsed * 1000000));
		
		$('#downloaded-size').html(formatBytes(fileDownloadList[id].downloaded, 2));
		$('#download-speed').html(fileDownloadList[id].data_rate);
		$('#download-status').html(status);
		$('#time-remaining').html(getDuration(fileDownloadList[id].remaining_time * 1000000));
	}
}