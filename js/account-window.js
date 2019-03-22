const {ipcRenderer} = require('electron');
const Store = require('electron-store');
const store = new Store();

document.getElementById('btnIncomingTx').style.color = '#818181';
document.getElementById('btnOutcomingTx').style.color = '#818181';


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
    let spentavx = 0.0;
    let earnedavx = 0.0;
    spentavx = parseFloat(walletData['wallet_data']['spent']);
    earnedavx = parseFloat(walletData['wallet_data']['earned']);
    document.getElementById('walletBalance').innerHTML = avxTokens;
    document.getElementById('spentavx').innerHTML = spentavx;
    document.getElementById('earnedavx').innerHTML = earnedavx;
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

//Request for account transaction history
var holder = store.get('boolean-transaction-history');
store.delete('boolean-transaction-history');

if( holder ) {

    let accHistory = {
        status : 1124
    };
    accHistory = JSON.stringify(accHistory);
    ipcRenderer.send('request-account-history', accHistory);
}

holder = false;
//Load Data to populate tables


// 1124 all transactions but will be requested only once

// 1134 add transaction data

// 1132 update transaction status


//1124 Get transaction history
var accountTx;
ipcRenderer.on('response-acc-history-display', (event, arg) => {
    accountTx = arg;
    let txRecord = [];

    for ( var key in accountTx['data']) {

        txRecord[key] = [];

        for (var status in accountTx['data'][key]) {

            for (var i in accountTx['data'][key][status]) {

                if (accountTx['data'][key][status] && accountTx['data'][key][status][i]) {

                    txRecord[key][status] += '<tr>';

                    if( key == "0" ) {

                        txRecord[key][status] += '<td id="' + accountTx['data'][key][status][i][5] + '">Pending</td>';
                    
                    } else if( key == "1") {

                        txRecord[key][status] += '<td id="' + accountTx['data'][key][status][i][5] + '">Verified</td>';
                    }
                    txRecord[key][status] += '<td>' + accountTx['data'][key][status][i][4] + '</td>';
                    txRecord[key][status] += '<td>' + accountTx['data'][key][status][i][0] +'</td>';
                    txRecord[key][status] += '<td>' + accountTx['data'][key][status][i][1] +'</td>';
                    txRecord[key][status] += '<td>Description Message Sample</td>';
                    txRecord[key][status] += '<td>' + accountTx['data'][key][status][i][2] + '</td>';
                    txRecord[key][status] += '<td>' + accountTx['data'][key][status][i][3] + '</td>';
                    txRecord[key][status] += '<td>' + accountTx['data'][key][status][i][5] + '</td>';
                    txRecord[key][status] += '</tr>';
                }
            }
        }
    }
    

    ipcRenderer.send('save-account-history', accountTx);

    $('#incoming tbody').html(txRecord["0"]["in"] + txRecord["1"]["in"]);
    $('#outgoing tbody').html(txRecord["0"]["out"] + txRecord["1"]["out"]);
    $('#merged tbody').html(txRecord["0"]["in"] + txRecord["1"]["in"] + txRecord["0"]["out"] + txRecord["1"]["out"]);
});
//1124 Populate screen - account history


    // response of 1132 - update transaction status
    ipcRenderer.on('wallet-update-history', (event,arg) => {

        if(arg['data']) {

            var targetTx = arg['tx_hash'];

            //document.getElementById(targetTx).innerHTML = "Verified";
            $("#" + targetTx).html("Verified");
        }
    });

    // response of 1134 - add transaction status
    ipcRenderer.on('add-transaction-history', (event,arg) => {
        let jData = arg;
        arg.out = {};
        var txRecordTemp = [];
        console.log(arg);

        if (arg['out'] != "") {
            for( var key in arg['out']) {
                    txRecordTemp['out'][key] += '<tr>';
                    txRecordTemp['out'][key] += '<td id="' + arg['out'][0][5] + '">Pending</td>';
                    txRecordTemp['out'][key] += '<td id="' + arg['out'][0][4] + '"></td>';
                    txRecordTemp['out'][key] += '<td id="' + arg['out'][0][0] + '"></td>';
                    txRecordTemp['out'][key] += '<td id="' + arg['out'][0][1] + '"></td>';
                    txRecordTemp['out'][key] += '<td>Description Message Sample</td>';
                    txRecordTemp['out'][key] += '<td id="' + arg['out'][0][2] + '"></td>';
                    txRecordTemp['out'][key] += '<td id="' + arg['out'][0][3] + '"></td>';
                    txRecordTemp['out'][key] += '<td id="' + arg['out'][0][5] + '"></td>';
                    txRecordTemp['out'][key] += '</tr>';
            }
        }

        if( arg['in'] != "") {
            for( var key in arg['in']) {
                txRecordTemp['in'][key] += '<tr>';
                txRecordTemp['in'][key] += '<td id="' + arg['data'][0][5] + '">Pending</td>';
                txRecordTemp['in'][key] += '<td id="' + arg['data'][0][4] + '"></td>';
                txRecordTemp['in'][key] += '<td id="' + arg['data'][0][0] + '"></td>';
                txRecordTemp['in'][key] += '<td id="' + arg['data'][0][1] + '"></td>';
                txRecordTemp['in'][key] += '<td>Description Message Sample</td>';
                txRecordTemp['in'][key] += '<td id="' + arg['data'][0][2] + '"></td>';
                txRecordTemp['in'][key] += '<td id="' + arg['data'][0][3] + '"></td>';
                txRecordTemp['in'][key] += '<td id="' + arg['data'][0][5] + '"></td>';
                txRecordTemp['in'][key] += '</tr>';
            }
        }


        $('#incoming tbody').append(txRecordTemp["in"]);
        $('#outgoing tbody').append(txRecordTemp["out"]);

    });
    
    