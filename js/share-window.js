const {ipcRenderer} = require('electron');
var path = require('path');

$('#linkMain').click(function() {
    ipcRenderer.send('main','share');
});

$('#linkAccount').click(function() {
    ipcRenderer.send('account','share');
});

$('#linkSearch').click(function() {
    ipcRenderer.send('search','share');
});

$('#btn-upload-folder').click(function(e) {
    e.preventDefault();
    $('#upload-video-folder:hidden').trigger('click');
});
$('#btn-upload-thumbnail').click(function(e) {
	e.preventDefault();
	$('#upload-video-thumbnail:hidden').trigger('click');
});

$('#btnClosetop').click( () => {
    var elementId = "block-top";
    var element = document.getElementById(elementId);
    element.parentNode.removeChild(element);
    document.getElementById('slidenav').style.top = "30px";
    document.getElementById('contentmain').style.marginTop = "91px";

});


var videoFolder = document.getElementById('upload-video-folder');
videoFolder.addEventListener('change', processFile);
var filename;
var videoThumbnail = document.getElementById('upload-video-thumbnail');
videoThumbnail.addEventListener('change',appendJSON);
let json = {};
var directory, filename;

function processFile(event) {
    var input = event.srcElement;
    filename = input.files[0].name;
	

	var file = document.getElementById("upload-video-folder").files[0];
	if (typeof file !== 'undefined' && file !== null) {
		filename = file.name;
		directory = path.dirname(file.path) + "\\";
		
		json = {
			status : 1120,
			data : {
				description: "Description-Description",
				filename	: filename,
				filenamePath 	: directory+filename,
				thumbnailPath : "",
				price : 100
			}
		}
	}
}

function appendJSON(event) {
	var input = event.srcElement;
    filename = input.files[0].name;
	
	var file = document.getElementById("upload-video-thumbnail").files[0];
	if (typeof file !== 'undefined' && file !== null) {
		filename = file.name;
		directory = path.dirname(file.path) + "\\";
		directory += filename;

		json.data.thumbnailPath = directory;
	}
	var jsonString = JSON.stringify(json);
	var uploadFile =  ipcRenderer.sendSync('avx-share-upload-file', jsonString);
	//ipcRenderer.send('upload-files','loading-screen-1.html');
	$('[pd-popup="shareScanningModal"]').fadeIn(100);
	
	// Generate Uploading status
	$('.counter').text(0);
	$('.counter').each(function() {
	  var $this = $(this),
		  countTo = $this.attr('data-count');
	  
	  $({ countNum: $this.text()}).animate({
		countNum: countTo
	  },

	  {

		duration: 8000,
		easing:'linear',
		step: function() {
		  $this.text(Math.floor(this.countNum));
		},
		complete: function() {
		  $this.text(this.countNum);
		  $('[pd-popup="shareScanningModal"]').fadeOut(100);
		  $('[pd-popup="shareScanResultModal"]').fadeIn(100);
		}

	  });  

	});	

	
}


jQuery(window).on('load', function(){

	/*Close Modal action*/
	$('[pd-popup-close]').on('click', function(e)  {
	    var targeted_popup_class = jQuery(this).attr('pd-popup-close');
	    $('[pd-popup="' + targeted_popup_class + '"]').fadeOut(200);

	    e.preventDefault();
	});

	$('#proceedAfterFileScanning').click(function(e) {
		$('[pd-popup="shareScanResultModal"]').fadeOut(100);
		$('[pd-popup="shareComparingFilesToNetworkModal"]').fadeIn(100);

		// Generate Uploading status
		$('.counter').text(0);
		$('.counter').each(function() {
		  var $this = $(this),
			  countTo = $this.attr('data-count');
		  
		  $({ countNum: $this.text()}).animate({
			countNum: countTo
		  },

		  {

			duration: 8000,
			easing:'linear',
			step: function() {
			  $this.text(Math.floor(this.countNum));
			},
			complete: function() {
			  $this.text(this.countNum);
			  $('[pd-popup="shareComparingFilesToNetworkModal"]').fadeOut(100);
			  $('[pd-popup="shareExistAvxNetwork"]').fadeIn(100);
			}

		  });  
		  
		});	

		e.preventDefault();

	});


	$('#proceedAfterConfirmFileNotExist').click(function(e) {
		$('[pd-popup="shareExistAvxNetwork"]').fadeOut(100);
		$('[pd-popup="shareGettingMetaDataLoadingModal"]').fadeIn(100);

		// Generate Uploading status
		$('.counter').text(0);
		$('.counter').each(function() {
		  var $this = $(this),
			  countTo = $this.attr('data-count');
		  
		  $({ countNum: $this.text()}).animate({
			countNum: countTo
		  },

		  {

			duration: 8000,
			easing:'linear',
			step: function() {
			  $this.text(Math.floor(this.countNum));
			},
			complete: function() {
			  $this.text(this.countNum);
			}

		  });  
		  
		});	

		e.preventDefault();

	});


});
