// Fetch payment submissions
async function fetchPayments() {
  try {
    const response = await fetch("http://localhost:3000/api/payment");
    const data = await response.json();
    const tableBody = document.querySelector("#paymentTable tbody");
    tableBody.innerHTML = "";

    data.forEach((payment) => {
      const row = document.createElement("tr");
      row.innerHTML = `
            <td>${payment.firstName}</td>
            <td>${payment.lastName}</td>
            <td>${payment.email}</td>
            <td>${payment.number}</td>
            <td>${payment.plan}</td>
            <td>${payment.amount}</td>
          `;
      tableBody.appendChild(row);
    });
  } catch (error) {
    console.error("Error fetching payment data:", error);
  }
}

// Fetch contact submissions
async function fetchContacts() {
  try {
    const response = await fetch("http://localhost:3000/api/contact");
    const data = await response.json();
    const tableBody = document.querySelector("#contactTable tbody");
    tableBody.innerHTML = "";

    data.forEach((contact) => {
      const row = document.createElement("tr");
      row.innerHTML = `
            <td>${contact.firstName}</td>
            <td>${contact.lastName}</td>
            <td>${contact.email}</td>
            <td>${contact.number}</td>
            <td>${contact.date}</td>
            <td>${contact.time}</td>

          `;
      tableBody.appendChild(row);
    });
  } catch (error) {
    console.error("Error fetching contact data:", error);
  }
}

// Load both tables on page load
fetchPayments();
fetchContacts();
