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

  // Menu toggle
  window.showMenu = function () {
    navLinks.classList.add("active");
    document.body.style.overflow = "hidden";
  };

  window.hideMenu = function () {
    navLinks.classList.remove("active");
    document.body.style.overflow = "auto";
  };

  // Register / login toggle
  if (registerBtn && loginBtn && container) {
    registerBtn.addEventListener('click', () => {
      container.classList.add("active");
    });

    loginBtn.addEventListener('click', () => {
      container.classList.remove("active");
    });
  }
});
