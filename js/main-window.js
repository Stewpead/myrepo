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
<<<<<<< HEAD
$('.content-main').parent('#bg');

$('#btnFirst').click( () => {
    location.href = "video-details.html";
});

$('#btnSignout').click( () => {
    location.href = "login-window.html";
    // this.
});
=======
$('content-main').parent('#bg');

>>>>>>> c7c64c37bb9f0795efb7feab0d94daeec0359f38
