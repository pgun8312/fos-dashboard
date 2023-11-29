import { Route, Routes } from "react-router-dom";
import AdminOrders from "./pages/AdminOrders.jsx";

import ProtectedRoute from "shell_frontend/ProtectedRoute";
import RootLayout from "shell_frontend/RootLayout";
import DashboardLayout from "shell_frontend/DashboardLayout";
import AdminProducts from "./pages/AdminProducts.jsx";
import AdminUsers from "./pages/AdminUsers.jsx";
import AdminDashboard from "./AdminDashboard.jsx";
import { adminNavItems } from "./components/navItems.js";
import { useSelector, useDispatch } from "react-redux";
import { AdminDashboardStoreProvider } from "./store/store.js";
import AdminProductManagement from "./pages/AdminProductManagement.jsx";
import NotFound from "./pages/NotFound.jsx";
export const AdminRoutes = () => {
  const authUser = useSelector((state) => state.authUser.authUser);
  return (
    <Routes>
      {console.log(authUser)}
      <Route element={<RootLayout />}>
        <Route element={<AdminDashboardStoreProvider />}>
          <Route
            element={
              <DashboardLayout isCartShow={false} navItems={adminNavItems} />
            }
          >
            {/* Admin Dashboard, sub routes define by each mfe */}
            <Route
              element={
                <ProtectedRoute userRole={["Admin"]} redirect={"/home"} />
              }
            >
              <Route path="/" element={<AdminDashboard />} />
              <Route path="orders" element={<AdminOrders />} />
              <Route path="products" element={<AdminProducts />} />
              <Route path="products/:id" element={<AdminProductManagement />} />
              <Route path="users" element={<AdminUsers />} />
            </Route>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Route>
    </Routes>
  );
};
