import { Link } from "react-router-dom";
import {
  Box,
  Breadcrumbs,
  Typography,
  TextField,
  CircularProgress,
  useTheme,
  MenuItem,
  Snackbar,
  Alert,
} from "@mui/material";
import { useCreateProductMutation } from "../store/apis/adminApi";
import { Grain, Home, Whatshot } from "@mui/icons-material";
import { useState } from "react";
import ImageUploadCard from "../components/ImageUploadCard/ImageUploadCard";
import CustomMainButton from "../components/CustomMainButton/CustomMainButton";

const AdminAddProduct = () => {
  const theme = useTheme();
  const [createProduct, { isLoading, isError }] = useCreateProductMutation();
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [isSnackBarOpen, setIsSnackBarOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const requestBody = {
        productName,
        description,
        price,
        image: "image_1",
        category,
        remainingQuantity: quantity,
      };
      const response = await createProduct(requestBody);
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
      alert(error?.data?.error || "Unable to Create Product!");
    }
  };

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

  return (
    <Box
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
          Product Creation Successfull!
        </Alert>
      </Snackbar>
      <header
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
            Add_Product
          </Typography>
        </Breadcrumbs>
      </header>
      <Box
        className="main"
        sx={{
          display: "flex",
          gap: "1rem",
          margin: "1rem 0 0 1rem",
        }}
      >
        <form
          onSubmit={handleSubmit}
          className="left-container"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            width: "50%",
            gap: "1rem",
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
            disabled={isLoading}
            endIcon={
              isLoading ? (
                <CircularProgress size={20} color="inherit" />
              ) : undefined
            }
          >
            Create Product
          </CustomMainButton>
        </form>
        <Box className="rigth-container">
          <ImageUploadCard />
        </Box>
      </Box>
    </Box>
  );
};

export default AdminAddProduct;
