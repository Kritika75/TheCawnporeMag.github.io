// Mobile Navigation Menu Toggle
const navLinks = document.getElementById("navLinks")

function showMenu() {
  navLinks.classList.add("active")
}

function hideMenu() {
  navLinks.classList.remove("active")
}

// Scroll Progress Bar
window.onscroll = () => {
  scrollProgress()
  toggleBackToTopButton()
}

function scrollProgress() {
  const winScroll = document.body.scrollTop || document.documentElement.scrollTop
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight
  const scrolled = (winScroll / height) * 100
  document.getElementById("progressBar").style.width = scrolled + "%"
}

// Back-to-top button visibility
const backToTopButton = document.querySelector(".back-to-top")

function toggleBackToTopButton() {
  if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
    backToTopButton.classList.add("active")
  } else {
    backToTopButton.classList.remove("active")
  }
}

// Smooth scroll for back-to-top button (if href is #top)
backToTopButton.addEventListener("click", (e) => {
  e.preventDefault()
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  })
})
