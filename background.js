// Message listener
chrome.browserAction.onClicked.addListener(function (tab) {
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    	chrome.tabs.sendMessage(tabs[0].id, {action: "download_video"}, downloadCallback);  
	})
});

/*
//// WORK IN PROGRESS: This will change colour of extension icon when it downloadable video site is present
chrome.runtime.onMessage.addListener(function (msg, sender) {

	chrome.browserAction.setIcon({path: 'download-icon-green.png'});
	if (sender.url.includes("https://bham.cloud.panopto.eu")) {
		chrome.browserAction.setIcon({path: 'download-icon-green.png'});
	}
	else {
		chrome.browserAction.setIcon({path: 'download-icon-grey.png'});
	}
  });
*/

// Callback to download video
function downloadCallback(infoArray) {
	if(typeof infoArray != "undefined") {
			
		var url = infoArray[0];
		var name = infoArray[1];

		chrome.downloads.download( {
					url: url,
					filename: name,
					saveAs: true
		});
	}
}
