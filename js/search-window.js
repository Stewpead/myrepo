$("#btnSearch").click( function() {
    location.href = 'search-detailed.html';
});

$('#linkMain').click(function() {
    ipcRenderer.send('main','search');
});

$('#linkAccount').click(function() {
    ipcRenderer.send('account','search');
});

$('#linkShare').click(function() {
    ipcRenderer.send('share','search');
});