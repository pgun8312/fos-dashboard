import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import RootLayout from "./components/layout/RootLayout.jsx";
import { UserRoutes } from "user_dashboard/UserRoutes";
import { AdminRoutes } from "admin_dashboard/AdminRoutes";
import AuthLayout from "./components/layout/AuthLayout.jsx";
import Login from "./components/Login/Login.jsx";
import SignUp from "./components/Login/SignUp.jsx";
import ConfirmSignUp from "./components/Login/ConfirmSignUp.jsx";

const MainLayout = () => {
  return (
    <Router>
      <Routes>
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
      </Routes>
      <UserRoutes />
      <AdminRoutes />
    </Router>
  );
};

export default MainLayout;
