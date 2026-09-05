// FitHub — shared navbar behavior (mobile menu + live cart count)
document.addEventListener("DOMContentLoaded", function () {
  // Mobile menu toggle
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");

  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var isOpen = links.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
  }

  // Live cart item count badge
  var badge = document.querySelector(".cart-count");
  if (badge) {
    try {
      var cart = JSON.parse(localStorage.getItem("cart")) || [];
      var count = cart.reduce(function (sum, item) {
        return sum + (item.quantity || 1);
      }, 0);
      if (count > 0) {
        badge.textContent = count;
        badge.hidden = false;
      } else {
        badge.hidden = true;
      }
    } catch (e) {
      badge.hidden = true;
    }
  }

  // Footer copyright year
  var yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
});
