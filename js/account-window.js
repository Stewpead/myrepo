const {ipcRenderer} = require('electron');
const Store = require('electron-store');
const store = new Store();

document.getElementById('btnIncomingTx').style.color = '#818181';
document.getElementById('btnOutcomingTx').style.color = '#818181';


var walletData = {};
walletData.wallet_data = {};
var avxTokens = 0.0;


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
// var holder = store.get('boolean-transaction-history');
// store.delete('boolean-transaction-history');

// if( holder ) {

    
// }


//Wallet Data - 1130
var jdata = {
    status: 1130
};
 jdata = JSON.stringify(jdata);
 ipcRenderer.send('get-wallet-data', jdata);
//Wallet Data - 1130

//Account History - 1124
let accHistory = {
    status : 1124
};
accHistory = JSON.stringify(accHistory);
ipcRenderer.send('request-account-history', accHistory);
//Account History - 1124

// 1124 all transactions but will be requested only once

// 1134 add transaction data

// 1132 update transaction status

//1124 receive transaction history
var accountTx;
ipcRenderer.on('response-acc-history-display', (event, arg) => {
    accountTx = arg;
    let txRecord = [];

    for ( var key in arg['data']) {

        txRecord[key] = [];

        for (var status in arg['data'][key]) {

            for (var i in arg['data'][key][status]) {

                if (arg['data'][key][status] && arg['data'][key][status][i]) {

                    txRecord[key][status] += '<tr>';

                    if( key == "0" ) {

                        txRecord[key][status] += '<td class="' + arg['data'][key][status][i][5] + '">Pending</td>';
                    
                    } else if( key == "1") {

                        txRecord[key][status] += '<td class="' + arg['data'][key][status][i][5] + '">Verified</td>';
                    }
                    txRecord[key][status] += '<td>' + arg['data'][key][status][i][4] + '</td>';
                    txRecord[key][status] += '<td>' + arg['data'][key][status][i][0] +'</td>';
                    txRecord[key][status] += '<td>' + arg['data'][key][status][i][1] +'</td>';
                    txRecord[key][status] += '<td>Description Message Sample</td>';
                    txRecord[key][status] += '<td>' + arg['data'][key][status][i][2] + '</td>';
                    txRecord[key][status] += '<td>' + arg['data'][key][status][i][3] + '</td>';
                    txRecord[key][status] += '<td>' + arg['data'][key][status][i][5] + '</td>';
                    txRecord[key][status] += '</tr>';
                }
            }
        }
    }
    

    ipcRenderer.send('save-account-history', arg);

    $('#incoming tbody').html(txRecord["0"]["in"] + txRecord["1"]["in"]);
    $('#outgoing tbody').html(txRecord["0"]["out"] + txRecord["1"]["out"]);
    $('#merged tbody').html(txRecord["0"]["in"] + txRecord["1"]["in"] + txRecord["0"]["out"] + txRecord["1"]["out"]);
});
//1124 Populate screen - account history


    // response of 1132 - update transaction status
    ipcRenderer.on('wallet-update-history', (event,arg) => {

        if(arg['tx_hash']) {

            var targetTx = arg['tx_hash'];
            $( "#mergeTable td:contains('" + targetTx +"')" ).parent().find('td:eq(0)').html('Verified');


        }
    });

    // response of 1134 - add transaction status
    ipcRenderer.on('add-transaction-history', (event,arg) => {
        let jData = arg;
        arg.out = {};
        var txRecordTemp = [];
        console.log(arg);

        for( var status in arg['data']) {

            txRecordTemp[status] = [];

                txRecordTemp[status]['0'] += '<tr>';
                txRecordTemp[status]['0'] += '<td class="' + arg['data'][status][5] + '">Pending</td>';
                txRecordTemp[status]['0'] += '<td>' + arg['data'][status][4] + '</td>';
                txRecordTemp[status]['0'] += '<td>' + arg['data'][status][0] + '</td>';
                txRecordTemp[status]['0'] += '<td>' + arg['data'][status][1] + '</td>';
                txRecordTemp[status]['0'] += '<td>Description Message Sample</td>';
                txRecordTemp[status]['0'] += '<td>' + arg['data'][status][2] + '</td>';
                txRecordTemp[status]['0'] += '<td>' + arg['data'][status][3] + '</td>';
                txRecordTemp[status]['0'] += '<td>' + arg['data'][status][5] + '</td>';
                txRecordTemp[status]['0'] += '</tr>';

        }

        $('#outgoing tbody').append(txRecordTemp["out"]);
        $('#incoming tbody').append(txRecordTemp["in"]);
        $('#merged tbody').append(txRecordTemp["out"] + txRecordTemp["in"]);

    });
    



                // if(status == "out") {
            //     for( var key in arg['data'][status]) {

            //     }
        //     } else if (status == "in") {
        //         txRecordTemp[status][key] += '<tr>';
        //         txRecordTemp[status][key] += '<td id="' + arg['data'][status][key][5] + '">Pending</td>';
        //         txRecordTemp[status][key] += '<td>' + arg['data'][status][key][4] + '</td>';
        //         txRecordTemp[status][key] += '<td>' + arg['data'][status][key][0] + '</td>';
        //         txRecordTemp[status][key] += '<td>' + arg['data'][status][key][1] + '</td>';
        //         txRecordTemp[status][key] += '<td>Description Message Sample</td>';
        //         txRecordTemp[status][key] += '<td>' + arg['data'][status][key][2] + '</td>';
        //         txRecordTemp[status][key] += '<td>' + arg['data'][status][key][3] + '</td>';
        //         txRecordTemp[status][key] += '<td>' + arg['data'][status][key][5] + '</td>';
        //         txRecordTemp[status][key] += '</tr>';  
        //     }
        // }

        // for( var status in arg) {
        //     if (arg[status] != "") {
        //         for( var key in arg['out']) {
        //                 txRecordTemp['out'][key] += '<tr>';
        //                 txRecordTemp['out'][key] += '<td id="' + arg['out'][key][5] + '">Pending</td>';
        //                 txRecordTemp['out'][key] += '<td>' + arg['out'][key][4] + '</td>';
        //                 txRecordTemp['out'][key] += '<td>' + arg['out'][key][0] + '</td>';
        //                 txRecordTemp['out'][key] += '<td>' + arg['out'][key][1] + '</td>';
        //                 txRecordTemp['out'][key] += '<td>Description Message Sample</td>';
        //                 txRecordTemp['out'][key] += '<td>' + arg['out'][key][2] + '</td>';
        //                 txRecordTemp['out'][key] += '<td>' + arg['out'][key][3] + '</td>';
        //                 txRecordTemp['out'][key] += '<td>' + arg['out'][key][5] + '</td>';
        //                 txRecordTemp['out'][key] += '</tr>';
        //         }
        //     }
        //     if( arg[status] != "") {
        //         for( var key in arg['in']) {
        //             txRecordTemp['in'][key] += '<tr>';
        //             txRecordTemp['in'][key] += '<td id="' + arg['in'][key][5] + '">Pending</td>';
        //             txRecordTemp['in'][key] += '<td>' + arg['in'][key][4] + '</td>';
        //             txRecordTemp['in'][key] += '<td>' + arg['in'][key][0] + '</td>';
        //             txRecordTemp['in'][key] += '<td>' + arg['in'][key][1] + '</td>';
        //             txRecordTemp['in'][key] += '<td>Description Message Sample</td>';
        //             txRecordTemp['in'][key] += '<td>' + arg['in'][key][2] + '</td>';
        //             txRecordTemp['in'][key] += '<td>' + arg['in'][key][3] + '</td>';
        //             txRecordTemp['in'][key] += '<td>' + arg['in'][key][5] + '</td>';
        //             txRecordTemp['in'][key] += '</tr>';
        //         }
        //     }
        // }
