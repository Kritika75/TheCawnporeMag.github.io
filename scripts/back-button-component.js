/**
 * Back Button Component
 * A reusable back button component for The Cawnpore Magazine website
 */

class BackButtonComponent {
  constructor() {
    this.styles = `
      .back-button-component {
        position: fixed;
        top: 70px;
        left: 20px;
        z-index: 1000;
        background-color: #800000;
        color: white;
        border: none;
        padding: 10px 16px;
        border-radius: 6px;
        cursor: pointer;
        font-weight: bold;
        box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.3);
        font-family: inherit;
        font-size: 14px;
        transition: all 0.3s ease;
      }

      .back-button-component:hover {
        background-color: #a00000;
        transform: translateY(-2px);
        box-shadow: 2px 4px 12px rgba(0, 0, 0, 0.4);
      }

      .back-button-component:active {
        transform: translateY(0);
        box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.3);
      }

      /* Responsive design */
      @media (max-width: 768px) {
        .back-button-component {
          top: 15px;
          left: 15px;
          padding: 8px 12px;
          font-size: 12px;
        }
      }
    `;
  }

  // Inject CSS styles
  injectStyles() {
    if (!document.getElementById('back-button-styles')) {
      const styleElement = document.createElement('style');
      styleElement.id = 'back-button-styles';
      styleElement.textContent = this.styles;
      document.head.appendChild(styleElement);
    }
  }

  // Create and return the back button element
  create(options = {}) {
    const button = document.createElement('button');
    button.className = 'back-button-component';
    button.innerHTML = '← Back';
    
    // Default behavior: browser back
    const clickHandler = options.onClick || (() => history.back());
    button.addEventListener('click', clickHandler);

    // Add aria label for accessibility
    button.setAttribute('aria-label', 'Go back to previous page');
    
    return button;
  }

  // Auto-inject into page
  init(options = {}) {
    // Inject styles
    this.injectStyles();
    
    // Create and append button to body
    const button = this.create(options);
    document.body.appendChild(button);
    
    return button;
  }
}

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  // Only initialize if no back button already exists
  if (!document.querySelector('.back-button-component') && 
      !document.querySelector('button[onclick*="history.back"]') && 
      !document.querySelector('.back-button')) {
    const backButton = new BackButtonComponent();
    backButton.init();
  }
});

// Export for manual use
window.BackButtonComponent = BackButtonComponent;
