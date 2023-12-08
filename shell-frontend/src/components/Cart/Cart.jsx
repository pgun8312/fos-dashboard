import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Box, Button, Drawer, IconButton, Typography } from "@mui/material";
import { Add, CloseOutlined, Remove } from "@mui/icons-material";
import {
  decreaseCount,
  increaseCount,
  removeFromCart,
  setIsCartOpen,
} from "../../store/slices/cartSlice";
import carrot from "../../assets/carrot.png";

const Cart = ({ isMobile }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.globalCart.cart);
  const isCartOpen = useSelector((state) => state.globalCart.isCartOpen);
  const authUser = useSelector((state) => state.authUser.authUser);

  //calculating total price
  const totalPrice = cart.reduce((total, item) => {
    return total + item.count * item.price;
  }, 0);

  return (
    <Drawer
      open={isCartOpen}
      variant="temporary"
      anchor="right"
      sx={{
        zIndex: 10,
        display: isCartOpen ? "block" : "none",
        width:
          "max(400px, 30%)" /* take maximum of 400px other wise takes 30% */,
        "& .MuiDrawer-paper": {
          color: "primary.main",
          backgroundColor: "sideBar.background",
          OverlaySizing: "border-box",
          borderWidth: isMobile ? "2px" : 0,
          width:
            "max(400px, 30%)" /* take maximum of 400px other wise takes 30% */,
        },
      }}
    >
      <Box
        sx={{
          padding: "30px",
          overflow: "auto",
          height: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h6">SHOPPING CART ({cart.length})</Typography>
          <IconButton
            onClick={() => dispatch(setIsCartOpen())}
            data-testid="cart-close-button"
          >
            <CloseOutlined />
          </IconButton>
        </Box>
        <hr
          style={{
            width: "90%",
          }}
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "column",
            gap: "1rem",
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
                  <img
                    alt={item.name}
                    width="123px"
                    height="100px"
                    src={carrot}
                  />
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
                    <IconButton
                      onClick={() => dispatch(removeFromCart({ id: item.id }))}
                    >
                      <CloseOutlined />
                    </IconButton>
                  </Box>

                  <Typography>{item.description}</Typography>

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        border: "1px solid",
                      }}
                    >
                      <IconButton
                        onClick={() => dispatch(decreaseCount({ id: item.id }))}
                      >
                        <Remove />
                      </IconButton>
                      <Typography>{item.count}</Typography>
                      <IconButton
                        onClick={() => dispatch(increaseCount({ id: item.id }))}
                      >
                        <Add />
                      </IconButton>
                    </Box>

                    <Typography fontWeight="bold">${item.price}</Typography>
                  </Box>
                </Box>
              </Box>
            );
          })}
        </Box>
        <hr style={{ width: "90%", margin: "1rem 0" }} />
        <Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography fontWeight="bold">Sub Total:</Typography>
            <Typography fontWeight="bold">${totalPrice.toFixed(2)}</Typography>
          </Box>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Button
              data-testid={`shell-frontend-cart-checkout-btn`}
              onClick={() => {
                navigate(
                  authUser.role !== "Guest" ? "/home/checkout" : "/auth/signup"
                );
                dispatch(setIsCartOpen());
              }}
              sx={{
                width: "80%",
                margin: "1rem 0",
              }}
              variant="contained"
              disabled={totalPrice <= 0}
            >
              CHECKOUT
            </Button>
          </Box>
        </Box>
      </Box>
    </Drawer>
  );
};

export default Cart;
