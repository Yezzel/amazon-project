import { renderOrderSummary } from "./Checkout/orderSummary.js";
import {renderPaymentSummary} from './Checkout/paymentSummary.js';
//import '../data/cart-class.js';
//import '../data/backend-practice.js'
import { loadProducts } from "../data/products.js";
Promise.all([
  new Promise((resolve) => {
     loadProducts(() => {
      resolve('value1')
    });

  }).then((values) => {
    console.log(values)
    renderOrderSummary();
    renderPaymentSummary();
  })
])


/*
loadProducts(() => {
  renderOrderSummary();
  renderPaymentSummary();
});
*/

