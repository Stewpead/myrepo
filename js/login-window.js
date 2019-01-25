const {ipcRenderer}  = require('electron');
var fs = require('fs');

$('#btnSignup').click((e) => {
	var data = {};
	var username, password, hash, path;
	username = document.getElementById('username').value;
	password = document.getElementById('confirmpass').value;

	var file = document.getElementById("file").files[0];
	
	if (typeof file !== 'undefined' && file !== null) {
		string = file.path

	}
		var json = {
			status: 3,
			data : {
				username : username,
				password : password,
				string	 : string
				
			}
		};
	

	var jsonString = JSON.stringify(json);
	

});

function signin() {
	var data = {};
	var username, password, string, path;
	username = document.getElementById('username').value;
	password = document.getElementById('passw').value;

	var file = document.getElementById("file").files[0];
	
	if (typeof file !== 'undefined' && file !== null) {
		path = file.path
		string = fs.readFileSync(path, 'utf8');
	}
		var json = {
			status: 4,
			data : {
				username : username,
				password : password,
				string	 : string
				
			}
		};
	

	console.log(string);
	var jsonString = JSON.stringify(json);
	ipcRenderer.send("avx-login", jsonString);
	
	

}




