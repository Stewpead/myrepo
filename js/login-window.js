const {ipcRenderer}  = require('electron');
const Store = require('electron-store');
const store = new Store();
var fs = require('fs');
var path = require('path');

jQuery(document).ready(($) => {

	document.getElementById('btnUpload').style.display = 'none';

	document.getElementById('downUpload').style.display = 'none';

});

$('#btnLogin').click( () => {

	signin();

});

$('#btnSignup').click(() => {

	var username = document.getElementById('username').value;
	var pass1 = document.getElementById('spassword').value;
	var pass2 = document.getElementById('confirmpass').value;
	// var agreement = ;
	if ( username=="" && pass1=="" && pass2=="") {
		$('[pd-popup="signupFieldsEmptyModal"]').fadeIn(200);
	}
	else if( username=="" && pass1=="" && pass2=="" &&  document.getElementById('chkAgreement').checked == true) {

	}
	else if( pass1 != pass2 ) {
		$('[pd-popup="signupFailModal"]').fadeIn(200);
	}
	else if( pass1 == pass2 && document.getElementById('chkAgreement').checked == true ) {

		signup();
		document.getElementById('loginmode').style.display = 'block';
		document.getElementById('signupmode').style.display = 'none';
		
	}
	else if( pass1=="" && pass2=="" ) {
		$('[pd-popup="signupPasswordEmptyModal"]').fadeIn(200);
	}
	else if(document.getElementById('chkAgreement').checked != true ) {
		$('[pd-popup="signupAgreementModal"]').fadeIn(200);
	}
	else if (pass1 == pass2 && document.getElementById('chkAgreement').checked == false) {

	}
	
});


$('#showSignup').click( () => {
	document.getElementById('loginmode').style.display = 'none';
	document.getElementById('signupmode').style.display = 'block';
});

$('#showLogin').click( () => {
	document.getElementById('loginmode').style.display = 'block';
	document.getElementById('signupmode').style.display = 'none';
});

function signup() {

	var data = {};
	var username, password, privateKey, directory;
	username = document.getElementById('susername').value;
	password = document.getElementById('spassword').value;

	//var file = document.getElementById("openWallet").files[0];


	//if (typeof file !== 'undefined' && file !== null) {
	//	directory = file.path

	//}
	directory = "D:\\wallet";

	
	var json = {
		status: 1113,
		data : {
			username : username,
			password : password,
			directory : directory
			
		}
	};

	var jsonString = JSON.stringify(json);
	ipcRenderer.send("avx-signup", jsonString);
	$('[pd-popup="signupSuccessModal"]').fadeIn(100);
}


/* test */
	/*var data = 1;
	alert(data);
	// var test = ipcRenderer.send("test-btn", data);
	var test =  ipcRenderer.sendSync('test-btn', data);
	alert(test);
	*/

/**/

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
			status: 1114,
			data : {
				username : username,
				password : password,
				directory : directory,
				privateKey	 : privateKey

			}
		}

	var jsonString = JSON.stringify(json);
	ipcRenderer.send("avx-login", jsonString);
	setTimeout(function() {
		
		let data = store.get('avx-login-true');
		data = JSON.parse(data);
		store.delete('avx-login-true');
		
		if(data == "1") {
			$('[pd-popup="loginSuccessModal"]').fadeIn(100);
		}
		else if(data == "0") {
			$('[pd-popup="loginFailModal"]').fadeIn(100);
		}
		
	}, 100);
	// $('[pd-popup="loginSuccessModal"]').fadeIn(200);
	

	// $('[pd-popup="loginSuccessModal"]').fadeOut(3000);
}
// $('#buttonExecute').click(function() {
// 	$('[pd-popup="shareScanResultModal"]').fadeOut(100);
// 	$('[pd-popup="shareScanningModal"]').fadeIn(100);
// });
$(document).ready( function() {

	// document.getElementById('btnSignup').disabled = true;

	var listDir = store.get('directory');
	if ( typeof listDir !== 'undefined' || listDir !== null ) {
		selectWallet(listDir);
		
	}
	$('.loginfields .dropdown-menu .dropdown-item').click(function() {
		var data = $(this).attr('value');
		$('#privateKeyUpload').val(data);	
	});
	document.getElementById('loginmode').style.display = 'block';
	document.getElementById('signupmode').style.display = 'none';
	
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

	var inputFile = document.getElementById('walletUpload');
	inputFile.addEventListener('change', showFile);
	var filename;

function showFile(event) {
	var input = event.srcElement;
	filename = input.files[0].name;
	document.getElementById('btnUpload').innerHTML = filename;
}

