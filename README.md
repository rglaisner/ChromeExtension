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
