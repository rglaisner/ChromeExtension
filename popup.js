document.addEventListener('DOMContentLoaded', function() {
  const scrapeBtn = document.getElementById('scrapeBtn');

  scrapeBtn.addEventListener('click', function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {action: "scrape_profile"}, function(response) {
        if (response) {
          populateUI(response);
        } else {
          document.getElementById('name').textContent = "Error: Could not scrape profile.";
        }
      });
    });
  });
});

function populateUI(data) {
  // Header
  document.getElementById('name').textContent = data.name || 'N/A';
  document.getElementById('title').textContent = data.title || 'N/A';

  // Career Trajectory
  document.getElementById('avgRoleDuration').textContent = data.averageRoleDuration || 'N/A';

  // Network & Influence
  document.getElementById('connections').textContent = data.connections || 'N/A';

  // About
  document.getElementById('about').textContent = data.about || 'N/A';

  // Experience
  const experienceContainer = document.getElementById('experience');
  experienceContainer.innerHTML = '';
  if (data.experience && data.experience.length > 0) {
    data.experience.forEach(exp => {
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

  // Education
  const educationContainer = document.getElementById('education');
  educationContainer.innerHTML = '';
  if (data.education && data.education.length > 0) {
    data.education.forEach(edu => {
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

  // Skills
  const skillsContainer = document.getElementById('skills');
  skillsContainer.innerHTML = '';
  if (data.skills && data.skills.length > 0) {
    data.skills.forEach(skill => {
      const item = document.createElement('div');
      item.className = 'skill-card';
      item.textContent = skill;
      skillsContainer.appendChild(item);
    });
  }
}
