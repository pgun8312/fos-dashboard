import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import UserDashboard from "user_dashboard/UserDashboard";
import AdminDashboard from "admin_dashboard/AdminDashboard";
import Home from "./Home";
import ProtectedRoute from "./components/layout/ProtectedRoute.jsx";;
import { UserRoutes } from "user_dashboard/UserRoutes";
import { AdminRoutes } from "admin_dashboard/AdminRoutes";
import RootLayout from "./components/layout/RootLayout.jsx";

const MainLayout = () => {
  return (
        <Router>
            <Routes>
                <Route element={<RootLayout />}>

                    {/* Common Routes */}
                    <Route exact path="/" Component={Home} />

                    {/* Admin and User Routes */}
                    <Route element={<ProtectedRoute userRole={["User","Admin"]} redirect={"/"} />}>
                        <Route path="/user" element={<UserDashboard />} />
                    </Route>

                    {/* Admin only Routes */}
                    <Route element={<ProtectedRoute userRole={["Admin"]} redirect={"/"} />}>
                        <Route path="/admin" element={<AdminDashboard />} />
                    </Route>

                </Route>
            </Routes>
            <UserRoutes />
            <AdminRoutes />

        </Router>
    )
}

export default MainLayout
