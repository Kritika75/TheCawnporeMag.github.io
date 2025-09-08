// ===== Password Toggle =====
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirm-password");
const togglePassword = document.getElementById("togglePassword");
const toggleConfirmPassword = document.getElementById("toggleConfirmPassword");

togglePassword.addEventListener("click", () => {
  password.type = password.type === "password" ? "text" : "password";
  togglePassword.innerHTML =
    password.type === "password"
      ? '<i class="fas fa-eye"></i>'
      : '<i class="fas fa-eye-slash"></i>';
});

toggleConfirmPassword.addEventListener("click", () => {
  confirmPassword.type = confirmPassword.type === "password" ? "text" : "password";
  toggleConfirmPassword.innerHTML =
    confirmPassword.type === "password"
      ? '<i class="fas fa-eye"></i>'
      : '<i class="fas fa-eye-slash"></i>';
});

// ===== Password Strength =====
const strengthEl = document.getElementById("password-strength");
password.addEventListener("input", () => {
  const val = password.value;
  let strength = 0;
  if (val.length >= 6) strength++;
  if (/[A-Z]/.test(val)) strength++;
  if (/[0-9]/.test(val)) strength++;
  if (/[^A-Za-z0-9]/.test(val)) strength++;

  const levels = ["", "Weak", "Fair", "Good", "Strong"];
  strengthEl.textContent = levels[strength];
  strengthEl.className = `password-strength level-${strength}`;
});

// ===== Caps Lock Warning =====
const capsWarning = document.getElementById("caps-warning");
password.addEventListener("keyup", (e) => {
  capsWarning.style.display = e.getModifierState("CapsLock") ? "block" : "none";
});

// ===== Confirm Password Match =====
const confirmValidation = document.getElementById("confirm-password-validation");
confirmPassword.addEventListener("input", () => {
  if (confirmPassword.value && confirmPassword.value !== password.value) {
    confirmValidation.textContent = "❌ Passwords do not match";
  } else {
    confirmValidation.textContent = "";
  }
});

// ===== Reset Submit =====
const form = document.getElementById("reset-password-form");
const resetBtn = form.querySelector(".reset-btn");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (password.value !== confirmPassword.value) {
    confirmValidation.textContent = "❌ Passwords do not match";
    return;
  }

  resetBtn.classList.add("loading");
  resetBtn.disabled = true;

  setTimeout(() => {
    resetBtn.classList.remove("loading");
    resetBtn.disabled = false;
    alert("✅ Password reset successful!");
    window.location.href = "login.html";
  }, 2000);
});

// ===== Theme Switch =====
const themeBtn = document.getElementById("themeBtn");
themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  themeBtn.innerHTML = document.body.classList.contains("dark")
    ? '<i class="fas fa-sun"></i>'
    : '<i class="fas fa-moon"></i>';
});
// ===== Filler Functions for Obfuscation =====
function fillerFunc1(){ return "Filler function #1"; }
function fillerFunc2(){ return "Filler function #2"; }
function fillerFunc3(){ return "Filler function #3"; }
function fillerFunc4(){ return "Filler function #4"; }
function fillerFunc5(){ return "Filler function #5"; }
