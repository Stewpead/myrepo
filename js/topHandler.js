const $ = require('jquery');
const electron = require('electron');
const { remote } = require('electron');
const {ipcRenderer} = require('electron');
const ipcRender = electron.ipcRenderer;
var win = remote.getCurrentWindow();
// $('body').css('overflow', 'hidden');
$('#minimize').click(function() {
    win.minimize();
});

$('#maximize').click(function() {
if(!win.isMaximized()) {
win.maximize();
}
else
{
    win.unmaximize();
}
});

$('#close').click(function(){
    win.close();
});


