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
    ipcRenderer.send('file-scan-result', 'file-owner-confirmation.html');
    this.close();
});