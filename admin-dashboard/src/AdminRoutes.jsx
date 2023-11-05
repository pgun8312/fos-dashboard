import { Route, Routes } from "react-router-dom"
import AdminOrders from "./pages/AdminOrders.jsx";

import ProtectedRoute from "shell_frontend/ProtectedRoute";
import RootLayout from "shell_frontend/RootLayout";
export const AdminRoutes = () => {
  return (
    <Routes>
      <Route element={<RootLayout />} >
        <Route element={<ProtectedRoute userRole={["Admin"]} redirect={"/"} />}>
          <Route path="/admin/orders" element={<AdminOrders />} />
        </Route>
      </Route>
    </Routes>
  )
}
