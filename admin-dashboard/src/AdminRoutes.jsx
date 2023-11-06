import { Route, Routes } from "react-router-dom"
import AdminOrders from "./pages/AdminOrders.jsx";

import ProtectedRoute from "shell_frontend/ProtectedRoute";
import RootLayout from "shell_frontend/RootLayout";
import DashboardLayout from "shell_frontend/DashboardLayout";
import AdminProducts from "./pages/AdminProducts.jsx";
import AdminUsers from "./pages/AdminUsers.jsx";

export const AdminRoutes = () => {
  return (
    <Routes>
      <Route element={<RootLayout />} >
        <Route element={<DashboardLayout />}>
          <Route element={<ProtectedRoute userRole={["Admin"]} redirect={"/"} />}>
            <Route path="/admin/orders" element={<AdminOrders />} />
            <Route path="/admin/products" element={<AdminProducts />} />
            <Route path="/admin/users" element={<AdminUsers />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  )
}
