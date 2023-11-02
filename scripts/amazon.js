import {cart, addToCart, calculateCartQauntity} from '../data/carts.js';
import {products} from '../data/products.js';
import {calculatePrice} from './utils/money.js';

//code generates html
let productsHtml = '';
products.forEach((product) => {
    productsHtml = productsHtml + `
    <div class="product-container">
    <div class="product-image-container">
      <img class="product-image"
        src="${product.image}">
    </div>
  
    <div class="product-name limit-text-to-2-lines">
      ${product.name}
    </div>
  
    <div class="product-rating-container">
      <img class="product-rating-stars"
        src="images/ratings/rating-${product.rating.stars * 10}.png">
      <div class="product-rating-count link-primary">
        ${product.rating.count}
      </div>
    </div>
  
    <div class="product-price">
      $${calculatePrice(product.priceCents)}
    </div>
  
    <div class="product-quantity-container">
      <select class="js-quantity-selector-${product.id}">
        <option selected value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
      </select>
    </div>
  
    <div class="product-spacer"></div>
  
    <div class="added-to-cart" id="addedText${product.id}">
      <img src="images/icons/checkmark.png">
      Added
    </div>
  
    <button class="add-to-cart-button button-primary js-add-to-cart"
    data-product-id="${product.id}">
      Add to Cart
    </button>
  </div> `
});

let timeoutId = null;

const productGrid = document.querySelector('.products-grid');
productGrid.innerHTML = productsHtml;

//this function updates cartQauntity on the homePage
function updateCartQuantity() {
    const quantity = calculateCartQauntity();
    
    if (quantity === 0) {
      document.querySelector('.cart-quantity')
      .innerHTML = ''  
    } else {
    document.querySelector('.cart-quantity')
      .innerHTML = quantity;
    }
};
updateCartQuantity();

//these codes handles buttons and added text over the button
document.querySelectorAll('.js-add-to-cart')
  .forEach((button) => {
    button.addEventListener('click', () => {
      const productId = button.dataset.productId;
      addToCart(productId);
      updateCartQuantity();

      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      const addedText = document.getElementById(`addedText${productId}`);
        addedText.style.opacity = 1;
      
      timeoutId = setTimeout(() => {
        addedText.style.opacity = 0;
      }, 2000);
    });
  });

  