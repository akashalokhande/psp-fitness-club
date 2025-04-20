
const contactForm = document.getElementById("contactForm");
const contactMessage = document.getElementById("contactMessage");

contactForm.addEventListener("submit", async function (e) {
  e.preventDefault();

  const contactData = {
    firstName: document.getElementById("firstName").value.trim(),
    lastName: document.getElementById("lastName").value.trim(),
    email: document.getElementById("email").value.trim(),
    number: document.getElementById("number").value.trim(),
  };

  try {
    const res = await fetch("http://localhost:3000/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(contactData),
    });

    const result = await res.json();
    console.log(result);

    if (res.ok) {
      contactMessage.style.color = "green";
      contactMessage.textContent =
        result.message || "Message sent successfully!";
      contactForm.reset();
    } else {
      contactMessage.style.color = "red";
      contactMessage.textContent =
        result.message || "Failed to send message.";
    }
  } catch (err) {
    console.error("Error:", err);
    contactMessage.style.color = "red";
    contactMessage.textContent = "Something went wrong.";
  }
});
