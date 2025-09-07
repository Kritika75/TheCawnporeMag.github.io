
      // Performance optimization: Debounce function
      function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
          const later = () => {
            clearTimeout(timeout);
            func(...args);
          };
          clearTimeout(timeout);
          timeout = setTimeout(later, wait);
        };
      }

      // Error handling wrapper
      function safeExecute(func, fallback = null) {
        try {
          return func();
        } catch (error) {
          console.error('Script execution error:', error);
          if (fallback) fallback();
          return null;
        }
      }

      // Set current year in footer with error handling
      safeExecute(() => {
        const yearElement = document.getElementById('year');
        if (yearElement) {
          yearElement.textContent = new Date().getFullYear();
        }
      });

      // Particle system
      function createParticles() {
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'particles-container';
        document.body.appendChild(particlesContainer);

        for (let i = 0; i < 50; i++) {
          const particle = document.createElement('div');
          particle.className = 'particle';
          particle.style.left = Math.random() * 100 + '%';
          particle.style.animationDelay = Math.random() * 6 + 's';
          particle.style.setProperty('--random-x', Math.random() * 200 - 100 + 'px');
          particlesContainer.appendChild(particle);
        }
      }

      // Scroll-triggered animations
      function handleScrollAnimations() {
        const elements = document.querySelectorAll('.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right');

        elements.forEach(element => {
          const elementTop = element.getBoundingClientRect().top;
          const elementBottom = element.getBoundingClientRect().bottom;
          const windowHeight = window.innerHeight;

          if (elementTop < windowHeight * 0.8 && elementBottom > 0) {
            element.classList.add('revealed');
          }
        });
      }

      // Parallax effect for hero section
      function handleParallax() {
        const hero = document.querySelector('.header');
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;

        if (hero) {
          hero.style.transform = `translateY(${rate}px)`;
        }
      }

      // Typing effect
      function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.textContent = '';

        function type() {
          if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
          }
        }

        type();
      }

      // Enhanced loading screen
      function createEnhancedLoading() {
        const loadingScreen = document.getElementById('loading-screen');
        const loader = loadingScreen.querySelector('.loader');

        // Add loading elements
        const loadingElements = document.createElement('div');
        loadingElements.className = 'loading-elements';

        const loadingBar = document.createElement('div');
        loadingBar.className = 'loading-bar';

        loadingElements.appendChild(loadingBar);
        loader.appendChild(loadingElements);
      }
      
      // Menu toggle functionality
      function showMenu() {
        const navLinks = document.getElementById('navLinks');
        const menuToggle = document.getElementById('menuToggle');
        navLinks.style.right = "0";
        menuToggle.setAttribute('aria-expanded', 'true');
        
        // Focus on first menu item when opened
        setTimeout(() => {
          const firstMenuItem = navLinks.querySelector('a');
          if (firstMenuItem) firstMenuItem.focus();
        }, 300);
      }

      function hideMenu() {
        const navLinks = document.getElementById('navLinks');
        const menuToggle = document.getElementById('menuToggle');
        navLinks.style.right = "-200px";
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.focus();
      }
      
      // Make menu toggle accessible with keyboard
      document.getElementById('menuToggle').addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          if (this.getAttribute('aria-expanded') === 'true') {
            hideMenu();
          } else {
            showMenu();
          }
        }
      });
      
      // Close menu when clicking outside
      document.addEventListener('click', function(e) {
        const navLinks = document.getElementById('navLinks');
        const menuToggle = document.getElementById('menuToggle');
        
        if (navLinks.style.right === "0px" && 
            !navLinks.contains(e.target) && 
            e.target !== menuToggle) {
          hideMenu();
        }
      });
      
      // Optimized circles animation with performance considerations
      document.addEventListener('DOMContentLoaded', function() {
        safeExecute(() => {
          const circlesContainer = document.querySelector('.circles-container');
          if (!circlesContainer) return;

          const colors = [
            "#ffb56b", "#fdaf69", "#f89d63", "#f59761", "#ef865e", "#ec805d",
            "#e36e5c", "#df685c", "#d5585c", "#d1525c", "#c5415d", "#c03b5d",
            "#b22c5e", "#ac265e", "#9c155f", "#950f5f", "#830060", "#7c0060",
            "#680060", "#60005f", "#48005f", "#3d005e"
          ];

          // Create fewer circles for better performance on mobile
          const circleCount = window.innerWidth < 768 ? 12 : 20;

          for (let i = 0; i < circleCount; i++) {
            const circle = document.createElement('div');
            circle.className = 'circle';
            circle.style.backgroundColor = colors[i % colors.length];
            circlesContainer.appendChild(circle);
          }
        });

        const coords = { x: 0, y: 0 };
        const circles = document.querySelectorAll(".circle");

        circles.forEach(function (circle) {
          circle.x = 0;
          circle.y = 0;
        });

        window.addEventListener("mousemove", function (e) {
          coords.x = e.clientX;
          coords.y = e.clientY;
        });

        function animateCircles() {
          let x = coords.x;
          let y = coords.y;

          circles.forEach(function (circle, index) {
            circle.style.left = x - 12 + "px";
            circle.style.top = y - 12 + "px";
            circle.style.scale = (circles.length - index) / circles.length;

            circle.x = x;
            circle.y = y;

            const nextCircle = circles[index + 1] || circles[0];
            x += (nextCircle.x - x) * 0.15;
            y += (nextCircle.y - y) * 0.15;
          });

          requestAnimationFrame(animateCircles);
        }

        animateCircles();
      });
      
      // Loading screen functionality
      document.addEventListener("DOMContentLoaded", function () {
        const loadingScreen = document.getElementById("loading-screen");
        let resourcesLoaded = false;
        let minTimeElapsed = false;
        
        // Check when all resources are loaded
        window.addEventListener('load', function() {
          resourcesLoaded = true;
          hideLoadingScreen();
        });
        
        // Also hide after minimum time (2 seconds instead of 6)
        setTimeout(function() {
          minTimeElapsed = true;
          hideLoadingScreen();
        }, 2000);
        
        function hideLoadingScreen() {
          if (resourcesLoaded && minTimeElapsed) {
            loadingScreen.classList.add("hidden");
          }
        }
      });
      
      // Text-to-speech functionality
      document.querySelectorAll('.speakBtn').forEach(btn => {
        btn.addEventListener('click', () => {
          const targetId = btn.getAttribute('data-target');
          const paragraph = document.getElementById(targetId);
          const text = paragraph.innerText;

          if ('speechSynthesis' in window) {
            // Stop any ongoing speech
            window.speechSynthesis.cancel();
            
            const utterance = new SpeechSynthesisUtterance(text);
            // Use Indian English for better pronunciation
            utterance.lang = 'en-IN';
            
            const voices = window.speechSynthesis.getVoices();
            if (voices.length > 0) {
              // Prefer Indian English voice if available
              const indianVoice = voices.find(voice => voice.lang === 'en-IN');
              if (indianVoice) {
                utterance.voice = indianVoice;
              } else {
                // Fallback to any English voice
                for (let voice of voices) {
                  if (voice.lang.startsWith('en')) {
                    utterance.voice = voice;
                    break;
                  }
                }
              }
            }
            window.speechSynthesis.speak(utterance);
          } else {
            alert('Your browser does not support text-to-speech functionality.');
          }
        });
      });
      
      // Music toggle functionality
      const musicToggle = document.getElementById("music-toggle");
      const bgMusic = document.getElementById("bg-music");
      const musicState = document.querySelector(".music-state");

      // Load previous state if exists
      const isMusicEnabled = localStorage.getItem("musicEnabled") === "true";
      if (isMusicEnabled) {
        bgMusic.volume = 0;
        musicToggle.classList.add("active");
        musicState.textContent = "On";
      }

      function fadeInMusic() {
        let volume = 0;
        const fadeIn = setInterval(() => {
          if (volume < 0.7) { // Reduced max volume for better UX
            volume += 0.05;
            bgMusic.volume = volume;
          } else {
            clearInterval(fadeIn);
          }
        }, 100);
      }

      function fadeOutMusic() {
        let volume = bgMusic.volume;
        const fadeOut = setInterval(() => {
          if (volume > 0) {
            volume -= 0.05;
            bgMusic.volume = volume;
          } else {
            clearInterval(fadeOut);
            bgMusic.pause();
          }
        }, 100);
      }

      musicToggle.addEventListener("click", () => {
        if (bgMusic.paused) {
          bgMusic.volume = 0;
          bgMusic.play().then(() => {
            fadeInMusic();
            localStorage.setItem("musicEnabled", "true");
            musicToggle.classList.add("active");
            musicState.textContent = "On";
          }).catch(error => {
            console.log("Audio play failed:", error);
          });
        } else {
          fadeOutMusic();
          localStorage.setItem("musicEnabled", "false");
          musicToggle.classList.remove("active");
          musicState.textContent = "Off";
        }
      });
      
      // Make music toggle keyboard accessible
      musicToggle.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.click();
        }
      });

      // Theme toggle functionality
      const themeToggle = document.getElementById('theme-toggle');
      const themeState = document.querySelector('.theme-state');

      // Load previous theme if exists
      const isDarkMode = localStorage.getItem('darkMode') === 'true';
      if (isDarkMode) {
        document.body.classList.add('dark-mode');
        themeToggle.classList.add('dark-mode');
        themeState.textContent = 'Dark';
      }

      themeToggle.addEventListener('click', function() {
        const isDark = document.body.classList.toggle('dark-mode');
        this.classList.toggle('dark-mode');

        if (isDark) {
          localStorage.setItem('darkMode', 'true');
          themeState.textContent = 'Dark';
        } else {
          localStorage.setItem('darkMode', 'false');
          themeState.textContent = 'Light';
        }
      });

      // Make theme toggle keyboard accessible
      themeToggle.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.click();
        }
      });
      
      // Enhanced Newsletter form handling with validation
      const newsletterForm = document.getElementById('newsletter-form');
      if (newsletterForm) {
        const emailInput = newsletterForm.querySelector('input[type="email"]');
        const submitBtn = newsletterForm.querySelector('button[type="submit"]');

        // Real-time email validation
        emailInput.addEventListener('input', function() {
          const email = this.value;
          const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

          this.classList.toggle('valid', isValid && email.length > 0);
          this.classList.toggle('invalid', !isValid && email.length > 0);

          submitBtn.disabled = !isValid;
        });

        newsletterForm.addEventListener('submit', function(e) {
          e.preventDefault();
          const email = emailInput.value;

          // Show loading state
          submitBtn.textContent = 'Subscribing...';
          submitBtn.disabled = true;

          // Simulate API call
          setTimeout(() => {
            showNotification('Thank you for subscribing! Check your email for confirmation.', 'success');
            this.reset();
            submitBtn.textContent = 'Subscribe';
            submitBtn.disabled = false;
            emailInput.classList.remove('valid', 'invalid');
          }, 1500);
        });
      }
      
      // Optimized progress bar with debounced scroll
      const debouncedScroll = debounce(() => {
        safeExecute(() => {
          const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
          const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
          const scrolled = (winScroll / height) * 100;
          const progressBar = document.getElementById("progressBar");
          if (progressBar) {
            progressBar.style.width = scrolled + "%";
          }
        });
      }, 10);

      window.addEventListener('scroll', debouncedScroll, { passive: true });
      
      // Quote widget functionality
      async function fetchQuote() {
        try {
          const response = await fetch('https://api.quotable.io/random');
          const data = await response.json();
          document.getElementById('quote-text').textContent = `"${data.content}"`;
          document.getElementById('quote-author').textContent = `- ${data.author}`;
        } catch (error) {
          console.error('Error fetching quote:', error);
          document.getElementById('quote-text').textContent = '"Literature is the art of discovering something extraordinary about ordinary people, and saying with ordinary words something extraordinary."';
          document.getElementById('quote-author').textContent = '- Boris Pasternak';
        }
      }
      
      // Fetch a quote when the page loads
      fetchQuote();

      // Initialize enhanced features
      document.addEventListener('DOMContentLoaded', function() {
        // Create particle system
        createParticles();

        // Enhanced loading screen
        createEnhancedLoading();

        // Add scroll event listeners
        window.addEventListener('scroll', handleScrollAnimations);
        window.addEventListener('scroll', handleParallax);

        // Initial check for scroll animations
        handleScrollAnimations();

        // Typing effect for main title
        const mainTitle = document.querySelector('.text1');
        if (mainTitle) {
          setTimeout(() => {
            typeWriter(mainTitle, mainTitle.textContent, 150);
          }, 500);
        }

        // Add ripple effect to buttons
        const rippleButtons = document.querySelectorAll('button, .hero-btn, #issue1-btn, #cta1-btn');
        rippleButtons.forEach(button => {
          button.classList.add('ripple');
        });

        // Smooth scroll for navigation links
        const navLinks = document.querySelectorAll('nav a[href^="#"]');
        navLinks.forEach(link => {
          link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
              targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
              });
            }
          });
        });

        // Enhanced card tilt effect
        const tiltCards = document.querySelectorAll('.card');
        tiltCards.forEach(card => {
          card.addEventListener('mousemove', function(e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            card.style.transform = `translateY(-8px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
          });

          card.addEventListener('mouseleave', function() {
            card.style.transform = 'translateY(-8px) rotateX(0deg) rotateY(0deg)';
          });
        });

        // Back to top smooth scroll
        const backToTop = document.querySelector('.back-to-top');
        if (backToTop) {
          backToTop.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
              top: 0,
              behavior: 'smooth'
            });
          });
        }

        // Intersection Observer for performance
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

        // Observe elements for scroll animations
        document.querySelectorAll('.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right').forEach(el => {
          observer.observe(el);
        });

        // Enhanced card interaction with micro-animations
        const glowCards = document.querySelectorAll('.card');
        glowCards.forEach(card => {
          card.addEventListener('mouseenter', function() {
            // Add subtle glow effect
            this.style.boxShadow = '0 20px 40px rgba(99, 102, 241, 0.15), 0 0 20px rgba(99, 102, 241, 0.1)';
          });

          card.addEventListener('mouseleave', function() {
            this.style.boxShadow = '';
          });
        });

        // Add particle effect on button hover
        const particleButtons = document.querySelectorAll('button, .hero-btn');
        particleButtons.forEach(button => {
          button.addEventListener('mouseenter', function(e) {
            createButtonParticles(e.target);
          });
        });
      });

      // Notification system
      function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => notification.remove());

        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
          <div class="notification-content">
            <i class="fas ${getNotificationIcon(type)}"></i>
            <span>${message}</span>
            <button class="notification-close" aria-label="Close notification">
              <i class="fas fa-times"></i>
            </button>
          </div>
        `;

        // Add to page
        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => notification.classList.add('show'), 10);

        // Auto remove after 5 seconds
        setTimeout(() => {
          notification.classList.remove('show');
          setTimeout(() => {
            if (notification.parentNode) {
              notification.parentNode.removeChild(notification);
            }
          }, 300);
        }, 5000);

        // Close button functionality
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
          notification.classList.remove('show');
          setTimeout(() => {
            if (notification.parentNode) {
              notification.parentNode.removeChild(notification);
            }
          }, 300);
        });
      }

      function getNotificationIcon(type) {
        switch(type) {
          case 'success': return 'fa-check-circle';
          case 'error': return 'fa-exclamation-circle';
          case 'warning': return 'fa-exclamation-triangle';
          default: return 'fa-info-circle';
        }
      }

      // Button particle effect
      function createButtonParticles(button) {
        const rect = button.getBoundingClientRect();
        const particles = 8;

        for (let i = 0; i < particles; i++) {
          const particle = document.createElement('div');
          particle.className = 'button-particle';
          particle.style.left = (rect.left + rect.width / 2) + 'px';
          particle.style.top = (rect.top + rect.height / 2) + 'px';

          // Random direction
          const angle = (Math.PI * 2 * i) / particles;
          const velocity = 50 + Math.random() * 50;
          particle.style.setProperty('--tx', Math.cos(angle) * velocity + 'px');
          particle.style.setProperty('--ty', Math.sin(angle) * velocity + 'px');

          document.body.appendChild(particle);

          // Remove particle after animation
          setTimeout(() => {
            if (particle.parentNode) {
              particle.parentNode.removeChild(particle);
            }
          }, 1000);
        }
      }

      // Enhanced scroll progress with smooth animation
      let scrollProgress = 0;
      function updateScrollProgress() {
        const scrolled = (window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        scrollProgress += (scrolled - scrollProgress) * 0.1; // Smooth interpolation

        const progressBar = document.getElementById("progressBar");
        if (progressBar) {
          progressBar.style.width = scrollProgress + "%";
        }

        requestAnimationFrame(updateScrollProgress);
      }
      updateScrollProgress();

      // Add loading states for interactive elements
      function addLoadingState(element) {
        element.classList.add('loading');
        element.disabled = true;
        const originalText = element.textContent;
        element.textContent = 'Loading...';

        return () => {
          element.classList.remove('loading');
          element.disabled = false;
          element.textContent = originalText;
        };
      }

      // Enhanced theme toggle with smooth transitions (already declared above, just enhance it)
      const existingThemeToggle = document.getElementById('theme-toggle');
      if (existingThemeToggle) {
        const originalClickHandler = existingThemeToggle.onclick;
        existingThemeToggle.addEventListener('click', function() {
          // Call original handler first
          if (originalClickHandler) originalClickHandler.call(this);

          // Add enhanced features
          const isDark = document.body.classList.contains('dark-mode');
          showNotification(isDark ? 'Switched to dark mode' : 'Switched to light mode', 'info');
        });
      }