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
import { StoreProvider, useGlobalStore } from "shell_frontend/store";
import { UserDashboardStoreProvider } from "./store/store.js";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Box, CircularProgress } from "@mui/material";
import ProductDetails from "./pages/ProductDetails.jsx";
import Checkout from "./pages/Checkout.jsx";
import UserProfile from "./pages/UserProfile.jsx";
import NotFound from "./pages/NotFound.jsx";

export const UserRoutes = () => {
  //based on the user role sidebar navigation icons will render
  const authUser = useSelector((state) => state.authUser.authUser);
  const token = useSelector((state) => state.authUser.token);
  const navItems = authUser?.role === "User" ? userNavItems : GuestNavItems;
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const { setAuthUser, setToken } = useGlobalStore();

  //checking the data from sessionStorage in case of page refresh
  useEffect(() => {
    const fetchDataFromSessionStorage = () => {
      const user = JSON.parse(sessionStorage.getItem("authUser"));
      const accessToken = sessionStorage.getItem("token");

      if (user?.role && accessToken) {
        dispatch(setAuthUser(user));
        dispatch(setToken(accessToken));
      }

      setLoading(false);
    };

    if (!token && !authUser?.role) {
      fetchDataFromSessionStorage();
    } else {
      setLoading(false);
    }
  }, [authUser, token, dispatch]);

  // if (loading) {
  //   return (
  //     <Box
  //       sx={{
  //         display: "flex",
  //         justifyContent: "center",
  //         alignItems: "center",
  //         width: "90vw",
  //         height: "90vh",
  //       }}
  //     >
  //       <CircularProgress />
  //       {/* <MoonLoader loading={true} color="#36d7b7" speedMultiplier={2} /> */}
  //     </Box>
  //   );
  // }
  return (
    <Routes>
      {console.log(
        authUser.role,
        " : ",
        authUser?.role === "User" ? true : false
      )}
      {console.log(authUser)}

      <Route element={<RootLayout />}>
        <Route element={<UserDashboardStoreProvider />}>
          <Route
            element={<DashboardLayout isCartShow={true} navItems={navItems} />}
          >
            {/* COMMON ROUTES */}
            {/* User and Guest Dashboard , sub routes define by each mfe */}
            <Route path="/" element={<UserDashboard />} />
            <Route path="products" element={<UserProducts />} />
            <Route path="products/:id" element={<ProductDetails />} />
            <Route path="/*" element={<NotFound />} />

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
          </Route>
        </Route>
      </Route>
    </Routes>
  );
};
