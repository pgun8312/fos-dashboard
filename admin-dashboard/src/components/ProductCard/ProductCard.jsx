import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Box,
  IconButton,
  SwipeableDrawer,
  Button,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  Add,
  AddShoppingCartOutlined,
  Remove,
  RemoveShoppingCartOutlined,
} from "@mui/icons-material";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MenuIcon from "@mui/icons-material/Menu";
import { useGlobalStore } from "shell_frontend/store";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <Card
      sx={{
        maxWidth: "345px",
      }}
      key={product.id}
      style={{
        position: "relative",
      }}
    >
      <Link to={`/admin/products/${product.id}`}>
        <CardMedia
          sx={{
            height: "140px",
          }}
          image={product.image}
          title={product.name}
        />
      </Link>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {product.name}
        </Typography>
        <Typography variant="body">{product.description}</Typography>

        {product.remainingQuantity < 10 ? (
          <Typography color="red">
            remaining:{product.remainingQuantity}
          </Typography>
        ) : (
          <Typography color="primary.main">
            remaining: {product.remainingQuantity}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default ProductCard;
