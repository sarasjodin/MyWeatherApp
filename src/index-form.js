// Get references to the buttons
const submitBtn = document.getElementById("submit-btn");
const cancelBtn = document.getElementById("cancel-btn");

// Add event listeners to handle click events
submitBtn.addEventListener("click", function () {
  alert(
    "Thank you for submitting, unfortunatley this form is not yet active. Please go to the About page to learn how to create a bug report on GitHub."
  );
});

cancelBtn.addEventListener("click", function () {
  alert('When you click "OK" the form input will be deleted.');
});
