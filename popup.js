document.addEventListener('DOMContentLoaded', function() {
// chrome-extension-template
  const scrapeBtn = document.getElementById('scrapeBtn');
  const profileDataContainer = document.getElementById('profileData');

  scrapeBtn.addEventListener('click', function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {action: "scrape_profile"}, function(response) {
        if (response) {
          profileDataContainer.textContent = JSON.stringify(response, null, 2);
        } else {
          profileDataContainer.textContent = "Error: Could not scrape profile. Make sure you are on a LinkedIn profile page.";
        }
      });
  const changeColorButton = document.getElementById('changeColor');

  changeColorButton.addEventListener('click', function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {action: "change_color"});
    });
  });
});
