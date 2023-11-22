import Carousel from "./components/Carousel/Carousel";
import ProductCard from "./components/ProductCard/ProductCard";
import { Box, Grid, Tab, Tabs, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import ice_cream from "./assets/ice_cream.jpg";
import { useGetProductsQuery } from "./store/apis/userApi";
import { useEffect, useState } from "react";
import { HashLoader, MoonLoader } from "react-spinners";
import { useDispatch } from "react-redux";
import { setProducts } from "./store/slices/productSlice";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const authUser = useSelector((state) => state.authUser.authUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // useGetProductsQuery automatically caches the data, no need to check for !isSuccess
  const {
    data: products,
    isSuccess,
    isLoading,
    isError,
    error,
  } = useGetProductsQuery();

  const [categoryTabs, setCategoryTabs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    if (isSuccess) {
      dispatch(setProducts(products));
      const categories = [
        ...new Set(products.map((product) => product.category)),
      ];
      setCategoryTabs(categories);
      setSelectedCategory(categories[0]); // Select the first category initially
    }
  }, [isSuccess, products]);

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
    content = <Box>Error: {error}</Box>;
    // Handle the error
  }

  // Data is available here
  if (isSuccess) {
    const filteredProducts = products.filter(
      (product) => product.category === selectedCategory
    );
    content = (
      <Box
        sx={{
          margin: "0 1rem",
          padding: "0 1rem",
        }}
      >
        <Tabs
          value={selectedCategory}
          onChange={(event, newValue) => setSelectedCategory(newValue)}
        >
          {categoryTabs.map((category) => (
            <Tab key={category} label={category} value={category} />
          ))}
        </Tabs>
        <Typography variant="h6" gutterBottom>
          {selectedCategory} Products
        </Typography>
        <Grid
          container
          spacing={2}
          sx={{
            margin: "2rem 0",
          }}
        >
          {filteredProducts.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <ProductCard
                product={{
                  ...product,
                  image: ice_cream /* manually passing the attributes */,
                  count: 1,
                }}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  }

  return (
    <div>
      {console.log(authUser)}
      {console.log("UserDashboard: ", products)}
      <Carousel />

      {content}
    </div>
  );
};

export default UserDashboard;
