document.addEventListener("DOMContentLoaded", () => {
  // This script handles login, registration, and UI updates on the main page.
  const loginForm = document.getElementById("loginForm");
  const loginModal = document.getElementById("loginModal");

  // This part handles the visual switching of the form (client/owner/signup)
  const switchFormLink = document.getElementById("switchFormLink");
  const authModeLink = document.getElementById("authModeLink");
  const clientFields = document.getElementById("clientFields");
  const ownerFields = document.getElementById("ownerFields");
  const signUpFields = document.getElementById("signUpFields");
  const loginModalTitle = document.getElementById("loginModalTitle");
  const submitBtnText = document.getElementById("submitBtnText");
  let isOwnerView = false;
  let isSignUpView = false;

  function updateFormView() {
    clientFields.style.display = "none";
    ownerFields.style.display = "none";
    signUpFields.style.display = "none";
    clientFields.querySelectorAll("input").forEach((i) => (i.required = false));
    ownerFields.querySelectorAll("input").forEach((i) => (i.required = false));
    signUpFields.querySelectorAll("input").forEach((i) => (i.required = false));

    if (isSignUpView) {
      loginModalTitle.textContent = "Create an Account";
      signUpFields.style.display = "block";
      submitBtnText.textContent = "Sign Up";
      authModeLink.textContent = "Already have an account? Login";
      switchFormLink.style.display = "none";
      signUpFields
        .querySelectorAll("input")
        .forEach((i) => (i.required = true));
    } else if (isOwnerView) {
      loginModalTitle.textContent = "Owner Access";
      ownerFields.style.display = "block";
      switchFormLink.textContent = "Not the owner? Access as a client.";
      submitBtnText.textContent = "Access Panel";
      authModeLink.textContent = "Don't have an account? Sign Up";
      switchFormLink.style.display = "block";
      ownerFields.querySelectorAll("input").forEach((i) => (i.required = true));
    } else {
      loginModalTitle.textContent = "Welcome Back";
      clientFields.style.display = "block";
      switchFormLink.textContent = "Are you the owner?";
      submitBtnText.textContent = "Access Portfolio";
      authModeLink.textContent = "Don't have an account? Sign Up";
      switchFormLink.style.display = "block";
      clientFields
        .querySelectorAll("input")
        .forEach((i) => (i.required = true));
    }
  }
  authModeLink.addEventListener("click", () => {
    isSignUpView = !isSignUpView;
    isOwnerView = false;
    updateFormView();
  });
  switchFormLink.addEventListener("click", () => {
    isOwnerView = !isOwnerView;
    updateFormView();
  });
  // End of visual logic

  // --- FORM SUBMISSION ---
  // --- FORM SUBMISSION ---
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(loginForm);
    const data = Object.fromEntries(formData.entries());

    // --- NEW LOGIC: Determine the login type ---
    if (!isSignUpView) {
      // Only add loginType if we are not signing up
      data.loginType = isOwnerView ? "owner" : "client";
    }

    const endpoint = isSignUpView
      ? `${API_URL}/users/register`
      : `${API_URL}/users/login`;

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.message);

      localStorage.setItem("userToken", result.token);
      localStorage.setItem(
        "userData",
        JSON.stringify({ username: result.username, role: result.role })
      );

      alert(`Success! Welcome, ${result.username}.`);
      loginModal.classList.remove("active");
      checkLoginStatus();
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  });
  // --- LOGOUT LOGIC ---
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      // Remove the token and user data from storage
      localStorage.removeItem("userToken");
      localStorage.removeItem("userData");

      alert("You have been logged out.");

      // Update the UI to the logged-out state
      checkLoginStatus();
    });
  }
  checkLoginStatus(); // Check login status on page load
});
