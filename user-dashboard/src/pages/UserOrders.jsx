import { Visibility } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { BeatLoader, HashLoader } from "react-spinners";
import OrderDetailsModalContent from "../components/Modal/OrderDetailsModalContent";
import {
  useGetOrderByIdQuery,
  useGetUserOrderQuery,
} from "../store/apis/userApi";

function createData({
  id,
  orderedDate,
  deliveredDate,
  orderStatus,
  totalAmount,
}) {
  return { id, orderedDate, deliveredDate, orderStatus, totalAmount };
}

const UserOrders = () => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  const authUser = useSelector((state) => state.authUser.authUser);
  const { id } = authUser;
  const { data, isSuccess, isLoading, isError, error } =
    useGetUserOrderQuery(id);

  /* FOR HANDLING SELECTED ORDER DETAILS */
  const {
    data: orderDetails,
    isSuccess: isOrderDetailsSuccess,
    isError: isOrderDetailsError,
    isLoading: isOrderDetailsLoading,
    error: OrderDetailsError,
    isFetching: isOrderDetailsFetching,
  } = useGetOrderByIdQuery(selectedOrderId);

  let orderDetailsModalContent;

  if (
    isOrderDetailsLoading ||
    (isOrderDetailsSuccess && isOrderDetailsFetching)
  ) {
    orderDetailsModalContent = (
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <BeatLoader
          loading={true}
          color="#36d7b7"
          speedMultiplier={2}
          style={{ display: "block", marginBottom: "8px" }}
        />
      </Box>
    );
  }

  if (isOrderDetailsSuccess && !isOrderDetailsFetching) {
    orderDetailsModalContent = (
      <OrderDetailsModalContent orderDetails={orderDetails} />
    );
  }
  if (isOrderDetailsError) {
    orderDetailsModalContent = (
      <div>
        Error: {OrderDetailsError.message}
        {console.log(error)}
      </div>
    );
  }

  const handleSelectedOrderDetails = (orderId) => {
    setSelectedOrderId(orderId);
    setOpenModal(true);
  };

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
    content = <div>Error: {console.log(error)}</div>;
  }

  if (isSuccess) {
    //sorting rows
    const sortedData = [...data].sort((a, b) => b.id - a.id);
    //convert order Details to Rows
    const rows = sortedData?.map((orderItem) => createData(orderItem));
    content = (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Order</TableCell>
              <TableCell align="right">Ordered Date</TableCell>
              <TableCell align="right">Delivered Date</TableCell>
              <TableCell align="right">Fullfillment status</TableCell>
              <TableCell align="right">Information</TableCell>
              <TableCell align="right">Total ($)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows?.map((row) => (
              <TableRow
                key={row.orderedDate}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  #{row.id}
                </TableCell>
                <TableCell align="right">{row.orderedDate}</TableCell>
                <TableCell align="right">{row.deliveredDate ?? "-"}</TableCell>
                <TableCell align="right">{row.orderStatus}</TableCell>
                <TableCell align="right">
                  {
                    <IconButton
                      onClick={() => handleSelectedOrderDetails(row.id)}
                    >
                      <Visibility />
                    </IconButton>
                  }
                </TableCell>
                <TableCell align="right">{row.totalAmount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        margin: "1rem 1rem 0 1rem",
      }}
    >
      <Box
        className="Header"
        sx={{
          padding: "1rem 0",
        }}
      >
        <Typography variant="h2">My Orders</Typography>
      </Box>
      <Box className="body">
        {content}
        {/* MODAL FOR ORDER DETAILS */}
        <Dialog
          open={openModal}
          onClose={() => setOpenModal(false)}
          aria-labelledby="scroll-dialog-title"
          aria-describedby="scroll-dialog-description"
        >
          <DialogContent>{orderDetailsModalContent}</DialogContent>
          <DialogActions
            sx={{
              display: "flex",
            }}
          >
            <Button
              fullWidth
              onClick={() => {
                setOpenModal(false);
              }}
            >
              CLOSE
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export default UserOrders;
