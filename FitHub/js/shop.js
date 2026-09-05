// FitHub — Shop page: add products to cart (persisted in localStorage)
function addToCart(name, price, imgSrc) {
  var cart = JSON.parse(localStorage.getItem("cart")) || [];
  var existingIndex = cart.findIndex(function (item) {
    return item.name === name;
  });

  if (existingIndex > -1) {
    cart[existingIndex].quantity += 1;
  } else {
    cart.push({ name: name, price: price, imgSrc: imgSrc, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  var badge = document.querySelector(".cart-count");
  if (badge) {
    var count = cart.reduce(function (sum, item) {
      return sum + item.quantity;
    }, 0);
    badge.textContent = count;
    badge.hidden = count === 0;
  }
}
