import {
  Alert,
  Box,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Divider,
  IconButton,
  InputAdornment,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import CustomMainButton from "./CustomMainButton";
import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import { useSignUpMutation } from "../../store/apis/authApi";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import InternalServerError from "../../pages/InternalServerError";

const CustomSecondaryButton = styled("button")(({ theme }) => ({
  border: "none",
  background: "none",
  cursor: "pointer",

  "&:hover": {
    color: theme.palette.primary.main,
  },
}));

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const theme = useTheme();
  const navigate = useNavigate();
  const [signup, { isLoading, isError }] = useSignUpMutation();

  const [isSnackBarOpen, setIsSnackBarOpen] = useState(false);

  //handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await signup({
        userName: userName,
        password: password,
        email: email,
        name: `${firstName} ${lastName}`,
        phone: phoneNumber || "",
      });
      if (response?.error) {
        throw response.error;
      }
      setIsSnackBarOpen(true);
      setFirstName("");
      setLastName("");
      setEmail("");
      setUserName("");
      setPassword("");
      setPhoneNumber("");
      setError("");
    } catch (error) {
      if (error?.data) {
        // If there is an error response from the server
        setError(error?.data?.error || "ERROR");
      } else if (error?.code === "failed-precondition" || "ERROR") {
        // Handle network error or server down
        setError("Network error or server is down. Please try again later.");
      } else {
        // Handle other errors
        setError("An unexpected error occurred. Please try again later.");
      }
    }
  };

  let content;

  content = (
    <form
      style={{
        width: "100%",
        height: "100%",
        overflowY: "auto",
      }}
      onSubmit={handleSubmit}
    >
      <Snackbar
        open={isSnackBarOpen}
        autoHideDuration={5000}
        onClose={() => setIsSnackBarOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setIsSnackBarOpen(false)}
          severity="success"
          sx={{ width: "100%" }}
          variant="filled"
        >
          "You have successfully registered! Please check you email for
          confirmation code"
        </Alert>
      </Snackbar>
      <Card
        sx={{
          width: "100%",
          height: "100%",
        }}
        elevation={2}
      >
        <CardContent>
          <Typography
            variant="h3"
            sx={{
              color: "Primary.main",
            }}
            color="primary.main"
          >
            Create an Account
          </Typography>
          <Typography variant="body">
            Enter your information to proceed. if you have an account
            <br />
            please log in instead.
          </Typography>
        </CardContent>
        <CardActions
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: "1rem",
            }}
          >
            <TextField
              label="First name"
              type="text"
              id="SignUp-first-name"
              required
              size="small"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <TextField
              label="Last name"
              type="text"
              id="SignUp-last-name"
              required
              size="small"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </Box>
          <TextField
            label="Email"
            type="email"
            id="SignUp-email"
            required
            fullWidth
            size="small"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="User name"
            type="text"
            id="SignUp-user-name"
            required
            fullWidth
            size="small"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <TextField
            label="Password"
            type={showPassword ? "text" : "password"}
            id="SignUp-password"
            fullWidth
            required
            size="small"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
          <TextField
            label="Phone number"
            type="tel"
            id="SignUp-phone-number"
            fullWidth
            size="small"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
          {error && (
            <Typography variant="body" color="red">
              {error}
            </Typography>
          )}
        </CardActions>
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
            data-testid="signup-btn"
          >
            SignUp
          </CustomMainButton>
        </CardActions>
        <Divider />
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography>
            Already have an account?
            <CustomSecondaryButton
              style={{
                color: theme.palette.primary.main,
              }}
              onClick={() => navigate("/auth/signin")}
            >
              Login
            </CustomSecondaryButton>
            or
            <CustomSecondaryButton
              style={{
                color: theme.palette.primary.main,
              }}
              onClick={() => navigate("/auth/confirm-signup")}
              data-testid="login-goto-confirm-signup-btn"
            >
              Confirm Account
            </CustomSecondaryButton>
          </Typography>
        </Box>
      </Card>
    </form>
  );

  if (isError) {
    content = <InternalServerError />;
  }

  return <>{content}</>;
};

export default SignUp;
