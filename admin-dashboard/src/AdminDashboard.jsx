import { useSelector } from "react-redux";
import { OrderPieChart } from "./components/PieChart/OrderPieChart";
import { Box, Typography, useTheme } from "@mui/material";
import { useGetOrdersQuery, useGetProductsQuery } from "./store/apis/adminApi";
import InternalServerError from "./pages/InternalServerError";
import { HashLoader } from "react-spinners";
import { ProductPieChart } from "./components/PieChart/ProductPieChart";

const AdminDashboard = () => {
  const theme = useTheme();
  const { data, isLoading, isError, error, isSuccess, isFetching } =
    useGetOrdersQuery();
  const {
    data: products,
    isSuccess: isProductsSuccess,
    isLoading: isProductLoading,
    isError: isProductError,
  } = useGetProductsQuery();

  let content;

  if (isLoading || isProductLoading) {
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

  if (isSuccess && isProductsSuccess) {
    content = (
      <Box>
        <Box
          sx={{
            margin: "1rem 0 0 1rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h2" color="primary.main">
            Welcome Back!
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: "1rem",
            margin: "1rem 0 0 1rem",
          }}
        >
          <Box
            className="left-container"
            sx={{
              height: "60vh",
              border: `1px solid ${theme.palette.primary.main}`,
              padding: "2rem",
            }}
          >
            <Typography variant="h3" color="primary.main">
              Order Overview
            </Typography>
            <OrderPieChart orders={data} />
          </Box>
          <Box
            className="right-container"
            sx={{
              height: "60vh",
              border: `1px solid ${theme.palette.primary.main}`,
              padding: "2rem",
            }}
          >
            <Typography variant="h3" color="primary.main">
              Product Category Overview
            </Typography>
            <ProductPieChart products={products} />
          </Box>
        </Box>
      </Box>
    );
  }

  if (isError || isProductError) {
    content = <InternalServerError />;
  }

  return <div>{content}</div>;
};

export default AdminDashboard;
