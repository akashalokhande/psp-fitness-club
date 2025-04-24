const loginForm = document.getElementById("loginForm");
const loginMessage = document.getElementById("loginMessage");

loginForm.addEventListener("submit", async function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  loginMessage.textContent = "Logging in...";
  loginMessage.style.color = "black";

  try {
    const response = await fetch("https://psp-fitness-server.onrender.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      loginMessage.style.color = "green";
      loginMessage.textContent = data.message || "Login successful!";

      const user = data.user;
      localStorage.setItem("fitnessUser", JSON.stringify(user));

      // ✅ Now fetch the user's plan
      const planResponse = await fetch(`https://psp-fitness-server.onrender.com/api/userPlan/${user._id}`);
      const planData = await planResponse.json();

      console.log(planData);
      

      if (planResponse.ok) {
        localStorage.setItem("userPlan", JSON.stringify(planData));
        console.log("User plan saved to localStorage:", planData);
      } else {
        console.warn("User plan not found or failed to fetch.");
      }

      // Redirect to homepage after everything is done
      setTimeout(() => {
        window.location.replace("index.html");
      }, 2000);
    } else {
      loginMessage.style.color = "red";
      loginMessage.textContent = data.message || "Invalid credentials.";
    }
  } catch (error) {
    loginMessage.style.color = "red";
    loginMessage.textContent = "Unable to connect to server.";
    console.error("Login error:", error);
  }
});
