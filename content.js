chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "change_color") {
    chrome.runtime.sendMessage({action: "get_color"}, response => {
      if (response && response.color) {
        document.body.style.backgroundColor = response.color;
        sendResponse({status: "color changed"});
      } else {
        sendResponse({status: "color not found"});
      }
    });
    return true; // Indicates that the response is sent asynchronously
  }
});
