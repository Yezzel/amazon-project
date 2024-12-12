class Cart{
  cartItems;
  localStorageKey;

  constructor(localStorageKey) {
    this.localStorageKey = localStorageKey;
    this.loadFromStorage();
  }
  loadFromStorage() {
    this.cartItems = JSON.parse(localStorage.getItem(this.localStorageKey));
  
    if(!this.cartItems) {
     this.cartItems = [{
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
    saveCart() {
      localStorage.setItem(this.localStorageKey, JSON.stringify(this.cartItems))
    }
    addToCart (productId) {
      let matchingItem;
    
      this.cartItems.forEach((item) => {
       if(productId === item.productId) {
         matchingItem = item
    
       }
    
      });
      if(matchingItem) {
       matchingItem.quantity += 1
      }else {
       this.cartItems.push({
         productId: productId,
         quantity: 1,
         deliveryOptionId: '1'
       });
      }
      this.saveCart();
    }
    removeCartItem (productId) {
      const newCart = []
    
      this.cartItems.forEach((item) => {
        if(item.productId !== productId) {
          newCart.push(item)
        }
      });
    
      this.cartItems = newCart;
    
      this.saveCart();
    
    }
    calculateCartQuantity() {
      let cartQuantity = 0;
    
       this.cartItems.forEach((item) => {
        cartQuantity += item.quantity
       });
       document.querySelector('.js-cart-quantity')
       .innerHTML = cartQuantity;
    }
    updateDeliveryOption (productId, deliveryOptionId) {
      let matchingItem;
    
      this.cartItems.forEach((item) => {
       if(productId === item.productId) {
         matchingItem = item;
    
       }
       
      });
    
      matchingItem.deliveryOptionId = deliveryOptionId;
    
        
      this.saveCart();
    }
}

    const cart = new Cart('cart-oop');
    const businessCart = new Cart('cart-business');

    

    console.log(cart)
    console.log(businessCart)

    console.log(businessCart instanceof Cart)
