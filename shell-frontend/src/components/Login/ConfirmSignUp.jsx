import {
  Alert,
  Box,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Divider,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import CustomMainButton from "./CustomMainButton";
import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import {
  useConfirmSignUpMutation,
  useResendConfirmationCodeMutation,
} from "../../store/apis/authApi";

const CustomSecondaryButton = styled("button")(({ theme }) => ({
  border: "none",
  background: "none",
  cursor: "pointer",

  "&:hover": {
    color: theme.palette.primary.main,
  },
}));

const ConfirmSignUp = () => {
  const [userName, setUserName] = useState("");
  const [confirmationCode, setConfirmationCodeCode] = useState("");
  const [error, setError] = useState("");
  const [isSnackBarOpen, setIsSnackBarOpen] = useState(false);
  const [ConfirmSignUp, { isLoading }] = useConfirmSignUpMutation();
  const [resendConfirmationCode] = useResendConfirmationCodeMutation();
  const theme = useTheme();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await ConfirmSignUp({
        userName: userName,
        code: confirmationCode,
      });
      if (response?.error) {
        throw response.error;
      }
      setUserName("");
      setConfirmationCodeCode("");
      setError("");
      setIsSnackBarOpen(true);
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

  // handle resend confirmation code
  const handleResendCode = async () => {
    try {
      if (!userName) {
        return;
      }

      const response = await resendConfirmationCode({ userName: userName });
      console.log(response);

      if (response?.error) {
        throw response.error;
      }

      // Optionally show a success message
      // setIsSnackBarOpen(true);
      alert("Code successfully resend");
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
          "You have successfully Confirm the Account! Please Log in!"
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
            Thank you for signing up! Please check your email for the
            confirmation code.
          </Typography>
        </CardContent>
        <CardActions
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <Typography>
            Please Enter the confirmation code you received in your email.
          </Typography>
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
            label="Confirmation code"
            type="number"
            id="SignUp-confirmation-code"
            fullWidth
            required
            size="small"
            InputProps={{
              inputProps: {
                min: 0,
              },
            }}
            value={confirmationCode}
            onChange={(e) => setConfirmationCodeCode(e.target.value)}
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
            data-testid="login-confirm-signup-btn"
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
            Confirm
          </CustomMainButton>
        </CardActions>
        <Divider
          sx={{
            padding: "1rem 0",
          }}
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography>
            Didn't get the Code ?
            <CustomSecondaryButton
              style={{
                color: theme.palette.primary.main,
              }}
              onClick={handleResendCode}
            >
              Resend
            </CustomSecondaryButton>
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            paddingTop: "2rem",
          }}
        >
          <Typography>
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
              onClick={() => navigate("/auth/signup")}
            >
              Sign Up
            </CustomSecondaryButton>
          </Typography>
        </Box>
      </Card>
    </form>
  );

  return <>{content}</>;
};

export default ConfirmSignUp;
