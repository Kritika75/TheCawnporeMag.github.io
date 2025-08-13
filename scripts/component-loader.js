/**
 * Simple Component Loader
 * Loads reusable HTML components via JavaScript
 */

class ComponentLoader {
  static components = {
    'back-button': `
      <button class="back-button-unified" onclick="history.back()" aria-label="Go back to previous page">
        ← Back
      </button>
    `,
    'navbar-hero': function() {
      // For homepage - includes full hero section
      return `
        <div class="progress-container">
          <div class="progress-bar" id="progressBar"></div>
        </div>
        <section class="header-hero">
          <nav role="navigation" aria-label="Main Menu">
            <img src="assets/favicon.ico" alt="Logo" class="navbar-logo" />
            
            <div class="nav-links" id="navLinks">
              <i class="fa fa-times" onclick="hideMenu()"></i>
              <ul>
                <li><a href="index.html">HOME</a></li>
                <li><a href="pages/about.html">ABOUT</a></li>
                <li><a href="pages/submission.html">SUBMIT</a></li>
                <li><a href="pages/issue.html">ISSUE</a></li>
                <li><a href="pages/masthead.html">MASTHEAD</a></li>
                <li><a href="pages/faq.html">FAQ</a></li>
                <li><a href="pages/gallery.html">Gallery</a></li>
                <li><a href="pages/open-source.html">OPEN SOURCE</a></li>
                <li><a href="pages/journey.html">OUR JOURNEY</a></li>
              </ul>
            </div>
            <i class="fa fa-bars" onclick="showMenu()"></i>
          </nav>
          
          <!-- Hero Content Section -->
          <div class="hero-content">
            <div class="text-box">
              <h1>The Cawnpore</h1>
              <p class="est-text">EST. 2024</p>
              <hr class="hero-divider">
              <div class="hero-quote">
                <p class="quote-text">"There is no greater agony than bearing an untold story inside you."</p>
                <p class="quote-author">– Maya Angelou</p>
              </div>
            </div>
          </div>
        </section>
      `;
    },
    'navbar-simple': function() {
      // For other pages - same navbar as hero but without hero section
      const pathPrefix = '../';
      
      return `
        <div class="progress-container">
          <div class="progress-bar" id="progressBar"></div>
        </div>
        <section class="header-simple">
          <nav role="navigation" aria-label="Main Menu">
            <img src="${pathPrefix}assets/favicon.ico" alt="Logo" class="navbar-logo" />
            
            <div class="nav-links" id="navLinks">
              <i class="fa fa-times" onclick="hideMenu()"></i>
              <ul>
                <li><a href="${pathPrefix}index.html">HOME</a></li>
                <li><a href="${pathPrefix}pages/about.html">ABOUT</a></li>
                <li><a href="${pathPrefix}pages/submission.html">SUBMIT</a></li>
                <li><a href="${pathPrefix}pages/issue.html">ISSUE</a></li>
                <li><a href="${pathPrefix}pages/masthead.html">MASTHEAD</a></li>
                <li><a href="${pathPrefix}pages/faq.html">FAQ</a></li>
                <li><a href="${pathPrefix}pages/gallery.html">Gallery</a></li>
                <li><a href="${pathPrefix}pages/open-source.html">OPEN SOURCE</a></li>
                <li><a href="${pathPrefix}pages/journey.html">OUR JOURNEY</a></li>
              </ul>
            </div>
            <i class="fa fa-bars" onclick="showMenu()"></i>
          </nav>
        </section>
      `;
    }
  };

