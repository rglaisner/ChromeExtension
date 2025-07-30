// chrome-extension-template
# LinkedIn Profile Scraper

This is a Chrome extension that scrapes profile information from LinkedIn pages.

## Functionality

When you are on a LinkedIn profile page, you can click the extension's icon to open a popup. In the popup, click the "Scrape Profile" button to extract the following information from the page:

-   Name
-   Title
-   About section
-   Work Experience
-   Education

The scraped data will be displayed in the popup.

## How to Use

1.  Load the extension in Chrome using "Load unpacked" in `chrome://extensions`.
2.  Navigate to a LinkedIn profile page (e.g., `https://www.linkedin.com/in/some-profile/`).
3.  Click the extension's icon in the toolbar.
4.  Click the "Scrape Profile" button.

## Disclaimer

This extension is for educational purposes only. The web scraping selectors used in this extension are based on the current layout of LinkedIn and may break if LinkedIn updates its website. You may need to update the selectors in `content.js` to keep the extension working. Please use this extension responsibly and in accordance with LinkedIn's terms of service.

# Chrome Extension Starter Template

This is a starter template for building a Chrome extension using Manifest V3.

## File Structure

-   `manifest.json`: The manifest file for the extension. It defines the extension's metadata, permissions, and file paths.
-   `popup.html`: The HTML file for the popup that appears when you click the extension's icon.
-   `popup.js`: The JavaScript file for the popup. It handles user interactions in the popup.
-   `popup.css`: The CSS file for styling the popup.
-   `background.js`: The background script (service worker) for the extension. It handles events and long-running tasks.
-   `content.js`: A content script that runs in the context of web pages. It can interact with the DOM of the page.
-   `icons/`: A directory containing the extension's icons. You should replace the placeholder icons with your own.
    -   `icon16.png`: 16x16 icon.
    -   `icon48.png`: 48x48 icon.
    -   `icon128.png`: 128x128 icon.

## How to Use

1.  Clone or download this repository.
2.  Open Chrome and navigate to `chrome://extensions`.
3.  Enable "Developer mode" by toggling the switch in the top-right corner.
4.  Click the "Load unpacked" button and select the directory containing this template.
5.  The extension should now be loaded and active.

## Customization

-   **Icons**: Replace the placeholder icons in the `icons/` directory with your own icons. Make sure they have the same filenames.
-   **Popup**: Modify `popup.html`, `popup.js`, and `popup.css` to create your desired popup UI and functionality.
-   **Background Script**: Add your own event listeners and logic to `background.js`.
-   **Content Script**: Modify `content.js` to interact with web pages in the way you want.
-   **Manifest**: Update `manifest.json` with your extension's name, description, and any additional permissions you need.
