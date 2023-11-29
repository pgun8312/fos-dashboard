import {
  Alert,
  Box,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Snackbar,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import CustomMainButton from "../components/CustomMainButton/CustomMainButton";
import ImageUploadCard from "../components/ImageUploadCard/ImageUploadCard";
import {
  useGetUserDetailsQuery,
  useUpdateUserAccountDetailsMutation,
  useUpdateUserProfileDetailsMutation,
} from "../store/apis/userApi";
import { useSelector } from "react-redux";
import { HashLoader } from "react-spinners";
import InternalServerError from "./InternalServerError";
const UserProfile = () => {
  const theme = useTheme();
  const authUser = useSelector((state) => state.authUser.authUser);
  const { id } = authUser;

  const [userName, setUserName] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [error, setError] = useState("");
  const [isSnackBarOpen, setIsSnackBarOpen] = useState(false);
  const [updateUserAccount, { isLoading: isUserUpdatingLoading }] =
    useUpdateUserAccountDetailsMutation();
  const [updateUserProfile, { isLoading: isUserProfileUpdatingLoading }] =
    useUpdateUserProfileDetailsMutation();

  const {
    data: userDetails,
    isLoading,
    isError,
    isSuccess,
  } = useGetUserDetailsQuery(id, {
    skip: !id,
  });

  useEffect(() => {
    if (userDetails) {
      setUserName(userDetails?.userName || "");
      setName(userDetails?.name || "");
      setEmail(userDetails?.email || "");
      setDeliveryAddress(userDetails?.deliveryAddress || "");
      setCity(userDetails?.city || ""),
        setPostalCode(userDetails?.postalCode || ""),
        setPhoneNumber(userDetails?.phone || "");
    }
  }, [userDetails]);

  const handleAccountUpdate = async (e) => {
    e.preventDefault();
    try {
      const requestBody = {
        userName,
        name,
        phone: phoneNumber,
        email,
      };
      const userAccountUpdateResponse = await updateUserAccount({
        updatedUser: requestBody,
        userId: id,
      });
      if (userAccountUpdateResponse?.error) {
        throw userAccountUpdateResponse.error;
      }
      setUserName(userAccountUpdateResponse?.data?.userName || "");
      setName(userAccountUpdateResponse?.data?.name || "");
      setEmail(userAccountUpdateResponse?.data?.email || "");
      setPhoneNumber(userAccountUpdateResponse?.data?.phone || "");
      setIsSnackBarOpen(true);
    } catch (error) {
      alert(error?.data?.error || "Unable to Update the Account!");
    }
  };
  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      const requestBody = {
        deliveryAddress,
        city,
        postalCode,
        profilePicture: "image_1",
      };
      console.log(requestBody);
      const userProfileUpdateResponse = await updateUserProfile({
        updatedUserProfile: requestBody,
        userId: id,
      });
      if (userProfileUpdateResponse?.error) {
        throw userProfileUpdateResponse.error;
      }
      setDeliveryAddress(
        userProfileUpdateResponse?.data?.deliveryAddress || ""
      );
      setCity(userProfileUpdateResponse?.data?.city || "");
      setPostalCode(userProfileUpdateResponse?.data?.postalCode || "");
      setIsSnackBarOpen(true);
    } catch (error) {
      alert(error?.data?.error || "Unable to Update the Account!");
    }
  };

  let content;
  if (isLoading) {
    content = (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "90vw",
          height: "90vh",
        }}
      >
        <HashLoader loading={true} color="#36d7b7" speedMultiplier={2} />
      </Box>
    );
  }

  if (isError) {
    content = <InternalServerError />;
  }

  if (isSuccess) {
    content = (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "1rem 1rem 0 1rem",
        }}
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
            You have successfully Updated the Profile!
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
              Update Profile Information
            </Typography>
            <Typography variant="body">
              Enter your information to update.
            </Typography>
          </CardContent>
          <CardActions
            sx={{
              display: "flex",
              gap: "1rem",
              width: "100%",
              height: "100%",
              alignItems: "stretch",
            }}
            className="left-form"
          >
            <form
              style={{
                display: "flex",
                overflowY: "auto",
                flexDirection: "column",
                gap: "1rem",
                height: "100%",
                width: "40%",
              }}
              onSubmit={handleAccountUpdate}
            >
              <Typography variant="h4">User Account Details</Typography>
              <Box
                sx={{
                  display: "flex",
                  gap: "1rem",
                  width: "100%",
                }}
              >
                <TextField
                  label="User Name"
                  type="text"
                  id="updateProfile-user-name"
                  required
                  size="small"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
                <TextField
                  label="Full Name"
                  type="text"
                  id="updateProfile-full-name"
                  required
                  size="small"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Box>
              <TextField
                label="Email"
                type="email"
                id="updateProfile-email"
                required
                fullWidth
                size="small"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <TextField
                label="Phone number"
                type="tel"
                id="updateProfile-phone-number"
                fullWidth
                size="small"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
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
                disabled={isUserUpdatingLoading}
                endIcon={
                  isUserUpdatingLoading ? (
                    <CircularProgress size={20} color="inherit" />
                  ) : undefined
                }
              >
                Update Account
              </CustomMainButton>
            </form>
            <form
              className="right-form"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                width: "40%",
                height: "100%",
                overflowY: "auto",
              }}
              onSubmit={handleProfileUpdate}
            >
              <Typography variant="h4">User Profile Details</Typography>

              <TextField
                label="Delivery Address"
                type="text"
                id="updateProfile-delivery-address"
                required
                size="small"
                value={deliveryAddress}
                onChange={(e) => setDeliveryAddress(e.target.value)}
              />
              <TextField
                label="City"
                type="text"
                id="updateProfile-city"
                required
                size="small"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
              <TextField
                label="Postal Code"
                type="text"
                id="updateProfile-postal-code"
                required
                fullWidth
                size="small"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
              />

              <Typography>Choose a Profile image</Typography>
              <ImageUploadCard />

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
                disabled={isUserProfileUpdatingLoading}
                endIcon={
                  isUserProfileUpdatingLoading ? (
                    <CircularProgress size={20} color="inherit" />
                  ) : undefined
                }
              >
                Update Profile
              </CustomMainButton>
            </form>
            {error && (
              <Typography variant="body" color="red">
                {error}
              </Typography>
            )}
          </CardActions>
        </Card>
      </Box>
    );
  }
  return <>{content}</>;
};

export default UserProfile;
