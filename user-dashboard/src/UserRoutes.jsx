import { Route, Routes } from "react-router-dom"
import UserOrders from "./pages/UserOrders.jsx";

import ProtectedRoute from "shell_frontend/ProtectedRoute";
import RootLayout from "shell_frontend/RootLayout";
export const UserRoutes = () => {
  return (
    <Routes>
      <Route element={<RootLayout />} >
        <Route element={<ProtectedRoute userRole={["User","Admin"]} redirect={"/"} />}>
          <Route path="/user/orders" element={<UserOrders />} />
        </Route>
      </Route>
    </Routes>
  )
}
