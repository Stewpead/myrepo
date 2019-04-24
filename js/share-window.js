const {ipcRenderer} = require('electron');
const ipcMain = require('electron').ipcMain;
var path = require('path');
const Store = require('electron-store');
const store = new Store();
const fs = require('fs');

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


setTimeout(function() {	
	//Wallet Data - 1130
	var jdata = {
		status: 1130,
		type: 0
	};
	jdata = JSON.stringify(jdata);
	ipcRenderer.send('get-wallet-data', jdata);
},1000);

 
// Real time wallet data retrieval 
ipcRenderer.on('avx-wallet-data', (event, arg) => {
    walletData = arg; 
   console.log(walletData);
	let balance = walletData;
		balance = balance['wallet_data']["balance"];
	$('[pd-popup="shareMarketPriceForMultipleModal"] .popup-inner-white #walletBalance').html(balance);
	$('[pd-popup="sharePaymentSuccessModal"] #account-balance span').html(balance);

    
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
		console.log('GERE TESTE');
	
		
		//PATH
		$('.file-dir-info span:first-child').html(data["data"]["parent_path"]);
		//DIR TREE
		//var dtp = new DirTreeParserVideo(data["data"]["tree"]);
		$(".generateFileScanned").html(dtp.getHtmlTree());
		//METADATA
		$(".video-reso strong").html(  (getResolution(data["data"]["file_metadata"]["height"] , 1)) + "p" );
		$(".video-duration strong").html( getDuration(data["data"]["metadata"]["duration"]) );
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
		
		$('.file-movie-content').html('');
		
		$('.popup[pd-popup="shareExistAvxNetwork"] .generateFileScanned .pointer-cursor.item-file-meta').parent().append('<span class="icon-segoe segoe-completed-solid color-success"></span>');
		
		
	let files = $('[pd-popup="shareScanResultModal"] .pointer-cursor.item-file-meta');
	
	let counter = 0;
	let tree = [];
	let filesLength = files.length;

	$.each(files, function( index, value ) {
		let filename = $(this).attr('file-name');
		let size = $(this).attr('file-size');
		let folder = $(this).closest('.item-file-meta-parent').attr('dir');
		let url;
		let dir;
		let price;
		if ( folder ) {
			
			url = $("#ShareModalView .file-dir-info span:nth-child(1)").html() + folder +"\\"+ filename;
			dir = $("#ShareModalView .file-dir-info span:nth-child(1)").html() + folder;
			price = '100';
			
		} else {
		
			url = $("#ShareModalView .file-dir-info span:nth-child(1)").html() +"\\"+ filename;
			dir = $("#ShareModalView .file-dir-info span:nth-child(1)").html();
			price = '100';
		
		}
		
		tree[counter] = { url, dir, price };

		counter++;

		if (  counter == filesLength ) {
			
			shareCrawlFile(tree);

		}
		
	});

		
		
		let jCrawlTvSeries = {
			status : 9000
		}
		let jCrawlAudio = {
			status : 9000
		}
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
				$('#shareStyleBG').remove();
				let imageSrc = $('.file-feature-img').css('background-image');
				$('body').append('<style id="shareStyleBG">.popup[pd-popup="shareConfirmMetadataModal"] .popup-inner.scroll-skin:before { content:'+ imageSrc +';}</style>');
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
		let files = $('[pd-popup="shareConfirmMetadataModal"] .file-movie-content .file-movie-details');
		let filesLength = files.length;
		let item = 0;
		let filesTitle = [];
		var output = '';
		let itemLength = 0;
		
		$('[pd-popup="shareConfirmMetadataModal"] .file-payment-lists-container').remove();
		
		$.each(files, function( index, value ) {
			let content = $(this).find("textarea").text();
			
			if ( typeof content !=="undefined") {
					content = JSON.parse(content);
					let crawl = JSON.parse(content["crawl"]);
					let labelPrice 	= $('[pd-popup="shareScanResultModal"] #fileCategory').val() + " Price";
					
					output += '	<div class="row file-details file-payment-lists"> ';
					output += '		<div class="row mb-5 mt-5 container-fluid"> ';
					//output += '			<div class="col-md-3"> ';
					//output += '				<span id="fileTitle">'+ content["title"] +'</span> ';
					//output += '			</div> ';
					
					//output += '			<div class="col-md-6 section-line-divider"> ';
					//output += '			</div> ';
					//output += '			<div class="col-md-3"> ';
					//output += '				<span class="filePrice">0 AVX</span> ';
					//output += '				<span class="mdi mdi-arrow-down-circle" id="breakFile'+item+'"></span> ';
					//output += '			</div> ';
					output += 			'<h5 class="label-with-border white-title">';
					output +=				'<span class="fileTitle">'+ content["title"] +'</span>';
					output +=				'<span class="icon-segoe float-left toogle-icon segoe-flick-up"  id="breakFile'+item+'"></span>';
					output +=				'<span class="filePrice"> <span style="color: #969696;font-size: 11px;font-weight: 500;position: absolute;text-transform: capitalize;text-overflow: ellipsis;"	>'+labelPrice+'</span> <br><span class="labelPriceTop">0 AVX</span></span>';
					output +=			'</h5>';
					output += '		</div> ';
					
					output += '		<div id="file'+item+'" class="container-fluid">  ';
					output += '			<div class="row">  ';
					output += '				<div class="col-sm-12 col-md-2"> ';
					output += '						<div class="file-feature-img" style="min-height: 173px; background-image: url(\''+ crawl["header"]["poster"] +'\')"></div> ';
					output += '				</div> ';
					output += '				<div class="col-sm-12 col-md-10 "> ';
						
					output += '					<div class="row file-metadata"> ';
					output += '						<div class="col-12"> ';
					output += '							<p>Title: </p> ';
					output += '							<strong class="col-12 file-title">'+ content["title"] +'</strong> ';
						
					output += '							<p class="file-subdata"> ';
					output += '								<strong class="resolution"></strong>';
					output += '							</p> ';
					output += '						</div> ';
					output += '						<div class="col-12"> ';
					output += '							<p>Runtime: </p> ';
					output += '							<strong class="col-12 duration"></strong> ';
					output += '						</div> ';
					output += '						<div class="col-12"> ';
					output += '							<p>Released: </p> ';
					output += '							<strong class="col-12">'+ crawl["header"]["release_date"].replace(/\((\d{4})\)/g, "$1") +'</strong>';
					output += '						</div> ';
					output += '						<div class="col-12"> ';
					output += '							<p>Type: </p> ';
					output += '							<strong class="col-12">'+ crawl["type"]+'</strong>';
					output += '						</div> ';
					output += '					</div> ';
						
					output += '					<h5 class="label-with-border">Audio Language and Subtitle: </h5> ';
						
					output += '					<div class="row file-metadata" style="margin-bottom: 22px;">';
					output += '						<div class="col-12"><br>';
					output += '							<p>Audio: </p> ';
					output += '							<strong class="col-12 red-text"> English (ACC Stereo), Francias (ACC Mono), Francias (ACC Stereo) </strong> ';
					output += '						</div> ';
					output += '						<div class="col-12"> ';
					output += '							<p>Subtitle: </p> ';
					output += '							<strong class="col-12 red-text"> English (SRT External), English (ASS) </strong> ';
					output += '						</div> ';
					output += '					</div> ';
						
					output += '					<h5 class="label-with-border">Pricing Data Points: </h5> ';
					output += '					<div class="meta-data-details no-padding"> ';
					
					output += '					<div class="row file-metadata">';
					output += '						<div class="col-12"><br>';
					output += '							<p>Year Released: </p> ';
					output += '							<strong class="col-12"> '+ crawl["header"]["release_date"].replace(/\((\d{4})\)/g, "$1") +' </strong> ';
					output += '						</div> ';
					output += '						<div class="col-12"> ';
					output += '							<p>Resolution: </p> ';
					output += '							<strong class="col-12 resolution"> N/A </strong> ';
					output += '						</div> ';
					output += '						<div class="col-4"> ';
					output += '							<p>Price in USD: </p> ';
					output += '							<strong class="col-12 usd-price"> </strong> ';
					output += '						</div> ';
					output += '						<div class="col-8"> ';
					output += '							<p style="width: 128px">USD to AVX Rate: </p> ';
					output += '							<strong style="background: #f6f6f6;color: #5d5d5d;font-size: 13px;float: left;padding: 2px 11px; width: 147px" class="col-12">';
					output += '								$1.00 = 0.0025 AVX </strong> ';
					output += '						</div> ';
					output += '						<div class="col-12"> ';
					output += '							<p>AVX Cost: </p> ';
					output += '							<strong class="col-12 price"> N/A </strong> ';
					output += '						</div> ';
					output += '					</div> ';
						
					output += '					<div class="row meta-data-details no-padding"> ';
					output += '						<svg width="100" height="100" style="text-align: center;margin: 0 auto;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" class="lds-dual-ring"><circle cx="50" cy="50" ng-attr-r="{{config.radius}}" ng-attr-stroke-width="{{config.width}}" ng-attr-stroke="{{config.stroke}}" ng-attr-stroke-dasharray="{{config.dasharray}}" fill="none" stroke-linecap="round" r="40" stroke-width="4" stroke="#e15b64" stroke-dasharray="62.83185307179586 62.83185307179586" transform="rotate(203.589 50 50)"><animateTransform attributeName="transform" type="rotate" calcMode="linear" values="0 50 50;360 50 50" keyTimes="0;1" dur="1s" begin="0s" repeatCount="indefinite"></animateTransform></circle></svg>';
					output += '						<canvas id="surface'+item+'" width="677.286px" style="width:100%;margin-top: -120px;" height="250"></canvas>';
					output += '						<img id="txImage" src="../images/horizontal logo_tm_x800.png" style="width: 15%;height: 100%;margin-top: -52px; float: left; margin-left:56px">';
					//output += '						<p class="graph-label">$10.00 = 0.0025BTC = 39.123415 AVX</p> ';
					
					output += '						<div class="payment-break-down mb-5"> ';
					output += '							<h5 class="label-with-border break-down">See where your token goes </h5> ';
					output += '								<ul class="ml-5"> ';
					output += '									<li> ';
					output += '										60% = <span id="sixtyP'+item+'"></span> AVX goes to Intellectual Property owners acount. ';
					output += '									</li> ';
					output += '								<li> ';
					output += '										35% = <span id="thirtyP'+item+'"></span> AVX, normally goes to file uploaders, but on file genesis, this goes to the AVX network as a fee to save the new file into the avx network. Please note you will not be uploading this file at this time, it is only entered into the records as being available from you. Any and all uploading will be compensated. ';
					output += '								</li> ';
					output += '								<li> ';
					output += '										5% = <span id="fiveP'+item+'"></span> AVX will go to the nodes maintaining the AVX network. ';
					output += '								</li> ';
					output += '							</ul> ';
					output += '						</div> ';
					output += '					</div> ';					
					output += '				</div> ';					
					output += '			</div>';
					output += '			</div>';					
					output += '		</div>';
					output += '		<script>';
					output += '			$("#breakFile'+item+'").click( () => { ';
					output += '				$("#file'+item+'").slideToggle("slow"); ';
					output += '			});';
					output += '		</script>';
					output += '	</div>';

					

				
				filesTitle.push(content["title"]);	

				item++;	
				//if ( item == filesLength) {
					setTimeout(function() {
						crawlPriceSource(filesTitle, itemLength, filesLength );
						itemLength++;
					}, 1000);
				//}
				
				
			}
		  
		  
		  
		});
		$('[pd-popup="shareMarketPriceForMultipleModal"] .file-payment-lists-container').html(output);
		
		
		
		$('[pd-popup="shareConfirmMetadataModal"]').fadeOut(100);
		$('[pd-popup="shareMarketPriceForMultipleModal"]').fadeIn(100);
		
		
		
		
	});




	$('#ShareModalView').on("click","#executePayment", function() {
		
		let totalAmount = parseFloat($('[pd-popup="shareMarketPriceForMultipleModal"] #priceAVX' ).attr("fullprice") );
		let currentBalance = parseFloat ($('[pd-popup="shareMarketPriceForMultipleModal"] #walletBalance' ).html() );
		
		if ( totalAmount > currentBalance ) {
			alert("You have an insuficient AVX token");
			
		} else {
		

			let files = $('[pd-popup="shareConfirmMetadataModal"] .file-movie-details');
			let assetsData = [];
			let count = 0; 
			let category = $('[pd-popup="shareScanResultModal"] #fileCategory').val();
			let jsonAssetUpload = ''; 

			$.each( files, function( key, value ) {
			  var data = $(this).find("textarea").text();
			  
			  switch(category) {
				  case 'movie' :
					assetsData[count] = JSON.parse(decodeURIComponent(data));
				  break;
				  case 'tv':
					assetsData[count] = JSON.parse(data); 
				  break;
			  }
			  
			  count++;
			});

			let filepath = $('#fullFilePathDir').val();
			let amount = $('[pd-popup="shareMarketPriceForMultipleModal"] .popup-inner-white #priceAVX').attr("full-price");

			jsonAssetUpload = {
				status : 1116,
				data : assetsData,
				action : category,
				amount	: amount //TOTAL AMOUNT
			};
			console.log( JSON.stringify(jsonAssetUpload) );
			ipcRenderer.send('avx-share-upload-asset', JSON.stringify(jsonAssetUpload) );	
		}
		ipcRenderer.on('avx-upload-payment-response', (event, data) => {
			store.set("ShareUploadTxKey", data["data"]["tx_key"]);
			$('[pd-popup="shareMarketPriceForMultipleModal"]').fadeOut(100);
			$('[pd-popup="sharePaymentWaitingModal"]').fadeIn(100);

		});
		// }, 1000);
		// setTimeout(function() {
			// POPULATE DATA ON SCREEN
			// let data = store.get('avx-share-upload-payment-response');
			// store.delete('avx-share-upload-payment-response');
			 //location.reload();
		// }, 1000);
		
	});
	
	ipcRenderer.on('avx-share-respond-file-selected-metadata', (event, data) => {
		let shareUploadTxKey = store.get("ShareUploadTxKey");
		if ( shareUploadTxKey ) {
			if ( shareUploadTxKey ==  data["tx_key"]) {
				//success
				var jdata = {
					status: 1130,
					type: 0
				};
				jdata = JSON.stringify(jdata);
				ipcRenderer.send('get-wallet-data', jdata);
				
				setTimeout(function() {	
				
					$('[pd-popup="sharePaymentWaitingModal"]').fadeOut(100);
					$('[pd-popup="sharePaymentSuccessModal"]').fadeIn(100);
					store.delete("ShareUploadTxKey");

				},1000);
			}
		}

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
			status : 1127,
			data : {
				filenamePath	: 	path,
				action 			: 	action
			}
		}
	
		let jsonString = JSON.stringify(json);
			
		ipcRenderer.send('avx-share-upload-file', jsonString);


		ipcRenderer.on('avx-share-upload-scan-results', (event, data) => {
			let jsonString = JSON.stringify(data);
			$('[pd-popup="shareScanResultModal"] #fileCategory').val(data["data"]["action"]);
			
			var dtp = new DirTreeParserVideo(data["data"]["tree"]);
			console.log(data["data"]["tree"]);
			$('[pd-popup="shareConfirmMetadataModal"] .file-preview-desc-tv textarea').text( encodeURIComponent( JSON.stringify(data["data"]["tree"]) )) ;
			$(".generateFileScanned").html(dtp.getHtmlTree());
			$(".file-dir-info span:nth-child(1)").html(path);
			$( ".item-file-meta" ).on( "click", shareShowMetadataPerFile );
			activateToggleDIR();
			
			let trigger = $('[pd-popup="shareScanResultModal"] .video-duration strong').html();
			$('[pd-popup="shareScanResultModal"] .generateFileScanned .item-file-meta').eq(0).click();

					
			// CLEAR Modal
			$('[pd-popup="shareConfirmMetadataModal"] .file-preview-desc-tv textarea').attr("generated","");

		});
		
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
					status : 1127,
					data : {
						filenamePath	: path,
						action 	: action
					}
				}
				
				let jsonString = JSON.stringify(json);
					
				ipcRenderer.send('avx-share-upload-file', jsonString);


				ipcRenderer.on('avx-share-upload-scan-results', (event, data) => {
					let jsonString = JSON.stringify(data);
					$('[pd-popup="shareScanResultModal"] #fileCategory').val(data["data"]["action"]);
					
					var dtp = new DirTreeParserVideo(data["data"]["tree"]);
					$('[pd-popup="shareConfirmMetadataModal"] .file-preview-desc-tv textarea').text( encodeURIComponent( JSON.stringify(data["data"]["tree"]) )) ;
					$(".generateFileScanned").html(dtp.getHtmlTree());
					$(".file-dir-info span:nth-child(1)").html(path);
					$( ".item-file-meta" ).on( "click", shareShowMetadataPerFile );
					activateToggleDIR();
					
					let trigger = $('[pd-popup="shareScanResultModal"] .video-duration strong').html();
					$('[pd-popup="shareScanResultModal"] .generateFileScanned .item-file-meta').eq(0).click();
					
					// CLEAR Modal
					$('[pd-popup="shareConfirmMetadataModal"] .file-preview-desc-tv textarea').attr("generated", "")

				});

				
				$('[pd-popup="shareScanningModal"]').fadeIn(100);
				getScanLoadingForModal( 3000, 'shareScanningModal', 'shareScanResultModal' );
			  
		  } else {
			  alert("Please select a folder");
		  }
		}
	}
	
};


