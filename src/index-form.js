// Get references to the buttons
const submitBtn = document.getElementById("submit-btn");
const cancelBtn = document.getElementById("cancel-btn");

// Add event listeners to handle click events
submitBtn.addEventListener("click", function () {
  alert("Thank you for submitting the form!");
});

cancelBtn.addEventListener("click", function () {
  alert("When you close this form page, the form input will be deleted.");
});
