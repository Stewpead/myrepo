<<<<<<< HEAD
const {ipcRenderer} = require('electron');

$('#btnLogin').click(() => {
    location.href = 'main-window.html';
    ipcRenderer.send('logindatas','');
});
=======
const {ipcRenderer}  = require('electron');
const Store = require('electron-store');
const store = new Store();
var fs = require('fs');
var path = require('path');

function signin() {
	var data = {};
	var username, password, privateKey, path;
	username = document.getElementById('username').value;
	password = document.getElementById('confirmpass').value;

	var file = document.getElementById("file").files[0];
	
	if (typeof file !== 'undefined' && file !== null) {
		privateKey = file.path

	}
	
	var json = {
		status: 3,
		data : {
			username : username,
			password : password,
			directory : file,
			privateKey	 : privateKey
			
		}
	};

	var jsonString = JSON.stringify(json);
	ipcRenderer.send("avx-signin", jsonString);
	

}

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
				directory : path,
				string	 : string
				
			}
		};
	
	var jsonString = JSON.stringify(json);
	ipcRenderer.send("avx-login", jsonString);
	
}

$(document).ready( function() {

		store.set('directory.wallet', "D:\\wallet" );
		// Check local db for lists of directory
		var listDir = store.get('directory');
		if ( typeof listDir !== 'undefined' || listDir !== null ) {
			selectWallet(listDir);
			
		}	
	
});


// GENERATE ACTION
function selectWallet(data) {
	//data = JSON.stringify(data);
	var output;
	
	for (x in data) {
		var path = data[x];
		
		try{
			fs.lstatSync(path).isDirectory();
			var listFiles = getFiles(path);
			generateWalletDropdown(listFiles);
			 
		}catch(e){
		   // Handle error
		   if(e.code == 'ENOENT'){
			 console.log(false);
		   }else {
			  
			  
		   }
		}


	}
	
	
}

function getFiles (dir, files_){
    files_ = files_ || [];
    var files = fs.readdirSync(dir);
    for (var i in files){
        var name = dir + '/' + files[i];
		var name_traget = files[i];
        if (fs.statSync(name).isDirectory()){
            getFiles(name, files_);
        } else {
            files_.push(name);
        }
    }
    return files_;
}

function generateWalletDropdown(data) {
	
	

	var output ='';
	for (var i in data){
		var file =  path.basename(data[i], '.txt');
		var dir =  data[i];
		
		output += '<a class="dropdown-item" href="#" value="'+ dir +'">' + file + '</a>';
		
	
		
	}
	
	$('#dropdownItemMenu').append(output);
	
	
	
}

>>>>>>> c7c64c37bb9f0795efb7feab0d94daeec0359f38
