const {ipcRenderer} = require('electron');
const Store = require('electron-store');
const store = new Store();

document.getElementById('btnIncomingTx').style.color = '#818181';
document.getElementById('btnOutcomingTx').style.color = '#818181';


var counter;
 
var jsonString1;
var javascriptObject1;
var jasonString1;
// tbJsonMerge.incoming.verified = {};
// tbJsonMerge.incoming.Unverified = {};
// tbJsonMerge.outgoing.verified = {};
// tbJsonMerge.outgoing.Unverified = {};
// jsonString1 = JSON.stringify(json1);
// javascriptObject1 = $.parseJSON(jsonString1);
// jasonString1 = JSON.stringify(javascriptObject1);
// var temp = "awe";
/* <th scope="row"></th>
<td id="mstatus10"></td>
<td id="mdate10"></td>
<td id="mtime10"></td>
<td id="mfrom10"></td>
<td id="mto10"></td>
<td id="mdescrip10"></td>
<td id="mamount10"></td>
<td id="mtransacID10"></td> */

var mstatus = "mstatus";
var mdate = "mdate";
var mtime = "mtime";
var mfrom = "mfrom";
var mto = "mto";
var mdescrip = "mdescrip";
var mamount = "mamount";
var mtransacID = "mtransacID";
var walletData = {};
walletData.wallet_data = {};

var jdata = {
    status: 1130
};

///////////////////////=================================================================================================================
 jdata = JSON.stringify(jdata);
 ipcRenderer.send('get-wallet-data', jdata);

ipcRenderer.on('avx-wallet-data', (event, arg) => {
    walletData = arg;
    console.log(walletData);
    $('.Waddress').html(walletData['wallet_data']['public_key']);
    document.getElementById('walletBalance').innerHTML = walletData['wallet_data']['balance'];
});


$(document).ready(function () {

    $('#btnMergeTx').click();

});

$('#btnMergeTx').click(() => {
    document.getElementById('btnMergeTx').style.color = 'white';
    document.getElementById('btnIncomingTx').style.color = '#818181';
    document.getElementById('btnOutcomingTx').style.color = '#818181';
});
$('#btnIncomingTx').click(() => {
    document.getElementById('btnIncomingTx').style.color = 'white';
    document.getElementById('btnMergeTx').style.color = '#818181';
    document.getElementById('btnOutcomingTx').style.color = '#818181';
});
$('#btnOutcomingTx').click(() => {
    document.getElementById('btnOutcomingTx').style.color = 'white';
    document.getElementById('btnMergeTx').style.color = '#818181';
    document.getElementById('btnIncomingTx').style.color = '#818181';
});



$('#btnSend').click(function() {
	$('[pd-popup="accountSendToModal"]').fadeIn(100);
	$("#avxquantity, #receiver, .wallet-info textarea").val("");
	$('#btnSendtoken').removeAttr("disable");

   //ipcRenderer.send('send-avx','send-token.html');
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

