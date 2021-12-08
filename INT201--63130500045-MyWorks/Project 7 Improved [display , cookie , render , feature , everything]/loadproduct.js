//#region import
import { products } from "./product.js";
import { CookieUtil } from "./cookies.js";
import { exchange } from "./feature.js"
//#endregion

//#region variable
const root = document.querySelector(".item");
const searchBtn = document.querySelector("#btn");
const toggleSearchBtn = document.querySelector("#search");
const searchPanel = document.querySelector("#input");
const cartItemCount = document.querySelector("#cart-item-count");

let cart = JSON.parse(CookieUtil.get('ItemInCart')) || [];
cartItemCount.textContent = getCartItemCount(cart);
let isSearching = false;
let rate = localStorage.getItem('Rate') || '฿';
const currency_rate = document.querySelector("#currency-rate");
const currency_icon = document.querySelector("#rate");
const clearbtn = document.querySelector('#cart-clear-icon');
//#endregion

//#region event
currency_rate.addEventListener('click', () => {
  if (rate == '$') {
    rate = '฿';
    localStorage.setItem('Rate', '฿');
    currency_icon.textContent = '฿';
  } else if (rate == '฿') {
    rate = '$';
    localStorage.setItem('Rate', '$');
    currency_icon.textContent = '$';
  }

  root.childNodes.forEach(child => {
    let productId = child.getAttribute('data-id');
    let find = products.find(product => product.productId == productId);
    let price = child.querySelector('#productPrice');
    price.textContent = `ราคา : ${exchange(rate, find.productPrice)}`;
  })

})

toggleSearchBtn.addEventListener('click', () => {
  if (isSearching) {
    searchPanel.setAttribute('class', 'd-none');
  }
  else {
    searchPanel.setAttribute('class', ' ');
  }
  isSearching = !isSearching;
})

searchBtn.addEventListener('click', () => {
  const input = document.querySelector("#input_txt").value;
  const filteredProducts = findProduct(input);

  let filteredId = filteredProducts.map(product => {
    return product.productId;
  })

  root.childNodes.forEach(child => {
    if (!filteredId.includes(child.getAttribute('data-id'))) {
      child.setAttribute("style", "display:none");
    } else {
      child.setAttribute("style", "display:block");
    }
  })
});

clearbtn.addEventListener('click', () => {
  clearCart()
  CookieUtil.set('ItemInCart', JSON.stringify(cart), Date(9000));
  cartItemCount.textContent = 0;
})

//#endregion

//#region function
function renderProducts(products, root) {

  currency_icon.textContent = rate;
  root.innerHTML = '';

  products.forEach(product => {
    const itemContainer = document.createElement("div");
    itemContainer.setAttribute("class", "card mb-4 col-12 col-sm-6 col-md-4 col-lg-3 shadow-sm border-0");
    itemContainer.setAttribute("data-id", product.productId); // added
    itemContainer.setAttribute("style", "display:block"); // added

    const productImage = document.createElement("img");
    productImage.setAttribute("class", "card-img-top px-4");
    productImage.src = product.img;

    const productBody = document.createElement("div");
    productBody.setAttribute("class", "card-body");

    const productTitle = document.createElement("h5");
    productTitle.setAttribute("class", "card-title");
    productTitle.textContent = product.productName;

    const productId = document.createElement("p");
    productId.setAttribute("class", "card-subtitle text-muted");
    productId.textContent = `Product ID : ${product.productId}`;

    const productDetails = document.createElement("p");
    productDetails.setAttribute("class", "card-text mt-2");
    productDetails.textContent = product.productDesc;

    const br = document.createElement("br");

    const productStock = document.createElement("span");
    productStock.setAttribute("class", "text-muted");
    productStock.textContent = `Stock : ${product.stock}`;

    const productPrice = document.createElement("p");
    productPrice.setAttribute("class", "card-text fw-bold");
    productPrice.setAttribute("id", 'productPrice');
    productPrice.textContent = `ราคา : ${exchange(rate, product.productPrice)}`;

    const addToCartBtn = document.createElement("button");
    addToCartBtn.setAttribute('class', "btn btn-primary btn-add w-100");
    addToCartBtn.innerHTML = "Add to cart";

    addToCartBtn.addEventListener("click", function () {
      const productId = product.productId;
      const existingItem = cart.find(cartItem => cartItem.productId === productId);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        cart.push({ productId, quantity: 1 });
      }
      cartItemCount.textContent = getCartItemCount(cart);
      alert(`${productId} added!`);
      CookieUtil.set('ItemInCart', JSON.stringify(cart), Date(9000));
    });

    productDetails.append(br);
    productDetails.append(productStock);
    productBody.append(productTitle, productId, productDetails, productPrice, addToCartBtn);
    itemContainer.append(productImage, productBody);
    root.append(itemContainer);
  });
}

function getCartItemCount(cart) {
  return cart.reduce((accumulator, cartItem) => accumulator + cartItem.quantity, 0);
}

function clearCart() {
  cart = [];
}

function findProduct(pname) {
  if (pname.length == 0) {
    return products;
  } else {
    return products.filter(name => name.productName.toLowerCase().includes(pname.toLowerCase()));
  }
}
//#endregion

renderProducts(products, root);