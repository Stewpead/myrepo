const Store = require('electron-store');
const url = require('url');
const path = require('path');
const app_dir = './../winPage/';

module.exports = {
  shareUploadResponse: function (data) {
	console.log(data);
	
  },
  getWalletBalance: function (data) {
	console.log(data);
  },
  
  uploadShareFile: function (data) {
	//data = JSON.stringify(data);	
	const store = new Store();	
	
	//store.set('avx-share-upload-scan-results', data);
	defaultWindow.webContents.send('avx-share-upload-scan-results', data);
/*
	defaultWindow.loadURL(url.format({
		pathname: path.join(__dirname, app_dir,'share-window.html'),
		protocol: 'file:',
		slashes: true
	}));
*/
		
		

  },
  
  sharePaymentResponse: function (data) {
	const store = new Store();
	store.set('avx-upload-payment-response', data);

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
	const store = new Store();
	store.set('avx-account-history', data);

  },
  
  getPublicKey: function (data) {
	const store = new Store();
	store.set('avx-account-wallet-address', data);

  },

  getWalletData: function (data) {
    const store = new Store();
    defaultWindow.webContents.send('avx-wallet-data', data);
  },
  
  sendFund: function (data) {
	const store = new Store();
	store.set('avx-account-send-wallet', data);
  },
  
  getAsset: function (data) {
    const store = new Store();
    store.set('get-asset-chain', data);
	console.log(data);
  },
  
  getFileInfo: function (data) {
    const store = new Store();
    store.set('get-file-info', data);
  },
  
  generateDownload: function (data) {
    const store = new Store();
    store.set('set-generate-download', data);
  }

  // ,

	// startHoardingSession: function (data) {
  //   console.log(data);
  //   defaultWindow.webContents.send('start-hoarding-session', data);

	// }
  
  
};



