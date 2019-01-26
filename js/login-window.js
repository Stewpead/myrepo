const {ipcRenderer}  = require('electron');
const Store = require('electron-store');
const store = new Store();
var fs = require('fs');
var path = require('path');

function signup() {

	var data = {};
	var username, password, privateKey, directory;
	username = document.getElementById('username').value;
	password = document.getElementById('passw').value;

	var file = document.getElementById("openWallet").files[0];


	if (typeof file !== 'undefined' && file !== null) {
		directory = file.path

	}

	
	var json = {
		status: 3,
		data : {
			username : username,
			password : password,
			directory : directory
			
		}
	};


	var jsonString = JSON.stringify(json);
	ipcRenderer.send("avx-signup", jsonString);
	

}

function signin() {
	var data = {};
	var username, password, string, directory, privateKey;
	username = document.getElementById('username').value;
	password = document.getElementById('passw').value;
	privateKeyUpload = document.getElementById('walletUpload').value;

	var file = document.getElementById("walletUpload").files[0];
	
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

			}
		}

	var jsonString = JSON.stringify(json);
	ipcRenderer.send("avx-login", jsonString);
}

$(document).ready( function() {

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
	
	

	var output ='<input type="hidden" id="privateKeyUpload">';
	for (var i in data){
		var file =  path.basename(data[i], '.txt');
		var dir =  data[i];
		
		output += '<a class="dropdown-item" href="#" value="'+ dir +'">' + file + '</a>';
		
	
		
	}
	
	$('#dropdownItemMenu').html(output);
	
	
	
}

var walletItem;
$('#a1').click( () =>  {
	document.getElementById('btnSavedWallets').innerHTML = 'AVX1';
	console.log('a1');
});	
$('#a2').click( () => {
	document.getElementById('btnSavedWallets').innerHTML = 'AVX2';
});
$('#a3').click( () => {
	document.getElementById('btnSavedWallets').innerHTML = 'AVX3';
});
$('#a4').click( () => {
	document.getElementById('btnSavedWallets').innerHTML = 'AVX4';
});

$(function(){
    $("#btnUpload").on('click', function(e){
        e.preventDefault();
        $("#walletUpload:hidden").trigger('click');
	});

});

var inputFile = document.getElementById('wallletUpload');
// inputFile.addEventListener('change', showFile);
var filename;

function showFile(event) {
	var input = event.srcElement;
	filename = input.files[0].name;
	document.getElementById('btnUpload').innerHTML = filename;
	
}