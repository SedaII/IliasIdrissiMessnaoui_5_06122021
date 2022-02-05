import { getAllProducts, orderProducts } from "./services/api.js";


const products = await getAllProducts();
let cart = JSON.parse(localStorage.getItem("cart"));
const quantityElem = document.getElementById("totalQuantity");
const priceElem = document.getElementById("totalPrice");

// Find product data by Id.
const getProductById = (productId) => {
  return products.find((product) => product._id === productId);
};

// Create cart element by templating
const createCartElem = async () => {
  const cartItems = document.getElementById("cart__items");
  let cartHTML = "";
  let totalPrice = 0;
  let totalQuantity = 0;

  if (cart?.length > 0) {
    cart.forEach((product) => {
      // format Product for templating
      product = {
        ...product,
        ...getProductById(product._id),
      };
      // Cart product template
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
    quantityElem.innerText = totalQuantity;
    priceElem.innerText = totalPrice;
  } else {
    cartItems.innerText = "Panier vide";
  }
};

// update total data in the DOM.
const updateTotals = () => {
  let totalPrice = 0;
  let totalQuantity = 0;
  const cartItems = document.getElementById("cart__items");

  cart.forEach((product) => {
    const productPrice = getProductById(product._id).price;
    totalPrice += Number(productPrice) * Number(product.quantity);
    totalQuantity += Number(product.quantity);
  });

  quantityElem.innerText = totalQuantity;
  priceElem.innerText = totalPrice;

  if(totalQuantity === 0) {
    cartItems.innerText = "Panier Vide"
  }
};

// update product quantity in the DOM and local storage.
const updateQuantity = () => {
  const quantityInputs = document.querySelectorAll(".itemQuantity");
  quantityInputs.forEach((input) => {
    input.addEventListener("change", (e) => {
      const id = e.target.closest("article").dataset.id;
      const color = e.target.closest("article").dataset.color;

      cart = cart.map((product) => {
        if (product._id === id && product.color === color) {
          product.quantity = e.target.value;
        }

        return {
          _id: product._id,
          color: product.color,
          quantity: product.quantity,
        }
      });
      localStorage.setItem("cart", JSON.stringify(cart));

      updateTotals();
    });
  });
};

// Delete selected product element from the DOM.
const deleteProduct = () => {
  const deleteBtns = document.querySelectorAll(".deleteItem");
  deleteBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const parent = e.target.closest("article");
      const id = parent.dataset.id;
      const color = parent.dataset.color;
      if (!confirm("Êtes-vous sûr de vouloir supprimer cet élément ?")) return;
      cart = cart.filter(
        (product) => !(product._id === id && product.color === color)
      );
      localStorage.setItem("cart", JSON.stringify(cart));
      parent.remove();
      updateTotals();
    });
  });
};

// Vérifications de la quantité des produits.
const quantityCheck = () => {
  const qtyInputs = document.querySelectorAll(".itemQuantity");

  qtyInputs.forEach((input) => {
    input.addEventListener("input", (e) => {
      if (e.target.value > 100) {
        e.target.value = 100;
      } else if (e.target.value < 1) {
        e.target.value = 1;
      }
    });
  });
};

// Vérifie si le nom ne comporte pas de nombre.
const isNameValid = (name) => {
  return /^([\D]*)$/.test(name) && name.length > 0;
};

// Vérifie que l'input n'est pas vide.
const isAddressValid = (address) => {
  return address.length >= 2;
};

// Vérifie si le format de l'email est correct.
const isEmailValid = (email) => {
  return /\S+@\S+\.\S+/.test(email);
};

// Vérifie l'état global du formulaire.
const isFormValid = (formData) => {
  let isFormValid = true;

  if (!isEmailValid(formData.get("email"))) {
    document.getElementById("emailErrorMsg").innerText =
      "Veuillez renseigner un email valide (Ex : abc@xy.z)";
    isFormValid = false;
  } else {
    document.getElementById("emailErrorMsg").innerText = "";
  }

  if (!isNameValid(formData.get("firstName"))) {
    document.getElementById("firstNameErrorMsg").innerText =
      "Veuillez renseigner un prénom valide (Ne doit pas contenir de chiffre et au moins un caractère)";
    isFormValid = false;
  } else {
    document.getElementById("firstNameErrorMsg").innerText = "";
  }

  if (!isNameValid(formData.get("lastName"))) {
    document.getElementById("lastNameErrorMsg").innerText =
      "Veuillez renseigner un nom valide (Ne doit pas contenir de chiffre et au moins un caractère)";
    isFormValid = false;
  } else {
    document.getElementById("lastNameErrorMsg").innerText = "";
  }

  if (!isAddressValid(formData.get("address"))) {
    document.getElementById("addressErrorMsg").innerText =
      "Veuillez renseigner une adresse valide (Au moins deux caractères)";
    isFormValid = false;
  } else {
    document.getElementById("addressErrorMsg").innerText = "";
  }

  if (!isAddressValid(formData.get("city"))) {
    document.getElementById("cityErrorMsg").innerText =
      "Veuillez renseigner une ville valide (Au moins deux caractères)";
    isFormValid = false;
  } else {
    document.getElementById("cityErrorMsg").innerText = "";
  }

  return isFormValid;
};

const order = () => {
  const btn = document.getElementById("order");
  btn.addEventListener("click", async () => {
    const form = document.getElementById("orderForm");
    const cart = JSON.parse(localStorage.getItem("cart"));

    if (cart?.length > 0) {
      const productsId = cart.map((product) => product._id);
      const formData = new FormData(form);

      if (isFormValid(formData) && cart.length > 0) {
        const data = {
          contact: {
            firstName: formData.get("firstName"),
            lastName: formData.get("lastName"),
            address: formData.get("address"),
            city: formData.get("city"),
            email: formData.get("email"),
          },
          products: productsId,
        };

        const resp = await orderProducts(data);

        document.location.href = "./confirmation.html?order_id=" + resp.orderId;
      }
    } else {
      alert("Votre panier est vide.");
    }
  });
};



await createCartElem();
updateQuantity();
quantityCheck();
deleteProduct();
order();
