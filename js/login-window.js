const {ipcRenderer} = require('electron');

$('#btnLogin').click(() => {
    location.href = 'main-window.html';
    ipcRenderer.send('logindatas','');
});
