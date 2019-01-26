const {ipcRenderer} = require('electron');


$('#btnOkay').click( () => {
    ipcRenderer.send('file-scan-result', 'file-scan-result.html');
    this.close();
});
$('#btnOkay2').click( () => {
    ipcRenderer.send('file-scan-result', 'file-owner-confirmation.html');
    this.close();
});
$('#btnOkay3').click( () => {
    location.href = "account-window-files.html";
    this.close();
});

// Close when uploadin is completed
var executeClose = ipcRenderer.sendSync('avx-share-upload-file-finish', uploadFile);
if (executeClose == true) {
	$('#btnConfirm').close();
}
	

// $('#btnConfirm').click( () => {
//     this.close();
// });