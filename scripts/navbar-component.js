// Common Navbar Component
class NavbarComponent {
    constructor() {
        this.isIndex = window.location.pathname.endsWith('index.html') || window.location.pathname === '/' || window.location.pathname.endsWith('/');
        this.pathPrefix = this.isIndex ? '' : '../';
    }

    getHTML() {
        return `
            <div class="progress-container">
                <div class="progress-bar" id="progressBar"></div>
            </div>
            <section class="header">
                <nav role="navigation" aria-label="Main Menu">
                    <!-- Logo on the left -->
                    <img src="${this.pathPrefix}assets/favicon.ico" alt="Logo" class="navbar-logo" />
                    
                    <div class="nav-links" id="navLinks">
                        <i class="fa fa-times" onclick="hideMenu()"></i>
                        <ul>
                            <li><a href="${this.pathPrefix}index.html">HOME</a></li>
                            <li><a href="${this.pathPrefix}pages/about.html">ABOUT</a></li>
                            <li><a href="${this.pathPrefix}pages/submission.html">SUBMIT</a></li>
                            <li><a href="${this.pathPrefix}pages/issue.html">ISSUE</a></li>
                            <li><a href="${this.pathPrefix}pages/masthead.html">MASTHEAD</a></li>
                            <li><a href="${this.pathPrefix}pages/faq.html">FAQ</a></li>
                            <li><a href="${this.pathPrefix}pages/gallery.html">Gallery</a></li>
                            <li><a href="${this.pathPrefix}pages/open-source.html">OPEN SOURCE</a></li>
                            <li><a href="${this.pathPrefix}pages/journey.html">OUR JOURNEY</a></li>
                        </ul>
                    </div>
                    <i class="fa fa-bars" onclick="showMenu()"></i>
                </nav>
            </section>
        `;
    }

    getCSS() {
        return `
            /* Progress Bar */
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

            /* Header Section */
            .header {
                min-height: 100vh;
                width: 100%;
                background-image: linear-gradient(rgba(4,9,30,0.7), rgba(4,9,30,0.7)), url("${this.pathPrefix}images/hero_image.jpeg");
                background-position: center;
                background-size: cover;
                position: relative;
            }

            /* Navigation */
            nav {
                display: flex;
                padding: 2% 6%;
                justify-content: space-between;
                align-items: center;
                position: relative;
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
                .text-box h1 {
                    font-size: 20px;
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

                .nav-links ul li {
                    padding: 10px 0;
                }

                .nav-links ul li a {
                    font-size: 16px;
                    padding: 8px 12px;
                    border-radius: 4px;
                    transition: all 0.3s ease;
                }

                .nav-links ul {
                    list-style: none;
                    padding: 30px;
                    background: transparent;
                }

                .nav-links {
                    flex-basis: auto;
                }
            }
        `;
    }

    getJS() {
        return `
            // Navbar JavaScript functionality
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

            function toggleMenu(show) {
                var navLinks = document.getElementById("navLinks");
                if (navLinks) {
                    navLinks.style.right = show ? "0" : "-200px";
                    document.body.style.overflow = show ? "hidden" : "auto";
                }
            }

            window.showMenu = () => toggleMenu(true);
            window.hideMenu = () => toggleMenu(false);
        `;
    }

    render(containerId) {
        const container = document.getElementById(containerId);
        if (container) {
            // Inject CSS
            const style = document.createElement('style');
            style.textContent = this.getCSS();
            document.head.appendChild(style);

            // Inject HTML
            container.innerHTML = this.getHTML();

            // Inject JavaScript
            const script = document.createElement('script');
            script.textContent = this.getJS();
            document.head.appendChild(script);
        }
    }
}

// Auto-load navbar component when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    const navbarContainer = document.getElementById('navbar-container');
    if (navbarContainer) {
        const navbar = new NavbarComponent();
        navbar.render('navbar-container');
    }
});
