const Store = require('electron-store');


module.exports = {
  shareUploadResponse: function (data) {
	console.log(data);
	
  },
  getWalletBalance: function (data) {
	console.log(data);
  },
  
  uploadShareFile: function (data) {
	data = JSON.stringify(data);	
	const store = new Store();	
	
	store.set('avx-share-upload-scan-results', data);

  }
};



