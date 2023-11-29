import { Navigate, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
// import { setAuthUser, setToken } from "../../store/slices/authUserSlice";
import { useGlobalStore } from "shell_frontend/store";
import { MoonLoader } from "react-spinners";
import { Box } from "@mui/material";

const ProtectedRoute = ({ userRole, redirect }) => {
  const { setAuthUser, setToken } = useGlobalStore();
  const dispatch = useDispatch();
  //authUser details from the redux store
  const authUser = useSelector((state) => state.authUser.authUser);
  //also set the authUser details by checking the localstorage in case of page refresh
  const token = useSelector((state) => state.authUser.token);
  const [loading, setLoading] = useState(true);

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
    console.log("PRotectedRoute", authUser);
    /* ONly run if the otken  and authuser.role doesn't exists */
    if (!token && !authUser?.role) {
      console.log("IN ProtectedRoutes, Fetching from Session Storage");
      fetchDataFromSessionStorage();
    } else {
      console.log("IN ProtectedRoutes, NOT FETCHING");
      setLoading(false);
    }
  }, [authUser, token, dispatch]);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "90vw",
          height: "90vh",
        }}
      >
        <MoonLoader loading={true} color="#36d7b7" speedMultiplier={2} />
      </Box>
    );
  }

  //if the user is not authenticated send to the login
  if (!authUser.role) {
    return <Navigate to="/" replace />;
  }

  //if user is authenticated but does not have the access to the route
  if (userRole && !userRole.includes(authUser.role)) {
    return <Navigate to={redirect} replace />;
  }

  //authenticated user and the have access to route return the sub routes
  return <Outlet />;
};

export default ProtectedRoute;
