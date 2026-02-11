import { createSlice } from '@reduxjs/toolkit';
import * as gtag from '@/lib/gtag';

const loadCartFromStorage = () => {
  if (typeof window !== 'undefined') {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      return JSON.parse(savedCart);
    }
  }
  return { items: [], total: 0 };
};

const saveCartToStorage = (state) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('cart', JSON.stringify(state));
  }
};

const initialState = loadCartFromStorage();

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      
      state.total = state.items.reduce((sum, item) => sum + (item.salePrice * item.quantity), 0);
      saveCartToStorage(state);
    },
    
    removeFromCart: (state, action) => {
      const item = state.items.find(item => item.id === action.payload);
      if (item) {
        gtag.removeFromCart(item, item.quantity);
      }
      state.items = state.items.filter(item => item.id !== action.payload);
      state.total = state.items.reduce((sum, item) => sum + (item.salePrice * item.quantity), 0);
      saveCartToStorage(state);
    },
    
    updateQuantity: (state, action) => {
      const item = state.items.find(item => item.id === action.payload.id);
      if (item && action.payload.quantity > 0) {
        item.quantity = action.payload.quantity;
        state.total = state.items.reduce((sum, item) => sum + (item.salePrice * item.quantity), 0);
        saveCartToStorage(state);
      }
    },
    
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
      saveCartToStorage(state);
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
