var javascriptObject;
var javascriptObject2;

var json = {};
var json2 = {};

var jasonString;
var jasonString2;

var jsonString;
var jsonString2;

function signup() {
    json.status = 333;

    json.username = document.getElementById('username').value;
    json.username = document.getElementById('email').value;
    json.password = document.getElementById('passw').value;
    jsonString = JSON.stringify(json);
    javascriptObject = $.parseJSON(jsonString);
    jasonString = JSON.stringify(javascriptObject);
    console.log(jsonString);
    ipcRenderer.send('signupdata',jasonString);


}

function login1() {
   var uname, waddress;
   json2.status = 444;
   json2.username = document.getElementById('username').value;
   json2.password = document.getElementById('passw').value;
   jsonString2 = JSON.stringify(json2);
   javascriptObject2 = $.parseJSON(jsonString2);
   jasonString2 = JSON.stringify(javascriptObject2);
   ipcRenderer.send('logindata',jasonString2);
}




function downwallet() {
    document.getElementById('downwallet').disable = true;
    ipcRenderer.send('popup','dlwallet.html');
}
