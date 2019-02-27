const Store = require('electron-store');
const store = new Store();
const {ipcRenderer} = require('electron');


$(document).ready(() => {

    $("#btnBack").click(function() {
        location.href = 'video-details.html';
    });
    
    $('#btnBuy').click(() => {
        $('[pd-popup="shareMarketPriceModal"]').fadeIn(100);
    });
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
