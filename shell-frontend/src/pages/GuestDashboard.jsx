import React from "react";
import Carousel from "../components/Carousel/Carousel";
import ProductCard from "../components/ProductCard/ProductCard";
import { Grid } from "@mui/material";
import ice_cream from "../assets/ice_cream.jpg";

const GuestDashboard = () => {
  const products = [
    {
      id: 1,
      name: "Margherita Pizza",
      description:
        "Classic Italian pizza with tomato sauce, fresh mozzarella, and basil leaves.",
      price: 12.99,
      image: "margherita_pizza.jpg",
      count: 1,
    },
    {
      id: 2,
      name: "Sushi Platter",
      description: "Assorted sushi rolls with fresh fish, rice, and seaweed.",
      price: 25.99,
      image: "sushi_platter.jpg",
      count: 1,
    },
    {
      id: 3,
      name: "Chicken Tandoori",
      description:
        "Marinated and grilled chicken pieces with Indian spices and yogurt.",
      price: 15.99,
      image: "chicken_tandoori.jpg",
      count: 1,
    },
    {
      id: 4,
      name: "Mediterranean Salad",
      description:
        "Fresh salad with mixed greens, olives, feta cheese, and balsamic vinaigrette.",
      price: 9.99,
      image: "mediterranean_salad.jpg",
      count: 1,
    },
  ];

  return (
    <div>
      <Carousel />

      <Grid
        container
        spacing={2}
        sx={{
          margin: "2rem 0",
        }}
      >
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <ProductCard
              product={{
                ...product,
                image: ice_cream,
              }}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default GuestDashboard;
