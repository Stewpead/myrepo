module.exports = {
	responsePriceSource: function (data) {
		
		class PriceSourceCrawler {
		 
			async priceSource(title) {
				// const { Builder } = require('selenium-webdriver');
				// var driver = new Builder().forBrowser('chrome').build();
			   

				const chrome = require('selenium-webdriver/chrome');
				const {Builder, By, Key, until} = require('selenium-webdriver');

				const screen = {
				width: 1,
				height: 1
				};
				var options = new chrome.Options();
				options.addArguments("--incognito");
				options.addArguments("--window-size=500,500");
				options.addArguments("headless");
				let driver = new Builder()
					.forBrowser('chrome')
					//.setChromeOptions(new chrome.Options().headless().windowSize(screen))
					//.setChromeOptions(new chrome.Options().windowSize(screen))
					.setChromeOptions(options)
					.build();
					
				await driver.get('https://www.amazon.com/s?k=' + title + '&rh=n%3A2 901953011&ref=nb_sb_noss_1');
				//await driver.get('https://www.amazon.com/s?k=' + title + '&ref=nb_sb_noss');
			
				let source = await driver.getPageSource();
				data["data"]["source"] = encodeURIComponent( source) ;
				defaultWindow.webContents.send('avx-share-crawl-price-source-result', data);
				const fs = require('fs');
				
				/*fs.writeFile("temp.txt", source, function(err, data) {
					if (err) console.log(err);
					console.log("Successfully Written to File.");
				  });
				  */

				
				//insert code for sending source to c++ via network

				return driver.quit();
			}

		

		}
		
		
		priceSourceCrawler = new PriceSourceCrawler();
		priceSourceCrawler.priceSource(data.data.title);
		
	},
	responsePriceDataPoints: function (data) {
		defaultWindow.webContents.send('avx-share-crawl-price-data-points-result',data);
		
	}
}

