document.addEventListener("DOMContentLoaded", function () {
  // --- ELEMENT SELECTION ---
  const loginBtn = document.getElementById("loginBtn");
  const loginModal = document.getElementById("loginModal");
  const closeModal = document.getElementById("closeModal");
  const switchFormLink = document.getElementById("switchFormLink");
  const authModeLink = document.getElementById("authModeLink");
  const clientFields = document.getElementById("clientFields");
  const ownerFields = document.getElementById("ownerFields");
  const signUpFields = document.getElementById("signUpFields");
  const loginModalTitle = document.getElementById("loginModalTitle");
  const loginModalSubtitle = document.getElementById("loginModalSubtitle");
  const submitBtnText = document.getElementById("submitBtnText");

  let isOwnerView = false;
  let isSignUpView = false;

  // --- FUNCTION TO UPDATE THE MODAL'S VIEW ---
  function updateFormView() {
    // Hide all fieldsets first
    clientFields.style.display = "none";
    ownerFields.style.display = "none";
    signUpFields.style.display = "none";

    // Set all inputs to not be required initially
    clientFields
      .querySelectorAll("input")
      .forEach((input) => (input.required = false));
    ownerFields
      .querySelectorAll("input")
      .forEach((input) => (input.required = false));
    signUpFields
      .querySelectorAll("input")
      .forEach((input) => (input.required = false));

    if (isSignUpView) {
      // --- SIGN UP VIEW ---
      loginModalTitle.textContent = "Create an Account";
      loginModalSubtitle.textContent = "Join our exclusive clientele";
      signUpFields.style.display = "block";
      submitBtnText.textContent = "Sign Up";
      authModeLink.textContent = "Already have an account? Login";
      switchFormLink.style.display = "none";
      signUpFields
        .querySelectorAll("input")
        .forEach((input) => (input.required = true));
    } else if (isOwnerView) {
      // --- OWNER LOGIN VIEW ---
      loginModalTitle.textContent = "Owner Access";
      loginModalSubtitle.textContent =
        "Securely access the administration panel";
      ownerFields.style.display = "block";
      switchFormLink.textContent = "Not the owner? Access as a client.";
      submitBtnText.textContent = "Access Panel";
      authModeLink.textContent = "Don't have an account? Sign Up";
      switchFormLink.style.display = "block";
      ownerFields
        .querySelectorAll("input")
        .forEach((input) => (input.required = true));
    } else {
      // --- CLIENT LOGIN VIEW ---
      loginModalTitle.textContent = "Welcome Back";
      loginModalSubtitle.textContent = "Access your luxury property portfolio";
      clientFields.style.display = "block";
      switchFormLink.textContent = "Are you the owner?";
      submitBtnText.textContent = "Access Portfolio";
      authModeLink.textContent = "Don't have an account? Sign Up";
      switchFormLink.style.display = "block";
      clientFields
        .querySelectorAll("input")
        .forEach((input) => (input.required = true));
    }
  }

  // --- EVENT LISTENERS FOR MODAL CONTROLS ---
  authModeLink.addEventListener("click", () => {
    isSignUpView = !isSignUpView;
    if (isSignUpView) isOwnerView = false; // Ensure owner view is off when signing up
    updateFormView();
  });

  switchFormLink.addEventListener("click", () => {
    isOwnerView = !isOwnerView;
    updateFormView();
  });

  loginBtn.addEventListener("click", function () {
    isOwnerView = false;
    isSignUpView = false;
    updateFormView();
    loginModal.classList.add("active");
    document.body.classList.add("modal-open");
  });

  function closeLoginModal() {
    loginModal.classList.remove("active");
    document.body.classList.remove("modal-open");
  }

  closeModal.addEventListener("click", closeLoginModal);
  loginModal.addEventListener("click", function (e) {
    if (e.target === loginModal) {
      closeLoginModal();
    }
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && loginModal.classList.contains("active")) {
      closeLoginModal();
    }
  });
});
