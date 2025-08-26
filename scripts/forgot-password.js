document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('forgot-password-form');
  
  if (form) {
    form.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      const email = document.getElementById('email').value.trim();
      
      // Basic validation
      if (!email) {
        alert('Please enter your email address');
        return;
      }
      
      // Email validation
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        alert('Please enter a valid email address');
        return;
      }
      
      try {
        const response = await fetch('/api/auth/forgot-password', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email })
        });
        
        const data = await response.json();
        
        if (response.ok) {
          alert(data.message);
          
          // For testing purposes, show the reset link if provided
          if (data.resetLink) {
            alert(`For testing purposes, here's your reset link:\n${data.resetLink}\n\nCopy this link to reset your password.`);
          }
          
          form.reset();
        } else {
          alert(data.message || 'An error occurred. Please try again.');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
      }
    });
  }
  
  // Initialize password toggle if needed
  initializePasswordToggle();
});
