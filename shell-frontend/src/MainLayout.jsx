import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  Outlet,
} from "react-router-dom";

import RootLayout from "./components/layout/RootLayout.jsx";
import { UserRoutes } from "user_dashboard/UserRoutes";
import { AdminRoutes } from "admin_dashboard/AdminRoutes";
import AuthLayout from "./components/layout/AuthLayout.jsx";
import Login from "./components/Login/Login.jsx";
import SignUp from "./components/Login/SignUp.jsx";
import ConfirmSignUp from "./components/Login/ConfirmSignUp.jsx";
import NotFound from "./pages/NotFound.jsx";
import { StoreProvider } from "./store/store.js";

const MainLayout = () => {
  return (
    <Router>
      <Routes>
        <Route element={<StoreProvider />}>
          <Route element={<RootLayout />}>
            {/* Common Routes */}
            <Route
              exact
              path="/"
              element={<Navigate to="/auth/signin" replace />}
            />
            <Route element={<AuthLayout />}>
              <Route path="/auth/signup" element={<SignUp />} />
              <Route path="/auth/signin" element={<Login />} />
              <Route path="/auth/confirm-signup" element={<ConfirmSignUp />} />
            </Route>
          </Route>
          <Route path="/admin/*" element={<AdminRoutes />} />
          <Route path="/home/*" element={<UserRoutes />} />
          <Route path="/*" element={<NotFound />} />
          {/* wild card operator */}
        </Route>
      </Routes>
    </Router>
  );
};

export default MainLayout;
