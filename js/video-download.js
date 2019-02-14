
$(document).ready(() => {
    $("#btnBack").click(function() {
        location.href = 'video-details.html';
    });
    
    $('#btnBuy').click(() => {
        $('[pd-popup="shareMarketPriceModal"]').fadeIn(100);
    });
    
    $('.popup-close').click(() => {
        $('[pd-popup="shareMarketPriceModal"]').fadeOut(100);
    });
    
    $('#executePayment').click(() => {
        $('[pd-popup="shareMarketPriceModal"]').fadeOut(100);
        $('[pd-popup="sharePaymentSuccessModal"]').fadeIn(100);
    });
});