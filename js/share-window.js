const {ipcRenderer} = require('electron');

$('#linkMain').click(function() {
    ipcRenderer.send('main','share');
});

$('#linkAccount').click(function() {
    ipcRenderer.send('account','share');
});

$('#linkSearch').click(function() {
    ipcRenderer.send('search','share');
});

$('#btn-upload-folder').click(function(e) {
    e.preventDefault();
    $('#upload-video-folder:hidden').trigger('click');
});

$('#btnClosetop').click( () => {
    var elementId = "block-top";
    var element = document.getElementById(elementId);
    element.parentNode.removeChild(element);
    document.getElementById('slidenav').style.top = "30px";
    document.getElementById('contentmain').style.marginTop = "91px";

});

var videoFolder = document.getElementById('upload-video-folder');
videoFolder.addEventListener('change',processFile);
var filename;
function processFile(event) {
    var input = event.srcElement;
    filename = input.files[0].name;
    ipcRenderer.send('upload-files','loading-screen-1.html');
}