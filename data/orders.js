import { formatCurrency } from "../scripts/utils/money.js";
import {deliveryOptions, getDeliveryOption} from '../../data/deliveryOptions.js';


export const orders = JSON.parse(localStorage.getItem('orders')) || [];

export function addOrders(order) {
  orders.unshift(order);
  saveOrderToStorage();
}

function saveOrderToStorage() {
  localStorage.setItem('orders', JSON.stringify(orders));
}
