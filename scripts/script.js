// DOM Content Loaded Event
        document.addEventListener('DOMContentLoaded', function() {
            // Initialize all functionality
            initLoadingScreen();
            initNavigation();
            initFloatingElements();
            initQuoteWidget();
            initLightbox();
            initTestimonials();
            initNewsletterForms();
            initBackToTop();
            initThemeToggle();
            initMusicPlayer();
            initScrollAnimations();
        });

        // Loading Screen Functionality
        function initLoadingScreen() {
            const loadingScreen = document.getElementById('loading-screen');
            const loadingProgress = document.getElementById('loading-progress');
            
            // Simulate loading progress
            let progress = 0;
            const interval = setInterval(() => {
                progress += Math.random() * 15;
                if (progress >= 100) {
                    progress = 100;
                    clearInterval(interval);
                    
                    // Hide loading screen after a short delay
                    setTimeout(() => {
                        loadingScreen.style.opacity = '0';
                        setTimeout(() => {
                            loadingScreen.style.display = 'none';
                        }, 500);
                    }, 500);
                }
                loadingProgress.style.width = `${progress}%`;
            }, 300);
        }

        // Navigation Functionality
        function initNavigation() {
            const navToggle = document.getElementById('navToggle');
            const navLinks = document.getElementById('navLinks');
            const navbar = document.querySelector('.navbar');
            
            // Toggle mobile navigation
            navToggle.addEventListener('click', function() {
                navLinks.classList.toggle('active');
                navToggle.classList.toggle('active');
            });
            
            // Close mobile nav when clicking on a link
            const navItems = document.querySelectorAll('.nav-links a');
            navItems.forEach(item => {
                item.addEventListener('click', function() {
                    navLinks.classList.remove('active');
                    navToggle.classList.remove('active');
                });
            });
            
            // Navbar scroll effect
            window.addEventListener('scroll', function() {
                if (window.scrollY > 100) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
            });
        }

        // Floating Elements Functionality
        function initFloatingElements() {
            const floatingContainer = document.querySelector('.floating-elements');
            const floatingSymbols = ['📚', '✒️', '📖', '🖋️', '📝', '📓', '📜', '🔖', '📰', '📒'];
            
            // Create floating elements
            for (let i = 0; i < 15; i++) {
                const element = document.createElement('div');
                element.classList.add('floating-element');
                element.innerHTML = floatingSymbols[Math.floor(Math.random() * floatingSymbols.length)];
                
                // Random position and animation delay
                element.style.left = `${Math.random() * 100}%`;
                element.style.top = `${Math.random() * 100}%`;
                element.style.animationDelay = `${Math.random() * 5}s`;
                element.style.animationDuration = `${10 + Math.random() * 10}s`;
                
                floatingContainer.appendChild(element);
            }
        }

        // Quote Widget Functionality
        function initQuoteWidget() {
            const quoteText = document.getElementById('quote-text');
            const quoteAuthor = document.getElementById('quote-author');
            
            const quotes = [
                {
                    text: "Literature is the art of discovering something extraordinary about ordinary people.",
                    author: "Saul Bellow"
                },
                {
                    text: "A reader lives a thousand lives before he dies. The man who never reads lives only one.",
                    author: "George R.R. Martin"
                },
                {
                    text: "Words are our most inexhaustible source of magic.",
                    author: "J.K. Rowling"
                },
                {
                    text: "We read to know we're not alone.",
                    author: "William Nicholson"
                },
                {
                    text: "The world is a book and those who do not travel read only one page.",
                    author: "Saint Augustine"
                }
            ];
            
            // Display a random quote
            const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
            quoteText.textContent = `"${randomQuote.text}"`;
            quoteAuthor.textContent = `- ${randomQuote.author}`;
        }

        // Lightbox Functionality
        function initLightbox() {
            const lightbox = document.getElementById('lightbox');
            const lightboxImg = document.getElementById('lightbox-img');
            const lightboxCaption = document.getElementById('lightbox-caption');
            const lightboxClose = document.getElementById('lightbox-close');
            const lightboxPrev = document.getElementById('lightbox-prev');
            const lightboxNext = document.getElementById('lightbox-next');
            const galleryItems = document.querySelectorAll('.gallery-item');
            
            let currentIndex = 0;
            
            // Open lightbox when clicking on gallery item
            galleryItems.forEach((item, index) => {
                item.addEventListener('click', function() {
                    currentIndex = index;
                    openLightbox();
                });
            });
            
            // Open lightbox with current item
            function openLightbox() {
                const item = galleryItems[currentIndex];
                const imgSrc = item.getAttribute('data-src');
                const caption = item.getAttribute('data-caption');
                
                lightboxImg.src = imgSrc;
                lightboxCaption.textContent = caption;
                lightbox.classList.add('open');
                
                // Prevent body scrolling when lightbox is open
                document.body.style.overflow = 'hidden';
            }
            
            // Close lightbox
            lightboxClose.addEventListener('click', closeLightbox);
            lightbox.addEventListener('click', function(e) {
                if (e.target === lightbox) {
                    closeLightbox();
                }
            });
            
            function closeLightbox() {
                lightbox.classList.remove('open');
                document.body.style.overflow = 'auto';
            }
            
            // Navigate to next item
            lightboxNext.addEventListener('click', function() {
                currentIndex = (currentIndex + 1) % galleryItems.length;
                openLightbox();
            });
            
            // Navigate to previous item
            lightboxPrev.addEventListener('click', function() {
                currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
                openLightbox();
            });
            
            // Keyboard navigation
            document.addEventListener('keydown', function(e) {
                if (!lightbox.classList.contains('open')) return;
                
                if (e.key === 'Escape') {
                    closeLightbox();
                } else if (e.key === 'ArrowRight') {
                    lightboxNext.click();
                } else if (e.key === 'ArrowLeft') {
                    lightboxPrev.click();
                }
            });
        }

        // Testimonials Slider Functionality
        function initTestimonials() {
            const testimonials = document.querySelectorAll('.testimonial');
            let currentTestimonial = 0;
            
            // Show first testimonial
            testimonials[0].classList.add('active');
            
            // Auto-rotate testimonials
            setInterval(() => {
                testimonials[currentTestimonial].classList.remove('active');
                currentTestimonial = (currentTestimonial + 1) % testimonials.length;
                testimonials[currentTestimonial].classList.add('active');
            }, 5000);
        }

        // Newsletter Form Functionality
        function initNewsletterForms() {
            const forms = document.querySelectorAll('form');
            
            forms.forEach(form => {
                form.addEventListener('submit', function(e) {
                    e.preventDefault();
                    
                    const emailInput = form.querySelector('input[type="email"]');
                    const email = emailInput.value;
                    
                    if (validateEmail(email)) {
                        // Simulate form submission
                        alert('Thank you for subscribing to our newsletter!');
                        emailInput.value = '';
                    } else {
                        alert('Please enter a valid email address.');
                    }
                });
            });
            
            // Email validation
            function validateEmail(email) {
                const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return re.test(email);
            }
        }

        // Back to Top Button Functionality
        function initBackToTop() {
            const backToTopBtn = document.querySelector('.back-to-top');
            
            window.addEventListener('scroll', function() {
                if (window.scrollY > 500) {
                    backToTopBtn.classList.add('visible');
                } else {
                    backToTopBtn.classList.remove('visible');
                }
            });
            
            backToTopBtn.addEventListener('click', function(e) {
                e.preventDefault();
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }

        // Theme Toggle Functionality
        function initThemeToggle() {
            const themeToggle = document.getElementById('themeToggle');
            const themeIcon = themeToggle.querySelector('i');
            
            // Check for saved theme preference or respect OS preference
            const savedTheme = localStorage.getItem('theme');
            const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            
            if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
                document.documentElement.setAttribute('data-theme', 'dark');
                themeIcon.classList.remove('fa-moon');
                themeIcon.classList.add('fa-sun');
            }
            
            // Toggle theme
            themeToggle.addEventListener('click', function() {
                const currentTheme = document.documentElement.getAttribute('data-theme');
                
                if (currentTheme === 'dark') {
                    document.documentElement.removeAttribute('data-theme');
                    themeIcon.classList.remove('fa-sun');
                    themeIcon.classList.add('fa-moon');
                    localStorage.setItem('theme', 'light');
                } else {
                    document.documentElement.setAttribute('data-theme', 'dark');
                    themeIcon.classList.remove('fa-moon');
                    themeIcon.classList.add('fa-sun');
                    localStorage.setItem('theme', 'dark');
                }
            });
        }

        // Scroll Animations
        function initScrollAnimations() {
            const animatedElements = document.querySelectorAll('.hover-3d, .stat-box, .card');
            
            // Add scroll event listener
            window.addEventListener('scroll', checkScroll);
            checkScroll(); // Check on initial load
            
            function checkScroll() {
                const triggerBottom = window.innerHeight * 0.8;
                
                animatedElements.forEach(element => {
                    const elementTop = element.getBoundingClientRect().top;
                    
                    if (elementTop < triggerBottom) {
                        element.style.opacity = 1;
                        element.style.transform = 'translateY(0)';
                    }
                });
            }
            
            // Set initial styles for animation
            animatedElements.forEach(element => {
                element.style.opacity = 0;
                element.style.transform = 'translateY(20px)';
                element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            });
        }

        // Music Player Functionality
        function initMusicPlayer() {
            const audio = document.getElementById('background-music');
            const playPauseBtn = document.getElementById('play-pause');
            const muteBtn = document.getElementById('mute');
            const volumeSlider = document.getElementById('volume');
            const playIcon = playPauseBtn.querySelector('i');
            
            // Set initial volume
            audio.volume = volumeSlider.value / 100;
            
            // Play/Pause functionality
            playPauseBtn.addEventListener('click', function() {
                if (audio.paused) {
                    audio.play();
                    playIcon.classList.remove('fa-play');
                    playIcon.classList.add('fa-pause');
                    playPauseBtn.setAttribute('aria-label', 'Pause');
                } else {
                    audio.pause();
                    playIcon.classList.remove('fa-pause');
                    playIcon.classList.add('fa-play');
                    playPauseBtn.setAttribute('aria-label', 'Play');
                }
            });
            
            // Mute functionality
            muteBtn.addEventListener('click', function() {
                if (audio.muted) {
                    audio.muted = false;
                    muteBtn.querySelector('i').classList.remove('fa-volume-mute');
                    muteBtn.querySelector('i').classList.add('fa-volume-up');
                    muteBtn.setAttribute('aria-label', 'Mute');
                } else {
                    audio.muted = true;
                    muteBtn.querySelector('i').classList.remove('fa-volume-up');
                    muteBtn.querySelector('i').classList.add('fa-volume-mute');
                    muteBtn.setAttribute('aria-label', 'Unmute');
                }
            });
            
            // Volume control
            volumeSlider.addEventListener('input', function() {
                audio.volume = this.value / 100;
                
                // Change icon based on volume level
                const volIcon = muteBtn.querySelector('i');
                if (this.value == 0) {
                    volIcon.classList.remove('fa-volume-up', 'fa-volume-down');
                    volIcon.classList.add('fa-volume-mute');
                } else if (this.value < 50) {
                    volIcon.classList.remove('fa-volume-up', 'fa-volume-mute');
                    volIcon.classList.add('fa-volume-down');
                } else {
                    volIcon.classList.remove('fa-volume-down', 'fa-volume-mute');
                    volIcon.classList.add('fa-volume-up');
                }
            });
            
            // Auto-play when user interacts with page (to comply with browser policies)
            document.addEventListener('click', function initPlay() {
                if (audio.paused) {
                    audio.play().catch(e => console.log("Auto-play was prevented: ", e));
                }
                document.removeEventListener('click', initPlay);
            });
        }