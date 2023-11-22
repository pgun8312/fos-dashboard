import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
  },
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    addProduct: (state, action) => {
      state.products.push(action.payload);
    },
    /* not needed */
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
/* State selectors */
export const selectProducts = (state) => state.local.products.products;
export const selectProductById = (productId) => (state) => {
  console.log("productSlice", state.local.products.products);
  return state.local.products.products.find(
    (product) => product.id === productId
  );
};
export default productSlice.reducer;
