document.addEventListener('DOMContentLoaded', function() {
  const tabButtons = document.querySelectorAll('.tab-button');
  const tabContents = document.querySelectorAll('.tab-content');
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Update button styles
      tabButtons.forEach(btn => {
        btn.removeAttribute('aria-current');
      });
      button.setAttribute('aria-current', 'page');
      // Show/hide content
      const targetId = button.id.replace('tab-', 'content-');
      tabContents.forEach(content => {
        if (content.id === targetId) {
          content.classList.add('active');
        } else {
          content.classList.remove('active');
        }
      });
    });
  });
});