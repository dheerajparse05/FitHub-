// FitHub — Cart page: render items, manage quantity, and checkout via EmailJS

// Render cart on load
window.addEventListener("DOMContentLoaded", function () {
  var cart = JSON.parse(localStorage.getItem("cart")) || [];
  var cartContainer = document.getElementById("cart-items");
  var emptyMsg = document.getElementById("cart-empty");
  var total = 0;

  if (cart.length === 0 && emptyMsg) {
    emptyMsg.hidden = false;
  }

  cart.forEach(function (item, index) {
    var itemDiv = document.createElement("div");
    itemDiv.classList.add("cart-item");
    itemDiv.innerHTML =
      '<img src="' + item.imgSrc + '" alt="' + item.name + '" class="cart-item-img">' +
      '<div class="cart-item-info">' +
        '<p class="cart-item-name">' + item.name + "</p>" +
        '<p class="cart-item-price">$' + item.price + "</p>" +
        '<p class="cart-item-qty">Quantity: ' +
          '<button type="button" onclick="updateQuantity(' + index + ', -1)" aria-label="Decrease quantity">-</button> ' +
          item.quantity +
          ' <button type="button" onclick="updateQuantity(' + index + ', 1)" aria-label="Increase quantity">+</button>' +
        "</p>" +
        '<button type="button" onclick="removeItem(' + index + ')" class="remove-item-btn">Remove</button>' +
      "</div>";
    cartContainer.appendChild(itemDiv);
    total += item.price * item.quantity;
  });

  document.getElementById("total").textContent = "Total: $" + total.toFixed(2);
});

function updateQuantity(index, change) {
  var cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart[index].quantity += change;
  if (cart[index].quantity < 1) cart[index].quantity = 1;
  localStorage.setItem("cart", JSON.stringify(cart));
  window.location.reload();
}

function removeItem(index) {
  var cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  window.location.reload();
}

function openPopup() {
  document.getElementById("popup").style.display = "flex";
}

function paymentDone() {
  document.getElementById("popup").style.display = "none";
  document.getElementById("payment-done-popup").style.display = "flex";
}

function closePaymentDone() {
  document.getElementById("payment-done-popup").style.display = "none";
}

function hidePopup() {
  document.getElementById("popup").style.display = "none";
  document.getElementById("payment-done-popup").style.display = "none";
}

function checkout() {
  var cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    alert("Your cart is empty.");
    return;
  }

  var total = cart.reduce(function (acc, item) {
    return acc + item.price * item.quantity;
  }, 0);

  var name = document.getElementById("name").value.trim();
  var phone = document.getElementById("phone").value.trim();
  var address = document.getElementById("address").value.trim();

  if (!name || !phone || !address) {
    alert("Please fill in your name, phone number, and address.");
    return;
  }

  var emailParams = {
    name: name,
    phone: phone,
    address: address,
    cart: JSON.stringify(cart),
    total: total,
  };

  emailjs.send("service_hhbtp2o", "template_1j5wpxw", emailParams).then(
    function (response) {
      alert("Order placed successfully!");
      localStorage.removeItem("cart");
      window.location.reload();
    },
    function (error) {
      alert("Failed to send order. Please try again or contact us directly.");
      console.error("FAILED", error);
    }
  );
}
