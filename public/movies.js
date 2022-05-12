function initialize() {
  // Super pro functionality for toggle buttons
  for (const btn of document.querySelectorAll(".btn-toggle")) {
    btn.addEventListener('click', function () {
      const description = this.parentNode.parentNode.querySelector('.description');
      if (this.textContent === 'Show more') {
        description.style.display = '';
        this.textContent = "Show less";
      } else {
        description.style.display = 'none';
        this.textContent = "Show more";
      }
    });
  }
}

document.addEventListener('DOMContentLoaded', initialize);
