import { cart, removeCartItem, updateDeliveryOption } from'../data/cart.js'
import { products } from '../data/products.js'
import { formatCurency } from './utils/money.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'
import {deliveryOptions} from '../data/deliveryOptions.js';

const today = dayjs();
const deliveryDate = today.add(7, 'days');
console.log(deliveryDate.format('dddd MMMM D'));

function renderOrderSummary () {
  let totalCartSumHTML= '';


  cart.forEach((item) => {
    
  const productId = item.productId
  let matchingProduct;

  products.forEach((product) => {
    if(product.id === productId) {
      matchingProduct = product
    }
  });

  const deliveryOptionId = item.deliveryOptionId;

  let deliveryOption;

  deliveryOptions.forEach((option) => {
    

    if(option.id === deliveryOptionId) {
      deliveryOption = option
    }
  });
  const today = dayjs();
      const deliverDay = today.add(deliveryOption.deliveryDays, 'days');
      const daydelivery = deliverDay.format('dddd, MMMM D' );


  totalCartSumHTML += `
          <div class="cart-item-container 
          js-cart-item-container 
            js-delete-cart-container
              -${matchingProduct.id}">
              <div class="delivery-date">
                Delivery date: ${daydelivery}
              </div>

              <div class="cart-item-details-grid">
                <img class="product-image"
                  src="${matchingProduct.image}">

                <div class="cart-item-details">
                  <div class="product-name">
                  ${matchingProduct.name}
                  </div>
                  <div class="product-price">
                    $${formatCurency(matchingProduct.priceCents)}
                  </div>
                  <div class="product-quantity">
                    <span>
                      Quantity: <span class="quantity-label">${item.quantity}</span>
                    </span>
                    <span class="update-quantity-link link-primary js-link-update"
                    data-product-id = "${matchingProduct.id}">
                      Update
                    </span>
                    <span class="delete-quantity-link link-primary js-delete-link"
                    data-product-id = "${matchingProduct.id}">
                      Delete
                    </span>
                  </div>
                </div>

                <div class="delivery-options">
                  <div class="delivery-options-title">
                    Choose a delivery option:
                  </div>
                  
                  ${deliveryOptionsHTML(matchingProduct, item)}
                  
                </div>
              </div>
            </div>
    

            `
  });

  function deliveryOptionsHTML (matchingProduct, item ) {

    let html = '';

    deliveryOptions.forEach((deliveryOption) => {
      const today = dayjs();
      const deliverDay = today.add(deliveryOption.deliveryDays, 'days');
      const daydelivery = deliverDay.format('dddd, MMMM D' );
      const priceDeliveryOption = deliveryOption.priceCents === 0 
      ? 'FREE' : `$${formatCurency(deliveryOption.priceCents)}-`;

      const isChecked = deliveryOption.id === item.deliveryOptionId;



    html += `
              <div class="delivery-option js-delivery-option" 
              data-product-id="${matchingProduct.id}"
              data-delivery-option-id="${deliveryOption.id}">
                <input type="radio" 
                ${isChecked ? 'checked' : ''}
                  class="delivery-option-input"
                  name="delivery-option-${matchingProduct.id}">
                <div>
                  <div class="delivery-option-date">
                    ${daydelivery}
                  </div>
                  <div class="delivery-option-price">
                    ${priceDeliveryOption}
                  </div>
                </div>
              </div> 
            
      `


    });
    return html;

  }
  document.querySelector('.js-order-summary').innerHTML = totalCartSumHTML;

  document.querySelectorAll('.js-delete-link').forEach((link) => {
    link.addEventListener('click', () => {
      const productId  =  link.dataset.productId 
      removeCartItem(productId);

      const containerElement = document.querySelector(
        `.js-delete-cart-container-${productId}`

      );
      containerElement.remove();
  
      });
  });
  document.querySelectorAll('.js-delivery-option').forEach((element) => {
    element.addEventListener('click', () => {
      const {productId, deliveryOptionId} = element.dataset;
      updateDeliveryOption(productId, deliveryOptionId);
      renderOrderSummary();
    });
  });
}
renderOrderSummary();
    


