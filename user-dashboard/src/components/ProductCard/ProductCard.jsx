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
  const dispatch = useDispatch();
  const { addToCart, removeFromCart, increaseCount, decreaseCount } =
    useGlobalStore();
  const [openExtra, setOpenExtra] = useState(false);
  const globalCart = useSelector((state) => state.globalCart);
  const productState = useSelector((state) => state.local.products);
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
      {console.log(productState)}
      <Link to={`/home/products/${product.id}`}>
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
      </CardContent>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <IconButton onClick={() => setOpenExtra(true)}>
          <MenuIcon />
        </IconButton>
      </Box>
      <div
        style={{
          position: "absolute",
          zIndex: 15,
          width: "100%",
          bottom: openExtra ? 0 : "-100%",
          height: "50%",
          backgroundColor: "#fff",
          transition: "bottom 0.5s ease",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <IconButton onClick={() => setOpenExtra(false)}>
            <MenuIcon />
          </IconButton>
        </Box>

        <CardActions
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
              onClick={() => dispatch(decreaseCount({ id: product.id }))}
            >
              <Remove />
            </IconButton>
            <Typography>
              {globalCart.cart.find((item) => item.id === product.id)?.count ||
                0}
            </Typography>
            <IconButton
              onClick={() => dispatch(increaseCount({ id: product.id }))}
            >
              <Add />
            </IconButton>
          </Box>
          <IconButton
            onClick={() => dispatch(addToCart({ item: product }))}
            color="primary"
          >
            <AddShoppingCartOutlined />
          </IconButton>

          <IconButton
            onClick={() => dispatch(removeFromCart({ id: product.id }))}
            color="error"
          >
            <RemoveShoppingCartOutlined />
          </IconButton>
          <Typography fontWeight="bold">${product.price}</Typography>
        </CardActions>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {product.remainingQuantity < 10 ? (
            <Typography color="red">
              remaining:{product.remainingQuantity}
            </Typography>
          ) : (
            <Typography color="primary.main">
              remaining: {product.remainingQuantity}
            </Typography>
          )}
        </Box>
      </div>
    </Card>
  );
};

export default ProductCard;