  static styles = `
    .back-button-unified {
      position: fixed;
      top: 85px;
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

    .back-button-unified:hover {
      background-color: #a00000;
      transform: translateY(-2px);
      box-shadow: 2px 4px 12px rgba(0, 0, 0, 0.4);
    }

    .back-button-unified:active {
      transform: translateY(0);
      box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.3);
    }

    @media (max-width: 768px) {
      .back-button-unified {
        top: 15px;
        left: 15px;
        padding: 8px 12px;
        font-size: 12px;
      }
    }

    /* Navbar Component Styles */
    .progress-container {
      width: 100%;
      height: 4px;
      background: #ddd;
      position: fixed;
      top: 0;
      left: 0;
      z-index: 9999;
    }

    .progress-bar {
      height: 4px;
      background: linear-gradient(to right, #a00000, #ff6b6b);
      width: 0%;
      transition: width 0.3s ease;
    }

    /* Header Section with Hero */
    .header {
      width: 100%;
      background-position: center;
      background-size: cover;
      position: relative;
    }

    /* Header Simple - Same navbar styling but without hero */
    .header-simple {
      width: 100%;
      background-image: linear-gradient(rgba(4,9,30,0.7), rgba(4,9,30,0.7)), url("../images/hero_image.jpeg");
      background-position: center;
      background-size: cover;
      position: relative;
      min-height: auto;
    }

    /* Hero Content */
    .hero-content {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 90%;
      text-align: center;
      color: white;
    }
      
    .text-box {
      max-width: 700px;
      margin: 0 auto;
    }
      
    .text-box h1 {
      margin-top: 100px;
      font-weight: 700;
      font-style: italic;
      font-size: 62px;
      margin-bottom: 10px;
      color: #fdf0d5;
    }
      
    .text-box p {
      margin: 10px 0 40px;
      font-size: 14px;
      color: white;
    }

    /* Navigation - Higher specificity to override page-specific styles */
    .header-simple nav,
    #navbar-container nav,
    body nav,
    nav {
      display: flex !important;
      padding: 1rem 3% !important;
      justify-content: space-between !important;
      align-items: center !important;
      position: relative !important;
    }

    .navbar-logo {
      height: 40px;
      margin-right: 16px;
      vertical-align: middle;
    }

    .nav-links {
      flex: 1;
      text-align: right;
      position: relative;
      z-index: 10;
    }

    .nav-links ul li {
      list-style: none;
      display: inline-block;
      padding: 8px 12px;
      position: relative;
    }

    .nav-links ul li a {
      color: #fdf0d5;
      text-decoration: none;
      font-family: serif;
      font-size: 13px;
      padding: 12px 16px;
      display: block;
    }

    .nav-links ul li a:hover {
      text-decoration: none;
    }

    .nav-links ul li::after {
      content: '';
      width: 0%;
      height: 2px;
      background: #fdf0d5;
      display: block;
      margin: auto;
      transition: 0.5s;
    }

    .nav-links ul li:hover::after {
      width: 100%;
    }

    nav .fa {
      display: none;
    }

    /* Mobile Navigation */
    @media(max-width: 768px) {
      .simple-nav .nav-container {
        padding: 0 1rem;
      }

      .simple-nav .nav-links ul {
        flex-direction: column;
        gap: 0;
        padding: 30px;
        background: #8B1538;
        backdrop-filter: blur(10px);
      }

      .simple-nav .nav-links ul li {
        display: block;
        padding: 10px 0;
        width: 100%;
      }

      .simple-nav .nav-links ul li a {
        font-size: 16px;
        padding: 12px 16px;
        width: 100%;
        text-align: left;
      }

      .simple-nav .nav-links {
        position: fixed;
        background: #8B1538;
        height: 100vh;
        width: 250px;
        top: 0;
        right: -250px;
        text-align: left;
        z-index: 2000;
        transition: 0.5s;
        flex: none;
      }

      .simple-nav .nav-links.nav-active {
        right: 0;
      }

      .simple-nav .fa {
        display: block;
      }

      .nav-links ul {
        padding: 30px;
        list-style: none;
        background: rgba(4, 9, 30, 0.95);
        backdrop-filter: blur(10px);
      }

      .nav-links ul li {
        display: block;
        padding: 10px 0;
      }

      .nav-links ul li a {
        font-size: 16px;
        padding: 8px 12px;
      }

      .nav-links {
        position: fixed;
        background: rgba(4, 9, 30, 0.95);
        backdrop-filter: blur(10px);
        height: 100vh;
        width: 200px;
        top: 0;
        right: -200px;
        text-align: left;
        z-index: 2;
        transition: 0.5s;
      }

      .nav-links.nav-active {
        right: 0;
      }

      nav .fa {
        display: block;
        color: #fdf0d5;
        margin: 10px;
        font-size: 22px;
        cursor: pointer;
      }

      .nav-links {
        flex-basis: auto;
      }
    }
  `;

  static loadComponent(name, targetSelector = null) {
    // Inject styles if not already present
    if (!document.getElementById('component-styles')) {
      const styleElement = document.createElement('style');
      styleElement.id = 'component-styles';
      styleElement.textContent = this.styles;
      document.head.appendChild(styleElement);
    }

    // Get component HTML
    let componentHTML = this.components[name];
    if (!componentHTML) {
      console.warn(`Component '${name}' not found`);
      return;
    }

    // Handle function components
    if (typeof componentHTML === 'function') {
      componentHTML = componentHTML();
    }

    // Find target or create default target
    let target;
    if (targetSelector) {
      target = document.querySelector(targetSelector);
    } else {
      // Auto-append to body for back button
      target = document.body;
    }

    if (target) {
      if (name === 'navbar-hero' || name === 'navbar-simple') {
        target.innerHTML = componentHTML;
        
        // Load navbar JavaScript functionality
        this.loadNavbarJS();
      } else {
        target.insertAdjacentHTML('afterbegin', componentHTML);
      }
    }
  }

  static loadNavbarJS() {
    // Only add the navbar JS once
    if (window.navbarJSLoaded) return;
    
    // Progress bar functionality
    window.onscroll = function() {
      scrollProgressBar();
    };

    function scrollProgressBar() {
      var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      var scrolled = (winScroll / height) * 100;
      var progressBar = document.getElementById("progressBar");
      if (progressBar) {
        progressBar.style.width = scrolled + "%";
      }
    }

    // Mobile menu functionality
    function toggleMenu(show) {
      var navLinks = document.getElementById("navLinks");
      if (navLinks) {
        navLinks.style.right = show ? "0" : "-200px";
        document.body.style.overflow = show ? "hidden" : "auto";
      }
    }

    window.showMenu = () => toggleMenu(true);
    window.hideMenu = () => toggleMenu(false);
    
    // Mark as loaded
    window.navbarJSLoaded = true;
  }

  static init() {
    // Auto-load components based on data attributes
    document.querySelectorAll('[data-component]').forEach(element => {
      const componentName = element.getAttribute('data-component');
      this.loadComponent(componentName, element);
    });
  }
}

// Auto-initialize
document.addEventListener('DOMContentLoaded', function() {
  ComponentLoader.init();
});

// Export for global use
window.ComponentLoader = ComponentLoader;
