import { Route, Routes } from "react-router-dom"
import UserOrders from "./pages/UserOrders.jsx";

import ProtectedRoute from "shell_frontend/ProtectedRoute";
import RootLayout from "shell_frontend/RootLayout";
import DashboardLayout from "shell_frontend/DashboardLayout";
import UserProducts from "./pages/UserProducts.jsx";
export const UserRoutes = () => {
  return (
    <Routes>
      <Route element={<RootLayout />} >
        <Route element={<DashboardLayout />}>
          <Route element={<ProtectedRoute userRole={["User"]} redirect={"/"} />}>
            <Route path="/user/orders" element={<UserOrders />} />
          </Route>
          {/* Common Routes */}
            <Route path="/user/products" element={<UserProducts />} />
        </Route>
      </Route>
    </Routes>
  )
}
