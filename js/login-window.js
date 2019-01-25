var fs = require('fs');
const ipcRender = require('electron').ipcMain;

$('#btnLogin').click((e) => {
	var data = {};
	var username, password, hash, path;
	username = document.getElementById('username').value;
	password = document.getElementById('passw').value;

	var file = document.getElementById("file").files[0];
	
	if (typeof file !== 'undefined' && file !== null) {
		fileDirectory = file.path
		string = fs.readFileSync(fileDirectory, 'utf8');
	}
		var json = {
			status: 4,
			data : {
				username : username,
				password : password,
				string	 : string
				
			}
		};
	

	var jsonString = JSON.stringify(json);

});

$('#savew').click((e) => {
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
