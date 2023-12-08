import React, { useEffect, useState } from "react";
import {
  Alert,
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Checkbox,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  FormControlLabel,
  Modal,
  Snackbar,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import carrot from "../assets/carrot.png";
import {
  useCreaeteUserProfileDetailsMutation,
  useCreateOrderMutation,
  useGetUserDetailsQuery,
} from "../store/apis/userApi";
import { HashLoader, MoonLoader } from "react-spinners";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import OrderDetailsModalContent from "../components/Modal/OrderDetailsModalContent";
import { useGlobalStore } from "shell_frontend/store";
import InternalServerError from "./InternalServerError";
const CustomSecondaryButton = styled("button")(({ theme }) => ({
  border: "none",
  background: "none",
  cursor: "pointer",

  "&:hover": {
    color: theme.palette.primary.main,
  },
}));
const Checkout = () => {
  const { clearCart } = useGlobalStore();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //global state
  const authUser = useSelector((state) => state.authUser.authUser);
  const { id } = authUser;
  const theme = useTheme();
  const cart = useSelector((state) => state.globalCart.cart);
  const [openModal, setOpenModal] = useState(false);
  const [orderSuccessResponse, setOrderSuccessResponse] = useState({});
  // useCreateOrderMutation should be called at the top level of the component
  const [createOrder, { isLoading }] = useCreateOrderMutation();
  const [createUserProfile, { isLoading: isUserProfileCreatingLoading }] =
    useCreaeteUserProfileDetailsMutation();

  //STATE VARIABLES
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [isProfileInformationPreset, setIsProfileInformationPreset] =
    useState(false);
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isSnackBarOpen, setIsSnackBarOpen] = useState(false);
  const [isSaveInformation, setIsSaveInformation] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!isProfileInformationPreset) {
        const profileCreationRequestBody = {
          deliveryAddress: address,
          city,
          postalCode,
          profilePicture: null,
          userId: id,
        };

        const userProfileCreatingResponse = await createUserProfile(
          profileCreationRequestBody
        );
        if (userProfileCreatingResponse?.error) {
          throw userProfileCreatingResponse.error;
        }

        setAddress(userProfileCreatingResponse?.data?.deliveryAddress || "");
        setCity(userProfileCreatingResponse?.data?.city || "");
        setPostalCode(userProfileCreatingResponse?.data?.postalCode || "");
      }

      const requestBody = {
        orderItems: cart.map((item) => {
          return { productId: item.id, quantity: item.count };
        }),
        userId: id,
      };

      const response = await createOrder(requestBody);
      if (response?.error) {
        throw response.error;
      }
      console.log(response);

      setOrderSuccessResponse(response.data);
      dispatch(clearCart());
      setOpenModal(true);
    } catch (error) {
      console.log(error);
      alert(error?.data?.error || "Unable to place the order!");
    }
  };

  const {
    data: userDetails,
    isLoading: isUserDetailsLoading,
    isError,
    isSuccess,
    error,
  } = useGetUserDetailsQuery(id, {
    skip: !id, //skip the query if the id is not available
  });

  //get the user Details
  useEffect(() => {
    if (userDetails) {
      if (userDetails?.deliveryAddress) {
        setIsProfileInformationPreset(true);
      }
      setEmail(userDetails?.email || "");
      setFirstName(userDetails?.name || "");
      setAddress(userDetails?.deliveryAddress || "");
      setCity(userDetails?.city || ""),
        setPostalCode(userDetails?.postalCode || ""),
        setPhoneNumber(userDetails?.phone || "");
    }
  }, [userDetails]);

  //calculating total price
  const totalPrice = cart.reduce((total, item) => {
    return total + item.count * item.price;
  }, 0);

  let content;

  if (isUserDetailsLoading) {
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
    // Handle error state
    content = <InternalServerError />;
  }
  if (isSuccess) {
    content = (
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "stretch",
          width: "100%",
          padding: "1rem 0 0 1rem",
        }}
        className="main-container"
      >
        <Box
          className="left-container"
          sx={{
            display: "flex",
            flexDirection: "column",
            minWidth: "40%",
          }}
        >
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
                "Order Placed Successfully"
              </Alert>
            </Snackbar>
            <Card
              sx={{
                width: "100%",
                height: "100%",
              }}
            >
              <CardContent>
                <Typography variant="h3">Contact</Typography>
              </CardContent>
              <CardActions>
                <TextField
                  label="Email"
                  type="email"
                  id="place-order-email"
                  required
                  fullWidth
                  size="small"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={email !== ""}
                />
              </CardActions>

              <CardContent>
                <Typography variant="h3">Delivery</Typography>
              </CardContent>
              <CardActions
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                  gap: "1rem",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    width: "100%",
                    gap: "0.5rem",
                  }}
                >
                  <TextField
                    label="Full Name"
                    type="text"
                    id="checkout-full-name"
                    required
                    size="small"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    disabled={firstName !== null}
                    fullWidth
                  />
                  {/* <TextField
                    label="Last name"
                    type="text"
                    id="SignUp-last-name"
                    size="small"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    fullWidth
                  /> */}
                </Box>

                <TextField
                  label="Address"
                  type="text"
                  id="checkout-address"
                  required
                  fullWidth
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  disabled={isProfileInformationPreset}
                />
                <TextField
                  label="City"
                  type="text"
                  id="checkout-city"
                  required
                  value={city}
                  size="small"
                  onChange={(e) => setCity(e.target.value)}
                  fullWidth
                  disabled={isProfileInformationPreset}
                />
                <TextField
                  label="Postal Code"
                  type="text"
                  id="checkout-postal-code"
                  required
                  fullWidth
                  size="small"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  disabled={isProfileInformationPreset}
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
                  disabled={phoneNumber !== ""}
                />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    width: "100%",
                  }}
                >
                  Details are incorrect?
                  <CustomSecondaryButton
                    onClick={() => {
                      navigate("/home/profile");
                    }}
                  >
                    Click here.
                  </CustomSecondaryButton>
                </Box>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={!isProfileInformationPreset}
                      onChange={() => setIsSaveInformation(!isSaveInformation)}
                    />
                  }
                  label="Save this informations for next time"
                  disabled={
                    isUserProfileCreatingLoading || isProfileInformationPreset
                  }
                />
                <Button
                  data-testid="checkout-place-order-btn"
                  variant="contained"
                  disableElevation
                  fullWidth
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
                  Place Order
                </Button>
              </CardActions>
            </Card>
          </form>
        </Box>

        <Box
          className="right-container"
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "40%",
            border: `1px solid ${theme.palette.primary.main}`,
            borderRadius: "5px",
            boxShadow: "0 4 8 rgba(0,0,0,0.1)",
            overflowY: "auto",
            maxHeight: "80vh",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "column",
              gap: "1rem",
              padding: "0.5rem 0 0 0.5rem",
            }}
          >
            {cart.map((item) => {
              return (
                <Box
                  key={item.id}
                  sx={{
                    display: "flex",
                  }}
                >
                  <Box
                    sx={{
                      flex: "1 1 40%",
                    }}
                  >
                    <Badge
                      badgeContent={item.count}
                      sx={{
                        color: theme.palette.primary.main,
                      }}
                    >
                      <img
                        alt={item.name}
                        style={{
                          minWidth: "123px",
                          height: "100px",
                        }}
                        src={carrot}
                      />
                    </Badge>
                  </Box>
                  <Box
                    sx={{
                      flex: "1 1 60%",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Typography>{item.name}</Typography>
                    </Box>

                    <Typography>{item.description}</Typography>

                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Typography fontWeight="bold">${item.price}</Typography>
                    </Box>
                  </Box>
                </Box>
              );
            })}
          </Box>
          <Divider />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
              marginTop: "1rem",
            }}
          >
            <Typography fontWeight="bold">Sub Total:</Typography>
            <Typography
              fontWeight="bold"
              data-testid="checkout-total-price-lbl"
            >
              ${totalPrice.toFixed(2)}
            </Typography>
          </Box>
        </Box>
      </Box>
    );
  }
  return (
    <>
      {content} {console.log(userDetails)}
      {/* MODAL FOR ORDER SUCCESS */}
      <Dialog
        open={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogContent>
          <OrderDetailsModalContent orderDetails={orderSuccessResponse} />
        </DialogContent>
        <DialogActions
          sx={{
            display: "flex",
          }}
        >
          <Button
            fullWidth
            onClick={() => {
              setOpenModal(false);
              navigate("/home/orders");
            }}
          >
            CLOSE
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Checkout;
