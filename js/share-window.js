const {ipcRenderer} = require('electron');
const ipcMain = require('electron').ipcMain;
var path = require('path');
const Store = require('electron-store');
const store = new Store();

/* FOR REMOVAL */
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
/*
var videoFolder = document.getElementById('upload-video-folder');
videoFolder.addEventListener('change', processFile);
var filename;
var videoThumbnail = document.getElementById('upload-video-thumbnail');
videoThumbnail.addEventListener('change',appendJSON);
let json = {};
var directory, filename;

*/
function processFile(event) {
    var input = event.srcElement;
    filename = input.files[0].name;
	

	var file = document.getElementById("upload-video-folder").files[0];
	if (typeof file !== 'undefined' && file !== null) {
		filename = file.name;
		directory = path.dirname(file.path) + "\\";
		
		json = {
			status : 1128,
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
		console.log(jsonString);
	
	var uploadFile =  ipcRenderer.send('avx-share-upload-file', jsonString);


	ipcRenderer.on('avx-share-upload-scan-results', (event, data) => {
		data = JSON.parse(data);
	
		
		//PATH
		$('.file-dir-info span:first-child').html(data["data"]["parent_path"]);
		//DIR TREE
		var dtp = new DirTreeParserVideo(data["data"]["tree"]);
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
	});
	
	
	
	$('[pd-popup="shareScanningModal"]').fadeIn(100);
	
	
	// Generate Uploading status
	$('.counter').text(0);
	$('.counter').each(function() {
	  var $this = $(this),
		  countTo = $this.attr('data-count');
	  
	  $({ countNum: $this.text()}).animate({
		countNum: countTo
	  }, {

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


$ = jQuery;

// EVENTS
setTimeout(function() {

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
		$(this).find("input").click();
		if ( $(this).find("input").is(':checked' ) ){
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
			 //location.reload();
		}, 1000);
		
	});

}, 1000);

/* NEW IMPLEMENTATION */ 

/** 1. Events **/

/** 1.1 Upload Folder via input type **/

$('.importShareFiles').click(function() {
	$(this).find('input[type="file"]').val(null);
	$(this).find('input[type="file"]')[0].click();
	
});
$('.importShareFiles input[type="file"]').change(function () {
	var action = $(this).parent().attr('file-action');
	if (this.files && this.files[0]) {
		var path = this.files[0]['path'];
		json = {
			status : 1128,
			data : {
				file	: path,
				action 	: action
			}
		}
		console.log( JSON.stringify(json) );
		
		$('[pd-popup="shareScanningModal"]').fadeIn(100);
		getScanLoadingForModal( 3000, 'shareScanningModal', 'shareScanResultModal' );

	}

});

/** 1.2 Upload Folder via dragdrop **/
setTimeout(function() {
	$(".importShareFiles")
	.on("dragenter", onDragEnter)
	.on("dragover", onDragOver)
	.on("dragleave", onDragLeave)
	.on("drop", onDrop);

}, 100);

var onDragEnter = function(event) {
	event.preventDefault();
	$(this).addClass("dragover");
}, 

onDragOver = function(event) {
	event.preventDefault(); 
	if(!$(this).hasClass("dragover"))
		$(this).addClass("dragover");
}, 

onDragLeave = function(event) {
	$(this).removeClass("dragover");
},

onDrop = function(event) {
	event.preventDefault();
	$(this).removeClass("dragover");
	
	var items = event.originalEvent.dataTransfer.items;
	
	if ( items.length > 1 ) {
		alert('Multiple entry not allowed');
	} else {
		var item = items[0].webkitGetAsEntry();
		if (item) {
		  if (item.isDirectory == true) {
			  let path = event.originalEvent.dataTransfer.files[0].path;
			  let action = $(this).attr('file-action');
				json = {
					status : 1128,
					data : {
						file	: path,
						action 	: action
					}
				}
				console.log( JSON.stringify(json) );
				$('[pd-popup="shareScanningModal"]').fadeIn(100);
				getScanLoadingForModal( 3000, 'shareScanningModal', 'shareScanResultModal' );
			  
		  } else {
			  alert("Please select a folder");
		  }
		}
	}
	
};

/** 1.3 Toggle DIR parent folder **/
setTimeout(function() {
	
	$(".file-scanned .title.toggleable").parent().find('.file-lists').css('display', 'none');
	
	$(".title.toggleable").click(function () {
		var action = $(this).attr('action');
		if (action == 'close') {
			$(this).attr('action', 'open');
			$(this).find('.toogle-icon').removeClass('segoe-flick-up');
			$(this).find('.toogle-icon').addClass('segoe-flick-left');
			$(this).parent().find('.file-lists').slideUp();
			
		} else {
			$(this).find('.toogle-icon').removeClass('segoe-flick-left');
			$(this).find('.toogle-icon').addClass('segoe-flick-up');
			$(this).attr('action', 'close');
			$(this).parent().find('.file-lists').slideDown();
			
		}
	});
}, 100);

/** 1.4 Select scanned files **/
setTimeout(function() {

	$(".file-scanned .selectable-asset-preview").click(function () {
		 //Clear selected for preview
		$('.file-scanned .selectable-asset-preview').removeClass('open');
		
		var action = $(this).hasClass('open');
		
		if (action) {
			$(this).removeClass('open');
			
		} else {
			$(this).addClass('open');
			
		}
		
	});
}, 100);

/** 2 Classes and Functions **/

/*** 2.1 DIR Scan ***/
class DirTreeParserVideo {
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
					this.dirtree += '<span class="icon-segoe segoe-tree-folder-folder"></span>'; 
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


/*** 2.2 DIR Scan ***/

function getScanLoadingForModal( speed, fadeOut, fadeIn ) {
	$('.counter').text(0);
	$('.counter').each(function() {
	  var $this = $(this),
		  countTo = $this.attr('data-count');
	  
	  $({ countNum: $this.text()}).animate({
		countNum: countTo
	  }, {

		duration: speed,
		easing:'linear',
		step: function() {
		  $this.text(Math.floor(this.countNum));
		},
		complete: function() {
		  $this.text(this.countNum);
		  $('[pd-popup="'+ fadeOut +'"]').fadeOut(100);
		  $('[pd-popup="'+ fadeIn +'"]').fadeIn(100);
		}

	  });  

	});
}