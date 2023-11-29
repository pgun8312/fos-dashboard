import { Route, Routes } from "react-router-dom";
import UserOrders from "./pages/UserOrders.jsx";
import {
  GuestNavItems,
  userNavItems,
} from "./components/navItems/navItems.jsx";
import ProtectedRoute from "./components/layout/ProtectedRoute";
import RootLayout from "shell_frontend/RootLayout";
import DashboardLayout from "shell_frontend/DashboardLayout";
import UserProducts from "./pages/UserProducts.jsx";
import UserDashboard from "./UserDashboard.jsx";
import { UserDashboardStoreProvider } from "./store/store.js";
import { useSelector } from "react-redux";
import ProductDetails from "./pages/ProductDetails.jsx";
import Checkout from "./pages/Checkout.jsx";
import UserProfile from "./pages/UserProfile.jsx";
import NotFound from "./pages/NotFound.jsx";

export const UserRoutes = () => {
  //based on the user role sidebar navigation icons will render
  const authUser = useSelector((state) => state.authUser.authUser);

  const navItems = authUser?.role === "User" ? userNavItems : GuestNavItems;
  return (
    <Routes>
      {console.log(
        authUser.role,
        " : ",
        authUser?.role === "User" ? true : false
      )}
      {console.log("UserRoutes 1", authUser)}

      <Route element={<UserDashboardStoreProvider />}>
        {console.log("UserRoutes 2", authUser)}
        <Route element={<RootLayout />}>
          <Route
            element={<DashboardLayout isCartShow={true} navItems={navItems} />}
          >
            {/* User only Routes */}
            <Route
              element={
                <ProtectedRoute userRole={["User"]} redirect={"/home"} />
              }
            >
              <Route path="orders" element={<UserOrders />} />
              <Route path="checkout" element={<Checkout />} />
              <Route path="profile" element={<UserProfile />} />
            </Route>

            {/* COMMON ROUTES || should be after the proted routes */}
            {/* User and Guest Dashboard , sub routes define by each mfe */}

            <Route path="/" element={<UserDashboard />} />
            <Route path="products" element={<UserProducts />} />
            <Route path="products/:id" element={<ProductDetails />} />
            <Route path="/*" element={<NotFound />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
};
