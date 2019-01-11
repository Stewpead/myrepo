// $('#bg > .page-content-wrapper');

$('#linkAccount').click(function () {
    ipcRenderer.send('account','main');
});

$('#linkSearch').click(function() {
    ipcRenderer.send('search','main');
});

$('#linkShare').click(function() {
    ipcRenderer.send('share','main');
});