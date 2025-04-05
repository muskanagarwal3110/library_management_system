const subscribeBtn = document.getElementById('subscribeBtn');
const subscribeStatus = document.getElementById('subscribeStatus');

subscribeBtn.addEventListener('click', function() {
  subscribeStatus.textContent = 'You are now subscribed!';
});

function toggleElement() {
    const element = document.getElementById('elementToToggle');
    if (element.style.display === 'none') {
      element.style.display = 'block'; // Or 'inline', 'flex', etc. based on your layout needs
    } else {
      element.style.display = 'none';
    }
  }

  
  const themeToggleBtn = document.getElementById('theme-toggle');
  const body = document.body;
  
  themeToggleBtn.addEventListener('click', function() {
      // Toggle between light and dark themes
      body.classList.toggle('light-theme');
      body.classList.toggle('dark-theme');
  });