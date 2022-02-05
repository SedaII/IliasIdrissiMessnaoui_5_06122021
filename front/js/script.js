import { getAllProducts } from "./services/api.js";

// Create product element by templating
const createProductElem = (products) => {
  const itemsContainer = document.getElementById("items");
  let productsHTML = "";

  for (let i = 0; i < products.length; i++) {
    const product = products[i];
    //Product template
    productsHTML += `<a href="./product.html?id=${product._id}">
      <article>
        <img src="${product.imageUrl}" alt="${product.altTxt}">
        <h3 class="productName">${product.name}</h3>
        <p class="productDescription">${product.description}</p>
      </article>
    </a>`;
  }

  itemsContainer.innerHTML = productsHTML;
};

const products = await getAllProducts();
createProductElem(products);
