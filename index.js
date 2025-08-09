window.onscroll = function() {
  scrollProgressBar();
};

function scrollProgressBar() {
  var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  var scrolled = (winScroll / height) * 100;
  document.getElementById("progressBar").style.width = scrolled + "%";
}

document.addEventListener("DOMContentLoaded", function() {
    let navLinks = document.getElementById("navLinks");

    function showMenu() {
        navLinks.style.right = "0";
        document.body.style.overflow = "hidden";
    }

    function hideMenu() {
        navLinks.style.right = "-200px";
        document.body.style.overflow = "auto";
    }

// Call like this:
window.showMenu = () => showMenu();
window.hideMenu = () => hideMenu();


    //search bar code

    document.getElementById('searchBtn').addEventListener('click', function() {
        const query = document.getElementById('searchBar').value.toLowerCase();
        const cards = document.querySelectorAll('.team-card, .founder-card');

        cards.forEach(card => {
            const name = card.querySelector('h2, h3')?.textContent.toLowerCase();
            if (name.includes(query)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });


    // === Newsletter Form Validation ===
    var form = document.querySelector('form[action="/subscribe"]');
        if(form) {
            var emailInput = form.querySelector('input[name="email"]');
            var errorMsg = document.createElement("p");
            errorMsg.style.color = "red";
            errorMsg.style.marginTop = "5px";
            errorMsg.style.display = "none";
            form.appendChild(errorMsg);

            form.addEventListener("submit", function (e) {
                e.preventDefault();
                var email = emailInput.value.trim();
                var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

                if(!emailRegex.test(email)) {
                    errorMsg.textContent = "Please enter a valid email address.";
                    errorMsg.style.color = "red";
                    errorMsg.style.display = "block";
                } else {
                    errorMsg.textContent = "Subscribed successfully!";
                    errorMsg.style.color = "#a0ed79";
                    errorMsg.style.display = "block";
                }
                setTimeout(() => {
                    errorMsg.style.display = "none";
                }, 3000);
                emailInput.value = "";
            });
        }

    // Loader logic
    var loaderScreen = document.getElementById('loading-screen');
    if (loaderScreen) {
        setTimeout(function() {
            loaderScreen.classList.add('fading');
        }, 1700); // Start fade/scale at 1.7s
        setTimeout(function() {
            loaderScreen.classList.add('hidden');
        }, 2000); // Hide after 2s
    }
});

const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');
const backToTop = document.querySelector('.back-to-top');

window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) { 
        backToTop.classList.add("active");
    } else {
        backToTop.classList.remove("active");
    }
})
// === Quote of the Day Widget ===
document.addEventListener("DOMContentLoaded", () => {
    const quotes = [
        { text: "Poetry is not a luxury. It is a vital necessity of our existence.", author: "Audre Lorde" },
        { text: "Fill your paper with the breathings of your heart.", author: "William Wordsworth" },
        { text: "Poetry is when an emotion has found its thought and the thought has found words.", author: "Robert Frost" },
        { text: "There is no greater agony than bearing an untold story inside you.", author: "Maya Angelou" },
        { text: "A word after a word after a word is power.", author: "Margaret Atwood" },
        { text: "There is no greater agony than bearing an untold story inside you.", author: "Maya Angelou" },
        { text: "Creativity is intelligence having fun.", author: "Albert Einstein" }
    ];

    const quoteTextEl = document.getElementById("quote-text");
    const quoteAuthorEl = document.getElementById("quote-author");

    if (quoteTextEl && quoteAuthorEl) {
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        quoteTextEl.textContent = `"${randomQuote.text}"`;
        quoteAuthorEl.textContent = `– ${randomQuote.author}`;
    }
});
// === Social Share Buttons ===
document.addEventListener("DOMContentLoaded", () => {
    const pageURL = encodeURIComponent(window.location.href);
    const pageTitle = encodeURIComponent(document.title);

    const twitterBtn = document.querySelector(".share-btn.twitter");
    const linkedinBtn = document.querySelector(".share-btn.linkedin");
    const whatsappBtn = document.querySelector(".share-btn.whatsapp");

    if (twitterBtn) {
        twitterBtn.href = `https://twitter.com/intent/tweet?url=${pageURL}&text=${pageTitle}`;
    }
    if (linkedinBtn) {
        linkedinBtn.href = `https://www.linkedin.com/shareArticle?mini=true&url=${pageURL}&title=${pageTitle}`;
    }
    if (whatsappBtn) {
        whatsappBtn.href = `https://api.whatsapp.com/send?text=${pageTitle}%20${pageURL}`;
    }
});

// Update the year in the footer
document.getElementById("year").textContent = new Date().getFullYear();

/* filepath: c:\Users\asmim\TheCawnporeMag.github.io-1\index.js */
// --- ADD THIS WRAPPER ---
document.addEventListener("DOMContentLoaded", function () {

  // All of your existing cursor code goes inside here.
  // No need to change anything inside.

  const coords = { x: 0, y: 0 };
  const circles = document.querySelectorAll(".circle");
  const cursorToggle = document.getElementById("cursorToggle");
  let isEffectEnabled = true;

  const colors = [
    "#ffb56b", "#fdaf69", "#f89d63", "#f59761", "#ef865e", "#ec805d",
    "#e36e5c", "#df685c", "#d5585c", "#d1525c", "#c5415d", "#c03b5d",
    "#b22c5e", "#ac265e", "#9c155f", "#950f5f", "#830060", "#7c0060",
    "#680060", "#60005f", "#48005f", "#3d005e"
  ];

  circles.forEach(function (circle, index) {
    circle.x = 0;
    circle.y = 0;
    circle.style.backgroundColor = colors[index % colors.length];
  });

  window.addEventListener("mousemove", function (e) {
    coords.x = e.clientX;
    coords.y = e.clientY;
  });

  function animateCircles() {
    if (isEffectEnabled) {
      let x = coords.x;
      let y = coords.y;

      circles.forEach(function (circle, index) {
        circle.style.display = 'block';
        circle.style.left = x - 12 + "px";
        circle.style.top = y - 12 + "px";
        circle.style.scale = (circles.length - index) / circles.length;
        circle.x = x;
        circle.y = y;
        const nextCircle = circles[index + 1] || circles[0];
        x += (nextCircle.x - x) * 0.15;
        y += (nextCircle.y - y) * 0.15;
      });
    }
    requestAnimationFrame(animateCircles);
  }

  animateCircles();

  cursorToggle.addEventListener('change', () => {
    isEffectEnabled = cursorToggle.checked;

    if (!isEffectEnabled) {
      circles.forEach(circle => {
        circle.style.display = 'none';
      });
    }
  });

  // --- END OF THE WRAPPER ---
});

/* Music Toggle and Background Music */
document.addEventListener("DOMContentLoaded", function () {
        const musicToggle = document.getElementById("music-toggle");
        const bgMusic = document.getElementById("bg-music");

  // Load previous state if exists
  const isMusicEnabled = localStorage.getItem("musicEnabled") === "true";
  if (isMusicEnabled) {
    bgMusic.volume = 0;
    bgMusic.play().then(() => {
      fadeInMusic();
      musicToggle.classList.add("active");
    });
  }

  function fadeInMusic() {
    let volume = 0;
    const fadeIn = setInterval(() => {
      if (volume < 1) {
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
      });
    } else {
      fadeOutMusic();
      localStorage.setItem("musicEnabled", "false");
      musicToggle.classList.remove("active");
    }
  });
});