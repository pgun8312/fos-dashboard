import { Box, Grid, Tab, Tabs, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useGetProductsQuery } from "../store/apis/adminApi";
import { HashLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard/ProductCard";
import ice_cream from "../assets/ice_cream.jpg";
import InternalServerError from "./InternalServerError";
const AdminProducts = () => {
  const navigate = useNavigate();
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
          width: "80vw",
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

  if (isSuccess && products.length === 0) {
    content = (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        No data available
      </Box>
    );
  }

  // Data is available here
  if (isSuccess && products.length > 0) {
    const filteredProducts = products.filter(
      (product) => product.category === selectedCategory
    );
    content = (
      <Box
        sx={{
          margin: "1rem 1rem 0",
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
    <Box
      className="main-container"
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
      }}
    >
      <Box
        sx={{
          margin: "1rem 0 0 1rem",
        }}
      >
        <Button
          variant="contained"
          onClick={() => navigate("/admin/addproduct")}
        >
          Add Product
        </Button>
      </Box>
      {content}
    </Box>
  );
};

export default AdminProducts;
