var fs = require('fs');
var merged = fs.readFileSync('./json/data.json'); 
var data = JSON.parse(merged);
var intx1 = Object.keys(data.In.Verified);
var intx2 = Object.keys(data.In.Unverified);
// var intx1 = JSON.parse(data.In[0]);
// console.log(intx1);
var outtx1 = Object.keys(data.Out.Verified);
var outtx2 = Object.keys(data.Out.Unverified);

function getmerge(){
    
}  
var temp = "";
var status = "status";
var date = "date";
var time = "time";
var from = "from";
var to = "to";
var descrip = "descrip";
var amount = "amount";
var transacID = "transacID";
var incomingTx = "incomingTx";
var num = 1;
function getmerge() {
    
    document.getElementById("mamount1").innerHTML = data.In.Verified[intx1[0]].Amount;
    document.getElementById("mfrom1").innerHTML = data.In.Verified[intx1[0]].From;
    document.getElementById("mto1").innerHTML = data.In.Verified[intx1[0]].To;
    document.getElementById("mstatus1").innerHTML = "Verified";
    document.getElementById("mtransacID1").innerHTML = intx1[0];

    document.getElementById("mamount2").innerHTML = data.In.Verified[intx1[0]].Amount;
    document.getElementById("mfrom2").innerHTML = data.In.Verified[intx1[0]].From;
    document.getElementById("mto2").innerHTML = data.In.Verified[intx1[0]].To;
    document.getElementById("mstatus2").innerHTML = "Verified";
    document.getElementById("mtransacID2").innerHTML = intx1[1];

    document.getElementById("mamount3").innerHTML = data.In.Unverified[intx2[0]].Amount;
    document.getElementById("mfrom3").innerHTML = data.In.Unverified[intx2[0]].From;
    document.getElementById("mto3").innerHTML = data.In.Unverified[intx2[0]].To;
    document.getElementById("mstatus3").innerHTML = "Unverified";
    document.getElementById("mtransacID3").innerHTML = intx2[0];

    document.getElementById("mamount4").innerHTML = data.Out.Verified[outtx1[0]].Amount;
    document.getElementById("mfrom4").innerHTML = data.Out.Verified[outtx1[0]].From;
    document.getElementById("mto4").innerHTML = data.Out.Verified[outtx1[0]].To;
    document.getElementById("mstatus4").innerHTML = "Verified";
    document.getElementById("mtransacID4").innerHTML = outtx1[0];

    document.getElementById("mamount5").innerHTML = data.Out.Verified[outtx1[1]].Amount;
    document.getElementById("mfrom5").innerHTML = data.Out.Verified[outtx1[1]].From;
    document.getElementById("mto5").innerHTML = data.Out.Verified[outtx1[1]].To;
    document.getElementById("mstatus5").innerHTML = "Verified";
    document.getElementById("mtransacID5").innerHTML = outtx1[1];

    document.getElementById("mamount6").innerHTML = data.Out.Unverified[outtx2[0]].Amount;
    document.getElementById("mfrom6").innerHTML = data.Out.Unverified[outtx2[0]].From;
    document.getElementById("mto6").innerHTML = data.Out.Unverified[outtx2[0]].To;
    document.getElementById("mstatus6").innerHTML = "Unverified";
    document.getElementById("mtransacID6").innerHTML = outtx2[0];

    document.getElementById("mamount7").innerHTML = data.Out.Unverified[outtx2[0]].Amount;
    document.getElementById("mfrom7").innerHTML = data.Out.Unverified[outtx2[0]].From;
    document.getElementById("mto7").innerHTML = data.Out.Unverified[outtx2[0]].To;
    document.getElementById("mstatus7").innerHTML = "Unverified";
    document.getElementById("mtransacID7").innerHTML = outtx2[0];

    document.getElementById("mamount8").innerHTML = data.Out.Unverified[outtx2[1]].Amount;
    document.getElementById("mfrom8").innerHTML = data.Out.Unverified[outtx2[1]].From;
    document.getElementById("mto8").innerHTML = data.Out.Unverified[outtx2[1]].To;
    document.getElementById("mstatus8").innerHTML = "Unverified";
    document.getElementById("mtransacID8").innerHTML = outtx2[1];

}

function getincoming(){
    // for( var i = 0; i < intx1.length;i++) {
        // data.In.Verified[intx1[i]].Amount
        // num = num+i;
        // num.toString();
        // amount = amount + num;
        // console.log(amount);
    document.getElementById("iamount1").innerHTML = data.In.Verified[intx1[0]].Amount;
    document.getElementById("ifrom1").innerHTML = data.In.Verified[intx1[0]].From;
    document.getElementById("ito1").innerHTML = data.In.Verified[intx1[0]].To;
    document.getElementById("istatus1").innerHTML = "Verified";
    document.getElementById("itransacID1").innerHTML = intx1[0];

    document.getElementById("iamount2").innerHTML = data.In.Verified[intx1[1]].Amount;
    document.getElementById("ifrom2").innerHTML = data.In.Verified[intx1[1]].From;
    document.getElementById("ito2").innerHTML = data.In.Verified[intx1[1]].To;
    document.getElementById("istatus2").innerHTML = "Verified";
    document.getElementById("itransacID2").innerHTML = intx1[1];

    document.getElementById("iamount3").innerHTML = data.In.Unverified[intx2[0]].Amount;
    document.getElementById("ifrom3").innerHTML = data.In.Unverified[intx2[0]].From;
    document.getElementById("ito3").innerHTML = data.In.Unverified[intx2[0]].To;
    document.getElementById("istatus3").innerHTML = "Unverified";
    document.getElementById("itransacID3").innerHTML = intx2[0];

    document.getElementById("iamount4").innerHTML = data.In.Unverified[intx2[1]].Amount;
    document.getElementById("ifrom4").innerHTML = data.In.Unverified[intx2[1]].From;
    document.getElementById("ito4").innerHTML = data.In.Unverified[intx2[1]].To;
    document.getElementById("istatus4").innerHTML = "Unverified";
    document.getElementById("itransacID4").innerHTML = intx2[1];
// }
}  

function getOutgoing(){
    document.getElementById("oamount1").innerHTML = data.Out.Verified[outtx1[0]].Amount;
    document.getElementById("ofrom1").innerHTML = data.Out.Verified[outtx1[0]].From;
    document.getElementById("oto1").innerHTML = data.Out.Verified[outtx1[0]].To;
    document.getElementById("ostatus1").innerHTML = "Verified";
    document.getElementById("otransacID1").innerHTML = outtx1[0];

    document.getElementById("oamount2").innerHTML = data.Out.Verified[outtx1[1]].Amount;
    document.getElementById("ofrom2").innerHTML = data.Out.Verified[outtx1[1]].From;
    document.getElementById("oto2").innerHTML = data.Out.Verified[outtx1[1]].To;
    document.getElementById("ostatus2").innerHTML = "Verified";
    document.getElementById("otransacID2").innerHTML = outtx1[1];

    document.getElementById("oamount3").innerHTML = data.Out.Unverified[outtx2[0]].Amount;
    document.getElementById("ofrom3").innerHTML = data.Out.Unverified[outtx2[0]].From;
    document.getElementById("oto3").innerHTML = data.Out.Unverified[outtx2[0]].To;
    document.getElementById("ostatus3").innerHTML = "Unverified";
    document.getElementById("otransacID3").innerHTML = outtx2[0];

}

getincoming();