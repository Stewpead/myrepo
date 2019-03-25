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
let jData = store.get('file-details-for-download-page');

$(document).ready(() => {

    document.getElementById('file-review').style.display = 'block';

    document.getElementById('artistic-review').style.display = 'none';


    img = '<img src="' + jData['img64'] + '">';
    $('#fileImage').append(img);

    document.getElementById('filetitle').innerHTML = jData['fileID'];

    document.getElementById('fileCost').innerHTML = jData['cost'];

    document.getElementById('fileSize').innerHTML = jData['filesize'];

    document.getElementById('resolution').innerHTML = jData['resolution'];




    
    
    $("#btnBack").click(function() {

        location.href = 'video-details.html';

    });
    
    $('#btnBuy').click(() => {

        $('[pd-popup="shareMarketPriceModal"]').fadeIn(100);

    });

    $('#btnWishlist').click(() => {

        $('[pd-popup="addToWishlist"]').fadeIn(100);

        setTimeout( () => {

            $('[pd-popup="addToWishlist"]').fadeOut(100);

        }, 1500);
 
        var Wishlist = '{"0" : {"filename" : "MADAFAKA"}}';
        var jWishlist = {};
        // jWishlist.items = [{}];
 
        var totalObj = Object.keys(jWishlist).length;
        jWishlist = JSON.parse(Wishlist);
        jWishlist[totalObj].push({ id : "01", filename : 'Fuck you'});
        jWishlist = JSON.stringify(jWishlist); 
        // jWishlist.items.push(
        
        //     { id : totalObj, filename : "Fuck you"}

        // );
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

            $('[pd-popup="shareMarketPriceModal"]').fadeOut(100);
            $('[pd-popup="sharePaymentSuccessModal"]').fadeIn(100);
            let jMessage = {
                status : 5002
            };
            jMessage = JSON.stringify(jMessage);
            ipcRenderer.send('request-hoarding-session', jMessage);

        });

        $('.popup-close').click(() => {
            $('[pd-popup="shareMarketPriceModal"]').fadeOut(100);
        });

        $('#btnCloseSuccess').click( function() {
            $('[pd-popup="sharePaymentSuccessModal"]').fadeOut(100);
        });   

        $('#btnWishlistClose').click( () => {
            $('[pd-popup="addToWishlist"]').fadeOut(100);  
        });

        $('#btnClosevf').click( () => {
            $('[pd-popup="viewFilesModal"]').fadeOut(100);
        });

        // $(".file-feature-img").attr("src", "http://dummyimage.com/250x155/");
        $('.file-feature-img').css('background-image', 'url(' + jData['img64'] + ')');
    }, 100);

});



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
