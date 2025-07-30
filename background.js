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
