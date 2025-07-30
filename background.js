// chrome-extension-template
// This script is not currently used, but is required by the manifest.
// It could be used in the future to store scraped data or handle other background tasks.

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ color: '#3aa757' }, () => {
    console.log('Default background color set to green.');
  });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "get_color") {
    chrome.storage.sync.get('color', ({ color }) => {
      sendResponse({ color: color });
    });
    return true; // Indicates that the response is sent asynchronously
  }
});

