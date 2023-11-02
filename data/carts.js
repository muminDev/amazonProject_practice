export let cart = JSON.parse(localStorage.getItem('cart')) || [];

 export function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

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
  saveToStorage();
};

export function removeFromCart(productId) {
  const newCart = [];

  cart.forEach((item) => {
    if (item.productId !== productId) {
      newCart.push(item);
    }
  });
  
  cart = newCart
  saveToStorage();
}



export function calculateCartQauntity() {
  let cartQuantityOverAll = 0;
  cart.forEach((item) => {
      cartQuantityOverAll  += item.quantity;
    });
  return cartQuantityOverAll
};
