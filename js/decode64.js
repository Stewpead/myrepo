const base64toimage = require('base64-to-image');
const path = require('path');
const fs = require('fs');
var obj64 = fs.readFileSync('./json/base64img.json'); 
var json64 = JSON.parse(obj64);
var keys64 = Object.keys(json64);
var imgname = 'decodedimg';
var imgpath = path.join(__dirname,'/decodedimg/');
var data64 = "data:image/jpg;base64,";

 

function loadimg() {
document.getElementById('main1').src = data64 + json64[0];
document.getElementById('main2').src = data64 + json64[1];
document.getElementById('main3').src = data64 + json64[2];
// document.getElementById('main4').src = data64 + json64[3];
document.getElementById('main5').src = data64 + json64[4];
// console.log(data64 + json64[0]);
}