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
    var navLinks = document.getElementById("navLinks");

   function toggleMenu(show) {
  navLinks.style.right = show ? "0" : "-200px";
  document.body.style.overflow = show ? "hidden" : "auto";
}

// Call like this:
window.showMenu = () => toggleMenu(true);
window.hideMenu = () => toggleMenu(false);


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

/*registerBtn.addEventListener('click', () =>  {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});*/

// to show and hide the back-to-top button
window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) { 
        backToTop.classList.add("active");
    } else {
        backToTop.classList.remove("active");
    }
})


document.addEventListener("DOMContentLoaded", function () {
  // Word typing animation
  const word = "About";
  const container = document.getElementById("word");
  let index = 0;

  function typeLetter() {
    if (index < word.length) {
      container.textContent += word[index];
      index++;
      setTimeout(typeLetter, 300);
    }
  }

  typeLetter();
});



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
// Fade-in effect for about cards
document.addEventListener("DOMContentLoaded", function() {
  const cards = document.querySelectorAll('.about-card');
  function revealCards() {
    cards.forEach(card => {
      const rect = card.getBoundingClientRect();
      if(rect.top < window.innerHeight - 60) {
        card.classList.add('visible');
      }
    });
  }
  window.addEventListener('scroll', revealCards);
  revealCards();
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
