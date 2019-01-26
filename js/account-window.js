const {ipcRenderer} = require('electron');


$('#btnSend').click(function() {
   ipcRenderer.send('send-avx','send-token.html');
});

$('#linkMain').click(function() {
    ipcRenderer.send('main','account');
});

$('#linkSearch').click(function() {
    ipcRenderer.send('search','account');
});

$('#linkShare').click(function() {
    ipcRenderer.send('share','account');
});

$('#a1').click(function () {
    document.getElementById('dropdownMenuButton').innerHTML = "1";
    var avxbalance;
    avxbalance = (document.getElementById('totalBalance').innerText)
    avxbalance.toInt64;
    alert(avxbalance);
    avxbalance.toFixed(3);
    alert("Balance: " + avxbalance);
    document.getElementById('totalBalance').innerHTML = avxbalance;
});
$('#a2').click(function () {
    document.getElementById('dropdownMenuButton').innerHTML = "2";
    var avxbalance;
    avxbalance = document.getElementById('totalBalance').innerHTML;
    alert(avxbalance);
    avxbalance.toFixed(2);
    alert(avxbalance);
    document.getElementById('totalBalance').innerHTML = avxbalance;
});
$('#a3').click(function () {
    document.getElementById('dropdownMenuButton').innerHTML = "3";
    var avxbalance;
    avxbalance = (document.getElementById('totalBalance').value)
    avxbalance.parseFloat.toFixed(3);
    alert("Balance: " + avxbalance);
    document.getElementById('totalBalance').innerHTML = avxbalance;
});
$('#a4').click(function () {
    document.getElementById('dropdownMenuButton').innerHTML = "4";
    var avxbalance;
    avxbalance = (document.getElementById('totalBalance').value)
    avxbalance.toFixed(4);
    alert(avxbalance);
    document.getElementById('totalBalance').innerHTML = avxbalance;
});

$(document).ready(function () {
    $('#btnMergeTx').click();
});

$('#btnMergeTx').click(() =>  {
    document.getElementById('merged').style.display = "block";
    document.getElementById("incoming").style.display = "none";
    document.getElementById('outgoing').style.display = "none";

});
$('#btnIncomingTx').click(() => {
    document.getElementById('incoming').style.display = "block";
    document.getElementById('merged').style.display = "none";
    document.getElementById('outgoing').style.display = "none";
})
$('#btnOutcomingTx').click(() => {
    document.getElementById('incoming').style.display = "none";
    document.getElementById('merged').style.display = "none";
    document.getElementById('outgoing').style.display = "block";
})
