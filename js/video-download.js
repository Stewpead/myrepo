
$('#btnBuy').click(function() {
    ipcRenderer.send('popBuy', 'popup_medium_window.html');
});
$("#btnBack").click(function() {
    location.href = 'video-details.html';
});