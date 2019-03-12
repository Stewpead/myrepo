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
var avxTokens = 0.0;
var jdata = {
    status: 1130
};

///////////////////////=================================================================================================================
 jdata = JSON.stringify(jdata);
 ipcRenderer.send('get-wallet-data', jdata);
// Real time wallet data retrieval
ipcRenderer.on('avx-wallet-data', (event, arg) => {
    walletData = arg; 
    console.log(walletData);
    $('.WaddressAccountWindow').html(walletData['wallet_data']['public_key']);
    avxTokens = parseFloat(walletData['wallet_data']['balance']);
    document.getElementById('walletBalance').innerHTML = avxTokens;
});

setTimeout( () => {
    $('.Waddress').html(walletData['wallet_data']['public_key']);
    $('.total-balance').html(walletData['wallet_data']['balance']);
}, 100);

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
    $('.Waddress').html(walletData['wallet_data']['public_key']);
    $('.total-balance').html(walletData['wallet_data']['balance']);
    $("#avxquantity, #receiver, .wallet-info textarea").val("");
    
});

$('#a1').click(function () {

    document.getElementById('decimalPlace').innerText = "1";

    let avxbalance = avxTokens;

    avxbalance = parseFloat(avxbalance).toFixed(1);

    document.getElementById('walletBalance').innerHTML = avxbalance;

});

$('#a2').click(function () {

    document.getElementById('decimalPlace').innerHTML = "2";
    let avxbalance = avxTokens;

    avxbalance = parseFloat(avxbalance).toFixed(2);

    document.getElementById('walletBalance').innerHTML = avxbalance;

});

$('#a3').click(function () {

    document.getElementById('decimalPlace').innerHTML = "3";

    let avxbalance = avxTokens;

    avxbalance = parseFloat(avxbalance).toFixed(3);

    document.getElementById('walletBalance').innerHTML = avxbalance;
    
});

$('#a4').click(function () {

    document.getElementById('decimalPlace').innerHTML = "4";

    let avxbalance = avxTokens;

    avxbalance = parseFloat(walletData['wallet_data']['balance']).toFixed(4);
    
    avxbalance = avxbalance.toString();

    document.getElementById('walletBalance').innerHTML = avxbalance;

});

$('#a5').click(function () {

    document.getElementById('decimalPlace').innerHTML = "5";

    let avxbalance = avxTokens;

    avxbalance = parseFloat(walletData['wallet_data']['balance']).toFixed(5);
    
    avxbalance = avxbalance.toString();

    document.getElementById('walletBalance').innerHTML = avxbalance;

});


$('#a6').click(function () {

    document.getElementById('decimalPlace').innerHTML = "6";

    let avxbalance = avxTokens;

    avxbalance = parseFloat(walletData['wallet_data']['balance']).toFixed(6);
    
    avxbalance = avxbalance.toString();

    document.getElementById('walletBalance').innerHTML = avxbalance;

});

$('#a7').click(function () {

    document.getElementById('decimalPlace').innerHTML = "7";

    let avxbalance = avxTokens;

    avxbalance = parseFloat(walletData['wallet_data']['balance']).toFixed(7);
    
    avxbalance = avxbalance.toString();

    document.getElementById('walletBalance').innerHTML = avxbalance;

});

$('#a8').click(function () {

    document.getElementById('decimalPlace').innerHTML = "8";

    let avxbalance = avxTokens;

    avxbalance = parseFloat(walletData['wallet_data']['balance']).toFixed(8);
    
    avxbalance = avxbalance.toString();

    document.getElementById('walletBalance').innerHTML = avxbalance;

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

