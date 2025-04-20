const joinButtons = document.querySelectorAll(".join-btn");

joinButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const user = JSON.parse(localStorage.getItem("fitnessUser"));

    if (user) {
      window.location.href = "payment.html";
    } else {
      alert("Please sign up or log in before purchasing or trial a plan.");
      window.location.href = "signup.html";
    }
  });
});
