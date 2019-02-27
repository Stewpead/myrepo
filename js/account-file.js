const {ipcRenderer} = require('electron');


var x = document.getElementById('completedFiles');
x.style.display = "none";

var fileDownloadList = {};


$(document).ready( () => {
    let jMessage = {
        status : 5003
    };
    jMessage = JSON.stringify(jMessage);
	
	setInterval(function(){
		ipcRenderer.send('request-filetransfer-stats', jMessage);
		
	}, 2000);
    
});

ipcRenderer.on('receive-filetransfer-stats', (event, arg) => {
    console.log(JSON.stringify(arg));
	let fn  = arg["filename"];
	
	if (!fileDownloadList[fn]) {
		fileDownloadList[fn] = {
			data_rate: arg["data_rate"],
			progress: arg["progress"],
			peers: arg["peers"]
		};
		
		let row = '';
	
		for (var key in fileDownloadList) {
			row += '<tr>';
			row += '<th scope="row"></th>';
			row += '<td id="stat-filename" >' + key + '</td>';
			row += '<td><div id="stat-datarate">' + fileDownloadList[key].data_rate + '</div></td>';
			row += '<td>';
			row += '<div class="container">';
			row += '<div class="progress">';
			row += '<div id="stat-progress" class="progress-bar bg-success" style="width:'+ fileDownloadList[key].progress +'%" id="prog-bar" role="progressbar" aria-valuemin="0" aria-valuenow="'+ fileDownloadList[key].progress +'" aria-valuemax="100">';
			row += '</div><p>sss</p>';
			row += '</div>';
			row += '</div>';
			row += '</td>';
			row += '<td><div id="stat-peers"> ' + fileDownloadList[key].peers + '</div></td>';
			row += '<td class="action-col" id="action-col-id-1">';
			row += '<a href="#"><span class="mdi mdi-play">&nbsp;</span></a>';
			row += '<a href="#"> <span class="mdi mdi-pause">&nbsp;</span></a>';
			row += '<a href="#"> <span class="mdi mdi-trash-can-outline">&nbsp;</span></a>';
			row += '<a href="#"> <span class="mdi mdi-file-remove">&nbsp;</span></a>';
			row += '</td>';
			row += '</tr>';
		}
		
		$("#dtVerticalScroll tbody").append(row);
	} else {
		fileDownloadList[fn] = {
			data_rate: arg["data_rate"],
			progress: arg["progress"],
			peers: arg["peers"]
		};
		
		$("#stat-filename").html(fn);
		$("#stat-datarate").html(fileDownloadList[fn].data_rate);
		$("#stat-progress").attr("style", "width: "+fileDownloadList[fn].progress + "%");
		$("#stat-progress").attr("aria-valuenow", fileDownloadList[fn].progress );
		$("#stat-progress p").html(fileDownloadList[fn].progress);
		$("#stat-peers").html(fileDownloadList[fn].peers);
	}
	
	
	
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

