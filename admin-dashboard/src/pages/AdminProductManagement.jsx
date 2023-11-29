import React from "react";
import { Link, useParams } from "react-router-dom";
import {
  useDeleteProductMutation,
  useGetProductByIdQuery,
  useUpdateProductMutation,
} from "../store/apis/adminApi";
import {
  Box,
  Breadcrumbs,
  Typography,
  useTheme,
  Button,
  CircularProgress,
  TextField,
  Alert,
  Snackbar,
  MenuItem,
  Popper,
  Paper,
} from "@mui/material";
import { HashLoader } from "react-spinners";
import ice_cream from "../assets/ice_cream.jpg";
import { Grain, Home, Whatshot } from "@mui/icons-material";
import ImageUploadCard from "../components/ImageUploadCard/ImageUploadCard";
import CustomMainButton from "../components/CustomMainButton/CustomMainButton";
import { useState } from "react";
import { useEffect } from "react";

const AdminProductManagement = () => {
  const { id } = useParams();
  const theme = useTheme();
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [status, setStatus] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [isSnackBarOpen, setIsSnackBarOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handlePoper = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const poperId = open ? "simple-popper" : undefined;

  const [
    deactivateProduct,
    {
      isLoading: isDeactivateProductLoading,
      isError: isDeactivateProductError,
    },
  ] = useDeleteProductMutation();

  const [
    updateProduct,
    { isLoading: isProductUpdateLoading, isError: isProductUpdateError },
  ] = useUpdateProductMutation();

  const {
    data: fetchedProduct,
    isLoading,
    isError,
    isSuccess,
    isFetching,
  } = useGetProductByIdQuery(id, { skip: !id });

  useEffect(() => {
    if (fetchedProduct) {
      setProductName(fetchedProduct?.name || "");
      setDescription(fetchedProduct?.description || "");
      setPrice(fetchedProduct?.price || "");
      setCategory(fetchedProduct?.category || "");
      setStatus(fetchedProduct?.status || "");
      setQuantity(fetchedProduct?.remainingQuantity || "");
    }
  }, [fetchedProduct]);
  const cateogories = [
    {
      value: "CHICKEN",
      label: "Chicken",
    },
    {
      value: "CURRY",
      label: "Curry",
    },
    {
      value: "RICE",
      label: "Rice",
    },
    {
      value: "FISH",
      label: "Fish",
    },
    {
      value: "ICE_CREAMS",
      label: "Ice Cream",
    },
    {
      value: "SOFT_DRINKS",
      label: "Soft Drinks",
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const requestBody = {
        productName,
        description,
        price,
        status,
        image: "image_1",
        category,
        remainingQuantity: quantity,
      };
      const response = await updateProduct({
        productId: id,
        updatedProduct: requestBody,
      });
      if (response?.error) {
        throw response.error;
      }

      setProductName("");
      setDescription("");
      setPrice("");
      setCategory("");
      setQuantity("");
      setIsSnackBarOpen(true);
    } catch (error) {
      alert(error?.data?.error || "Unable to Update the Product!");
    }
  };

  const handleDelete = async () => {
    try {
      const response = await deactivateProduct(id);
      if (response?.error) {
        throw response.error;
      }
      alert("Product Successfully Deactivated!");
    } catch (error) {
      alert(error?.data?.error || "Unable to Deactivate the Product!");
    }
  };

  let content;

  if (isLoading || isFetching) {
    content = (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "80vh",
        }}
      >
        <HashLoader loading={true} color="#36d7b7" speedMultiplier={2} />
      </Box>
    );
  }

  if (isError) {
    content = <div>Error: {isError.message}</div>;
  }

  if (isSuccess && !isFetching) {
    content = (
      <>
        <Box>
          <Button
            variant="contained"
            color="error"
            onClick={handlePoper}
            disabled={isDeactivateProductLoading}
          >
            Delete Product
          </Button>

          <Popper
            id={poperId}
            open={open}
            anchorEl={anchorEl}
            placement="bottom-start"
            disablePortal={false}
            modifiers={[
              {
                name: "flip",
                enabled: true,
                options: {
                  altBoundary: true,
                  rootBoundary: "document",
                  padding: 8,
                },
              },
              {
                name: "preventOverflow",
                enabled: true,
                options: {
                  altAxis: true,
                  altBoundary: true,
                  tether: true,
                  rootBoundary: "document",
                  padding: 8,
                },
              },
              {
                name: "arrow",
                enabled: true,
              },
            ]}
          >
            <Paper
              sx={{
                border: 1,
                p: 1,
                bgcolor: "background.paper",
                marginTop: "0.2rem",
              }}
              elevation={12}
            >
              <Typography>Are you Sure want to Delete?</Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                  marginTop: "0.5rem",
                }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleDelete}
                  disabled={isDeactivateProductLoading}
                  endIcon={
                    isDeactivateProductLoading ? (
                      <CircularProgress size={20} color="inherit" />
                    ) : undefined
                  }
                >
                  Yes
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => setAnchorEl(null)}
                  disabled={isDeactivateProductLoading}
                >
                  No
                </Button>
              </Box>
            </Paper>
          </Popper>
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: "1rem",
            marginTop: "1rem",
            justifyContent: "center",
            alignContent: "center",
            border: `1px solid ${theme.palette.primary.main}`,
            padding: "1rem",
          }}
        >
          <ImageUploadCard />
          <form
            onSubmit={handleSubmit}
            className="left-container"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              width: "50%",
              gap: "1.5rem",
              marginRight: "1rem",
            }}
          >
            <TextField
              label="Product Name"
              type="text"
              id="create-product-name"
              required
              size="small"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
            <TextField
              label="Description"
              type="text"
              multiline
              rows={4}
              id="create-product-description"
              required
              size="small"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <TextField
              label="Price"
              type="text"
              id="create-product-price"
              InputProps={{
                inputProps: {
                  min: 0,
                },
              }}
              required
              size="small"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <TextField
              label="category"
              select
              type="text"
              id="create-product-cateogory"
              required
              size="small"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {cateogories.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.value}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="Status"
              select
              type="text"
              id="create-product-status"
              required
              size="small"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <MenuItem key={"available"} value={"available"}>
                {"Available"}
              </MenuItem>
              <MenuItem key={"notAvailable"} value={"notAvailable"}>
                {"Not Available"}
              </MenuItem>
            </TextField>
            <TextField
              label="Quantity"
              type="number"
              id="create-product-quantity"
              required
              size="small"
              InputProps={{
                inputProps: {
                  min: 0,
                },
              }}
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
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
              disabled={isProductUpdateLoading}
              endIcon={
                isProductUpdateLoading ? (
                  <CircularProgress size={20} color="inherit" />
                ) : undefined
              }
            >
              Update Product
            </CustomMainButton>
          </form>
        </Box>
      </>
    );
  }

  return (
    <Box
      className="main-container"
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
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
          Product Update Successfull!
        </Alert>
      </Snackbar>
      <header
        className="subcontainer-breadcrumb"
        style={{
          margin: "1rem 0 0 1rem",
        }}
      >
        <Breadcrumbs aria-label="breadcrumb">
          <Link
            underline="hover"
            sx={{ display: "flex", alignItems: "center" }}
            color="inherit"
            to="/admin"
          >
            <Home sx={{ mr: 0.5 }} fontSize="inherit" />
            MUI
          </Link>
          <Link
            underline="hover"
            sx={{ display: "flex", alignItems: "center" }}
            color="inherit"
            to="/admin/products"
          >
            <Whatshot sx={{ mr: 0.5 }} fontSize="inherit" />
            Products
          </Link>
          <Typography
            sx={{ display: "flex", alignItems: "center" }}
            color="text.primary"
          >
            <Grain sx={{ mr: 0.5 }} fontSize="inherit" />
            Product_Management
          </Typography>
        </Breadcrumbs>
      </header>

      <Box
        className="subcontainer-body"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          margin: "1rem 0 0 1rem",
        }}
      >
        {content}
      </Box>
    </Box>
  );
};

export default AdminProductManagement;
