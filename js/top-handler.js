// const $ = require('jquery');
const { remote } = require('electron');
var win = remote.getCurrentWindow();

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

$(function(){   
    $(document).keydown(function(objEvent) {        
        if (objEvent.ctrlKey) {          
            if (objEvent.keyCode == 65) {                         

                return false;
            }            
        }        
    });
});  


function limitString(text, count, insertDots){
    return text.slice(0, count) + (((text.length > count) && insertDots) ? "..." : "");
}

function getDuration(microseconds) {
    let seconds = microseconds / 1000000;
    let hour = seconds / 3600;
    let minute = (seconds % 3600) / 60;
    let second = seconds % 60;
    let str = parseInt(hour) + ' : ' + parseInt(minute) + ' : ' + parseInt(second);
    // return str;
    // return str.replace(/(?!\d)(\d):|:(\d)(?!\d)/, "0$1");
    return str.replace(/(?<!\d)(\d)(?!\d)/g, "0$1");
}

/*** 2.4 BYTES BIT VALUE***/
function formatBytes(bytes,decimals) {
    if(bytes == 0) return '0 Bytes';
    var k = 1024,
        dm = decimals <= 0 ? 0 : decimals || 2,
        sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
        i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
 }
 