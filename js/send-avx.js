const {ipcRenderer} = require('electron');
function sendAVX() {
    json2.status = 555;
    json2.txType = 0;
    json2.filename = "";
    json2.price = 0;
    json2.assetname = "";
    json2.publicKey = document.getElementById("walletaddress").value
    var amountt = document.getElementById('avxquantity').value;
    json2.amount = parseInt(amountt);
    json2.receiver = document.getElementById('receiver').value;
    jsonString2 = JSON.stringify(json2);
    javascriptObject2 = $.parseJSON(jsonString2);
    jasonString2 = JSON.stringify(javascriptObject2);
    ipcRenderer.send('sendAVX',jasonString2);
 }

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
    alert('awdawdaw');
 });