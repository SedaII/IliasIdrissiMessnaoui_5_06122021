let cart = JSON.parse(localStorage.getItem("cart"));

const quantityElem = document.getElementById("totalQuantity");
const priceElem = document.getElementById("totalPrice");

//init cart
const cartItems = document.getElementById("cart__items");
let cartHTML = "";
let totalPrice = 0;
let totalQuantity = 0;

if(cart) {
  cart.forEach(product => {
    cartHTML += `<article class="cart__item" data-id="${product._id}" data-color="${product.color}">
    <div class="cart__item__img">
      <img src="${product.imageUrl}" alt="${product.altTxt}">
    </div>
    <div class="cart__item__content">
      <div class="cart__item__content__description">
        <h2>${product.name}</h2>
        <p>${product.color}</p>
        <p>${product.price} €</p>
      </div>
      <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
          <p>Qté :</p>
          <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product.quantity}">
        </div>
        <div class="cart__item__content__settings__delete">
          <p class="deleteItem">Supprimer</p>
        </div>
      </div>
    </div>
  </article>`;

  totalPrice += Number(product.price) * Number(product.quantity);
  totalQuantity += Number(product.quantity);
  });

  cartItems.innerHTML = cartHTML;
  quantityElem.innerHTML = totalQuantity;
  priceElem.innerHTML = totalPrice;
}

// Tri par modèle / couleur

// updateCartTotals

const updateTotals = () => {
  let totalPrice = 0;
  let totalQuantity = 0;

    cart.forEach(product => {
    totalPrice += Number(product.price) * Number(product.quantity);
    totalQuantity += Number(product.quantity);
    });

    quantityElem.innerHTML = totalQuantity;
    priceElem.innerHTML = totalPrice;
}

//update qty

const products = document.querySelectorAll(".itemQuantity");
products.forEach(input => {
  input.addEventListener("change", (e) => {
    const id = e.target.closest("article").dataset.id;
    const color = e.target.closest("article").dataset.color;

    cart = cart.map(product => {
      if(product._id === id && product.color === color) {
        product.quantity = e.target.value;
        return product;
      } else {
        return product;
      }
    })
    localStorage.setItem("cart", JSON.stringify(cart));

    updateTotals();
  });
});

//delete product

const deleteBtns = document.querySelectorAll(".deleteItem");
deleteBtns.forEach(btn => {
  btn.addEventListener("click", (e) => {
    const parent = e.target.closest("article");
    const id = parent.dataset.id;
    const color = parent.dataset.color;
    console.log({id}, {color});
    cart = cart.filter(product => !(product._id === id && product.color === color));
    localStorage.setItem("cart", JSON.stringify(cart));
    parent.remove();
    updateTotals();
  })
})

// check qty

