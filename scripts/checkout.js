import { renderOrderSummary } from "./Checkout/orderSummary.js";
import { renderPaymentSummary } from './Checkout/paymentSummary.js';
//import '../data/cart-class.js';
//import '../data/backend-practice.js'
import { loadProducts, loadProductsfetch } from "../data/products.js";
import { loadCart } from "../data/cart.js";


Promise.all([
  new Promise((resolve) => {
     loadProducts(() => {
      resolve('value1');
    });
     
     new Promise((resolve) => {
      loadCart(() => {
        resolve();
      })
    });

  })
]).then((values) => {
  console.log(values)
  renderOrderSummary();
  renderPaymentSummary();
})
  
  


/*
loadProducts(() => {
  renderOrderSummary();
  renderPaymentSummary();
});
*/

