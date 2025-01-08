

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],
  totalQuantity: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingProduct = state.products.find(
        (product) => product.id === action.payload.id
      );
      if (existingProduct) {
        existingProduct.quantity += action.payload.quantity;
      } else {
        state.products.push(action.payload);
      }
      state.totalQuantity += action.payload.quantity;
      state.totalPrice += action.payload.price * action.payload.quantity;
    },
    increment: (state, action) => {
      const product = state.products.find((item) => item.id === action.payload);
      if (product) {
        product.quantity += 1;
        state.totalQuantity += 1;
        state.totalPrice += product.price;
      }
    },
    decrement: (state, action) => {
      const product = state.products.find((item) => item.id === action.payload);
      if (product && product.quantity > 1) {
        product.quantity -= 1;
        state.totalQuantity -= 1;
        state.totalPrice -= product.price;
      }
    },
    removeFromCart: (state, action) => {
      const productIndex = state.products.findIndex(
        (item) => item.id === action.payload
      );
      if (productIndex !== -1) {
        const product = state.products[productIndex];
        state.totalQuantity -= product.quantity;
        state.totalPrice -= product.quantity * product.price;
        state.products.splice(productIndex, 1);
      }
    },
  },
});

export const { addToCart, increment, decrement, removeFromCart } =
  cartSlice.actions;

export default cartSlice.reducer;

