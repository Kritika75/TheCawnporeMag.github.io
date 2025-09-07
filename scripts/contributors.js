// Contributors Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Category filtering functionality
    const categoryButtons = document.querySelectorAll('.category-btn');
    const contributorCards = document.querySelectorAll('.contributor-card');

    // Filter function
    function filterContributors(category) {
        contributorCards.forEach(card => {
            const cardCategories = card.getAttribute('data-category') || '';
            const categories = cardCategories.split(' ');

            let shouldShow = category === 'all';

            if (!shouldShow) {
                shouldShow = categories.some(cat => cat === category);
            }

            card.style.display = shouldShow ? 'block' : 'none';

            if (shouldShow) {
                card.style.animation = 'fadeInUp 0.6s ease forwards';
                // Add a slight delay for each card
                const index = Array.from(contributorCards).indexOf(card);
                card.style.animationDelay = `${index * 0.1}s`;
            }
        });

        updateVisibleCount(category);
    }

    // Update visible contributors count
    function updateVisibleCount(category) {
        const visibleCards = document.querySelectorAll('.contributor-card[style*="display: block"], .contributor-card:not([style*="display"])');
        const totalCards = contributorCards.length;

        // You could add a counter display here if needed
        const categoryName = category === 'all' ? 'All' : category.charAt(0).toUpperCase() + category.slice(1);
        console.log(`Showing ${visibleCards.length} ${categoryName} contributors out of ${totalCards} total`);
    }

    // Category button event listeners
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');

            const category = this.getAttribute('data-category');
            filterContributors(category);
        });

        // Keyboard navigation
        button.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });

    // Social media link interactions
    const socialLinks = document.querySelectorAll('.contributor-social a');
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Add click tracking or analytics here if needed
            console.log(`Social link clicked: ${this.getAttribute('aria-label')}`);
        });

        // Add hover effects
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.1)';
        });

        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Contributor card interactions
    contributorCards.forEach(card => {
        // Add click to expand/collapse functionality (optional)
        card.addEventListener('click', function(e) {
            // Only expand if not clicking on social links or buttons
            if (!e.target.closest('.contributor-social') && !e.target.closest('button')) {
                this.classList.toggle('expanded');

                const bio = this.querySelector('.contributor-bio');
                if (this.classList.contains('expanded')) {
                    bio.style.maxHeight = bio.scrollHeight + 'px';
                    bio.style.webkitLineClamp = 'unset';
                } else {
                    bio.style.maxHeight = '3.6em'; // Approximately 3 lines
                    bio.style.webkitLineClamp = '3';
                }
            }
        });

        // Keyboard navigation for cards
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });

        // Make cards focusable
        card.setAttribute('tabindex', '0');
    });

    // CTA button interactions
    const ctaButtons = document.querySelectorAll('.cta-btn');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Add click tracking
            console.log(`CTA button clicked: ${this.textContent.trim()}`);
        });

        // Enhanced hover effects
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
            this.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.2)';
        });

        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                // Stagger animations
                entry.target.style.animationDelay = `${index * 0.1}s`;
            }
        });
    }, observerOptions);

    // Observe contributor cards for animations
    contributorCards.forEach(card => {
        observer.observe(card);
    });

    // Newsletter form handling
    const newsletterForm = document.querySelector('.subscription-box-about form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;

            // Placeholder for newsletter subscription
            alert(`Thank you for subscribing with ${email}! You'll be notified about new contributors and opportunities.`);
            this.reset();
        });
    }

    // Search functionality (if you want to add a search bar later)
    function setupSearch() {
        // This could be expanded to include search functionality
        // For now, it's a placeholder for future enhancement
    }

    // Initialize tooltips for social links (optional enhancement)
    function initializeTooltips() {
        socialLinks.forEach(link => {
            const ariaLabel = link.getAttribute('aria-label');
            if (ariaLabel) {
                link.setAttribute('title', ariaLabel);
            }
        });
    }

    // Performance optimization: Lazy load contributor images
    function lazyLoadImages() {
        const images = document.querySelectorAll('.contributor-image img[data-src]');

        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            });

            images.forEach(img => imageObserver.observe(img));
        } else {
            // Fallback for browsers without IntersectionObserver
            images.forEach(img => {
                img.src = img.dataset.src;
            });
        }
    }

    // Initialize features
    updateVisibleCount('all');
    initializeTooltips();
    lazyLoadImages();

    // Add fadeInUp animation keyframes if not already present
    if (!document.querySelector('#fadeInUpKeyframes')) {
        const style = document.createElement('style');
        style.id = 'fadeInUpKeyframes';
        style.textContent = `
            @keyframes fadeInUp {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }

            .contributor-card.expanded .contributor-bio {
                transition: max-height 0.3s ease;
            }
        `;
        document.head.appendChild(style);
    }

    // Accessibility: Announce filter changes to screen readers
    function announceFilterChange(category, count) {
        const announcement = `${count} ${category} contributors displayed`;
        const ariaLive = document.createElement('div');
        ariaLive.setAttribute('aria-live', 'polite');
        ariaLive.setAttribute('aria-atomic', 'true');
        ariaLive.style.position = 'absolute';
        ariaLive.style.left = '-10000px';
        ariaLive.style.width = '1px';
        ariaLive.style.height = '1px';
        ariaLive.style.overflow = 'hidden';
        ariaLive.textContent = announcement;

        document.body.appendChild(ariaLive);

        setTimeout(() => {
            document.body.removeChild(ariaLive);
        }, 1000);
    }

    // Update filter function to include accessibility announcement
    const originalFilterFunction = filterContributors;
    filterContributors = function(category) {
        originalFilterFunction(category);

        const visibleCards = document.querySelectorAll('.contributor-card[style*="display: block"], .contributor-card:not([style*="display"])');
        const categoryName = category === 'all' ? 'contributors' : category;
        announceFilterChange(categoryName, visibleCards.length);
    };
});

// Menu toggle functionality (reuse from main script)
function showMenu() {
    const navLinks = document.getElementById('navLinks');
    const menuToggle = document.getElementById('menuToggle');
    if (navLinks && menuToggle) {
        navLinks.style.right = "0";
        menuToggle.setAttribute('aria-expanded', 'true');

        // Focus on first menu item when opened
        setTimeout(() => {
            const firstMenuItem = navLinks.querySelector('a');
            if (firstMenuItem) firstMenuItem.focus();
        }, 300);
    }
}

function hideMenu() {
    const navLinks = document.getElementById('navLinks');
    const menuToggle = document.getElementById('menuToggle');
    if (navLinks && menuToggle) {
        navLinks.style.right = "-200px";
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.focus();
    }
}

// Make functions globally available
window.showMenu = showMenu;
window.hideMenu = hideMenu;