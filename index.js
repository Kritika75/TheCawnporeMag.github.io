  // Creating circles for cursor trail    
    for(let i=0; i<40; i++)
    {
       const dot= document.createElement("div");
       dot.className="circle";
       document.body.appendChild(dot);
    }
  // Coordinates for the cursor
  const coords = { x: 0, y: 0 };
  const circles = document.querySelectorAll(".circle");

  // Colors for the circles
  const colors = [
    "#ffb56b", "#fdaf69", "#f89d63", "#f59761", "#ef865e", "#ec805d",
    "#e36e5c", "#df685c", "#d5585c", "#d1525c", "#c5415d", "#c03b5d",
    "#b22c5e", "#ac265e", "#9c155f", "#950f5f", "#830060", "#7c0060",
    "#680060", "#60005f", "#48005f", "#3d005e"
  ];

  // Assign colors and initial position to each circle
  circles.forEach(function (circle, index) {
    circle.x = 0;
    circle.y = 0;
    circle.style.backgroundColor = colors[index % colors.length];
  });

  // Update the coordinates when the mouse moves
  window.addEventListener("mousemove", function (e) {
    coords.x = e.clientX;
    coords.y = e.clientY;
  });

  // Animation function to move the circles
  function animateCircles() {
    let x = coords.x;
    let y = coords.y;

    circles.forEach(function (circle, index) {
      // Update the position and scale of each circle
      circle.style.left = x - 12 + "px";
      circle.style.top = y - 12 + "px";
      circle.style.scale = (circles.length - index) / circles.length;

      circle.x = x;
      circle.y = y;

      // Get the next circle in the sequence
      const nextCircle = circles[index + 1] || circles[0];
      x += (nextCircle.x - x) * 0.15;
      y += (nextCircle.y - y) * 0.15;
    });

    // Repeat the animation
    requestAnimationFrame(animateCircles);
  }

  // Start the animation
  animateCircles();

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

//Typewriter effect
window.onload = function () {
    const loadingScreen = document.getElementById("loading-screen");
    const mainName = document.querySelector(".main-name");
    const text = "The Cawnpore";

    setTimeout(() => {
        loadingScreen.classList.add("hidden");

        if (!mainName) {
            console.error("main-name span not found");
            return;
        }

        mainName.textContent = "";
        let charIndex = 0;

        function type() {
            if (charIndex < text.length) {
                mainName.textContent += text.charAt(charIndex);
                charIndex++;
                setTimeout(type, 150);
            }
        }

        type();
    }, 6000);
};

//about cards.
document.addEventListener('mousemove', (e) => {
  document.querySelectorAll('.glass-card').forEach((card) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--cursor-x', `${x}px`);
    card.style.setProperty('--cursor-y', `${y}px`);
  });
});
