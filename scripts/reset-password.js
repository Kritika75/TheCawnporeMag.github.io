document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('reset-password-form');
  
  // Get token from URL parameters
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get('token');
  
  if (token) {
    document.getElementById('token').value = token;
  } else {
    alert('Invalid or missing reset token. Please request a new password reset link.');
    window.location.href = 'forgot-password.html';
    return;
  }
  
  if (form) {
    form.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      const password = document.getElementById('password').value;
      const confirmPassword = document.getElementById('confirm-password').value;
      const token = document.getElementById('token').value;
      
      // Validation
      if (!password || !confirmPassword) {
        alert('Please fill in all fields');
        return;
      }
      
      if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
      }
      
      if (password.length < 6) {
        alert('Password must be at least 6 characters long');
        return;
      }
      
      try {
        const response = await fetch('/api/auth/reset-password', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ token, password })
        });
        
        const data = await response.json();
        
        if (response.ok) {
          alert(data.message);
          window.location.href = 'login.html';
        } else {
          alert(data.message || 'An error occurred. Please try again.');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
      }
    });
  }
  
  // Initialize password toggle functionality
  initializePasswordToggle();
  
  // Add toggle for confirm password field
  const toggleConfirmPassword = document.getElementById('toggleConfirmPassword');
  const confirmPasswordInput = document.getElementById('confirm-password');
  
  if (toggleConfirmPassword && confirmPasswordInput) {
    toggleConfirmPassword.addEventListener('click', function() {
      const currentType = confirmPasswordInput.getAttribute('type');
      const newType = currentType === 'password' ? 'text' : 'password';
      confirmPasswordInput.setAttribute('type', newType);
      
      const icon = this.querySelector('i');
      if (icon) {
        icon.className = '';
        if (newType === 'text') {
          icon.className = 'fas fa-eye-slash';
        } else {
          icon.className = 'fas fa-eye';
        }
      }
    });
  }
});
