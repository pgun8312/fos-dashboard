import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "globalCart",
  initialState: {
    isCartOpen: false,
    cart: [],
    // items: [],
  },
  reducers: {
    // setItems: (state, action) => {
    //   state.items = action.payload;
    // },
    addToCart: (state, action) => {
      if (!state.cart.find((item) => item.id === action.payload.item.id)) {
        state.cart = [...state.cart, { ...action.payload.item, count: 1 }];
      }
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload.id);
    },
    increaseCount: (state, action) => {
      state.cart = state.cart.map((item) => {
        if (item.id === action.payload.id) {
          item.count++;
        }
        return item;
      });
    },
    decreaseCount: (state, action) => {
      state.cart = state.cart.map((item) => {
        if (item.id === action.payload.id && item.count > 1) {
          item.count--;
        }
        return item;
      });
    },
    clearCart: (state) => {
      state.cart = [];
    },
    setIsCartOpen: (state) => {
      state.isCartOpen = !state.isCartOpen;
    },
  },
});

export const {
  setItems,
  addToCart,
  removeFromCart,
  increaseCount,
  decreaseCount,
  setIsCartOpen,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
