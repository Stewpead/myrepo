// $('#bg > .page-content-wrapper');
loadimg();

$('#linkAccount').click(function () {
    ipcRenderer.send('account','main');
});

$('#linkSearch').click(function() {
    ipcRenderer.send('search','main');
});

$('#linkShare').click(function() {
    ipcRenderer.send('share','main');
});
$('content-main').parent('#bg');

