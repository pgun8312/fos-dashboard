import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import { useDispatch } from "react-redux";
const ProductCard = ({ id, productName, description, price, image }) => {
  const dispatch = useDispatch();
  return (
    // <Card
    //   sx={{
    //     maxWidth: "345px",
    //   }}
    // >
    //   <CardMedia
    //     sx={{
    //       height: "140px",
    //     }}
    //     image={image}
    //     title={productName}
    //   />
    //   <CardContent>
    //     <Typography gutterBottom variant="h5" component="div">
    //       {productName}
    //     </Typography>
    //     <Typography variant="body">{description}</Typography>
    //   </CardContent>
    //   <CardActions>
    //     <Box
    //       sx={{
    //         display: "flex",
    //         justifyContent: "space-between",
    //         alignItems: "center",
    //       }}
    //     >
    //       <Box
    //         sx={{
    //           display: "flex",
    //           alignItems: "center",
    //           border: "1px solid",
    //         }}
    //       >
    //         <IconButton
    //           onClick={() => dispatch(decreaseCount({ id: item.id }))}
    //         >
    //           <Remove />
    //         </IconButton>
    //         <Typography>{item.count}</Typography>
    //         <IconButton
    //           onClick={() => dispatch(increaseCount({ id: item.id }))}
    //         >
    //           <Add />
    //         </IconButton>
    //       </Box>
    //     </Box>
    //   </CardActions>
    // </Card>
    <div>Hi</div>
  );
};

export default ProductCard;
