import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    order: {
      order: "0001",
      status: "PROCESSING",
    },
  },
  reducers: {
    setOrder: (state, action) => {
      state.order = action.payload;
    },
  },
});

export const { setOrder } = orderSlice.actions;
export default orderSlice.reducer;
