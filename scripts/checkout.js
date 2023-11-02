import {cart, removeFromCart} from '../data/carts.js';
import {products} from '../data/products.js';
import {calculatePrice} from './utils/money.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { deliveryOptions } from '../data/deliveryOptions.js';

let cartSummaryHTML = '';

cart.forEach((cartItem) => {
  const productId = cartItem.productId;
  
  let matchingProduct;

  products.forEach((product) => {
    if (product.id === productId) {
      matchingProduct = product
    }
  });
  
  const today = dayjs();

    const dateString = today.format(
      'dddd, MMMM D'
    );

  cartSummaryHTML += `
  <div class="cart-item-container js-cart-container-${matchingProduct.id}">
            <div class="delivery-date">
              Delivery date: ${dateString}
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingProduct.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchingProduct.name}
                </div>
                <div class="product-price">
                  $${calculatePrice(matchingProduct.priceCents)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary">
                    Update
                  </span>
                  <span class="delete-quantity-link link-primary js-delete-button"
                   data-product-id="${matchingProduct.id}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                ${deliveryOptionsHTML(matchingProduct)}
              </div>
            </div>
          </div>
  ` 
});

function deliveryOptionsHTML(matchingProduct) {
  let html = ''
  deliveryOptions.forEach((deliveryOption) => {
    const today = dayjs();
    const deliveryDate = today.add(
      deliveryOption.deliveryDays,
      'days'
    )
    const dateString = deliveryDate.format(
      'dddd, MMMM D'
    );
    
    const priceString = deliveryOption.priceCent 
    === 0
      ? 'FREE'
      : `$${calculatePrice(deliveryOption.priceCent)}-`;

    html += `<div class="delivery-option">
      <input type="radio"
        class="delivery-option-input"
        name="delivery-option-${matchingProduct.id}">
      <div>
        <div class="delivery-option-date">
          ${dateString}
        </div>
        <div class="delivery-option-price">
          ${priceString} Shipping
        </div>
      </div>
    </div> `
  });
  return html
};



document.querySelector('.order-summary')
    .innerHTML = cartSummaryHTML;

  
function updateCartQuan() {
  let cartQuantity = 0;
   cart.forEach((item) => {
    cartQuantity += item.quantity
   });
  
  document.querySelector('.js-checkout-items')
    .innerHTML = cartQuantity;
}

updateCartQuan();

document.querySelectorAll('.js-delete-button')
  .forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;
      removeFromCart(productId);
      updateCartQuan();

      const container = document.querySelector(
        `.js-cart-container-${productId}`);
        container.remove();
      });
  })