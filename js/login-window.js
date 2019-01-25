<<<<<<< HEAD
// <<<<<<< HEAD
const {ipcRenderer} = require('electron');

$('#btnLogin').click(() => {
    location.href = 'main-window.html';
});

$('#btnUpload').click(function(e) {
    e.preventDefault();
    $('#walletUpload').trigger('click');
});

var videoFolder = document.getElementById('walletUpload');
videoFolder.addEventListener('change',processFile);
var filename;
function processFile(event) {
    var input = event.srcElement;
    filename = input.files[0].name;
}


// =======
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
>>>>>>> 4219727d868016f3963d8e3477e0efa2b8e37b97

// const {ipcRenderer}  = require('electron');
// var fs = require('fs');

// $('#btnSignup').click((e) => {
// 	var data = {};
// 	var username, password, hash, path;
// 	username = document.getElementById('username').value;
// 	password = document.getElementById('confirmpass').value;

// 	var file = document.getElementById("file").files[0];
	
<<<<<<< HEAD
// 	if (typeof file !== 'undefined' && file !== null) {
// 		string = file.path

// 	}
// 		var json = {
// 			status: 3,
// 			data : {
// 				username : username,
// 				password : password,
// 				string	 : string
				
// 			}
// 		};
=======
	if (typeof file !== 'undefined' && file !== null) {
		privateKey = file.path

	}
>>>>>>> 4219727d868016f3963d8e3477e0efa2b8e37b97
	
	var json = {
		status: 3,
		data : {
			username : username,
			password : password,
			directory : file,
			privateKey	 : privateKey
			
		}
	};

<<<<<<< HEAD
// 	var jsonString = JSON.stringify(json);
	

// });

// function signin() {
// 	var data = {};
// 	var username, password, string, path;
// 	username = document.getElementById('username').value;
// 	password = document.getElementById('passw').value;
=======
	var jsonString = JSON.stringify(json);
	ipcRenderer.send("avx-signin", jsonString);
	

}

function signin() {
	var data = {};
	var username, password, string, path;
	username = document.getElementById('username').value;
	password = document.getElementById('passw').value;
	privateKeyUpload = document.getElementById('privateKeyUpload').value;
>>>>>>> 4219727d868016f3963d8e3477e0efa2b8e37b97

// 	var file = document.getElementById("file").files[0];
	
<<<<<<< HEAD
// 	if (typeof file !== 'undefined' && file !== null) {
// 		path = file.path
// 		string = fs.readFileSync(path, 'utf8');
// 	}
// 		var json = {
// 			status: 4,
// 			data : {
// 				username : username,
// 				password : password,
// 				string	 : string
=======
	if (typeof file !== 'undefined' && file !== null) {
		directory = file.path
		privateKey = fs.readFileSync(directory, 'utf8');
	} else {
		if ( privateKeyUpload !== "") {
			directory = privateKeyUpload;
			privateKey = fs.readFileSync(directory, 'utf8');
		}
	}
		var json = {
			status: 4,
			data : {
				username : username,
				password : password,
				directory : directory,
				privateKey	 : privateKey
>>>>>>> 4219727d868016f3963d8e3477e0efa2b8e37b97
				
// 			}
// 		};
	
<<<<<<< HEAD

// 	console.log(string);
// 	var jsonString = JSON.stringify(json);
// 	ipcRenderer.send("avx-login", jsonString);
=======
	var jsonString = JSON.stringify(json);
	ipcRenderer.send("avx-login", jsonString);
>>>>>>> 4219727d868016f3963d8e3477e0efa2b8e37b97
	
}

$(document).ready( function() {

	store.set('directory.wallet', "D:/wallet" );
	var listDir = store.get('directory');
	if ( typeof listDir !== 'undefined' || listDir !== null ) {
		selectWallet(listDir);
		
	}
	$('.loginfields .dropdown-menu .dropdown-item').click(function() {
		var data = $(this).attr('value');
		$('#privateKeyUpload').val(data);	
	});
	
	
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


<<<<<<< HEAD
// }
=======
	}
	
	
}
>>>>>>> 4219727d868016f3963d8e3477e0efa2b8e37b97

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
	
	

	var output ='<input type="hidden" id="privateKeyUpload">';
	for (var i in data){
		var file =  path.basename(data[i], '.txt');
		var dir =  data[i];
		
		output += '<a class="dropdown-item" href="#" value="'+ dir +'">' + file + '</a>';
		
	
		
	}
	
	$('#dropdownItemMenu').html(output);
	
	
	
}

<<<<<<< HEAD
// >>>>>>> c7c64c37bb9f0795efb7feab0d94daeec0359f38
=======
>>>>>>> 4219727d868016f3963d8e3477e0efa2b8e37b97
