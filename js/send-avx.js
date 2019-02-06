const {ipcRenderer} = require('electron');
var json1 = {};
json1.data = {};
var jsonString1;
var javascriptObject1;
var jasonString1;

$('#btnSendtoken').click( function () {
    json1.status = 1115;
    var amountt = document.getElementById('avxquantity').value;
    json1.data.sender = "0";
    json1.data.receiver = document.getElementById('receiver').value;
    json1.data.amount = parseInt(amountt);
    json1.data.type = "1";
    jsonString1 = JSON.stringify(json1);
    javascriptObject1 = $.parseJSON(jsonString1);
    jasonString1 = JSON.stringify(javascriptObject1);
    console.log(jasonString1);
    ipcRenderer.send('send-token',jasonString1);
}

);

 function getdetails() {
     var avx;
     var waddress;
    ipcRenderer.send('sendingavx', avx, waddress);

    ipcRenderer.on('sendingavx', (event, arg1, arg2) => {
        document.getElementById("walletbalance").innerHTML = arg1;
        document.getElementById("walletaddress").innerHTML = arg2;
    });
 }

 $('#btnSend').click(function() {
    ipcRenderer.send('popup','send-complete.html');
    // alert('sent');
 });