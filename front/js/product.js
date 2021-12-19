import { getProductById } from "./services/api.js";

const currentUrl = new URL(window.location.href);
const id = currentUrl.searchParams.get("id");

const productData = await getProductById(id);

const productElem = document.getElementById("product");

const getColorOptionHTML = () => {
  const colors = productData.colors;
  let optionHTML = "";

  for(let i = 0; i < colors.length; i++) {
    optionHTML += `<option value="${colors[i]}">${colors[i]}</option>`;
  }

  return optionHTML;
};

productElem.innerHTML = `
<div class="item__img">
  <img src="${productData.imageUrl}" alt="${productData.altTxt}">
</div>
<div class="item__content">
  <div class="item__content__titlePrice">
    <h1 id="title">${productData.name}</h1>
    <p>Prix : <span id="price">${productData.price}</span>€</p>
  </div>
  <div class="item__content__description">
    <p class="item__content__description__title">Description :</p>
    <p id="description">${productData.description}</p>
  </div>
  <div class="item__content__settings">
    <div class="item__content__settings__color">
      <label for="color-select">Choisir une couleur :</label>
      <select name="color-select" id="colors">
        ${getColorOptionHTML()}
      </select>
    </div>
    <div class="item__content__settings__quantity">
      <label for="itemQuantity">Nombre d'article(s) (1-100) :</label>
      <input type="number" name="itemQuantity" min="1" max="100" value="1" id="quantity">
    </div>
  </div>
  <div class="item__content__addButton">
    <button id="addToCart">Ajouter au panier</button>
  </div>
</div>
`

const btn = document.getElementById("addToCart");

const addToCart = () => {
  const color = document.getElementById('colors');
  const quantity = document.getElementById('quantity');
  let cart = JSON.parse(localStorage.getItem("cart"));
  const currentProduct = {
    _id: productData._id,
    color: color.value,
    quantity: quantity.value,
    imageUrl: productData.imageUrl,
    altTxt: productData.altTxt,
    name: productData.name,
    price: productData.price,
  }
  let isInCart = false;



  if(cart?.length > 0) {
    for(let i = 0; i < cart.length; i++) {
      if(cart[i].color === currentProduct.color && cart[i]._id === currentProduct._id) {
        cart[i].quantity = Number(cart[i].quantity) + Number(currentProduct.quantity);
        localStorage.setItem("cart", JSON.stringify(cart));
        break;
      } else if (i === cart.length - 1) {
        cart.push(currentProduct);
        localStorage.setItem("cart", JSON.stringify(cart));
        break;
      }
    }
  } else {
    localStorage.setItem("cart", JSON.stringify([currentProduct]));
  }

  alert("Votre produit a bien été ajouté au panier");
}

btn.addEventListener("click", addToCart);

// Vérifications des inputs.
const quantityCheck = () => {
  const quantityElem = document.getElementById("quantity");

  quantityElem.addEventListener("input", (e) => {
    if(e.target.value > 100) {
      e.target.value = 100;
    } else if (e.target.value < 1) {
      e.target.value = 1;
    }
  });
}

quantityCheck();
