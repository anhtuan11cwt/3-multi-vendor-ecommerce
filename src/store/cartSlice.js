import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  initialState: {
    cartItems: [],
  },
  name: "cart",
  reducers: {
    addToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.cartItems.find(
        (item) => item.id === newItem.id,
      );
      if (existingItem) {
        existingItem.quantity += newItem.quantity || 1;
      } else {
        state.cartItems.push({
          id: newItem.id,
          imageUrl: newItem.imageUrl,
          price: newItem.price,
          quantity: newItem.quantity || 1,
          slug: newItem.slug,
          title: newItem.title,
        });
      }
    },
    clearCart(state) {
      state.cartItems = [];
    },
    removeFromCart(state, action) {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload,
      );
    },
    updateQuantity(state, action) {
      const { id, quantity } = action.payload;
      const item = state.cartItems.find((item) => item.id === id);
      if (item && quantity > 0) {
        item.quantity = quantity;
      }
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
