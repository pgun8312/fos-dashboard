import { Provider } from "react-redux";
import { Outlet } from "react-router-dom";
const { combineReducers, configureStore } = require("@reduxjs/toolkit");
import order from "./slices/orderSlice";
import { useGlobalStore } from "shell_frontend/store";
import { adminApi } from "./apis/adminApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import { store as globalStore } from "shell_frontend/store";

export const AdminDashboardStoreProvider = ({ children }) => {
  //getting the global reducers
  const { authUser, globalCart, theme } = useGlobalStore();

  // Combine local and global reducers
  const rootReducer = combineReducers({
    authUser,
    theme,
    globalCart,
    local: order,
    [adminApi.reducerPath]: adminApi.reducer,
  });

  const store = configureStore({
    reducer: rootReducer,
    /* This ensures that the initial state of the local store in the admin micro frontend includes the latest state from the global store. */
    preloadedState: {
      authUser: globalStore.getState().authUser,
      globalCart: globalStore.getState().globalCart,
      theme: globalStore.getState().theme,
    },
    middleware: (getDefault) => getDefault().concat(adminApi.middleware),
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
