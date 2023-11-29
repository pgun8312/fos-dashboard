import {
  Add,
  AddShoppingCartOutlined,
  GppGood,
  Grain,
  Home,
  Remove,
  RemoveShoppingCartOutlined,
  Whatshot,
} from "@mui/icons-material";
import {
  Box,
  Breadcrumbs,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectProductById } from "../store/slices/productSlice";
import { useGlobalStore } from "shell_frontend/store";
import ice_cream from "../assets/ice_cream.jpg";
import { useGetProductByIdQuery } from "../store/apis/userApi";
import { HashLoader, MoonLoader } from "react-spinners";
import CustomMainButton from "../components/CustomMainButton/CustomMainButton";
import { useTheme } from "@mui/material";
import InternalServerError from "./InternalServerError";

const ProductDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const globalCart = useSelector((state) => state.globalCart);
  const { increaseCount, decreaseCount, addToCart, removeFromCart } =
    useGlobalStore();
  const { id } = useParams();
  const theme = useTheme();
  //   const selectedProduct = useSelector((state) => state.local.products.products);
  const selectedProduct = useSelector((state) =>
    state.local.products.products.find((product) => product.id === id)
  );

  const {
    data: fetchedProduct,
    isLoading,
    isError,
    isSuccess,
  } = useGetProductByIdQuery(id);

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

  if (isSuccess || selectedProduct) {
    const product = isSuccess ? fetchedProduct : selectedProduct;

    content = (
      <>
        <header>
          <Breadcrumbs aria-label="breadcrumb">
            <Link
              underline="hover"
              sx={{ display: "flex", alignItems: "center" }}
              color="inherit"
              to="/home"
            >
              <Home sx={{ mr: 0.5 }} fontSize="inherit" />
              MUI
            </Link>
            <Link
              underline="hover"
              sx={{ display: "flex", alignItems: "center" }}
              color="inherit"
              to="/home/products"
            >
              <Whatshot sx={{ mr: 0.5 }} fontSize="inherit" />
              Products
            </Link>
            <Typography
              sx={{ display: "flex", alignItems: "center" }}
              color="text.primary"
            >
              <Grain sx={{ mr: 0.5 }} fontSize="inherit" />
              Product_Details
            </Typography>
          </Breadcrumbs>
        </header>
        <main
          style={{
            display: "flex",
            gap: "1rem",
            marginTop: "1rem",
            justifyContent: "space-between",
            alignContent: "space-around",
          }}
        >
          <Box
            className="left-side-container"
            sx={{
              display: "flex",
              flex: 1,
              minWidth: "40vh",
            }}
          >
            <img src={ice_cream} width="90%" />
          </Box>
          <Box
            className="right-side-container"
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "40vh",
              gap: "1rem",
              marginRight: "1rem",
            }}
          >
            <Box>
              <Typography variant="h3">{product?.name}</Typography>
              <Typography variant="body1">{product?.description}</Typography>
              <Typography variant="body2">Price: ${product?.price}</Typography>
            </Box>
            <Divider />

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                border: "1px solid",
                flexWrap: "wrap",
                padding: 1,
                borderRadius: 4,
              }}
            >
              <IconButton
                onClick={() => dispatch(decreaseCount({ id: product.id }))}
              >
                <Remove />
              </IconButton>
              <Typography>
                {globalCart.cart.find((item) => item.id === product.id)
                  ?.count || 0}
              </Typography>
              <IconButton
                onClick={() => dispatch(increaseCount({ id: product.id }))}
              >
                <Add />
              </IconButton>
            </Box>
            <Divider />
            <Box
              sx={{
                display: "flex",
                gap: "0.5rem",
                marginTop: "2rem 0 1rem",
              }}
            >
              <CustomMainButton
                onClick={() => dispatch(addToCart({ item: product }))}
                sx={{
                  color: theme.palette.primary.main,
                }}
              >
                Add to Cart
                <IconButton>
                  <AddShoppingCartOutlined />
                </IconButton>
              </CustomMainButton>

              <CustomMainButton
                onClick={() => dispatch(addToCart({ item: product }))}
                color="primary"
              >
                Remove From Cart
                <IconButton
                  onClick={() => dispatch(removeFromCart({ id: product.id }))}
                  color="error"
                >
                  <RemoveShoppingCartOutlined />
                </IconButton>
              </CustomMainButton>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {/* <Typography fontWeight="bold">${product.price}</Typography> */}
            </Box>
          </Box>
        </main>
      </>
    );
  }

  return (
    <Box sx={{ margin: "1rem 0 0 1rem" }}>
      {content}
      {console.log(
        "ID: ",
        id,
        "selectedProduct: ",
        selectedProduct,
        "fetchedProduct: ",
        fetchedProduct,
        isLoading,
        isError,
        isSuccess
      )}
    </Box>
  );
};

export default ProductDetails;
