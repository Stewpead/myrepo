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
   // console.log(walletData);
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


//Request for account transaction history
var holder = store.get('boolean-transaction-history');
// store.delete('boolean-transaction-history');

if( holder ) {

    let accHistory = {
        status : 1124
    };
    accHistory = JSON.stringify(accHistory);
    ipcRenderer.send('request-account-history', accHistory);
}
//Load Data to populate tables

var jHistory = store.get('wallet-tx-history');
console.log(jHistory);
var incomingPending = "";
var incomingVerified = "";
var outgoingPending = "";
var outgoingVerified = "";
    // 1124 all transactions but will be requested only once
    let txRecord = [];

    for ( var key in jHistory['data']) {
		txRecord[key] = [];
        for (var status in jHistory['data'][key]) {
			for (var i in jHistory['data'][key][status]) {
				if (jHistory['data'][key][status] && jHistory['data'][key][status][i]) {
                    txRecord[key][status] += '<tr>';
                    if( key == "0" ) {
                        txRecord[key][status] += '<td id="' + jHistory['data'][key][status][i][5] + '">Pending</td>';
                    } else {
                        txRecord[key][status] += '<td id="' + jHistory['data'][key][status][i][5] + '">Verified</td>';
                    }
					txRecord[key][status] += '<td>' + jHistory['data'][key][status][i][4] + '</td>';
					txRecord[key][status] += '<td>' + jHistory['data'][key][status][i][0] +'</td>';
					txRecord[key][status] += '<td>' + jHistory['data'][key][status][i][1] +'</td>';
					txRecord[key][status] += '<td>Description Message Sample</td>';
					txRecord[key][status] += '<td>' + jHistory['data'][key][status][i][2] + '</td>';
					txRecord[key][status] += '<td>' + jHistory['data'][key][status][i][3] + '</td>';
					txRecord[key][status] += '<td>' + jHistory['data'][key][status][i][5] + '</td>';
                    txRecord[key][status] += '</tr>';
				}
			}
        }
    }
	
	$('#incoming tbody').html(txRecord["0"]["in"] + txRecord["1"]["in"]);
	$('#outgoing tbody').html(txRecord["0"]["out"] + txRecord["1"]["out"]);

    ipcRenderer.on('wallet-update-history', (event,arg) => {
        if(arg['data']) {
            var targetTx = arg['tx_hash'];
            document.getElementById(targetTx).innerHTML = "Verified";
        }
    });


    /*for( var key in jHistory['data']) {

        if( key == "0") {
            switch(jHistory['data'][key]) {
                
                case "in":
                
                    let num1 = jHistory['data'][key]['in'].length;
                    console.log(num1);
                    for (let x1 = 0 ; x1 < num1 ; x1++ ) {
                        incomingPending += '<tr>';
                        incomingPending += '<td id="iPendingStatus"' + x1 + '>Pending</td>';
                        incomingPending += '<td id="iPendingDate"' + x1 + '>' + jHistory['data'][key]['in'].slice(3,4) + '</td>';
                        incomingPending += '<td id="iPendingSender"' + x1 + '>' + jHistory['data'][key]['in'].slice(0) +'</td>';
                        incomingPending += '<td id="iPendingReceiver"' + x1 + '>' + jHistory['data'][key]['in'].slice(1) +'</td>';
                        incomingPending += '<td id="iPendingDescript"' + x1 + '>Description Message Sample</td>';
                        incomingPending += '<td id="iPendingAmount"' + x1 + '>' + jHistory['data'][key]['in'].slice(2) + '</td>';
                        incomingPending += '<td id="iPendingTxFee"' + x1 + '>' + jHistory['data'][key]['in'].slice(3) + '</td>';
                        incomingPending += '<td id="iPendingTxHash"' + x1 + '>' + jHistory['data'][key]['in'].slice(5) + '</td>';
                        incomingPending  += '</tr>';
                    }
                    $('#incoming tbody').html(incomingPending);
                break;

                case "out:":
                    let num2 = jHistory['data'][key]['out'].length;
                        for( let x2 = 0; x2 < num2; x2++ ) {
                            outgoingPending += '<tr>';
                            outgoingPending += '<td id="oPendingStatus"' + x2 + '>Pending</td>';
                            outgoingPending += '<td id="oPendingDate"' + x2 + '>' + jHistory['data'][key]['out'].slice(3,4) + '</td>';
                            outgoingPending += '<td id="oPendingSender"' + x2 + '>' + jHistory['data'][key]['out'].slice(-1,0) +'</td>';
                            outgoingPending += '<td id="oPendingReceiver"' + x2 + '>' + jHistory['data'][key]['out'].slice(0,1) +'</td>';
                            outgoingPending += '<td id="oPendingDescript"' + x2 + '>Description Message Sample</td>';
                            outgoingPending += '<td id="oPendingAmount"' + x2 + '>' + jHistory['data'][key]['out'].slice(1,2) + '</td>';
                            outgoingPending += '<td id="oPendingTxFee"' + x2 + '>' + jHistory['data'][key]['out'].slice(2,3) + '</td>';
                            outgoingPending += '<td id="oPendingTxHash"' + x2 + '>' + jHistory['data'][key]['out'].slice(4,5) + '</td>';
                            outgoingPending  += '</tr>';
                        }
                        $('#outgoing tbody').append(outgoingPending);
                break;
            }


        } else {

            switch(jHistory['data'][key]) {

                case "in":

                        let num3 = jHistory['data'][key]['in'].length;

                        for (let x3 = 0 ; x3 < num3 ; x2++ ) {
                            incomingVerified += '<tr>';
                            incomingVerified += '<td id="iPendingStatus"' + x1 + '>Pending</td>';
                            incomingVerified += '<td id="iPendingDate"' + x1 + '>' + jHistory['data'][key]['in'][x1][4] + '</td>';
                            incomingVerified += '<td id="iPendingSender"' + x1 + '>' + jHistory['data'][key]['in'][x1][0] +'</td>';
                            incomingVerified += '<td id="iPendingReceiver"' + x1 + '>' + jHistory['data'][key]['in'][x1][1] +'</td>';
                            incomingVerified += '<td id="iPendingDescript"' + x1 + '>Description Message Sample</td>';
                            incomingVerified += '<td id="iPendingAmount"' + x1 + '>' + jHistory['data'][key]['in'][x1][2] + '</td>';
                            incomingVerified += '<td id="iPendingTxFee"' + x1 + '>' + jHistory['data'][key]['in'][x1][3] + '</td>';
                            incomingVerified += '<td id="iPendingTxHash"' + x1 + '>' + jHistory['data'][key]['in'][x1][5] + '</td>';
                            incomingVerified  += '</tr>';
                        }
                        $('#incoming tbody').append(incomingVerified);
                break;

                case "out:":
                    let num1 = jHistory['data'][key]['in'].length;
                        for( let x2 = 0; x2 < num1; x2++ ) {
                            outgoingVerified += '<tr>';
                            outgoingVerified += '<td id="oPendingStatus"' + x2 + '>Pending</td>';
                            outgoingVerified += '<td id="oPendingDate"' + x2 + '>' + jHistory['data'][key]['out'][x2].slice(4) + '</td>';
                            outgoingVerified += '<td id="oPendingSender"' + x2 + '>' + jHistory['data'][key]['out'][x2].slice(0) +'</td>';
                            outgoingVerified += '<td id="oPendingReceiver"' + x2 + '>' + jHistory['data'][key]['out'][x2].slice(1) +'</td>';
                            outgoingVerified += '<td id="oPendingDescript"' + x2 + '>Description Message Sample</td>';
                            outgoingVerified += '<td id="oPendingAmount"' + x2 + '>' + jHistory['data'][key]['out'][x2].slice(2) + '</td>';
                            outgoingVerified += '<td id="oPendingTxFee"' + x2 + '>' + jHistory['data'][key]['out'][x2].slice(3) + '</td>';
                            outgoingVerified += '<td id="oPendingTxHash"' + x2 + '>' + jHistory['data'][key]['out'][x2].slice(5) + '</td>';
                            outgoingVerified  += '</tr>';
                        }
                        $('#outgoing tbody').append(outgoingVerified);
                break;
            }

        }
    }*/
// target txhash 1132 for update tx history