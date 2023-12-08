import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { setupListeners } from "@reduxjs/toolkit/query";
import { authApi } from "./apis/authApi";
import theme, { setMode } from "./slices/themeSlice";
import authUser, { setAuthUser, setToken } from "./slices/authUserSlice";
import globalCart, {
  addToCart,
  removeFromCart,
  increaseCount,
  decreaseCount,
  setIsCartOpen,
  clearCart,
} from "./slices/cartSlice";
import { Outlet } from "react-router-dom";
//redux store
export const store = configureStore({
  reducer: {
    theme,
    authUser,
    globalCart,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefault) => getDefault().concat(authApi.middleware),
  /* getDefaultMiddleware function provided by Redux Toolkit to include the default middleware. Then, it appends the authApi.middleware to it */
});
setupListeners(store.dispatch);

//exposing the store provider
export const StoreProvider = ({ children }) => {
  return (
    <Provider store={store}>
      {children}
      <Outlet />
    </Provider>
  );
};

//passing the states and actions to sub mfes
export const useGlobalStore = () => {
  return {
    /* GLOBAL REDUCERS */
    authUser,
    globalCart,
    theme,

    /* GLOBAL ACTIONS */
    addToCart,
    removeFromCart,
    increaseCount,
    decreaseCount,
    setIsCartOpen,
    clearCart,
    setAuthUser,
    setToken,
    setMode,
  };
};
