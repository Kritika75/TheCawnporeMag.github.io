/**
 * The Cawnpore Magazine - Utility Functions
 * Common JavaScript utilities for enhanced functionality
 */

// Enhanced navigation menu functionality with keyboard support
function initializeNavigation() {
  const navLinks = document.getElementById('navLinks');
  const menuToggle = document.querySelector('.fa-bars');
  const menuClose = document.querySelector('.fa-times');

  // Keyboard navigation support
  if (menuToggle) {
    menuToggle.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        showMenu();
      }
    });
  }

  if (menuClose) {
    menuClose.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        hideMenu();
      }
    });
  }

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (navLinks && !navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
      hideMenu();
    }
  });

  // Close menu on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks && navLinks.classList.contains('show')) {
      hideMenu();
    }
  });
}

// Performance optimization for scroll events
function initializeScrollProgress() {
  let ticking = false;

  function updateProgressBar() {
    const progressBar = document.getElementById('progressBar');
    if (!progressBar) return;

    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercentage = (scrollTop / scrollHeight) * 100;
    
    progressBar.style.width = scrollPercentage + '%';
    ticking = false;
  }

  function requestProgressUpdate() {
    if (!ticking) {
      requestAnimationFrame(updateProgressBar);
      ticking = true;
    }
  }

  window.addEventListener('scroll', requestProgressUpdate, { passive: true });
}

// Lazy loading for images
function initializeLazyLoading() {
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          imageObserver.unobserve(img);
        }
      });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  }
}

// Enhanced loading screen with better UX
function initializeLoadingScreen() {
  const loadingScreen = document.getElementById('loading-screen');
  if (!loadingScreen) return;

  // Minimum loading time for better UX
  const minLoadTime = 1000;
  const startTime = Date.now();

  function hideLoadingScreen() {
    const elapsedTime = Date.now() - startTime;
    const remainingTime = Math.max(0, minLoadTime - elapsedTime);

    setTimeout(() => {
      loadingScreen.style.opacity = '0';
      setTimeout(() => {
        loadingScreen.style.display = 'none';
      }, 300);
    }, remainingTime);
  }

  // Hide loading screen when page is fully loaded
  if (document.readyState === 'complete') {
    hideLoadingScreen();
  } else {
    window.addEventListener('load', hideLoadingScreen);
  }
}

// Improved error handling for forms
function initializeFormValidation() {
  const forms = document.querySelectorAll('form');
  
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      const requiredFields = form.querySelectorAll('[required]');
      let isValid = true;

      requiredFields.forEach(field => {
        if (!field.value.trim()) {
          isValid = false;
          field.classList.add('error');
          
          // Remove error class after user starts typing
          field.addEventListener('input', () => {
            field.classList.remove('error');
          }, { once: true });
        }
      });

      if (!isValid) {
        e.preventDefault();
        // Focus on first invalid field
        const firstError = form.querySelector('.error');
        if (firstError) firstError.focus();
      }
    });
  });
}

// Initialize all utilities when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  initializeNavigation();
  initializeScrollProgress();
  initializeLazyLoading();
  initializeLoadingScreen();
  initializeFormValidation();
});

// Global functions for backward compatibility
window.showMenu = function() {
  const navLinks = document.getElementById('navLinks');
  if (navLinks) {
    navLinks.classList.add('show');
    // Focus management for accessibility
    const firstLink = navLinks.querySelector('a');
    if (firstLink) firstLink.focus();
  }
};

window.hideMenu = function() {
  const navLinks = document.getElementById('navLinks');
  if (navLinks) {
    navLinks.classList.remove('show');
  }
};
