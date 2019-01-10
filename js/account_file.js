
var x = document.getElementById('completedFiles');
x.style.display = "none"

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