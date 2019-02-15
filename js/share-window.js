const {ipcRenderer} = require('electron');
const ipcMain = require('electron').ipcMain;
var path = require('path');
const Store = require('electron-store');
const store = new Store();

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
			status : 1126,
			data : {
				description: "Description-Description",
				filename	: filename,
				filenamePath 	: directory+filename,
				thumbnailPath : ""
			}
		}
		//Store File Path DIR
		jQuery('#fullFilePathDir').val(directory+filename);
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
		
		//Store Thimb Path DIR
		jQuery('#fullThumbPathDir').val(directory);
	}
	
	var jsonString = JSON.stringify(json);
	var uploadFile =  ipcRenderer.sendSync('avx-share-upload-file', jsonString);

	
	
	
	setTimeout(function() {
		// POPULATE DATA ON SCREEN
		let data = store.get('avx-share-upload-scan-results');
		store.delete('avx-share-upload-scan-results');
		//console.log(data["data"]["metadata"]["duration"]);
		//console.log(data["data"]["tree"]);
		var dtp = new DirTreeParser(data["data"]["tree"]);
		//PATH
		$('.file-dir-info span:first-child').html(data["data"]["parent_path"]);
		//DIR TREE
		$(".generateFileScanned").html(dtp.getHtmlTree());
		//METADATA
		$(".video-reso strong").html( data["data"]["metadata"]["video_resolution"] );
		$(".video-duration strong").html( data["data"]["metadata"]["duration"] );
		//$(".video-size strong").html( data["data"]["metadata"]["duration"] ); NO VIDEO SIZE FROM METADATA RESPONSE
		$(".audio-video-bitrate strong").html( data["data"]["metadata"]["video_bitrate"] );
		//$(".video-width strong").html( data["data"]["metadata"]["video_width"] ); REFER TO DIMENSION
		//$(".video-height strong").html( data["data"]["metadata"]["video_height"] ); REFER TO DIMENSION
		$(".aspect-ratio strong").html( data["data"]["metadata"]["aspect_ratio"] );
		$(".video-container strong").html( data["data"]["metadata"]["container"] );
		$(".video-frame-rate strong").html( data["data"]["metadata"]["video_frame_rate"] );
		$(".video-profile strong").html( data["data"]["metadata"]["video_profile"] );
		$(".video-codec strong").html( data["data"]["metadata"]["video_codec_name"] );
		$(".video-bitrate strong").html( data["data"]["metadata"]["video_bitrate"] );
		$(".bit-depth strong").html( data["data"]["metadata"]["bit_depth"] );
		$(".audio-codec strong").html( data["data"]["metadata"]["audio_codec_name"] );
		$(".audio-channels strong").html( data["data"]["metadata"]["channels"] );
		
		
		
		
	}, 1500);

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

		duration: 3000,
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

