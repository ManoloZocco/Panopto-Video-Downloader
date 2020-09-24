chrome.extension.onMessage.addListener(function(msg, _sender, sendResponse) {

 	if (msg.action == 'download_video') {
		
		if(window.location.href.indexOf("panopto.com") < 1 && window.location.href.indexOf("panopto.eu") < 1) { 
		alert("Sorry, but I didn't find any videos. Are you sure the address in the search bar is with \"panopto.eu\" or \"panopto.com\" ?"); 
		exit(); 
		}
	
	// Default parameters to grab video info
	var name = "";
	var url = "";
	var metas = document.getElementsByTagName('meta'); 
	
	for (var i=0; i<metas.length; i++) 
		if (metas[i].getAttribute("name") == "twitter:player:stream") { 
			console.log(metas[i].getAttribute("content"));
			url = (metas[i].getAttribute("content").split('?')[0]);
		} 

		else if (metas[i].getAttribute("property") == "og:title") {
			console.log(metas[i].getAttribute("content"));
			name = metas[i].getAttribute("content").split('?')[0];
		}

			// Split the name up (remove invalid characters in file names) && add file format
			name = name.split('/').join('_'); // Remove slashes
			name = name.split(' ').join('_'); // Remove spaces
			name = name.split(':').join('-'); // Remove colons
			name = name + ".mp4";

			// Pack into array to send through callback function
			var infoArray = [url, name];

			// Callback function
			sendResponse(infoArray);

  	}

});
