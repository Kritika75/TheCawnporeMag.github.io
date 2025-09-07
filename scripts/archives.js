// Archives Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Search functionality
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');
    const issueCards = document.querySelectorAll('.issue-card');
    const filterButtons = document.querySelectorAll('.filter-btn');

    // Search function
    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase().trim();

        issueCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const description = card.querySelector('.issue-description').textContent.toLowerCase();
            const tags = Array.from(card.querySelectorAll('.tag')).map(tag => tag.textContent.toLowerCase());

            const matchesSearch = !searchTerm ||
                title.includes(searchTerm) ||
                description.includes(searchTerm) ||
                tags.some(tag => tag.includes(searchTerm));

            card.style.display = matchesSearch ? 'block' : 'none';

            if (matchesSearch) {
                card.style.animation = 'fadeIn 0.5s ease forwards';
            }
        });

        updateVisibleCount();
    }

    // Filter functionality
    function performFilter() {
        const activeFilter = document.querySelector('.filter-btn.active');
        const filterValue = activeFilter ? activeFilter.getAttribute('data-filter') : 'all';

        issueCards.forEach(card => {
            const cardCategories = card.getAttribute('data-category') || '';
            const categories = cardCategories.split(' ');

            let matchesFilter = filterValue === 'all';

            if (!matchesFilter) {
                matchesFilter = categories.some(category => category === filterValue);
            }

            // Also check search if there's a search term
            const searchTerm = searchInput.value.toLowerCase().trim();
            const title = card.querySelector('h3').textContent.toLowerCase();
            const description = card.querySelector('.issue-description').textContent.toLowerCase();
            const tags = Array.from(card.querySelectorAll('.tag')).map(tag => tag.textContent.toLowerCase());

            const matchesSearch = !searchTerm ||
                title.includes(searchTerm) ||
                description.includes(searchTerm) ||
                tags.some(tag => tag.includes(searchTerm));

            const shouldShow = matchesFilter && matchesSearch;
            card.style.display = shouldShow ? 'block' : 'none';

            if (shouldShow) {
                card.style.animation = 'fadeIn 0.5s ease forwards';
            }
        });

        updateVisibleCount();
    }

    // Update visible issues count
    function updateVisibleCount() {
        const visibleCards = document.querySelectorAll('.issue-card[style*="display: block"], .issue-card:not([style*="display"])');
        const totalCards = issueCards.length;

        // You could add a counter display here if needed
        console.log(`Showing ${visibleCards.length} of ${totalCards} issues`);
    }

    // Event listeners
    searchInput.addEventListener('input', performSearch);
    searchBtn.addEventListener('click', performSearch);

    // Enter key support for search
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });

    // Filter button clicks
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');

            performFilter();
        });
    });

    // Preview functionality (placeholder)
    const previewButtons = document.querySelectorAll('.preview-btn');
    previewButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const card = this.closest('.issue-card');
            const title = card.querySelector('h3').textContent;

            // Placeholder for preview functionality
            alert(`Preview for "${title}" - This feature will be implemented soon!`);
        });
    });

    // Read button functionality (placeholder)
    const readButtons = document.querySelectorAll('.read-btn');
    readButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const card = this.closest('.issue-card');
            const title = card.querySelector('h3').textContent;

            // Placeholder for read functionality
            alert(`Opening "${title}" - Full issue will be available soon!`);
        });
    });

    // Download functionality (placeholder)
    const downloadButtons = document.querySelectorAll('.download-btn');
    downloadButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const card = this.closest('.issue-card');
            const title = card.querySelector('h3').textContent;

            // Placeholder for download functionality
            alert(`Download for "${title}" - PDF will be available soon!`);
        });
    });

    // Newsletter form handling
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;

            // Placeholder for newsletter subscription
            alert(`Thank you for subscribing with ${email}! You'll be notified when new issues are published.`);
            this.reset();
        });
    }

    // Keyboard navigation for filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, observerOptions);

    // Observe issue cards for animations
    issueCards.forEach(card => {
        observer.observe(card);
    });

    // Initial setup
    updateVisibleCount();

    // Add fadeIn animation keyframes if not already present
    if (!document.querySelector('#fadeInKeyframes')) {
        const style = document.createElement('style');
        style.id = 'fadeInKeyframes';
        style.textContent = `
            @keyframes fadeIn {
                from {
                    opacity: 0;
                    transform: translateY(20px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `;
        document.head.appendChild(style);
    }
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