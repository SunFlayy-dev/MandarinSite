import { DONATE_ITEMS } from '../config/donate-data.js';
import { updateBadge, renderModal } from '../ui/modal.js';

let cart = [];

export function addToCart(id) {
  const item = DONATE_ITEMS.find(i => i.id === id);
  if (!item) return;
  
  const existing = cart.find(c => c.id === id);
  existing ? existing.qty++ : cart.push({ ...item, qty: 1 });
  
  updateBadge(cart);
  renderCartModal(cart);
}

export function getTotal() {
  return cart.reduce((sum, c) => sum + c.price * c.qty, 0);
}

export function clearCart() {
  cart = [];
  updateBadge(cart);
  renderCartModal(cart);
}