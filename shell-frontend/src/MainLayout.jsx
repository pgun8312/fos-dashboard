import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import UserDashboard from "user_dashboard/UserDashboard";
import AdminDashboard from "admin_dashboard/AdminDashboard";
import Home from "./Home";
import ProtectedRoute from "./components/layout/ProtectedRoute.jsx";
import RootLayout from "./components/layout/RootLayout.jsx";
import DashboardLayout from "./components/layout/DashboardLayout.jsx";
import { UserRoutes } from "user_dashboard/UserRoutes";
import { AdminRoutes } from "admin_dashboard/AdminRoutes";
import GuestDashboard from "./pages/GuestDashboard.jsx";
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

          <Route element={<DashboardLayout />}>
            {/* User Only Routes */}
            <Route
              element={<ProtectedRoute userRole={["User"]} redirect={"/"} />}
            >
              <Route path="/user" element={<UserDashboard />} />
            </Route>

            {/* Admin only Routes */}
            <Route
              element={
                <ProtectedRoute userRole={["Admin"]} redirect={"/user"} />
              }
            >
              <Route path="/admin" element={<AdminDashboard />} />
            </Route>

            {/* Common Routes */}
            <Route path="/home" element={<GuestDashboard />} />
          </Route>

          {/* Common Routes outside the Dashbaord Layout */}
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
