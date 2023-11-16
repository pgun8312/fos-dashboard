import { Provider } from "react-redux";
import { Outlet } from "react-router-dom";
const { combineReducers, configureStore } = require("@reduxjs/toolkit");
import order from "./slices/orderSlice";
import { useGlobalStore } from "shell_frontend/store";

export const AdminDashboardStoreProvider = ({ children }) => {
  //getting the global reducers
  const { authUser, globalCart, theme } = useGlobalStore();

  // Combine local and global reducers
  const rootReducer = combineReducers({
    authUser,
    theme,
    globalCart,
    local: order,
  });

  const store = configureStore({
    reducer: rootReducer,
  });

  return (
    <Provider store={store}>
      <Outlet />
      {children}
    </Provider>
  );
};
