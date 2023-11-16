import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "products",
  initialState: [],
  reducers: {
    setProducts: (state, action) => {
      state.product = action.payload;
    },
    addProduct: (state, action) => {
      state.push(action.payload);
    } /* not needed */,
    /* updateProduct:(state, action) => {
      const index = state.findIndex((product => product.id === action.payload.id));
      if(index != -1) {
        state[index] = action.payload
      }
    },
    deleteProduct: (state, action) => {
      return state.filter((product) => product.id !== action.payload);
    } */
  },
});

export const { setProducts, addProduct } = productSlice.actions;
export const selectProducts = (state) => state.local.product.products;
export const selectProductById = (productId) => (state) =>
  state.local.product.products.find((product) => product.id === productId);

export default productSlice.reducer;
