import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { setupListeners } from "@reduxjs/toolkit/query";
import { authApi } from "./apis/authApi";
import theme from "./slices/themeSlice";
import authUser, { setAuthUser, setToken } from "./slices/authUserSlice";
import globalCart, {
  addToCart,
  removeFromCart,
  increaseCount,
  decreaseCount,
  setIsCartOpen,
} from "./slices/cartSlice";
import { useSelector, useDispatch } from "react-redux";
//redux store
const store = configureStore({
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
  return <Provider store={store}>{children}</Provider>;
};

//passing the states and actions to sub mfes
export const useGlobalStore = () => {
  // const globalCart = useSelector((state) => state.globalCart);
  // const authUser = useSelector((state) => state.authUser);
  // const theme = useSelector((state) => state.theme);

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
    setAuthUser,
    setToken,
  };
};
