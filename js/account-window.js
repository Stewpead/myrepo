const {ipcRenderer} = require('electron');

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
   ipcRenderer.send('send-avx','send-token.html');
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