setTimeout(
  function() 
  {

	$ = jQuery;

	/*Close Modal action*/
	$('[pd-popup-close]').click(function(e) {
	    var targeted_popup_class = jQuery(this).attr('pd-popup-close');
	    $('[pd-popup="' + targeted_popup_class + '"]').fadeOut(200);

	    e.preventDefault();
	});

	$('#proceedAfterFileScanning').click(function(e) {
		$('[pd-popup="shareScanResultModal"]').fadeOut(100);
		$('[pd-popup="shareComparingFilesToNetworkModal"]').fadeIn(100);
		
		//var uploadFile =  ipcRenderer.sendSync('avx-share-upload-file', jsonString);

		// Generate Uploading status
		$('.counter').text(0);
		$('.counter').each(function() {
		  var $this = $(this),
			  countTo = $this.attr('data-count');
		  
		  $({ countNum: $this.text()}).animate({
			countNum: countTo
		  },

		  {

			duration: 3000,
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

			duration: 3000,
			easing:'linear',
			step: function() {
			  $this.text(Math.floor(this.countNum));
			},
			complete: function() {
			  $this.text(this.countNum);
				$('[pd-popup="shareGettingMetaDataLoadingModal"]').fadeOut(100);
				$('[pd-popup="shareConfirmMetadataModal"]').fadeIn(100);
			}

		  });  
		  
		});	

		e.preventDefault();

	});
	
	$('#proceedAfterVerifyMetadata').click(function(e) {
		$('[pd-popup="shareConfirmMetadataModal"]').fadeOut(100);
		$('[pd-popup="shareMergingAVXnetworkModal"]').fadeIn(100);
		

		// Generate Uploading status
		$('.counter').text(0);
		$('.counter').each(function() {
		  var $this = $(this),
			  countTo = $this.attr('data-count');
		  
		  $({ countNum: $this.text()}).animate({
			countNum: countTo
		  },

		  {

			duration: 1000,
			easing:'linear',
			step: function() {
			  $this.text(Math.floor(this.countNum));
			},
			complete: function() {
			  $this.text(this.countNum);
			  $('[pd-popup="shareMergingAVXnetworkModal"]').fadeOut(100);
			  $('[pd-popup="shareIntellectualPropertyModal"]').fadeIn(100);
			  
			}

		  });  
		  
		});	

		e.preventDefault();

	});
	
	$('#proceedAfterVerifyIntellectualProperty').click(function(e) {
		$('[pd-popup="shareIntellectualPropertyModal"]').fadeOut(100);
		$('[pd-popup="shareIntellectualPropertyConfirmationModal"]').fadeIn(100);
		$('#proceedProceedPaymentCart').addClass('disabled');

		e.preventDefault();

	});
	
	$('#confirmFilesInformation').click(function() {
		if ( $(this).is(':checked' ) ){
			$('#proceedProceedPaymentCart').removeClass('disabled');
		} else {
			$('#proceedProceedPaymentCart').addClass('disabled');
		}
	});
	
	$('#proceedProceedPaymentCart').click( function(){
		$('[pd-popup="shareIntellectualPropertyConfirmationModal"]').fadeOut(100);
		$('[pd-popup="shareMarketPriceModal"]').fadeIn(100);
	});
	
	$('#executePayment').click( function(){
		$('[pd-popup="shareMarketPriceModal"]').fadeOut(100);
		$('[pd-popup="sharePaymentSuccessModal"]').fadeIn(100);
		let filepath = $('#fullFilePathDir').val();
		let thumbpath = $('#fullThumbPathDir').val();
		let json = {
			status : 1116,
			data : {
				amount		:  100,
				type		: 2,
				price 		: 100,
				assetInfo 	: {
					title 					: "title",
					duration 				: "duration",
					movieRating 			: "movieRating",
					directed 				: "directed",
					written 				: "written",
					studio 					: "studio",
					genre 					: "genre",
					desc 					: "desc",
					actors 					: "actors",
					audio 					: "audio",
					subtitles 				: "subtitles",
					subtitleCodec 			: "subtitleCodec",
					subtitleLanguage 		: "subtitleLanguage",
					subtitleDisplayTitle 	: "subtitleDisplayTitle"
				},
				paths : {
					filePath		:  filepath,
					thumbnailPath	: thumbpath
				}
			}
		}
		setTimeout( () => {
			let jsonString = JSON.stringify(json);
			let uploadFile =  ipcRenderer.sendSync('avx-share-upload-payment', jsonString);	
		}, 1000);
		setTimeout(function() {
			// POPULATE DATA ON SCREEN
			let data = store.get('avx-share-upload-payment-response');
			store.delete('avx-share-upload-payment-response');
			 location.reload();
		}, 1000);
		
	});
	
}, 1000);


/* GET DIR TREE */
class DirTreeParser {
	constructor(jsonTree) {
		this.dirtree = '';
		this.setJsonTree(jsonTree);
		this.parse(this.jsonTree);
	}
	
	parse(jsonTree) {
		var flag = false;
		
		for (var key in jsonTree) {
			let currObj = jsonTree[key];
			
			if (typeof currObj == 'object' && Object.keys(currObj).length > 0) {
				
				if (("name" in currObj) && typeof currObj["name"] == 'string') {
					this.dirtree += '<div class="file-scanned">';
					this.dirtree += '<ul class="file-lists">';
					this.dirtree += '<li>';
					this.dirtree += '<p>';
					this.dirtree += '<span class="mdi mdi-checkbox-marked-outline mdi-48px"></span>'; 
					this.dirtree += currObj["name"]; 
					this.dirtree += '<strong>' + currObj["size"] + '</strong>';
					this.dirtree += '</p>';
					this.dirtree += '</li>';
					this.dirtree += '</ul>';
					this.dirtree += '</div>';
				} else {
					this.dirtree += '<div class="file-scanned">';
					this.dirtree += '<label class="title">';
					this.dirtree += '<p>'; 
					this.dirtree += '<span class="mdi mdi-file-outline mdi-48px"></span>'; 
					this.dirtree += key;
					this.dirtree += '</p>';
					this.dirtree += '</label>';
					this.dirtree += '<ul class="file-lists">';
					this.dirtree += '<li>';
					this.parse(currObj, this.dirtree);
					this.dirtree += '</li>';
					this.dirtree += '</ul>';
					this.dirtree += '</div>';
				}

			}
		}
	}
	
	setJsonTree(jsonTree) {
		this.jsonTree = jsonTree;
	}
	
	getHtmlTree() {
		return this.dirtree;
	}
}

