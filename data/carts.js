export const cart = [];

//this function sends selected item to the cart Page
export function addToCart(productId) {
  const quantitySelector = document.querySelector(`.js-quantity-selector-${productId}`);
  const selectorValue = Number(quantitySelector.value);
  let matchingItem;
  cart.forEach((item) => {
    if (productId === item.productId) {
      matchingItem = item;
    }
  });
  
  if (matchingItem) {
    matchingItem.quantity += selectorValue;
  } else {
    cart.push({
      productId: productId,
      quantity: selectorValue
      });
  }
};

