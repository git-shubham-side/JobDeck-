window.addEventListener("DOMContentLoaded", () => {
  // Auto-dismiss error alert after 3s
  const errorAlert = document.getElementById("error-alert");
  if (errorAlert) {
    setTimeout(() => {
      errorAlert.style.opacity = "0";
      setTimeout(() => errorAlert.remove(), 500);
    }, 3000);
  }

  // Show/Hide password toggle
  const togglePassword = document.getElementById("togglePassword");
  const passwordInput = document.getElementById("password");

  if (togglePassword && passwordInput) {
    togglePassword.addEventListener("click", () => {
      const isHidden = passwordInput.type === "password";
      passwordInput.type = isHidden ? "text" : "password";
      togglePassword.textContent = isHidden ? "Hide" : "Show";
    });
  }

  // Basic work-email sanity check (warns, doesn't block)
  const workEmail = document.getElementById("workEmail");
  const freeDomains = ["gmail.com", "yahoo.com", "hotmail.com", "outlook.com"];

  if (workEmail) {
    workEmail.addEventListener("blur", () => {
      const domain = workEmail.value.split("@")[1]?.toLowerCase();
      if (domain && freeDomains.includes(domain)) {
        workEmail.style.borderColor = "#f59e0b";
      } else {
        workEmail.style.borderColor = "";
      }
    });
  }
});
