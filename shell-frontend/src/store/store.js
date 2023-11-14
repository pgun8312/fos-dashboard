import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { setupListeners } from "@reduxjs/toolkit/query";
import { authApi } from "./apis/authApi";
import theme from "./slices/themeSlice";
import authUser from "./slices/authUserSlice";
import cart from "./slices/cartSlice";
//redux store
const store = configureStore({
  reducer: {
    theme,
    authUser,
    cart,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefault) => getDefault().concat(authApi.middleware),
  /* getDefaultMiddleware function provided by Redux Toolkit to include the default middleware. Then, it appends the authApi.middleware to it */
});
setupListeners(store.dispatch);

//exposing the store provider
export const StoreProvider = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};
