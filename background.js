// Message listener
chrome.browserAction.onClicked.addListener(function (tab) {
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    	chrome.tabs.sendMessage(tabs[0].id, {action: "download_video"}, downloadCallback);  
	})
});

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
