// Message listener
chrome.browserAction.onClicked.addListener(function (tab) {
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		if(tabs[0].url.indexOf("panopto.com") > 1 || tabs[0].url.indexOf("panopto.eu") > 1) {
			if (tabs[0].url.indexOf("Embed.aspx") > 1) {
                var newurl = tabs[0].url.replace('/Embed.aspx','/Viewer.aspx');
                chrome.tabs.update(tabs[0].id,{url:newurl});
        chrome.tabs.onUpdated.addListener(function listener (tabId, info) {
                if (info.status === 'complete' && tabId === tabs[0].id) {
                    chrome.tabs.onUpdated.removeListener(listener);
            chrome.tabs.sendMessage(tabs[0].id, {action: "download_video"}, downloadCallback);
                }
            });
            }
		else{
		chrome.tabs.sendMessage(tabs[0].id, {action: "download_video"}, downloadCallback);
		}  
		} else if (tabs[0].url.indexOf("panopto.com") == -1 || tabs[0].url.indexOf("panopto.eu") == -1) {
			alert("Sorry, but I didn't find any videos. Are you sure the address in the search bar is with \"panopto.eu\" or \"panopto.com\" ?");
		}
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
