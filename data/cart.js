export let cart

loadFromStorage();


export function loadFromStorage() {
  cart = JSON.parse(localStorage.getItem('cart'));

  if(!cart) {
   cart = [{
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 2,
      deliveryOptionId: '1'
    },{
      productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
      quantity: 1,
      deliveryOptionId: '2'
    }];
  
  }
}




 export function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart))
}

export function addToCart (productId) {
  let matchingItem;

  cart.forEach((item) => {
   if(productId === item.productId) {
     matchingItem = item

   }

  });
  if(matchingItem) {
   matchingItem.quantity += 1
  }else {
   cart.push({
     productId: productId,
     quantity: 1,
     deliveryOptionId: '1'
   });
  }
  saveCart();
}
export function removeCartItem (productId) {
  const newCart = []

  cart.forEach((item) => {
    if(item.productId !== productId) {
      newCart.push(item)
    }
  });

  cart = newCart;

  saveCart();

}
export function calculateCartQuantity() {
  let cartQuantity = 0;

   cart.forEach((item) => {
    cartQuantity += item.quantity
   });
   document.querySelector('.js-cart-quantity')
   .innerHTML = cartQuantity;
}
export function updateDeliveryOption (productId, deliveryOptionId) {
  let matchingItem;

  cart.forEach((item) => {
   if(productId === item.productId) {
     matchingItem = item;

   }
   
  });

  matchingItem.deliveryOptionId = deliveryOptionId;

    
  saveCart();
}



  
