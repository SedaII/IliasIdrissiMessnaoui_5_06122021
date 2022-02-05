import { getProductById } from "./services/api.js";

const currentUrl = new URL(window.location.href);
const id = currentUrl.searchParams.get("id");

// Create product element by templating
const createProductElem = (productData) => {
  const productElem = document.getElementById("product");

  // Return color select options template.
  const getColorOptionHTML = () => {
    const colors = productData.colors;
    let optionHTML = "";

    for (let i = 0; i < colors.length; i++) {
      optionHTML += `<option value="${colors[i]}">${colors[i]}</option>`;
    }

    return optionHTML;
  };

  //Product template
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
  `;
};

const formatProductData = () => {
  const color = document.getElementById("colors");
  const quantity = document.getElementById("quantity");

  return {
    _id: productData._id,
    color: color.value,
    quantity: quantity.value,
  };
};

// Add item to LocalStorage
const updateLocalStorage = (currentProduct) => {
  let cart = JSON.parse(localStorage.getItem("cart"));
  if (cart?.length > 0) {
    for (let i = 0; i < cart.length; i++) {
      if (
        cart[i].color === currentProduct.color &&
        cart[i]._id === currentProduct._id
      ) {
        if(Number(cart[i].quantity) + Number(currentProduct.quantity) > 100) {
          const remaining = 100 - Number(cart[i].quantity)
          alert(`Vous avez encore droit à ${remaining} articles.\r\nVeuillez sélectionner une quantité égale ou inférieur.`);

        } else {
          cart[i].quantity = Number(cart[i].quantity) + Number(currentProduct.quantity);
        localStorage.setItem("cart", JSON.stringify(cart));
        alert("Votre produit a bien été ajouté au panier");
        }
        
        break;
      } else if (i === cart.length - 1) {
        cart.push(currentProduct);
        localStorage.setItem("cart", JSON.stringify(cart));
        alert("Votre produit a bien été ajouté au panier");

        break;
      }
    }
  } else {
    localStorage.setItem("cart", JSON.stringify([currentProduct]));
    alert("Votre produit a bien été ajouté au panier");
  }
};

// Get product data and add it to the cart
const addToCart = () => {
  const currentProduct = formatProductData();

  updateLocalStorage(currentProduct);
};

// Vérifications de la quantité des produits.
const quantityCheck = () => {
  const quantityElem = document.getElementById("quantity");

  quantityElem.addEventListener("input", (e) => {
    if (e.target.value > 100) {
      e.target.value = 100;
    } else if (e.target.value < 1) {
      e.target.value = 1;
    }
  });
};

const productData = await getProductById(id);
createProductElem(productData);
const btn = document.getElementById("addToCart");
btn.addEventListener("click", addToCart);
quantityCheck();
