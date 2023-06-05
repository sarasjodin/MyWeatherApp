var readMoreButtons = document.querySelectorAll(".read-more-btn");
readMoreButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    // Find the corresponding additional content element
    var additionalContent = this.parentNode.querySelector(
      ".additional-content"
    );

    // Toggle the visibility of the additional content
    additionalContent.style.display =
      additionalContent.style.display === "none" ? "block" : "none";

    // Update the button text
    if (additionalContent.style.display === "none") {
      this.textContent = "Read More";
    } else {
      this.textContent = "Read Less";
    }

    // Collapse all other additional content
    readMoreButtons.forEach(function (otherButton) {
      var otherAdditionalContent = otherButton.parentNode.querySelector(
        ".additional-content"
      );
      if (otherButton !== button) {
        otherAdditionalContent.style.display = "none";
        otherButton.textContent = "Read More";
      }
    });
  });
});
