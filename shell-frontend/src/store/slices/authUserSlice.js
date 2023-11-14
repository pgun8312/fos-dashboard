import { createSlice } from "@reduxjs/toolkit";

const authUserSlice = createSlice({
  name: "autUser",
  initialState: {
    authUser: {
      id: null,
      userSub: "",
      userName: "",
      name: "",
      phone: "",
      email: "",
      status: "",
      role: "",
      createdDate: "",
      modifiedDate: null,
    },
    token: "",
  },
  reducers: {
    setAuthUser: (state, action) => {
      state.authUser = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
  },
});

export const { setAuthUser, setToken } = authUserSlice.actions;
export default authUserSlice.reducer;
