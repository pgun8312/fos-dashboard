import { Route, Routes } from "react-router-dom"
import UserDashboard from "user_dashboard/UserDashboard";
import ProtectedRoute from "./components/layout/ProtectedRoute";

export const UserRoutes = () => {
  return (
    <Routes>
      <Route element={<ProtectedRoute userRole={["User","Admin"]} redirect={"/"} />}>
        <Route path="/user/orders" element={<UserDashboard />} />
      </Route>
    </Routes>
  )
}
