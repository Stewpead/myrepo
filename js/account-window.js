const {ipcRenderer} = require('electron');
const Store = require('electron-store');
const store = new Store();

document.getElementById('btnIncomingTx').style.color = '#818181';
document.getElementById('btnOutcomingTx').style.color = '#818181';


var counter;
var tbJsonMerge = {
	"incoming": {
		"01": {
			"status": "verified",
			"amount": "2.27"
		},
		"04": {
			"status": "Unverified",
			"amount": "2.27"
		}
	},
	"outgoing": {
		"02": {
			"status": "Unverified",
			"amount": "7.23"
		},
		"03": {
			"status": "verified",
			"amount": "4.11"
		}
	}
};
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

$(document).ready( () => {
	/*
    var n1 = 0, n2;
    for (var key in tbJsonMerge) {
        for (var idx in tbJsonMerge[key]) {
            var status = tbJsonMerge[key][idx].status;
            var amount = tbJsonMerge[key][idx].amount;
            // console.log(key + ' ' + idx + ' ' + status + ' ' + amount);
            document.getElementById(mstatus+(n1 + 1)).innerHTML = status;
            document.getElementById(mamount+(n1 + 1)).innerHTML = amount;
            document.getElementById(mtransacID+(n1 + 1)).innerHTML = idx;
            // console.log(mstatus+(n1 + 1) + ' ' + mamount+(n1 + 1) + ' ' + mtransacID+(n1 + 1));
            ++n1;
        }

    }
	*/

    /*var x1 = Object.keys(tbJsonMerge).length;
    for(var i = 0; i <= x1; i++ )
    {
        var x2 = Object.keys(tbJsonMerge.incoming).length;
        var obj;
        for (var num = 0; num <= x2; num++)
        {
            obj = Object.keys(tbJsonMerge.incoming)[num];
            document.getElementById('mtransacID1').innerHTML = obj;
            
            // var x3 = Object.keys(tbJsonMerge.incoming)[num].length;
            var size = 0, key;
            // for(key in tbJsonMerge.incoming[num]){
            //     if(tbJsonMerge.incoming[num](key)
            // }
            for (var num2 = 0; num2 <= x3; num2++)
            {
                console.log(tbJsonMerge.incoming[num]);
                // document.getElementById('mstatus').innerHTML = tbJsonMerge.incoming[num].status;
                // document.getElementById('mamount1').innerHTML = tbJsonMerge.incoming[num].amount;
            }
        }
    }*/
	


	setTimeout(function() {
	
	/* GET ACCOUNT BALANCE */
	let jsonBalance = { status : 1121 };
	let jsonStringBalance = JSON.stringify(jsonBalance);
	ipcRenderer.sendSync('avx-account-balance', jsonStringBalance);
	
		// POPULATE DATA ON SCREEN
		let dataBalance = store.get('avx-account-balance');
		store.delete('avx-account-balance');
		if(typeof dataBalance["balance"] != 'undefined') {
			$('.total-balance').html(parseFloat(dataBalance["balance"]).toFixed(2));
		}

	}, 1000);

	setTimeout(function() {
	
	/* GET ACCOUNT SPENT */
	let jsonSpent = { status : 1124 };
	let jsonStringSpent = JSON.stringify(jsonSpent);
	ipcRenderer.sendSync('avx-account-spent', jsonStringSpent);
	
		// POPULATE DATA ON SCREEN

		
		let dataSpent = store.get('avx-account-spent');
		store.delete('avx-account-spent');
		if(typeof dataSpent["spent"] != 'undefined') {
			$('#spentavx').html(parseFloat(dataSpent["spent"]).toFixed(2));
		}
		
		
	}, 1000);

	setTimeout(function() {
	
	/* GET ACCOUNT WALLET ADDRESS */
	let jsonWalletAddress = { status : 1125 };
	let jsonStringWalletAddress = JSON.stringify(jsonWalletAddress);
	ipcRenderer.sendSync('avx-account-wallet-address', jsonStringWalletAddress);
	
		// POPULATE DATA ON SCREEN

		
		let dataWalletAddress = store.get('avx-account-wallet-address');
		store.delete('avx-account-wallet-address');
		if(typeof dataWalletAddress != 'undefined') {
			$('span.Waddress').html(dataWalletAddress["publicKey"]);
		}
		
		
	}, 1000);
	
	setTimeout(function() {
	
	/* GET HISTORY */
	let jsonHistory = { status : 1123 };
	let jsonStringHistory = JSON.stringify(jsonHistory);
	ipcRenderer.sendSync('avx-account-history', jsonStringHistory);
	
		// POPULATE DATA ON SCREEN

		let dataHistory = store.get('avx-account-history');
		store.delete('avx-account-history');
			

		if(typeof dataHistory["history"] != 'undefined') {
			let outputHistory = JSON.parse(dataHistory["history"]);
			let outputIncoming;
			let outputOutgoing;
			
			if(typeof outputHistory["incoming"] != 'undefined') {

				for (var key in outputHistory["incoming"]) {
					let currObj = outputHistory["incoming"][key];
					outputIncoming += '<tr>';
					outputIncoming += '<td>'+currObj["type"]+'</td>';
					outputIncoming += '<td>-Date-</td>';
					outputIncoming += '<td>-Time-</td>';
					outputIncoming += '<td>'+currObj["sender"]+'</td>';
					outputIncoming += '<td>'+currObj["receiver"]+'</td>';
					outputIncoming += '<td>-Desc-</td>';
					outputIncoming += '<td>'+currObj["amount"]+'</td>';
					outputIncoming += '<td>-Trans ID-</td>';
					outputIncoming += '</tr>';
				}
				
				$("#incoming tbody").html(outputIncoming);
			}
			
			if(typeof outputHistory["outgoing"] != 'undefined') {
				
				for (var key in outputHistory["outgoing"]) {
					let currObj = outputHistory["outgoing"][key];
					outputOutgoing += '<tr>';
					outputOutgoing += '<td>'+currObj["type"]+'</td>';
					outputOutgoing += '<td>-Date-</td>';
					outputOutgoing += '<td>-Time-</td>';
					outputOutgoing += '<td>'+currObj["sender"]+'</td>';
					outputOutgoing += '<td>'+currObj["receiver"]+'</td>';
					outputOutgoing += '<td>-Desc-</td>';
					outputOutgoing += '<td>'+currObj["amount"]+'</td>';
					outputOutgoing += '<td>-Trans ID-</td>';
					outputOutgoing += '</tr>';
				}
				
				$("#outgoing tbody").html(outputOutgoing);
				
			}
			
			$("#tbMerge tbody").html(outputIncoming+outputOutgoing);
		}
		//let accountHistoryIncoming = data["incoming"];

		

		
	}, 1000);
	


  
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

