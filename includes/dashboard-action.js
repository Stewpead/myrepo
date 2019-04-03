const Store = require('electron-store');
const url = require('url');
const path = require('path');
const app_dir = './../winPage/';

module.exports = {
  shareUploadResponse: function (data) {
	console.log(data);
	
  },

  getMetaDataDIRTREE: function (data) {

	const store = new Store();	
	
	defaultWindow.webContents.send('avx-share-upload-scan-results', data);

		
  },
  
  sharePaymentResponse: function (data) {
	defaultWindow.webContents.send('avx-upload-payment-response', data);

  },
  
  getAccountBalance: function (data) {
	var store = new Store();
	store.delete('avx-account-balance');
	store.set('avx-account-balance', data); 


  },
  
  getAccountSpent: function (data) {
	const store = new Store();
	store.set('avx-account-spent', data);

  },
  
  getAccountHistory: function (data) {
    defaultWindow.webContents.send('response-acc-history-display', data);

  },
  
  getPublicKey: function (data) {

  const store = new Store();
  
  store.set('avx-account-wallet-address', data);
  
  },

  getWalletData: function (data) {

    defaultWindow.webContents.send('avx-wallet-data', data);
    defaultWindow.webContents.send('payment-balance-request-response', data);
    
  },
  
  sendFund: function (data) {

    defaultWindow.webContents.send('avx-account-send-wallet', data);
    
  },
  
  getAsset: function (data) {
    const store = new Store();
    store.set('get-asset-chain', data);
	// console.log(data);
  },
  
  getFileInfo: function (data) {
    const store = new Store();
    store.set('get-file-info', data);
  },
  
  generateDownload: function (data) {
    const store = new Store();
    store.set('set-generate-download', data);
  },

  receiveFiletransferStats: function (data) {
   
    defaultWindow.webContents.send('receive-filetransfer-stats', data);

  },
  
  receiveFileMetadata: function (data) {

    defaultWindow.webContents.send('avx-share-respond-file-metadata', data);
    
  },
  
  getUpdatedAccountHistory: function(data) {
    console.log(data);
    defaultWindow.webContents.send('wallet-update-history', data);
  },
  
  getRequestCrawlingExternalData: function(data) {
    defaultWindow.webContents.send('response-trigger-crawl-event', data);
  },

  addTransactionData: function(data) {
    console.log(data);
   defaultWindow.webContents.send('add-transaction-history', data);
  },
  
  receiveFileSelectedMetadata: function (data) {

    defaultWindow.webContents.send('avx-share-respond-file-selected-metadata', data);
    
  },

  responseDashboardCards: function (data) {
    defaultWindow.webContents.send('response-dashboard-cards', data);
  },
  
  responseSpecificAsset: function(data) {
    console.log("receive specific asset");
    defaultWindow.webContents.send('response-filelist-specific-asset', data);
  },

  requestBuyAsset: function( data ) {
    console.log("receive buy response 1117");
    defaultWindow.webContents.send('response-buy-this-asset', data);
  },

  responseDownloadPayment: function(data) {
    console.log("receive confirmation payment");
    defaultWindow.webContents.send('response-download-payment',data);
  }

};
