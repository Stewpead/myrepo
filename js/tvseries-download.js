$('#btnBuy').click(() => {
    $('[pd-popup="shareMarketPriceForMultipleModal"]').fadeIn(100);
});

$('#btnViewFiles').click( () => {
    $('[pd-popup="viewFilesModal"]').fadeIn(100);
});

$('#toggleTrackList').click( () => {
    $('#trackSectionToggle').slideToggle();
});

$('#mediaDetailsToggle').click( () => {
    $('#mediaDetailsSection').slideToggle();
});

setTimeout( () => {

    $('.popup-close').click(() => {
        $('[pd-popup="shareMarketPriceForMultipleModal"]').fadeOut(100);
    });

    $('#executePayment').click( () => {
        let jsonBuy = {
            status : 100000000
        };
    });

    $('#btnClosevf').click( () => {
        $('[pd-popup="viewFilesModal"]').fadeOut(100);
    });

    $('#btnWishlistClose').click( () => {
        $('[pd-popup="addToWishlist"]').fadeOut(100);  
    });

    $('#btnWishlist').click(() => {

        $('[pd-popup="addToWishlist"]').fadeIn(100);

        setTimeout( () => {

            $('[pd-popup="addToWishlist"]').fadeOut(100);

        }, 1500);
        
    });


}, 50);