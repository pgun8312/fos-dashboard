import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
  CircularProgress,
  Divider,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import CustomMainButton from "./CustomMainButton";
import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useSignInMutation } from "../../store/apis/authApi";
import { setAuthUser, setToken } from "../../store/slices/authUserSlice";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const CustomSecondaryButton = styled("button")(({ theme }) => ({
  border: "none",
  background: "none",
  cursor: "pointer",

  "&:hover": {
    color: theme.palette.primary.main,
  },
}));

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const theme = useTheme();
  const navigate = useNavigate();
  const [signin, { isLoading }] = useSignInMutation();
  const dispatch = useDispatch();

  //handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await signin({ userName: userName, password: password });
      if (response?.error) {
        throw response.error;
      }
      // console.log(response);

      const { idToken, accessToken, expiresIn, user } = response.data;

      //setting the authenticated user Details and the token
      dispatch(setAuthUser(user));
      dispatch(setToken(accessToken));

      //store in the sessionStorage
      sessionStorage.setItem(
        "authUser",
        JSON.stringify({
          id: user.id,
          userName: user.userName,
          role: user.role,
        })
      );
      sessionStorage.setItem("token", accessToken);

      //reseting the fields
      setUserName("");
      setPassword("");
      setError("");
      navigate(user.role === "Admin" ? "/admin" : "/user");
    } catch (error) {
      // console.log(error);
      setError(error.data.error);
    }
  };

  return (
    <form
      style={{
        width: "100%",
        height: "100%",
        overflowY: "auto",
      }}
      onSubmit={handleSubmit}
    >
      <Card
        sx={{
          width: "100%",
          height: "100%",
        }}
        elevation={2}
      >
        <CardContent>
          <Typography
            variant="h2"
            sx={{
              color: "Primary.main",
            }}
            color="primary.main"
          >
            Welcome Back!
          </Typography>
          <Typography variant="body">Please Sign-in to continue</Typography>
        </CardContent>
        <CardActions
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <TextField
            required
            label="Login"
            type="text"
            id="login-user-name"
            fullWidth
            placeholder="UserName or Email"
            size="small"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            autoComplete="username"
            // error={error !== ""}
            // helperText={error !== "" ? error : undefined}
          />
          <TextField
            required
            label="Password"
            type={showPassword ? "text" : "password"}
            id="login-password"
            fullWidth
            size="small"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    onMouseDown={(e) => e.preventDefault()}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          {error && (
            <Typography variant="body" color="red">
              {error}
            </Typography>
          )}
        </CardActions>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            paddingBottom: "1rem",
          }}
        >
          <CustomSecondaryButton>Forgot password?</CustomSecondaryButton>
        </Box>
        <CardActions
          sx={{
            display: "flex",
            justifyContent: "space-evenly",
          }}
        >
          <CustomMainButton
            variant="contained"
            disableElevation
            sx={{
              color: theme.palette.secondary.light,
              "&:hover": {
                background: theme.palette.primary.main,
              },
            }}
            type="submit"
            disabled={isLoading}
            endIcon={
              isLoading ? (
                <CircularProgress size={20} color="inherit" />
              ) : undefined
            }
          >
            Login
          </CustomMainButton>
          <CustomMainButton
            variant="outlined"
            disableElevation
            onClick={() => navigate("/home")}
          >
            Login as Guest
          </CustomMainButton>
        </CardActions>
        <Divider
          sx={{
            padding: "1rem 0",
          }}
        >
          <Chip label="OR" />
        </Divider>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography>
            Don't have an Account?
            <CustomSecondaryButton
              style={{
                color: theme.palette.primary.main,
              }}
              onClick={() => navigate("/auth/signup")}
            >
              Sign Up
            </CustomSecondaryButton>
          </Typography>
        </Box>
      </Card>
    </form>
  );
};

export default Login;
