const {ipcRenderer} = require('electron');
$(document).ready(() => {

});

$('#btnOkay').click( () => {
    ipcRenderer.send('file-scan-result', 'file-scan-result.html');
    this.close();
});
$('#btnOkay2').click( () => {
    ipcRenderer.send('file-scan-result', 'file-owner-confirmation.html');
    this.close();
});
$('#btnOkay3').click( () => {
    var stat = {
        status : 1121
    };
    var Jstat = JSON.stringify(stat);
    ipcRenderer.send('checkStatus', Jstat);
    this.close();
});

// Close when uploadin is completed
var executeClose = ipcRenderer.sendSync('avx-share-upload-file-finish', uploadFile);
if (executeClose == true) {
	$('#btnConfirm').close();
}

setTimeout(
  function() 
  {
    $('#btnConfirm').close();
  }, 3000);
	

// $('#btnConfirm').click( () => {
//     this.close();
// });