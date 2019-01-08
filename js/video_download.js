
$('#btnBuy').click(function() {
    ipcRenderer.send('popBuy', 'popup_medium_window.html');
});