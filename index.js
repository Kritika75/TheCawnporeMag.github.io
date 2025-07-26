// Scroll progress bar
window.onscroll = function () {
  scrollProgressBar();
};

function scrollProgressBar() {
  const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (winScroll / height) * 100;
  document.getElementById("progressBar").style.width = scrolled + "%";
}

// Wait for DOM to load
document.addEventListener("DOMContentLoaded", function () {
  const navLinks = document.getElementById("navLinks");
  const container = document.getElementById('container');
  const registerBtn = document.getElementById('register');
  const loginBtn = document.getElementById('login');

// Menu toggle with modern logic
function toggleMenu(show) {
  const navLinks = document.getElementById("navLinks");
  if (navLinks) {
    navLinks.classList.toggle("active", show);
    navLinks.style.right = show ? "0" : "-200px";
  }
  document.body.style.overflow = show ? "hidden" : "auto";
}

window.showMenu = () => toggleMenu(true);
window.hideMenu = () => toggleMenu(false);

// === Newsletter Form Validation ===
const form = document.querySelector('form[action="/subscribe"]');
if (form) {
  const emailInput = form.querySelector('input[name="email"]');
  const errorMsg = document.createElement("p");
  errorMsg.style.color = "red";
  errorMsg.style.marginTop = "5px";
  errorMsg.style.display = "none";
  form.appendChild(errorMsg);

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const email = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      errorMsg.textContent = "Please enter a valid email address.";
      errorMsg.style.color = "red";
      errorMsg.style.display = "block";
    } else {
      errorMsg.textContent = "Subscribed successfully!";
      errorMsg.style.color = "green";
      errorMsg.style.display = "block";
    }
  });
}

// Register / Login toggle
const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');
const backToTop = document.querySelector('.back-to-top');

if (registerBtn && loginBtn && container) {
  registerBtn.addEventListener('click', () => {
    container.classList.add("active");
  });

  loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
  });
}

    container.classList.add("active");
  });

  loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
// Newsletter Form Validation
const form = document.querySelector('form[action="/subscribe"]');
if (form) {
  const emailInput = form.querySelector('input[name="email"]');
  const errorMsg = document.createElement("p");
  errorMsg.style.marginTop = "5px";
  errorMsg.style.display = "none";
  form.appendChild(errorMsg);

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const email = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      errorMsg.textContent = "Please enter a valid email address.";
      errorMsg.style.color = "red";
      errorMsg.style.display = "block";
    } else {
      errorMsg.textContent = "Subscribed successfully!";
      errorMsg.style.color = "green";
      errorMsg.style.display = "block";
    }
  });
}

// Back to Top Button Toggle
const backToTop = document.querySelector('.back-to-top');

window.addEventListener("scroll", () => {
  if (window.pageYOffset > 300) {
    backToTop.classList.add("active");
  } else {
    backToTop.classList.remove("active");
  }
});
