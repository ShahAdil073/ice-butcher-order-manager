/**
 * Utility functions to load components and handle component interactions
 */

document.addEventListener('DOMContentLoaded', function() {
  // Load components
  loadComponents();

  // Run any post-component-load initialization
  setTimeout(() => {
    initializeComponents();
  }, 100);
});

/**
 * Load all components from the components directory
 */
async function loadComponents() {
  const components = [
    { selector: '#header-container', file: 'components/header.html' },
    { selector: '#sidebar-container', file: 'components/sidebar.html' }
  ];

  for (const component of components) {
    const container = document.querySelector(component.selector);
    if (container) {
      try {
        const response = await fetch(component.file);
        if (response.ok) {
          let html = await response.text();

          // Replace page title placeholder
          if (component.file.includes('header.html')) {
            const pageTitle = document.title.split(' | ')[0] || document.title;
            html = html.replace('PAGE_TITLE', pageTitle);
          }

          container.innerHTML = html;
        }
      } catch (error) {
        console.error(`Failed to load component: ${component.file}`, error);
      }
    }
  }
}

/**
 * Initialize component-specific functionality
 */
function initializeComponents() {
  // Mark the current page in the sidebar
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const sidebarLinks = document.querySelectorAll('.sidebar-menu-item');

  sidebarLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('active');
    }
  });
}
