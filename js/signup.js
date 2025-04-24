const signupForm = document.getElementById("signupForm");
const message = document.getElementById("message");

signupForm.addEventListener("submit", async function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  // Clear previous message
  message.textContent = "";
  message.style.color = "black";

  if (name && email && password) {
    // ✅ Password strength check
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!passwordRegex.test(password)) {
      message.textContent =
        "Password must be at least 8 characters and include a letter, number, and special character.";
      message.style.color = "red";
      return;
    }

    const userData = { name, email, password };

    try {
      message.textContent = "Signing up...";
      const response = await fetch("https://psp-fitness-server.onrender.com/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const result = await response.json();

      if (response.ok) {
        message.textContent =
          result.message || "Sign-up successful! Redirecting to login...";
        message.style.color = "green";

        signupForm.reset();

        setTimeout(() => {
          window.location.replace("login.html");
        }, 2000);
      } else {
        message.textContent = result.message || "Failed to sign up.";
        message.style.color = "red";
      }
    } catch (error) {
      console.error("Signup Error:", error);
      message.textContent = "Something went wrong. Please try again later.";
      message.style.color = "red";
    }
  } else {
    message.textContent = "Please fill out all fields.";
    message.style.color = "red";
  }
});
