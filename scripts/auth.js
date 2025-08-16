const API = (() => {
  const host = window.location.hostname
  const base = (host === 'localhost' || host === '127.0.0.1') ? 'http://localhost:5000' : ''
  return {
    signup: (data) => fetch(base + '/api/auth/signup', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify(data) }),
    login: (data) => fetch(base + '/api/auth/login', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify(data) }),
    me: (token) => fetch(base + '/api/auth/me', { headers: { 'Authorization': 'Bearer ' + token } })
  }
})()

// Password visibility toggle functionality for both login and signup pages
function initializePasswordToggle() {
  // Get password input and toggle button elements
  const passwordInput = document.getElementById('password');
  const toggleButton = document.getElementById('togglePassword');

  // Check if both elements exist on the current page and button doesn't already have event listener
  if (passwordInput && toggleButton && !toggleButton.hasAttribute('data-initialized')) {
    // Mark button as initialized to prevent duplicate event listeners
    toggleButton.setAttribute('data-initialized', 'true');

    // Add click event listener to toggle button
    toggleButton.addEventListener('click', function () {
      // Toggle password input type between 'password' and 'text'
      const currentType = passwordInput.getAttribute('type');
      const newType = currentType === 'password' ? 'text' : 'password';
      passwordInput.setAttribute('type', newType);

      // Get the icon element and ensure only one class is applied
      const icon = this.querySelector('i');
      if (icon) {
        // Clear all Font Awesome classes to prevent conflicts
        icon.className = '';

        // Add the appropriate Font Awesome 6 class based on password visibility
        if (newType === 'text') {
          // Show eye-slash when password is visible
          icon.className = 'fas fa-eye-slash';
        } else {
          // Show eye when password is hidden
          icon.className = 'fas fa-eye';
        }
      }
    });

    // Add hover effect for better user experience using CSS classes
    toggleButton.addEventListener('mouseenter', function () {
      this.classList.add('toggle-hover');
    });

    toggleButton.addEventListener('mouseleave', function () {
      this.classList.remove('toggle-hover');
    });
  }
}

// Initialize password toggle when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
  initializePasswordToggle();
});

if (document.getElementById('signup-form')) {
  document.getElementById('signup-form').addEventListener('submit', async (e) => {
    e.preventDefault()
    const username = document.getElementById('username').value
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    const res = await API.signup({ username, email, password })
    const data = await res.json()
    if (res.ok) {
      alert('Registered. Please login.')
      window.location.href = 'login.html'
    } else {
      alert(data.message || 'Error')
    }
  })
}

if (document.getElementById('login-form')) {
  document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault()
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    const res = await API.login({ email, password })
    const data = await res.json()
    if (res.ok) {
      localStorage.setItem('token', data.token)
      window.location.href = 'index.html'
    } else {
      alert(data.message || 'Login failed')
    }
  })
}