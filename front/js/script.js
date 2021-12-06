import { getAllProducts } from "./services/api.js";

const products = await getAllProducts();
const itemsContainer = document.getElementById("items");
let productsHTML = "";

for(let i = 0; i < products.length; i++) {
  const product = products[i];
  productsHTML += 
  `<a href="./product.html?id=${product._id}">
    <article>
      <img src="${product.imageUrl}" alt="${product.altTxt}">
      <h3 class="productName">${product.name}</h3>
      <p class="productDescription">${product.description}</p>
    </article>
  </a>`;
}

itemsContainer.innerHTML = productsHTML;

