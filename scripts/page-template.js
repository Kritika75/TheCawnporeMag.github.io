/**
 * Page Template Generator
 * Creates consistent page structure with reusable components
 */

// Simple template function that you can call from any page
function initializePage(pageOptions = {}) {
    const {
        includeBackButton = true,
        backButtonOptions = {}
    } = pageOptions;

    // Load back button component if requested
    if (includeBackButton) {
        ComponentLoader.loadComponent('back-button');
    }

    // Other page initialization logic can go here
    console.log('Page initialized with components');
}

// Auto-initialize for pages that include this script
document.addEventListener('DOMContentLoaded', function() {
    // Check if page wants auto-initialization
    const autoInit = document.querySelector('[data-auto-init]');
    if (autoInit || window.AUTO_INIT_COMPONENTS) {
        initializePage();
    }
});

window.initializePage = initializePage;
