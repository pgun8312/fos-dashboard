import { Provider } from "react-redux";
import { Outlet } from "react-router-dom";
const { combineReducers, configureStore } = require("@reduxjs/toolkit");
import products from "./slices/productSlice";
import { useGlobalStore } from "shell_frontend/store";
import { userApi } from "./apis/userApi";
import { setupListeners } from "@reduxjs/toolkit/query";
export const UserDashboardStoreProvider = ({ children }) => {
  //getting the global reducers
  const { authUser, globalCart, theme } = useGlobalStore();

  // Combine local and global reducers
  const rootReducer = combineReducers({
    authUser,
    globalCart,
    theme,
    local: combineReducers({
      products,
    }),
    [userApi.reducerPath]:
      userApi.reducer /* api should be in the outside of the local otherwise makes complex */,
  });

  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefault) => getDefault().concat(userApi.middleware),
    /* getDefaultMiddleware function provided by Redux Toolkit to include the default middleware. Then, it appends the userApi.middleware to it */
  });
  setupListeners(store.dispatch);

  return (
    <Provider store={store}>
      <Outlet />
      {children}
    </Provider>
  );
};
