// Get localStorage data
const user = localStorage.getItem("fitnessUser");
const isAdmin = localStorage.getItem("isAdmin");
const adminUser = localStorage.getItem("adminUser");

// Get DOM elements
const loginLink = document.getElementById("loginLink");
const signupLink = document.getElementById("signupLink");
const logoutBtn = document.getElementById("logoutBtn");
const userName = document.getElementById("userName");
const classesbtn = document.getElementById("classesbtn");
const adminLoginLink = document.getElementById("adminLoginLink");

// Helper to show/hide multiple elements
const showElements = (...elements) =>
  elements.forEach((el) => el && (el.style.display = "inline"));
const hideElements = (...elements) =>
  elements.forEach((el) => el && (el.style.display = "none"));

// Hide everything initially
hideElements(
  loginLink,
  signupLink,
  logoutBtn,
  userName,
  classesbtn,
  adminLoginLink
);

// If Admin is logged in
if (isAdmin && adminUser) {
  const parsedAdmin = JSON.parse(adminUser);
  userName &&
    ((userName.style.display = "inline"),
    (userName.textContent = `Hi, ${parsedAdmin.name} 👋`));
  logoutBtn &&
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("isAdmin");
      localStorage.removeItem("adminUser");
      window.location.href = "index.html";
    });
  showElements(logoutBtn, userName);
}

// If User is logged in
else if (user) {
  const parsedUser = JSON.parse(user);
  userName &&
    ((userName.style.display = "inline"),
    (userName.textContent = `Hi, ${parsedUser.name || parsedUser} 👋`));
  logoutBtn &&
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("fitnessUser");
      localStorage.removeItem("userPlan");
      window.location.href = "index.html";
    });
  showElements(logoutBtn, userName, classesbtn);

  window.addEventListener("DOMContentLoaded", () => {
    const userData = JSON.parse(localStorage.getItem("fitnessUser"));
    const userPlan = JSON.parse(localStorage.getItem("userPlan"));

    const userDropdown = document.getElementById("userDropdown");
    const dropdownUsername = document.getElementById("dropdownUsername");
    const dropdownUserPlan = document.getElementById("dropdownUserPlan");
    const buyPlanMessage = document.getElementById("buyPlanMessage"); // 👈 Message container

    if (userData && typeof userData === "object") {
      hideElements(loginLink, signupLink);
      showElements(logoutBtn);

      // Set user dropdown info
      if (userDropdown) {
        userDropdown.style.display = "inline-block";
        document.getElementById(
          "userDropdownBtn"
        ).textContent = `👤 ${userData.name}`;
        dropdownUsername.textContent = `Name: ${userData.name}`;
        dropdownUserPlan.textContent = `Plan: ${userPlan?.plan || "None"}`;
      }

      if (userPlan && userPlan.plan) {
        showElements(classesbtn);
        hideElements(buyPlanMessage);
      } else {
        hideElements(classesbtn);
        showElements(buyPlanMessage);
      }
    }
  });
}

// No one is logged in – show login/signup/admin login
else {
  showElements(loginLink, signupLink, adminLoginLink);
}

// Redirect logged-in users away from login/signup/admin-login pages
const currentPath = window.location.pathname.toLowerCase();

if (
  user &&
  (currentPath.includes("login.html") || currentPath.includes("signup.html"))
) {
  window.location.href = "index.html";
}
if (isAdmin && currentPath.includes("admin-login.html")) {
  window.location.href = "admin.html";
}

const hamburger = document.getElementById("hamburgerBtn");
const closeBtn = document.getElementById("closeBtn");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
  navLinks.classList.add("active");
  hamburger.style.display = "none";
  closeBtn.style.display = "block";
});

closeBtn.addEventListener("click", () => {
  navLinks.classList.remove("active");
  closeBtn.style.display = "none";
  hamburger.style.display = "block";
});
