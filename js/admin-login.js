const adminLoginForm = document.getElementById("adminLoginForm");
const adminMessage = document.getElementById("adminMessage");

adminLoginForm?.addEventListener("submit", async function (e) {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value;

  try {
    const res = await fetch("http://localhost:3000/api/admin-login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();
    console.log(data);

    if (res.ok) {
      adminMessage.style.color = "green";
      adminMessage.textContent = "Login successful!";

      // Save admin info properly
      localStorage.setItem("isAdmin", true);
      localStorage.setItem("adminUser", JSON.stringify({ name: username }));

      setTimeout(() => {
        window.location.replace("admin.html");
      }, 1000);
    } else {
      adminMessage.style.color = "red";
      adminMessage.textContent = data.message || "Invalid login";
    }
  } catch (error) {
    adminMessage.style.color = "red";
    adminMessage.textContent = "Server error";
    console.error(error);
  }
});
