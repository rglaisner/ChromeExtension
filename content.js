chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
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
  const skillsSelector = '.pvs-list__outer-container ul > li.artdeco-list__item > .pvs-entity';
  const connectionsSelector = 'span.t-16.t-bold';

  const getTextContent = (selector, element = document) => {
    const el = element.querySelector(selector);
    return el ? el.innerText.trim() : null;
  };

  const getSkills = (selector) => {
    const skills = [];
    document.querySelectorAll(selector).forEach((item) => {
        const skillName = item.querySelector('.pvs-entity__skill-name')?.innerText.trim();
        if(skillName) {
            skills.push(skillName);
        }
    });
    return skills;
  };

  const getConnections = (selector) => {
    const elements = document.querySelectorAll(selector);
    for (let el of elements) {
      if (el.innerText.includes('connections')) {
        return el.innerText;
      }
    }
    return null;
  };

  const calculateDuration = (dateRange) => {
    if (!dateRange) return null;
    const parts = dateRange.split('·');
    if (parts.length < 2) return null;
    const durationStr = parts[1].trim();
    return durationStr;
  };

  const getExperience = (selector) => {
    const experienceEntries = [];
    let totalDuration = 0;
    document.querySelectorAll(selector).forEach((item) => {
      const title = item.querySelector('span.mr1 > span[aria-hidden="true"]')?.innerText.trim();
      const company = item.querySelector('span.t-14.t-normal > span[aria-hidden="true"]')?.innerText.trim().replace('Full-time', '').trim();
      const dateRange = item.querySelector('span.t-14.t-normal.t-black--light > span[aria-hidden="true"]')?.innerText.trim();
      const description = item.querySelector('div.display-flex.align-items-center.t-14.t-normal.t-black > span[aria-hidden="true"]')?.innerText.trim();
      const duration = calculateDuration(dateRange);

      if (title && company && dateRange) {
        experienceEntries.push({ title, company, dateRange, description, duration });
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

  const experience = getExperience(experienceSelector);
  const averageRoleDuration = experience.length > 0 ? experience.reduce((acc, exp) => acc + (exp.duration || 0), 0) / experience.length : 0;

  const profileData = {
    name: getTextContent(nameSelector),
    title: getTextContent(titleSelector),
    about: getTextContent(aboutSelector),
    experience: experience,
    education: getEducation(educationSelector),
    skills: getSkills(skillsSelector),
    connections: getConnections(connectionsSelector),
    averageRoleDuration: averageRoleDuration.toFixed(2) + ' years'
  };

  return profileData;
}
