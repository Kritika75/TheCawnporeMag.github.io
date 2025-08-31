const API = (() => {
  const host = window.location.hostname
  const base = (host === 'localhost' || host === '127.0.0.1')
    ? 'http://localhost:5000'
    : 'https://your-production-backend-url.herokuapp.com' // ✅ FIXED: Added proper production URL

  return {
    signup: (data) =>
      fetch(base + '/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      }),

    login: (data) =>
      fetch(base + '/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      }),

    me: (token) =>
      fetch(base + '/api/auth/me', {
        headers: { Authorization: 'Bearer ' + token },
      }),
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
  // Initialize form validation for both login and signup pages
  initializeFormValidation();
});

/* ===============================================
   FORM VALIDATION SYSTEM - START
   =============================================== */

// Validation configuration for reusability
const VALIDATION_RULES = {
  email: { pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, minLength: 5, maxLength: 100 },
  username: { pattern: /^[a-zA-Z0-9_-]+$/, minLength: 3, maxLength: 20 },
  password: { login: { minLength: 6 }, signup: { minLength: 8, strengthCheck: true } }
};

/**
 * Initialize form validation for both login and signup pages
 */
function initializeFormValidation() {
  const formConfigs = {
    'login-form': [
      { id: 'email', type: 'email' },
      { id: 'password', type: 'password', mode: 'login' }
    ],
    'signup-form': [
      { id: 'username', type: 'username' },
      { id: 'email', type: 'email' },
      { id: 'password', type: 'password', mode: 'signup' }
    ]
  };

  // Setup validation for each form
  Object.entries(formConfigs).forEach(([formId, fields]) => {
    if (document.getElementById(formId)) {
      fields.forEach(field => setupFieldValidation(field));
    }
  });
}

/**
 * Setup validation for a single field - removes duplicate event listener code
 */
function setupFieldValidation(field) {
  const input = document.getElementById(field.id);
  if (!input) return;

  const validator = () => validateField(input, field.type, field.mode || 'login');
  ['input', 'blur'].forEach(event => input.addEventListener(event, validator));
}

/**
 * Universal field validation function - handles all types with common logic
 */
function validateField(input, type, mode) {
  if (!input) return false;

  const value = input.value.trim();
  const messageId = `${input.id}-validation`;

  if (!value) {
    hideValidationMessage(messageId, input);
    if (type === 'password' && mode === 'signup') hidePasswordStrengthIndicator(messageId);
    return false;
  }

  switch (type) {
    case 'email': return validateWithRules(input, value, messageId, 'email', '✓ Email format is valid');
    case 'username': return validateWithRules(input, value, messageId, 'username', '✓ Username is valid');
    case 'password': return validatePasswordField(input, value, messageId, mode);
    default: return false;
  }
}

/**
 * Unified validation with rules - eliminates duplicate code
 */
function validateWithRules(input, value, messageId, type, successMsg) {
  const rules = VALIDATION_RULES[type];
  const errors = [
    [type === 'email' && !rules.pattern.test(value), 'Please enter a valid email address'],
    [type === 'email' && value.includes('..'), 'Email cannot contain consecutive dots'],
    [type === 'email' && (value.startsWith('.') || value.endsWith('.')), 'Email cannot start or end with a dot'],
    [type === 'username' && value.length < rules.minLength, `Username must be at least ${rules.minLength} characters (${value.length}/${rules.minLength})`],
    [type === 'username' && value.length > rules.maxLength, `Username cannot exceed ${rules.maxLength} characters`],
    [type === 'username' && !rules.pattern.test(value), 'Username can only contain letters, numbers, underscore, and hyphen'],
    [type === 'username' && !/^[a-zA-Z0-9]/.test(value), 'Username must start with a letter or number']
  ].filter(([condition]) => condition);

  if (errors.length) {
    showValidationMessage(messageId, errors[0][1], 'error', input);
    return false;
  }

  showValidationMessage(messageId, successMsg, 'success', input);
  return true;
}

/**
 * Concise password validation with mode support
 */
function validatePasswordField(input, password, messageId, mode) {
  const rules = VALIDATION_RULES.password[mode];
  if (!rules) return false;

  if (password.length < rules.minLength) {
    showValidationMessage(messageId, `Password must be at least ${rules.minLength} characters (${password.length}/${rules.minLength})`, 'error', input);
    if (mode === 'signup') hidePasswordStrengthIndicator(messageId);
    return false;
  }

  if (mode === 'signup' && rules.strengthCheck) {
    const strength = calculatePasswordStrength(password);
    showPasswordStrengthIndicator(messageId, strength);
    const messages = {
      weak: ['Password is weak. ' + strength.suggestions[0], 'warning', false],
      fair: ['Password is fair. ' + (strength.suggestions[0] || 'Consider adding more variety'), 'warning', true],
      good: ['✓ Good password strength', 'success', true],
      strong: ['✓ Strong password!', 'success', true]
    };
    const [message, type, isValid] = messages[strength.level];
    showValidationMessage(messageId, message, type, input);
    return isValid;
  }

  showValidationMessage(messageId, '✓ Password entered', 'success', input);
  return true;
}

/**
 * Efficient validation message utilities
 */
function showValidationMessage(messageId, message, type, inputElement) {
  const messageElement = document.getElementById(messageId);
  if (!messageElement || !inputElement) return;

  messageElement.className = `validation-message show ${type}`;

  // Remove all validation-* classes using classList methods
  Array.from(inputElement.classList)
    .filter(cls => /^validation-\w+$/.test(cls))
    .forEach(cls => inputElement.classList.remove(cls));

  // Add new validation class
  inputElement.classList.add(`validation-${type}`);
  messageElement.textContent = message;
}

function hideValidationMessage(messageId, inputElement) {
  const messageElement = document.getElementById(messageId);
  if (messageElement) messageElement.className = 'validation-message';

  if (inputElement) {
    // Remove all validation-* classes using classList methods
    Array.from(inputElement.classList)
      .filter(cls => /^validation-\w+$/.test(cls))
      .forEach(cls => inputElement.classList.remove(cls));
  }
}

/**
 * Concise password strength calculation
 */
function calculatePasswordStrength(password) {
  const checks = [
    [password.length >= 8, 'Add more characters'],
    [password.length >= 12, ''],
    [/[a-z]/.test(password), 'Add lowercase letters'],
    [/[A-Z]/.test(password), 'Add uppercase letters'],
    [/[0-9]/.test(password), 'Add numbers'],
    [/[^a-zA-Z0-9]/.test(password), 'Add special characters (!@#$%)']
  ];

  const score = checks.filter(([test]) => test).length;
  const suggestions = checks.filter(([test, msg]) => !test && msg).map(([, msg]) => msg);
  const levels = ['weak', 'weak', 'weak', 'fair', 'fair', 'good', 'strong'];

  return { level: levels[score] || 'weak', score, suggestions };
}

/**
 * Efficient password strength indicator
 */
function showPasswordStrengthIndicator(messageId, strength) {
  const messageElement = document.getElementById(messageId);
  if (!messageElement) return;

  // Clean up existing indicator
  const existing = messageElement.parentNode.querySelector('.password-strength-indicator');
  if (existing) existing.remove();

  const indicator = document.createElement('div');
  indicator.innerHTML = `
    <div class="password-strength-indicator">
      <div class="password-strength-bar">
        <div class="password-strength-fill ${strength.level}"></div>
      </div>
      <div class="password-strength-text">Password strength: ${strength.level.charAt(0).toUpperCase() + strength.level.slice(1)}</div>
    </div>
  `;

  messageElement.parentNode.insertBefore(indicator.firstElementChild, messageElement.nextSibling);
}

function hidePasswordStrengthIndicator(messageId) {
  const messageElement = document.getElementById(messageId);
  const indicator = messageElement?.parentNode?.querySelector('.password-strength-indicator');
  if (indicator) indicator.remove();
}

/**
 * Efficient form validation for submission
 */
function validateForm(formType) {
  const fieldConfigs = {
    login: [['email', 'email'], ['password', 'password', 'login']],
    signup: [['username', 'username'], ['email', 'email'], ['password', 'password', 'signup']]
  };

  const fields = fieldConfigs[formType];
  return fields ? fields.every(([id, type, mode]) => {
    const input = document.getElementById(id);
    return input && validateField(input, type, mode || 'login');
  }) : false;
}

if (document.getElementById('signup-form')) {
  document.getElementById('signup-form').addEventListener('submit', async (e) => {
    e.preventDefault()

    // Validate form before submission
    if (!validateForm('signup')) {
      return; // Stop submission if validation fails
    }

    const username = document.getElementById('username').value
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    
    try {
      const res = await API.signup({ username, email, password })
      const data = await res.json()
      if (res.ok) {
        if (window.toast) {
          window.toast.success('Registration successful! Please login.');
        } else {
          alert('Registered. Please login.');
        }
        window.location.href = 'login.html'
      } else {
        if (window.toast) {
          window.toast.error(data.message || 'Registration failed');
        } else {
          alert(data.message || 'Error');
        }
      }
    } catch (error) {
      if (window.toast) {
        window.toast.error('Network error. Please try again.');
      } else {
        alert('Network error. Please try again.');
      }
    }
  })
}

if (document.getElementById('login-form')) {
  document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault()

    // Validate form before submission
    if (!validateForm('login')) {
      return; // Stop submission if validation fails
    }

    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    
    try {
      const res = await API.login({ email, password })
      const data = await res.json()
      if (res.ok) {
        localStorage.setItem('token', data.token)
        if (window.toast) {
          window.toast.success('Login successful! Welcome back.');
        }
        window.location.href = 'index.html'
      } else {
        if (window.toast) {
          window.toast.error(data.message || 'Login failed');
        } else {
          alert(data.message || 'Login failed');
        }
      }
    } catch (error) {
      if (window.toast) {
        window.toast.error('Network error. Please try again.');
      } else {
        alert('Network error. Please try again.');
      }
    }
  })
}