import { Box, Button, Divider, Typography } from "@mui/material";
import React from "react";

const OrderDetailsModalContent = ({ orderDetails }) => {
  const {
    id,
    orderedDate,
    deliveredDate,
    orderStatus,
    orderItems,
    totalAmount,
    userDetails,
  } = orderDetails;
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        // overflowY: "auto",
        // maxHeight: "90vh",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
        }}
      >
        <Typography variant="h4">Order Details</Typography>
        <Typography>Order ID: #{id}</Typography>
        <Typography>Ordered Date: {orderedDate}</Typography>
        <Typography>
          Delivered Date: {deliveredDate || "Not Delivered Yet"}
        </Typography>
        <Typography>Order Status: {orderStatus}</Typography>
      </Box>
      <Divider />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
        }}
      >
        <Typography variant="h5">User Details</Typography>
        <Typography>Name: {userDetails?.name}</Typography>
        <Typography>Email: {userDetails?.email}</Typography>
        <Typography>Phone: {userDetails?.phone}</Typography>
        <Typography>
          Delivery Address: {userDetails?.deliveryAddress}
        </Typography>
        <Typography>City: {userDetails?.city}</Typography>
        <Typography>Postal Code: {userDetails?.postalCode}</Typography>
      </Box>

      <Divider />

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
        }}
      >
        <Typography variant="h5">Order Items</Typography>
        {orderItems.map((item) => (
          <Box key={item.id}>
            <Typography>{item.productName}</Typography>
            <Typography>Unit Price: ${item.unitPrice}</Typography>
            <Typography>Quantity: {item.quantity}</Typography>
          </Box>
        ))}
      </Box>

      <Divider />

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
        }}
      >
        <Typography variant="h5">Total Amount</Typography>
        <Typography>${totalAmount.toFixed(2)}</Typography>
      </Box>
    </Box>
  );
};

export default OrderDetailsModalContent;
