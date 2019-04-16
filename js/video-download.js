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
store.delete('pass-asset-key');

var indeKey = assetKey["indexKey"];

var jAsset = store.get('metadata-specific-asset');
store.delete('metadata-specific-asset');
console.log(jAsset);
var walletData;
var currentBal;
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
        // $('[pd-popup="viewFilesModal"]').fadeIn(100);
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
            currentBal = walletData['wallet_data']['balance'];
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

            // JWU SML TBH 

        paymentModalData();

        $('#btnCloseSuccess').click( () => {
            $('[pd-popup="sharePaymentSuccessModal"]').fadeOut(100);
        });

        $('#breakFileOne').click( () => {
            $('#fileOne').slideToggle('slow');
        });
        
        let lowestPrice = 3.95; 
        let highestPrice = 19.99;
        
	let startRange = Math.floor(lowestPrice);
	let endRange = Math.ceil(highestPrice);
	
	let pr = new PriceRuler("surfaceFileDownloadCanvas" , 10, 250, 10, startRange, endRange);
    pr.setMovable(false);

    let year = jAsset["crawl"]["header"]["release_date"].replace(/\((\d{4})\)/g, "$1");
    let height = (parseInt(jAsset["info"][indeKey]["metadata"]["height"]));

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

    pr.setDataPoints([datapoints]);

        
    let price = datapoints;
    let usd_price = datapoints;
    pr.render();


    pr.setPrice(price);
    price = price / 0.0025;
// 
    }, 100);
    var tx_key = "";
    ipcRenderer.on('response-buy-this-asset', (event, arg) => {
        tx_key = arg['data']['tx_key'];
        if( arg['data']['valid'] == 1) {
            $('[pd-popup="pleaseWaitModal"]').fadeIn(100);
        } else {
            $('[pd-popup="shareMarketPriceForMultipleModal"]').fadeOut(100);
            $('[pd-popup="ErrorBuyingAsset"]').fadeIn(100);
            
        }
    });
     
    ipcRenderer.on('response-download-payment', (event, arg) => {

        if ( arg['tx_key'] == tx_key ) {
           
            var leftBalance = currentBal - assetKey['price'];

            setTimeout( () => {
                $('[pd-popup="shareMarketPriceForMultipleModal"]').fadeOut(100);
                $('[pd-popup="pleaseWaitModal"]').fadeOut(100);
                $('#updatedBalance').text(leftBalance);
                $('[pd-popup="sharePaymentSuccessModal"]').fadeIn(100);
            }, 100);

        }
        


    });
});





function paymentModalData() {



    let jRequest = {
        status : 1130,
        type: 0
    };

    jRequest = JSON.stringify(jRequest);
    ipcRenderer.send('payment-balance-request', jRequest);

    ipcRenderer.on('payment-balance-request-response', (event, arg) => {
        walletData = arg;
        $('#walletBalance').text(parseFloat(walletData['wallet_data']['balance']).toFixed(2));

    });

    $('.file-feature-img').css('background-image', 'url(' + jAsset["crawl"]["header"]["poster"] + ')');
    document.getElementById('filetitle').innerHTML = jAsset["info"][indeKey]["title"];

    $('.fileTitle').text(jAsset["info"][indeKey]["title"]);

    let height = parseInt(jAsset["info"][indeKey]["metadata"]["height"]);

    $('.resolution').text(getResolution(height, 1));

    $('.filePrice').text(parseFloat(assetKey["price"]).toFixed(2));

    $('.duration').text(getDuration(jAsset["info"][indeKey]["metadata"]["duration"]));

    $('.releaseDate').text(jAsset["crawl"]["header"]["release_date"].replace(/\((\d{4})\)/g, "$1"));

    $('.yearsreleased').text(jAsset["crawl"]["header"]["release_date"].replace(/\((\d{4})\)/g, "$1"));

    let usd = parseInt(jAsset["crawl"]["header"]["release_date"].replace(/\((\d{4})\)/g, "$1")) * .0025;
    $('.usd-price').text( "$" + (usd.toFixed(2)) );

    
    let priceavx = parseFloat(assetKey["price"]).toFixed(2);
    $('#usdavx').text("$" + usd);
    $('#priceOfAVX').text(priceavx);
    
    console.log(assetKey);

    $('#sixtyP').text( (priceavx * .6).toFixed(8) ) ;
    $('#thirtyP').text( (priceavx * .3).toFixed(8) );
    $('#fiveP').text( (priceavx * .05).toFixed(8) );

    $('#priceAVX').text(priceavx + " AVX");

    $('.runtime').text(getDuration(jAsset["info"][indeKey]["metadata"]["duration"]));

    $('.releasedYear').text(jAsset["crawl"]["header"]["release_date"]);
    $('.price').text(parseInt(assetKey["price"]).toFixed(2));
}

function populateScreen() {
    document.getElementById('file-review').style.display = 'block';

    document.getElementById('artistic-review').style.display = 'none';
   

    // document.getElementById('filetitle').innerHTML = jAsset["info"][indeKey]["title"];
    document.getElementById('fileyear').innerHTML = jAsset["crawl"]["header"]["release_date"];
    let filecost = assetKey["price"];
    document.getElementById('fileCost').innerHTML = parseFloat(filecost).toFixed(2) + " AVX";
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

    let imgStr = '<img class="img-fluid" src="' + jAsset["crawl"]["header"]["poster"] + '" id="videoImage">';
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
