// This file holds the API URL and shared functions like checking login status.
const API_URL = "https://freelance-housing.onrender.com/api";

function checkLoginStatus() {
  const loginBtn = document.getElementById("loginBtn");
  const dashboardBtn = document.getElementById("dashboardBtn");
  const logoutBtn = document.getElementById("logoutBtn"); // Get the new button

  const token = localStorage.getItem("userToken");
  const user = JSON.parse(localStorage.getItem("userData"));

  if (token && user) {
    // User is logged in
    if (loginBtn) loginBtn.style.display = "none";
    if (logoutBtn) logoutBtn.style.display = "inline-flex"; // Show logout button

    if (user.role === "owner" && dashboardBtn) {
      dashboardBtn.style.display = "inline-flex"; // Show dashboard for owner
    }
  } else {
    // User is logged out
    if (loginBtn) loginBtn.style.display = "inline-flex";
    if (dashboardBtn) dashboardBtn.style.display = "none";
    if (logoutBtn) logoutBtn.style.display = "none";
  }
}
