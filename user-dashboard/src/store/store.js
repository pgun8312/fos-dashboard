import { Provider } from "react-redux";

const { configureStore } = require("@reduxjs/toolkit");

const store = configureStore({
  reducer: {},
});

export const UserDashboardStoreProvider = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};
