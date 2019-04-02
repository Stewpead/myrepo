const {ipcRenderer} = require('electron');
const path = require('path');
const fs = require('fs');
var obj64 = fs.readFileSync('./json/video-download.json'); 
var json64 = JSON.parse(obj64);
var keys64 = Object.keys(json64);

var data64 = "data:image/jpg;base64,";
const Store = require('electron-store');
const store = new Store(); 

var img = "";

var assetKey = store.get('pass-asset-key');
var indeKey = assetKey["indexKey"];
console.log(assetKey);
var jAsset = store.get('metadata-specific-asset');
console.log(jAsset);

$(document).ready(() => {

    populateScreen();

   

    $("#btnBack").click(function() {

        location.href = 'video-details.html';

    });
    
    $('#btnBuy').click(() => {

        $('[pd-popup="shareMarketPriceForMultipleModal"]').fadeIn(100);

    });

    $('#btnWishlist').click(() => {

        $('[pd-popup="addToWishlist"]').fadeIn(100);

        setTimeout( () => {

            $('[pd-popup="addToWishlist"]').fadeOut(100);

        }, 1500);
 
        var Wishlist = '{"0" : {"filename" : "MADAFAKA"}}';
        var jWishlist = {};

        var totalObj = Object.keys(jWishlist).length;
        jWishlist = JSON.parse(Wishlist);
        jWishlist[totalObj].push({ id : "01", filename : 'Fuck you'});
        jWishlist = JSON.stringify(jWishlist); 


        fs.writeFile("jWishlist.json",jWishlist, function(e) {
            if(e) {
                console.log(e);
            }
        });
        console.log(Object.keys(jWishlist).length);
        console.log(jWishlist);
    });

    $('#btnFileReview').click( () => {
        document.getElementById('file-review').style.display = 'block';
        document.getElementById('artistic-review').style.display = 'none';
    });
    $('#btnArtisticReview').click( () => {
        document.getElementById('file-review').style.display = 'none';
        document.getElementById('artistic-review').style.display = 'block';
    });
    
    $('#btnViewFiles').click( () => {
        $('[pd-popup="viewFilesModal"]').fadeIn(100);
    });

    //Click events in nested modals
    setTimeout( () => {
        //Buy Video/Audio
        $('#executePayment').click( function(){

            $('#executePayment').prop('disabled', true).addClass('disabled', true);


            let jsonBuy = {
                status : 1117,
                asset_key : assetKey['assetKey'],
                amount : assetKey['price']
            }

            jsonBuy = JSON.stringify(jsonBuy);
            ipcRenderer.send('send-buy-this-asset', jsonBuy);


        });

        $('.popup-close').click(() => {
            $('[pd-popup="shareMarketPriceForMultipleModal"]').fadeOut(100);
        });

        $('#btnCloseSuccess').click( function() {
            $('[pd-popup="sharePaymentSuccessModal"]').fadeOut(100);
        });   

        $('#btnWishlistClose').click( () => {
            $('[pd-popup="addToWishlist"]').fadeOut(100);  
        });
        
        $('#btnErrorBuyClose').click( () => {
            $('[pd-popup="ErrorBuyingAsset"]').fadeOut(100);  
        });
        $('#btnClosevf').click( () => {
            $('[pd-popup="viewFilesModal"]').fadeOut(100);
        });


            // 60% file owner
            // 35% seeders
            // 4.9% L2 users
            // .1% AVX wallet

        paymentModalData();


    }, 100);
    ipcRenderer.on('response-buy-this-asset', (event, arg) => {
        if( arg['data']['valid'] == 1) {
            // $('[pd-popup="shareMarketPriceForMultipleModal"]').fade(100);
            // $('[pd-popup="sharePaymentSuccessModal"]').fadeIn(100);
            $('[pd-popup="pleaseWaitModal"]').fadeIn(100);
        } else {
            $('[pd-popup="shareMarketPriceForMultipleModal"]').fadeOut(100);
            $('[pd-popup="ErrorBuyingAsset"]').fadeIn(100);
            
        }
    });
});

function paymentModalData() {

    var walletData;

    let jRequest = {
        status : 1130,
    };

    jRequest = JSON.stringify(jRequest);
    ipcRenderer.send('payment-balance-request', jRequest);

    ipcRenderer.on('payment-balance-request-response', (event, arg) => {
        walletData = arg;
        $('#walletBalance').text(walletData['wallet_data']['balance']);
    });

    $('.file-feature-img').css('background-image', 'url(' + jAsset["crawl"]["header"]["poster"] + ')');
    document.getElementById('file-title').innerHTML = jAsset["info"][indeKey]["title"];
    $('#priceAVX').text(assetKey["price"] + " AVX");
    $('.runtime').text(getDuration(jAsset["info"][indeKey]["metadata"]["duration"]));
    $('.releasedYear').text(jAsset["crawl"]["header"]["release_date"]);
}

