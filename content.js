chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
// chrome-extension-template
  if (request.action === "scrape_profile") {
    const profileData = scrapeProfile();
    sendResponse(profileData);
  }
});

function scrapeProfile() {
  // NOTE: These selectors are guesses and may need to be updated if LinkedIn changes its layout.
  const nameSelector = 'h1.text-heading-xlarge';
  const titleSelector = 'div.text-body-medium.break-words';
  const aboutSelector = 'div.display-flex.ph5.pv3 > div.display-flex.full-width.align-self-center > div.flex-1.mr5 > div > span[aria-hidden="true"]';
  const experienceSelector = '#experience ~ .pvs-list__outer-container > ul > li';
  const educationSelector = '#education ~ .pvs-list__outer-container > ul > li';

  const getTextContent = (selector) => {
    const element = document.querySelector(selector);
    return element ? element.innerText.trim() : null;
  };

  const getExperience = (selector) => {
    const experienceEntries = [];
    document.querySelectorAll(selector).forEach((item) => {
      const title = item.querySelector('span.mr1 > span[aria-hidden="true"]')?.innerText.trim();
      const company = item.querySelector('span.t-14.t-normal > span[aria-hidden="true"]')?.innerText.trim().replace('Full-time', '').trim();
      const dateRange = item.querySelector('span.t-14.t-normal.t-black--light > span[aria-hidden="true"]')?.innerText.trim();
      if (title && company && dateRange) {
        experienceEntries.push({ title, company, dateRange });
      }
    });
    return experienceEntries;
  };

  const getEducation = (selector) => {
    const educationEntries = [];
    document.querySelectorAll(selector).forEach((item) => {
      const school = item.querySelector('span.mr1 > span[aria-hidden="true"]')?.innerText.trim();
      const degree = item.querySelector('span.t-14.t-normal > span[aria-hidden="true"]')?.innerText.trim();
      const dateRange = item.querySelector('span.t-14.t-normal.t-black--light > span[aria-hidden="true"]')?.innerText.trim();
      if (school && degree && dateRange) {
        educationEntries.push({ school, degree, dateRange });
      }
    });
    return educationEntries;
  };

  const profileData = {
    name: getTextContent(nameSelector),
    title: getTextContent(titleSelector),
    about: getTextContent(aboutSelector),
    experience: getExperience(experienceSelector),
    education: getEducation(educationSelector),
  };

  return profileData;
}
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