/** 1.3 Select scanned files **/
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

/** 1.4 Select movie assets preview  **/
setTimeout(function() {
	$('.file-movie-content').on("click",".img", function() {
		let category = $('[pd-popup="shareScanResultModal"] #fileCategory').val();
					
		$(".file-movie-content .img").removeClass('active');
		$(this).addClass('active');
		let imageSrc = $(this).css('background-image');

		$('#shareStyleBG').remove();
		$('body').append('<style id="shareStyleBG">.popup[pd-popup="shareConfirmMetadataModal"] .popup-inner.scroll-skin:before { content:'+ imageSrc +';}</style>');
		
		imageSrc = imageSrc.replace(/"/g, "'");
		imageSrc = ' background-image: '+ imageSrc;
		$('.popup[pd-popup="shareConfirmMetadataModal"] .file-feature-img').attr('style', imageSrc );
		
		let data = JSON.parse(($(this).parent().find("textarea").text()));
		let crawl = JSON.parse(data["crawl"]);


			//GENERATE RESULT
			$(".popup.scan-result .file-title").html(decodeURIComponent(data["title"]));
			let year = crawl["header"]["release_date"].replace(/\((\d{4})\)/g, "$1");
			let durationOnText = data["metadata"]["duration"]; 
			$(".popup.scan-result .file-title").append('<span class="file-year">'+ year +'</span>');
			$(".popup.scan-result .metadata-desc").html(decodeURIComponent(crawl["header"]["synopsis"]));
			$(".popup.scan-result .file-feature-img").css("background-image","url('"+crawl["header"]["poster"]+"'");
			$(".popup.scan-result .file-subdata span").html(   getDuration(durationOnText) );
			//$(".popup.scan-result .file-rating").html(decodeURIComponent( getResolution(parseInt(data["metadata"]["height"]), 1 ) ) + "p");
			$(".popup.scan-result .file-rating").html("PG - 13");
			$(".popup.scan-result .file-producer").html(decodeURIComponent(crawl["producer"]));
			$(".popup.scan-result .file-studio").html(decodeURIComponent(crawl["company"]));
			
			
			let companyArray = decodeURIComponent(crawl["company"]).split(',');
			
			if ( $.isArray(companyArray) ) {
				$(".popup.scan-result .accountName").html(companyArray[0] + "/" +  decodeURIComponent(data["title"]) );
			}

			
			//DIRECTORS
			let directors = crawl["header"]["directors"];
			if (directors instanceof Array) {
				 directors =  directors.join(', ');
			} 
			$(".popup.scan-result .file-director").html(directors);

			
			//GENRE
			let genre = crawl["header"]["genres"];
			if (genre instanceof Array) {
				genre =  genre.join(', ');
			}
			$(".popup.scan-result .file-genre").html(genre);
			
			//ACTORS
			let actors = crawl["cast"];
			let actorsData = '';
			let actorsCounter = 0;
			let actorsCounterActive = 0;
			
			$.each( actors, function( i, actor ) {

				if (actorsCounter == 0 )  {
					if ( actorsCounterActive == 0) {
						actorsData += '<div class="carousel-item row no-gutters active">';
					} else {
						actorsData += '<div class="carousel-item row no-gutters">';
					}
					
					
					
				}
				actorsCounterActive++;
				
				actorsData += '<div class="col-2 file-actor-details">';
				actorsData += '<div class="img" style="background-image: url('+ "'" + actor["thumb"].replace(/(\r\n|\n|\r|'|")/gm, "") + "'" +')"></div>';
				actorsData += '<label class="name">'+ decodeURIComponent(actor["actor"]) +'</label> ';
				actorsData += '<p class="role">'+ decodeURIComponent(actor["character"]) +'</p>'
				actorsData += '</div>';
				
				if (actorsCounter == 5 ) {
					actorsCounter = 0;
					actorsData += '</div>';
				} else {
					actorsCounter++;
				} 
				

				
			});
			
			selectedAssets = ' active';
			$(".popup.scan-result .file-actor-content").html(actorsData);
		
		if ( category == 'movie') {
			
			//METADATA
			$('[pd-popup="shareConfirmMetadataModal"] .aspect-ratio strong'). html(data["metadata"]["aspect_ratio"]);
			$('[pd-popup="shareConfirmMetadataModal"] .audio-bitrate strong'). html(data["metadata"]["audio_bitrate"]);
			$('[pd-popup="shareConfirmMetadataModal"] .audio-codec strong'). html(data["metadata"]["audio_codec_name"]);
			$('[pd-popup="shareConfirmMetadataModal"] .bit-depth strong'). html(data["metadata"]["bit_depth"]);
			$('[pd-popup="shareConfirmMetadataModal"] .audio-channel-layout strong'). html(data["metadata"]["channel_layout"]);
			$('[pd-popup="shareConfirmMetadataModal"] .audio-channels strong'). html(data["metadata"]["channels"]);
			$('[pd-popup="shareConfirmMetadataModal"] .video-duration strong, [pd-popup="shareConfirmMetadataModal"] .video-duration-head'). html( getDuration(data["metadata"]["duration"]));
			$('[pd-popup="shareConfirmMetadataModal"] .video-size strong'). html( formatBytes(data["metadata"]["filesize"]) );
			$('[pd-popup="shareConfirmMetadataModal"] .video-height strong'). html(data["metadata"]["height"]);
			$('[pd-popup="shareConfirmMetadataModal"] .audio-sampling-rate strong'). html(data["metadata"]["sampling_rate"]);
			$('[pd-popup="shareConfirmMetadataModal"] .audio-video-bitrate strong'). html(data["metadata"]["video_bitrate"]);
			$('[pd-popup="shareConfirmMetadataModal"] .video-codec strong'). html(data["metadata"]["video_codec_name"]);
			$('[pd-popup="shareConfirmMetadataModal"] .video-frame-rate strong'). html(data["metadata"]["video_frame_rate"]);
			$('[pd-popup="shareConfirmMetadataModal"] .video-profile strong'). html(data["metadata"]["video_profile"]);
			$('[pd-popup="shareConfirmMetadataModal"] .video-reso strong'). html( (getResolution(data["metadata"]["height"] , 1)) + "p");
			$('[pd-popup="shareConfirmMetadataModal"] .video-width strong'). html(data["metadata"]["width"]);
			
			 $('[pd-popup="shareConfirmMetadataModal"] .title-holder').attr("tabindex",-1).focus();
			 
		} else if ( category == 'tv' ) {
			
			let table = $('[pd-popup="shareConfirmMetadataModal"] .tv-shows-content table tbody');
			table.html("");
			
			let getSeasons = $('[pd-popup="shareConfirmMetadataModal"] .file-movie-content .file-movie-details');
			let counterSeasons = 0;
			let seasonsArray = [];
			let seasonData = JSON.parse( decodeURIComponent( $('[pd-popup="shareConfirmMetadataModal"] .file-preview-desc-tv textarea').text() ) );
			let seasonDatalength = Object.keys(seasonData).length;
			let currentSeason = 0;
			
			
			let checkIfgenerated = $('[pd-popup="shareConfirmMetadataModal"] .file-preview-desc-tv textarea');
			
			if (typeof checkIfgenerated.attr("scan") == 'undefined') {

				$.each(seasonData, function( indexSeasons, value ) {
					let seasonContainter = new Array();
					let currentSeason = checkIfgenerated.attr("generated"); 
					let individualDir = $('[pd-popup="shareConfirmMetadataModal"] .file-movie-content .file-movie-details p.title:contains("'+indexSeasons+'")').parent().find("textarea").attr("filedir");
					seasonContainter = currentSeason.split(",");
					
					seasonContainter = $.grep(seasonContainter,function(n){
						return(n);
					});
					seasonContainter = seasonContainter.filter(function(elem, index, self) {
						return index === self.indexOf(elem);
					});
					
					if (  typeof individualDir == 'undefined' ) {

							setTimeout(function() {
								if ( checkStringExistOnArray( indexSeasons,seasonContainter ) !== 1 ) {

									$.each(seasonData[indexSeasons], function( index, value ) {
										let noEps = parseInt(index) + 1;
										getFileMetadata( decodeURIComponent(individualDir)+"\\"+ value["name"], decodeURIComponent(individualDir),  'tv' );
										
									});	
				  
								}
								
								seasonContainter.push(indexSeasons);
								checkIfgenerated.attr("generated", seasonContainter.join(",") );
							
							},
							3000);
					} else {
						if ( checkStringExistOnArray( indexSeasons,seasonContainter ) !== 1 ) {

							$.each(seasonData[indexSeasons], function( index, value ) {
								let noEps = parseInt(index) + 1;
								getFileMetadata( decodeURIComponent(individualDir)+"\\"+ value["name"], decodeURIComponent(individualDir),  'tv' );
								
							});	
		  
						}
						
						seasonContainter.push(indexSeasons);
						checkIfgenerated.attr("generated", seasonContainter.join(",") );
					}
				});
				
			}
				
			let eps = crawl["episode_titles"];
			let metadata = data["metadata"];
			let epsList = '';
			let count= 0;

			
			if (  typeof metadata !== 'undefined' ) {
				var totalDuration = 0;
				let populateEpslist = 0;
				for (var i in eps) {	
					count++;
					let myNumber = count;
					var dec = myNumber - Math.floor(myNumber);
					var duration = (  typeof metadata[i]["duration"] !== 'undefined' ) ? metadata[i]["duration"]  : 0;
	
					epsList += '<tr indexEp="'+ i +'">';
					epsList += '	<td>E'+ ("0" + myNumber).slice(-2) +'</td>';
					epsList += '	<td>'+ decodeURIComponent(crawl["episode_titles"][i]) +'</td> ';
					epsList += '	<td>';
					epsList += '		<p>'+ limitString(decodeURIComponent(crawl["episode_sypnopses"][i]) , 80, true) +'</p>';
					epsList += '	</td> ';
					epsList += '	<td>'+ getDuration(duration) +'</td>';
					epsList += '	<td>'+ formatBytes(metadata[i]["filesize"], 2) +'</td>';
					epsList += '</tr>';
					
					totalDuration = totalDuration + duration;
					populateEpslist = 1;
					//console.log(typeof metadata[i]["duration"]);

				};
				if ( populateEpslist == 1) {
					setTimeout(function() {
						$('[pd-popup="shareConfirmMetadataModal"] .tv-shows-content tbody tr').eq(0).click();
						$('[pd-popup="shareConfirmMetadataModal"] .file-metadata-desc-tv .runtime strong').html( getDuration(totalDuration) );
					
						$('[pd-popup="shareConfirmMetadataModal"] .file-metadata-desc-tv .no-eps strong').html(metadata.length);
					},500);
				}
				
				
			}
			table.html(epsList);
			table.find('tr:nth-child(1)').attr("class", "active");
			
			
	
		}
		
		
		
	});
}, 100);



/** 1.4 Select tv assets preview  **/
setTimeout(function() {
	$('[pd-popup="shareConfirmMetadataModal"] .tv-shows-content table tbody').on("click","tr", function() {
		$('[pd-popup="shareConfirmMetadataModal"] .tv-shows-content table tbody tr').removeClass('active');
		$(this).addClass('active');
		let season = $('[pd-popup="shareConfirmMetadataModal"] .file-movie-details .active').parent().find(".title").html();
		let data = JSON.parse($('[pd-popup="shareConfirmMetadataModal"] .file-movie-details .img.active').parent().find('textarea').text());
		let row = $(this).attr('indexep');
		//console.log(data);
		let crawl = JSON.parse( data["crawl"] );
		console.log(crawl);
		let currentRow = $(this).find('td').html();
		let lastRow = $('[pd-popup="shareConfirmMetadataModal"] .tv-shows-content table tbody tr:last-child td').html();
		
		var decCurrent = currentRow - Math.floor(currentRow);
		var declast = declast - Math.floor(declast);
		
		//Episodes DATA
		$('[pd-popup="shareConfirmMetadataModal"] .file-preview-desc-tv .eps-title strong').html( decodeURIComponent(crawl['episode_titles'][row]) );
		$('[pd-popup="shareConfirmMetadataModal"] .file-preview-desc-tv .eps-desc').html( decodeURIComponent( crawl['episode_sypnopses'][row]) );
		$('[pd-popup="shareConfirmMetadataModal"] .file-preview-desc-tv .runtime strong').html(getDuration(data["metadata"][row]["duration"]));
		$('[pd-popup="shareConfirmMetadataModal"] .file-preview-desc-tv .eps-thumbnail').css("background-image","url('"+ crawl['thumbs'][row] +"')");
		$('[pd-popup="shareConfirmMetadataModal"] .file-preview-desc-tv .no-eps strong').html( currentRow  );
		$('[pd-popup="shareConfirmMetadataModal"] .file-preview-desc-tv .no-eps strong:last-child').html(lastRow );
		
		//METADATA
		$('[pd-popup="shareConfirmMetadataModal"] .aspect-ratio strong'). html(data["metadata"][row]["aspect_ratio"]);
		$('[pd-popup="shareConfirmMetadataModal"] .audio-bitrate strong'). html(data["metadata"][row]["audio_bitrate"]);
		$('[pd-popup="shareConfirmMetadataModal"] .audio-codec strong'). html(data["metadata"][row]["audio_codec_name"]);
		$('[pd-popup="shareConfirmMetadataModal"] .bit-depth strong'). html(data["metadata"][row]["bit_depth"]);
		$('[pd-popup="shareConfirmMetadataModal"] .audio-channel-layout strong'). html(data["metadata"][row]["channel_layout"]);
		$('[pd-popup="shareConfirmMetadataModal"] .audio-channels strong'). html(data["metadata"][row]["channels"]);
		$('[pd-popup="shareConfirmMetadataModal"] .video-duration strong, [pd-popup="shareConfirmMetadataModal"] .video-duration-head'). html(getDuration(data["metadata"][row]["duration"]));
		$('[pd-popup="shareConfirmMetadataModal"] .video-size strong'). html( formatBytes(data["metadata"][row]["filesize"]), 2);
		$('[pd-popup="shareConfirmMetadataModal"] .video-height strong'). html(data["metadata"][row]["height"]);
		$('[pd-popup="shareConfirmMetadataModal"] .audio-sampling-rate strong'). html(data["metadata"][row]["sampling_rate"]);
		$('[pd-popup="shareConfirmMetadataModal"] .audio-video-bitrate strong'). html(data["metadata"][row]["video_bitrate"]);
		$('[pd-popup="shareConfirmMetadataModal"] .video-codec strong'). html(data["metadata"][row]["video_codec_name"]);
		$('[pd-popup="shareConfirmMetadataModal"] .video-frame-rate strong'). html(data["metadata"][row]["video_frame_rate"]);
		$('[pd-popup="shareConfirmMetadataModal"] .video-profile strong'). html(data["metadata"][row]["video_profile"]);
		$('[pd-popup="shareConfirmMetadataModal"] .video-reso strong'). html(  (getResolution(data["data"]["file_metadata"]["height"] , 1)) + "p" );
		$('[pd-popup="shareConfirmMetadataModal"] .video-width strong'). html(data["metadata"][row]["width"]);
	});
	
}, 100);
	
	
/** 2 Classes and Functions **/

/*** 2.1 DIR Scan ***/
class DirTreeParserVideo {
	constructor(jsonTree) {
		this.dirtree = '';
		this.setJsonTree(jsonTree);
		this.parse(this.jsonTree, 0, '');
	}
	
	parse(jsonTree, level, dir) {
		var flag = false;
		var countPlayableFiles = 0;
		
		for (var key in jsonTree) {
			let currObj = jsonTree[key];
			
			if (typeof currObj == 'object' && Object.keys(currObj).length > 0) {
				
				
				if (("name" in currObj) && typeof currObj["name"] == 'string') {

					this.dirtree += '<div class="file-scanned">';
					this.dirtree += '<ul class="file-lists">';
					this.dirtree += '<li>';
					this.dirtree += '<p>';
						
					if ( checkFileForVideoPlayable(currObj["name"]) > 0 ) {
						this.dirtree += '<span class="pointer-cursor item-file-meta icon-segoe segoe-info float-left" file-name="'+currObj["name"]+'" file-size="'+ currObj["size"]+'" ></span> '; 
					}
					
					this.dirtree += '<span class="icon-segoe segoe-v-player float-left" ></span>'; 
					this.dirtree += '<span>' + currObj["name"] +'</span>'; 
					this.dirtree += '<strong> - ' + formatBytes(currObj["size"], 2) + '</strong>';
					this.dirtree += '</p>';
					this.dirtree += '</li>';
					this.dirtree += '</ul>';
					this.dirtree += '</div>';

				} else {
					if ( level == 0 ){
						dir = "";
					}
					dir = dir + "\\" + key;
					this.dirtree += '<div class="file-scanned item-file-meta-parent"  dir = "'+ dir+'">';
					this.dirtree += '<label class="title toggleable">';
					this.dirtree += '<p>'; 
					this.dirtree += '<span class="icon-segoe segoe-flick-left float-left toogle-icon"></span>'; 
					this.dirtree += '<span class="icon-segoe segoe-tree-folder-folder"></span>'; 
					this.dirtree += '<span class="item-file-meta-foldername">' + key +'</span>';
					this.dirtree += '</p>';
					this.dirtree += '</label>';
					this.dirtree += '<ul class="file-lists">';
					this.dirtree += '<li>';
					this.parse(currObj, level + 1, dir );
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


/*** 2.3 Check if the file is VIDEO FILE ***/

function checkFileForVideoPlayable( filename  ) {
	let file_ext =  filename.substring(filename.lastIndexOf('.') + 1);
	let video_lists = [ "webm", "mkv", "flv", "vob", "ogg", "ogv", "avi", "mov", "wmv", "mpg", "mpeg", "mpe", "mpv", "m2v", "m4v", "mp4"];
	let results = $.inArray( file_ext.toLowerCase(), video_lists );
	return ( results < 0 ) ? 0 : 1;
}


/*** 2.4 Check if the file is VIDEO FILE ***/
function activateToggleDIR() {
	
	$(".file-scanned .title.toggleable").parent().find('.file-lists').css('display', 'none');
	//$(".file-scanned .item-file-meta-parent .file-lists").css('display', 'none');
	
	$(".title.toggleable").click(function () {
		var action = $(this).attr('action');
		if (action == 'close') {
			$(this).attr('action', 'open');
			$(this).find('.toogle-icon').removeClass('segoe-flick-up');
			$(this).find('.toogle-icon').addClass('segoe-flick-left');
			$(this).parent().closest('.file-lists').slideUp();
			
		} else {
			$(this).find('.toogle-icon').removeClass('segoe-flick-left');
			$(this).find('.toogle-icon').addClass('segoe-flick-up');
			$(this).attr('action', 'close');
			$(this).parent().find('.file-lists').slideDown();
			
		}
	});
}

/*** 2.5 Get Metadata info per file ***/
function shareShowMetadataPerFile(event) {
	let target = $( event.target );
	let filename = target.attr("file-name");
	target.addClass("active").css("cursor", "progress");
	let url = '';
	let dir  = '';
	
	
	if ( target.attr("disabled") ) {
		//console.log('true');
	} else {
	//	console.log('false');
	}
	
	let folder = target.closest('.item-file-meta-parent').attr("dir");
	if ( folder ) {
		
		url = $("#ShareModalView .file-dir-info span:nth-child(1)").html() + folder +"\\"+ filename;
		dir = $("#ShareModalView .file-dir-info span:nth-child(1)").html() + folder;
	} else {
	
		url = $("#ShareModalView .file-dir-info span:nth-child(1)").html() +"\\"+ filename;
		dir = $("#ShareModalView .file-dir-info span:nth-child(1)").html();
	
	}

	getFileMetadata(url, dir, 'scanned');


51
} 

/*** 2.6 send to crawl file ***/
function shareCrawlFile(path, dir) {
	let category = $('[pd-popup="shareScanResultModal"] #fileCategory').val();
	console.log("CATEGORY: " + category);
	let categoryLabel = '';

	if ( category == 'movie') {

		let jCrawlMovie = {
		   status : 9000,
		   action : category,
			data : {
				files 	: path,
				dir		: dir,
				price	: "100"
		   }
		  }
		  
		var jCrawl = JSON.stringify(jCrawlMovie);
		categoryLabel = "Movie Assets ";
		$('[pd-popup="shareConfirmMetadataModal"] .file-metadata-desc-tv').css("display", "none");
		$('[pd-popup="shareConfirmMetadataModal"] .file-preview-desc-tv').css("display", "none");
		$('[pd-popup="shareConfirmMetadataModal"] .tv-shows-content table').css("display", "none");
		$('[pd-popup="shareConfirmMetadataModal"] .eps-list-label').css("display", "none");
		//$('[pd-popup="shareConfirmMetadataModal"] .tv-shows-content h5.label-with-border').css("display", "none");


	} else if ( category == 'tv' ) {
		
		let files = [];
		let counter = 0;
		let filesListsHolder = [];
		$.each(path, function( index, value ) {
			
			if ( $.inArray(value["dir"], filesListsHolder) == -1 ) {
				let tempFiles = [];
				let dir = value["dir"];
				let price =  "100";
				
				files[counter] = { dir, price };
				filesListsHolder.push(value["dir"]);
				counter++;
				
			}
		});
		

		let jCrawlMovie = {
		   status : 9000,
		   action : category,
			data : files
		  }
		  
		var jCrawl = JSON.stringify(jCrawlMovie);
		
		categoryLabel = "TV Show Seasons ";
		$('[pd-popup="shareConfirmMetadataModal"] .file-metadata-desc-tv').css("display", "block");
		$('[pd-popup="shareConfirmMetadataModal"] .file-preview-desc-tv').css("display", "block");
		$('[pd-popup="shareConfirmMetadataModal"] .tv-shows-content table').css("display", "block");
		$('[pd-popup="shareConfirmMetadataModal"] .eps-list-label').css("display", "block");
		//$('[pd-popup="shareConfirmMetadataModal"] .tv-shows-content h5.label-with-border').css("display", "block");
		
		
		
	}
	

	
	//LABEL CHANGE BASED ON EVENTS CATEGORY
	$('[pd-popup="shareConfirmMetadataModal"] .file-upload-category-label-assets span').html(categoryLabel);
	
	ipcRenderer.send('trigger-crawl-event', jCrawl);
	
}

	
ipcRenderer.on('response-trigger-crawl-event', (event, data) => {

	let crawl = JSON.parse(data["crawl"]);
	let getMovieList = $('.file-movie-content .file-movie-details').length;
	let movieAssets = '';
	let category = $('[pd-popup="shareScanResultModal"] #fileCategory').val();

	

	if ( parseInt(getMovieList) == 0 ) {
		$('[pd-popup="shareConfirmMetadataModal"] .file-movie').parent().parent().css("display", 'none');
		$(".popup.scan-result .file-title").html(decodeURIComponent(data["title"]));
		$(".popup.scan-result .metadata-desc").html(decodeURIComponent(crawl["header"]["synopsis"]));
		$(".popup.scan-result .file-feature-img").css("background-image","url('"+crawl["header"]["poster"]+"'");
		$(".popup.scan-result .file-producer").html(decodeURIComponent(crawl["producer"]));
		$(".popup.scan-result .file-studio").html(decodeURIComponent(crawl["company"]));

		
		//DIRECTORS
		let directors = crawl["header"]["directors"];
		if (directors instanceof Array) {
			 directors =  directors.join(', ');
		} 
		$(".popup.scan-result .file-director").html(directors);

		
		//GENRE
		let genre = crawl["header"]["genres"];
		if (genre instanceof Array) {
			genre =  genre.join(', ');
		}
		$(".popup.scan-result .file-genre").html(genre);
		
		//ACTORS
		let actors = crawl["cast"];
		let actorsData = '';
		let actorsCounter = 0;
		let actorsCounterActive = 0;
		
		$.each( actors, function( i, actor ) {

			if (actorsCounter == 0 )  {
				if ( actorsCounterActive == 0) {
					actorsData += '<div class="carousel-item row no-gutters active">';
				} else {
					actorsData += '<div class="carousel-item row no-gutters">';
				}
				
				 
				
			}
			actorsCounterActive++;
			
			actorsData += '<div class="col-2 file-actor-details ccccc">';
			actorsData += '<div class="img" style="background-image: url('+ "'" + actor["thumb"].replace(/(\r\n|\n|\r|'|")/gm, "") + "'" +')"></div>';
			actorsData += '<label class="name">'+ decodeURIComponent(actor["actor"]) +'</label> ';
			actorsData += '<p class="role">'+ decodeURIComponent(actor["character"]) +'</p>'
			actorsData += '</div>';
			
			if (actorsCounter == 5 ) {
				actorsCounter = 0;
				actorsData += '</div>';
			} else {
				actorsCounter++;
			} 
			
			
			
		});
		
		$(".popup.scan-result .file-actor-content").html(actorsData);
		
		
		
	} else {
		
		$('[pd-popup="shareConfirmMetadataModal"] .file-movie').parent().parent().css("display", 'grid');
	}
	

	movieAssets += '<div class="col-2 file-movie-details">';
	movieAssets += '	<div class="img" style="background-image: url('+ "'" + crawl["header"]["poster"] + "'"+')"></div>';
	movieAssets += '	<p style="font-size: 13px;" class="title">' + decodeURIComponent(data["title"]) + '</p>';
	movieAssets += '	<textarea style="display: none" filepath="'+ encodeURIComponent(data["path"]) +'" filedir="'+ encodeURIComponent(data["dir"]) +'">'+ (JSON.stringify(data)) +'</textarea>';
	movieAssets += '	<p style="font-size: 13px; margin-bottom: 40px;" class="year"> '+ crawl["header"]["release_date"] +' </p>';
	movieAssets += '</div>';
	$('.file-movie-content').append(movieAssets);


	//Request Metadata
	if ( category  == 'movie' ) {
		getFileMetadata( data["path"], data["dir"],  'crawled' );
		
		setTimeout(function() {
			let target = $('[pd-popup="shareConfirmMetadataModal"] .file-movie-details textarea[filepath="'+ encodeURIComponent( data["path"] ) +'"]');
			target.parent().find(".img").click();
		},
		500);
	} else if (category  == 'tv'){
		setTimeout(function() {		
			//update crawl data by selecting first season
			$('[pd-popup="shareConfirmMetadataModal"] .file-movie-content .file-movie-details').eq(0).find('.img').click();

			
		}, 1000);		
	}
	

});

/*** 2.7 Get metadata from crawled file ***/

function getFileMetadata( path, dir, action, counter = 0){

	if ( typeof  path !== "undefined" ) {
		let json = {
			status : 1131,
			data : {
				filename	: path,
				action		: action,
				dir			: dir,
				counter		: counter
				
			}
		}
		
		let jsonString = JSON.stringify(json);
		
		ipcRenderer.send('request-file-metadata', jsonString);
	}
	
}
	
ipcRenderer.on('avx-share-respond-file-metadata', (event, data) => {
	let action 	= data["data"]["action"];
	let filename 	= data["data"]["filename"];

	
	if ( action == "crawled" ) {
		let target = $('[pd-popup="shareConfirmMetadataModal"] .file-movie-details textarea[filepath="'+ encodeURIComponent(filename) +'"]');
		let content = decodeURIComponent(target.text());
			content = JSON.parse(content);
			content['metadata'] = data["data"]["file_metadata"];
			target.text( JSON.stringify(content) );
			
			
	} else if ( action == "tv" ) {
		let target = $('[pd-popup="shareConfirmMetadataModal"] .file-movie-details textarea[filedir="'+ encodeURIComponent(data["data"]["dir"]) +'"]');
		let content = target.text();
			content = JSON.parse(content);
		
		if (typeof content['metadata'] == 'undefined') content['metadata'] = [];
		content['metadata'].push( data["data"]["file_metadata"] );
		target.text( JSON.stringify(content) );
		
		

			

			

	} else if ( action == "scanned" ) {
		
		$("[pd-popup='shareScanResultModal'] .video-reso strong").html(  (getResolution(data["data"]["file_metadata"]["height"] , 1)) + "p"  );
		$("[pd-popup='shareScanResultModal'] .video-duration strong").html( getDuration(data["data"]["file_metadata"]["duration"]) );
		$("[pd-popup='shareScanResultModal'] .video-size strong").html( formatBytes(data["data"]["file_metadata"]["filesize"]) );
		$("[pd-popup='shareScanResultModal'] .audio-video-bitrate strong").html( data["data"]["file_metadata"]["video_bitrate"] );
		$("[pd-popup='shareScanResultModal'] .video-width strong").html( data["data"]["file_metadata"]["width"] );
		$("[pd-popup='shareScanResultModal'] .video-height strong").html( data["data"]["file_metadata"]["height"] );
		$("[pd-popup='shareScanResultModal'] .aspect-ratio strong").html( data["data"]["file_metadata"]["aspect_ratio"] );
		$("[pd-popup='shareScanResultModal'] .video-container strong").html( '' ); //Provide from file name
		$("[pd-popup='shareScanResultModal'] .video-frame-rate strong").html( data["data"]["file_metadata"]["video_frame_rate"] );
		$("[pd-popup='shareScanResultModal'] .video-profile strong").html( data["data"]["file_metadata"]["video_profile"] );
		$("[pd-popup='shareScanResultModal'] .video-codec strong").html( data["data"]["file_metadata"]["video_codec_type"] );
		$("[pd-popup='shareScanResultModal'] .bit-depth strong").html( data["data"]["file_metadata"]["bit_depth"] );
		$("[pd-popup='shareScanResultModal'] .video-frame-rate strong").html( data["data"]["file_metadata"]["video_frame_rate"] );
		$("[pd-popup='shareScanResultModal'] .audio-codec strong").html( data["data"]["file_metadata"]["audio_codec_name"] );
		$("[pd-popup='shareScanResultModal'] .audio-channels strong").html( data["data"]["file_metadata"]["channels"] );
	}
	
});


/*** 2.8 Check string if exist on array ***/
function checkStringExistOnArray(value,arr){
  var status = 0;
 
  for(var i=0; i<arr.length; i++){
    var name = arr[i];
    if(name == value){
      status = 1;
      break;
    }
  }

  return status;
}


/*** 3.0 get price source ***/
function crawlPriceSource(title, count, filesLength) {
	console.log("TEST: "+ "surface"+ count);
	
	let data_crawled = $('[pd-popup="shareConfirmMetadataModal"] .file-movie-content .file-movie-details').eq(count).find('textarea').text();
		data_crawled= JSON.parse(data_crawled);
	let crawled = JSON.parse(data_crawled["crawl"]);
	
	let year = crawled["header"]["release_date"].replace(/\((\d{4})\)/g, "$1");
	let height = parseInt(data_crawled["metadata"]["height"]);

	if (year <= 1999) {
		let pricesArr = [3.95, 4.95, 8.95, 9.95]; 
		let pos = Math.min(getResolution(height), 3);
		datapoints = pricesArr[pos];
	} else if (year <= 2009) {
		let pricesArr = [3.95, 5.95, 7.95, 10.95]; 
		let pos = Math.min(getResolution(height), 3);
		datapoints = pricesArr[pos];
	} else if (year <= 2014) {
		let pricesArr = [3.95, 6.95, 8.95, 11.95]; 
		let pos = Math.min(getResolution(height), 3);
		datapoints = pricesArr[pos];
	} else if (year <= 2017) {
		let pricesArr = [4.95, 7.95, 9.95, 14.95]; 
		let pos = Math.min(getResolution(height), 3);
		datapoints = pricesArr[pos];
	} else {
		let pricesArr = [5.95, 8.95, 11.95, 18.95]; 
		let pos = Math.min(getResolution(height), 3);
		datapoints = pricesArr[pos];
	}

	let lowestPrice = 3.95; 
	let highestPrice = 19.99;
	
	let startRange = Math.floor(lowestPrice);
	let endRange = Math.ceil(highestPrice);
	
	let pr = new PriceRuler("surface"+ count, 10, 250, 10, startRange, endRange);
	pr.setMovable(false);
	
	pr.setDataPoints([datapoints]);

	let price = datapoints;
	let usd_price = datapoints;
	pr.render();

	pr.setPrice(price);
	price = price / 0.0025;
	
	$("#surface"+ count ).attr('price', price);
	$('#sixtyP'+ count ).text( ( price * .6 ).toFixed(8));
    $('#thirtyP'+ count ).text( (price * .3).toFixed(8) );
    $('#fiveP'+ count ).text( (price * .05).toFixed(8) );
	
	
	$('[pd-popup="shareMarketPriceForMultipleModal"] .file-payment-lists-container .file-payment-lists').eq(count).find('.duration').html(getDuration(data_crawled["metadata"]["duration"]) );
	
	$('[pd-popup="shareMarketPriceForMultipleModal"] .file-payment-lists-container .file-payment-lists').eq(count).find('.resolution').html(decodeURIComponent( getResolution(parseInt(data_crawled["metadata"]["height"]), 1 ) ) + "p");
	
	$('[pd-popup="shareMarketPriceForMultipleModal"] .file-payment-lists-container .file-payment-lists').eq(count).find('.price').html(price);
	$('[pd-popup="shareMarketPriceForMultipleModal"] .file-payment-lists-container .file-payment-lists').eq(count).find('.filePrice span.labelPriceTop').html( price.toFixed(8) + " AVX");
	$('[pd-popup="shareMarketPriceForMultipleModal"] .file-payment-lists-container .file-payment-lists').eq(count).find('.usd-price').html( "$" + (price * 0.0025 ).toFixed(2) );
	let getPrices = $('[pd-popup="shareMarketPriceForMultipleModal"] .file-payment-lists');
	
	let avxPrice = 0;
	
	$('[pd-popup="shareMarketPriceForMultipleModal"] #surface'+ count ).parent().find('svg').remove();
	$.each(getPrices, function( index, value ) {
		let price = $(this).find('canvas').attr('price');
		if (typeof price != 'undefined') {
			avxPrice = (avxPrice + parseFloat(price));
			let output = avxPrice.toFixed(8) ;
			let fileResources = $('[pd-popup="shareConfirmMetadataModal"] .file-movie-content .file-movie-details').eq(count).find('textarea').text();
				fileResources = JSON.parse(fileResources);
				
				console.log("PRICE ORIG: " + fileResources["price"]);
				fileResources["price"] = parseFloat(price).toFixed(8);
				console.log("PRICE NEW : " + fileResources["price"]);
				console.log("USD: " + price);
				$('[pd-popup="shareConfirmMetadataModal"] .file-movie-content .file-movie-details').eq(count).find('textarea').text(JSON.stringify(fileResources));

			
				$('[pd-popup="shareMarketPriceForMultipleModal"] .popup-inner-white #priceAVX').html(output+ " AVX");
				$('[pd-popup="shareMarketPriceForMultipleModal"] .popup-inner-white #walletBalanceUsd').html("USD : " + (output * 0.0025 ).toFixed(2));
				$('[pd-popup="shareMarketPriceForMultipleModal"] .popup-inner-white #priceAVX').attr("full-price", output);
				
		}
	})	

	
}