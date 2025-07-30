document.addEventListener('DOMContentLoaded', function() {
  const scrapeBtn = document.getElementById('scrapeBtn');

  scrapeBtn.addEventListener('click', function() {
    setUIState('loading');
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {action: "scrape_profile"}, function(response) {
        if (response && response.success) {
          populateUI(response.data);
          setUIState('success');
        } else {
          setUIState('error', response ? response.error : "Could not scrape profile.");
        }
      });
    });
  });
});

function setUIState(state, message = '') {
    const nameEl = document.getElementById('name');
    if (state === 'loading') {
        nameEl.textContent = 'Scraping...';
    } else if (state === 'error') {
        nameEl.textContent = `Error: ${message}`;
    }
}

function populateUI(data) {
  renderHeader(data);
  renderCareerTrajectory(data);
  renderNetworkAndInfluence(data);
  renderAbout(data);
  renderExperience(data.experience);
  renderEducation(data.education);
  renderSkills(data.skills);
}

function renderHeader(data) {
  document.getElementById('name').textContent = data.name || 'N/A';
  document.getElementById('title').textContent = data.title || 'N/A';
}

function renderCareerTrajectory(data) {
  document.getElementById('avgRoleDuration').textContent = data.averageRoleDuration || 'N/A';
}

function renderNetworkAndInfluence(data) {
  document.getElementById('connections').textContent = data.connections || 'N/A';
}

function renderAbout(data) {
  document.getElementById('about').textContent = data.about || 'N/A';
}

function renderExperience(experience) {
  const experienceContainer = document.getElementById('experience');
  experienceContainer.innerHTML = '';
  if (experience && experience.length > 0) {
    experience.forEach(exp => {
      const item = document.createElement('div');
      item.className = 'timeline-item';
      item.innerHTML = `
        <div class="timeline-title">${exp.title}</div>
        <div class="timeline-subtitle">${exp.company}</div>
        <div class="timeline-subtitle">${exp.dateRange} (${exp.duration})</div>
        <p>${exp.description || ''}</p>
      `;
      experienceContainer.appendChild(item);
    });
  }
}

function renderEducation(education) {
  const educationContainer = document.getElementById('education');
  educationContainer.innerHTML = '';
  if (education && education.length > 0) {
    education.forEach(edu => {
      const item = document.createElement('div');
      item.className = 'timeline-item';
      item.innerHTML = `
        <div class="timeline-title">${edu.school}</div>
        <div class="timeline-subtitle">${edu.degree}</div>
        <div class="timeline-subtitle">${edu.dateRange}</div>
      `;
      educationContainer.appendChild(item);
    });
  }
}

function renderSkills(skills) {
  const skillsContainer = document.getElementById('skills');
  skillsContainer.innerHTML = '';
  if (skills && skills.length > 0) {
    skills.forEach(skill => {
      const item = document.createElement('div');
      item.className = 'skill-card';
      item.textContent = skill;
      skillsContainer.appendChild(item);
    });
  }
}
