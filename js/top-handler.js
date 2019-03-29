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
