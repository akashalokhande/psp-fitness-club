let selectedPlan = { plan: "", amount: 0 };

function selectPlan(amount, planName) {
  selectedPlan = { plan: planName, amount };
  document.getElementById(
    "selectedPlanDisplay"
  ).textContent = `Selected Plan: ${planName}`;
}

function closePopup() {
  document.getElementById("successPopup").style.display = "none";
  window.location.href = "index.html";
}

const paymentForm = document.getElementById("paymentForm");
const statusMsg = document.getElementById("statusMsg");
const successmsg = document.getElementById("successmsg");

paymentForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const firstName = document.getElementById("firstName").value.trim();
  const lastName = document.getElementById("lastName").value.trim();
  const email = document.getElementById("email").value.trim();
  const number = document.getElementById("number").value.trim();

  if (!firstName || !lastName || !email || !number) {
    statusMsg.textContent = "All fields are required.";
    statusMsg.style.color = "red";
    return;
  }

  if (!selectedPlan.plan) {
    statusMsg.textContent = "Please select a membership plan.";
    statusMsg.style.color = "red";
    return;
  }

  const storedUser = JSON.parse(localStorage.getItem("fitnessUser"));
  if (!storedUser || !storedUser._id) {
    statusMsg.textContent = "User not logged in. Please log in first.";
    statusMsg.style.color = "red";
    return;
  }

  const submitBtn = paymentForm.querySelector("button[type='submit']");
  submitBtn.disabled = true;
  statusMsg.textContent = "Processing payment...";
  statusMsg.style.color = "blue";

  const formData = {
    userId: storedUser._id,
    firstName,
    lastName,
    email,
    number,
    plan: selectedPlan.plan,
    amount: selectedPlan.amount,
  };

  try {
    const response = await fetch("http://localhost:3000/api/payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const result = await response.json();

    if (response.ok) {
      document.getElementById("successPopup").style.display = "flex";
      statusMsg.textContent = result.message;
      statusMsg.style.display = "none"

      successmsg.textContent = result.message;
      successmsg.style.display = "green";

      try {
        const planRes = await fetch(
          `http://localhost:3000/api/userPlan/${storedUser._id}`
        );
        const planData = await planRes.json();

        if (planRes.ok) {
          localStorage.setItem("userPlan", JSON.stringify(planData));
        }
      } catch (err) {
        console.warn("Plan update failed:", err);
      }
    } else {
      statusMsg.textContent = result.message || "Payment failed.";
      statusMsg.style.color = "red";
    }
  } catch (err) {
    console.error("Payment error:", err);
    statusMsg.textContent = "Something went wrong. Try again.";
    statusMsg.style.color = "red";
  } finally {
    submitBtn.disabled = false;
  }
});
