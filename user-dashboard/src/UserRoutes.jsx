import { Route, Routes } from "react-router-dom";
import UserOrders from "./pages/UserOrders.jsx";
import {
  GuestNavItems,
  userNavItems,
} from "./components/navItems/navItems.jsx";
import ProtectedRoute from "shell_frontend/ProtectedRoute";
import RootLayout from "shell_frontend/RootLayout";
import DashboardLayout from "shell_frontend/DashboardLayout";
import UserProducts from "./pages/UserProducts.jsx";
import UserDashboard from "./UserDashboard.jsx";
import { useSelector } from "react-redux";
export const UserRoutes = () => {
  //based on the user role sidebar navigation icons will render
  const authUser = useSelector((state) => state.authUser.authUser);
  const navItems = authUser?.role === "User" ? userNavItems : GuestNavItems;

  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route
          element={<DashboardLayout isCartShow={true} navItems={navItems} />}
        >
          {/* User only Routes */}
          <Route
            element={<ProtectedRoute userRole={["User"]} redirect={"/home"} />}
          >
            <Route path="/home/orders" element={<UserOrders />} />
          </Route>
          {/* COMMON ROUTES */}
          {/* User and Guest Dashboard , sub routes define by each mfe */}
          <Route path="/home" element={<UserDashboard />} />
          <Route path="/home/products" element={<UserProducts />} />
        </Route>
      </Route>
    </Routes>
  );
};