function populateScreen() {
    document.getElementById('file-review').style.display = 'block';

    document.getElementById('artistic-review').style.display = 'none';
   

    document.getElementById('filetitle').innerHTML = jAsset["info"][indeKey]["title"];
    document.getElementById('fileyear').innerHTML = jAsset["crawl"]["header"]["release_date"];
    document.getElementById('fileCost').innerHTML = assetKey["price"] + " AVX";
    document.getElementById('duration').innerHTML = getDuration(jAsset["info"][indeKey]["metadata"]["duration"]);
    document.getElementById('fileSize').innerHTML = formatBytes(jAsset["info"][indeKey]["metadata"]["filesize"], 2);
    document.getElementById('audioEncoded').innerHTML = jAsset["info"][indeKey]["metadata"]["audio_codec_name"];
    document.getElementById('plot').innerHTML = jAsset["crawl"]["header"]["synopsis"];
    document.getElementById('sizeLabel').innerHTML = formatBytes(jAsset["info"][indeKey]["metadata"]["filesize"], 2);
    document.getElementById('widthLabel').innerHTML = jAsset["info"][indeKey]["metadata"]["width"];
    document.getElementById('heightLabel').innerHTML = jAsset["info"][indeKey]["metadata"]["height"];
    document.getElementById('sizeLabel').innerHTML = formatBytes(jAsset["info"][indeKey]["metadata"]["filesize"], 2);
    document.getElementById('durationLabel').innerHTML = getDuration(jAsset["info"][indeKey]["metadata"]["duration"]);
    document.getElementById('audioBitrateLabel').innerHTML = jAsset["info"][indeKey]["metadata"]["audio_bitrate"];
    document.getElementById('aspectRatioLabel').innerHTML = jAsset["info"][indeKey]["metadata"]["aspect_ratio"];
    document.getElementById('audNameLabel').innerHTML = jAsset["info"][indeKey]["metadata"]["channels"];
    document.getElementById('samplingRateLabel').innerHTML = jAsset["info"][indeKey]["metadata"]["sampling_rate"];
    document.getElementById('videoFramRateLabel').innerHTML = jAsset["info"][indeKey]["metadata"]["video_frame_rate"];
    document.getElementById('videoCodecLabel').innerHTML = jAsset["info"][indeKey]["metadata"]["video_codec_name"];
    document.getElementById('bitDepth').innerHTML = jAsset["info"][indeKey]["metadata"]["bit_depth"];

    let imgStr = '<img src="' + jAsset["crawl"]["header"]["poster"] + '" id="videoImage">';
    $('#fileImage').html(imgStr);


}
// function headerData() {
//     document.getElementById('filetitle').innerHTML = jAsset["crawl"][""]
// }
 


// 	setTimeout( () => {
// 		/* GET ACCOUNT WALLET ADDRESS */
// 		let jsonWalletAddress = { status : 1125 };
// 		let jsonStringWalletAddress = JSON.stringify(jsonWalletAddress);
// 		ipcRenderer.sendSync('avx-account-wallet-address', jsonStringWalletAddress);
	
// 		// POPULATE DATA ON SCREEN

		
// 		let dataWalletAddress = store.get('avx-account-wallet-address');
// 		store.delete('avx-account-wallet-address');
// 		if(typeof dataWalletAddress != 'undefined') {
// 			$("#walletAddress").val(dataWalletAddress["publicKey"]);
// 		}
		
		
// 	}, 2500);
	

// });


// setTimeout( () => {

// 	$("#executePayment").click(function() {
// 		let data = store.get('set-dashboard-file-selected' );
// 		let wallet = $("#walletAddress").val();
// 		console.log(data);
// 		console.log(wallet);
		
// 		var executeDownload = {
// 			status : 1117,
// 			data : {
// 				sender : wallet,
// 				trackingHash : data,
// 				receiver : 1,
// 				amount : 100,
// 				type : 3,
// 			}
			
// 		};
// 		console.log(JSON.stringify(executeDownload));
// 		executeDownload = JSON.stringify(executeDownload);
// 		ipcRenderer.send('set-generate-download', executeDownload);
		
// 		setTimeout(function() {
		
		
// 		// POPULATE DATA ON SCREEN
// 		let generateDownload = store.get('set-generate-download');
// 		store.delete('set-generate-download');
// 		if(typeof generateDownload != 'undefined') {
// 			//$('span.Waddress').html(dataWalletAddress["publicKey"]);
// 			console.log(generateDownload);
// 		}
		
			
// 		}, 2500);
		

// 	});
// }, 1000);
