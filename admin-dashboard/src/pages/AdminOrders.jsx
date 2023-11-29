import React, { useState } from "react";
import {
  useCancelOrderMutation,
  useGetOrdersQuery,
  useGetOrderByIdQuery,
  useUpdateOrderStatusMutation,
} from "../store/apis/adminApi";
import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  LinearProgress,
  MenuItem,
  Popover,
  Snackbar,
  TextField,
} from "@mui/material";
import { BeatLoader, HashLoader } from "react-spinners";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import {
  AutorenewOutlined,
  CancelOutlined,
  CheckCircleOutline,
  HourglassEmptyOutlined,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { useTheme } from "@emotion/react";
import OrderDetailsModalContent from "../components/Modal/OrderDetailsModalContent";
import InternalServerError from "./InternalServerError";

const AdminOrders = () => {
  const [openModal, setOpenModal] = useState(false);
  const [isSnackBarOpen, setIsSnackBarOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const theme = useTheme();
  const { data, isLoading, isError, error, isSuccess, isFetching } =
    useGetOrdersQuery();
  const [updateOrder, { isLoading: isUpdateOrderLoading }] =
    useUpdateOrderStatusMutation();

  /* FOR HANDLING SELECTED ORDER DETAILS */
  const {
    data: orderDetails,
    isSuccess: isOrderDetailsSuccess,
    isError: isOrderDetailsError,
    isLoading: isOrderDetailsLoading,
    error: OrderDetailsError,
    isFetching: isOrderDetailsFetching,
  } = useGetOrderByIdQuery(selectedOrderId, {
    skip: !selectedOrderId || !isSuccess,
  });

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
  /* END HANDLING SELECTED ORDER DETAILS */

  const handleSelectedOrderDetails = (orderId) => {
    setSelectedOrderId(orderId);
    setOpenModal(true);
  };

  const renderStatus = (status) => {
    switch (status) {
      case "DELIVERED":
        return (
          <Chip
            icon={<CheckCircleOutline style={{ color: "green" }} />}
            label="Delivered"
          />
        );
      case "CANCELED":
        return (
          <Chip
            icon={<CancelOutlined style={{ color: "red" }} />}
            label="Canceled"
          />
        );
      case "PROCESSING":
        return (
          <Chip
            icon={<AutorenewOutlined style={{ color: "blue" }} />}
            label="Processing"
          />
        );
      default:
        return (
          <Chip icon={<HourglassEmptyOutlined style={{ color: "orange" }} />} />
        );
    }
  };
  const OrderItemsToggle = ({ rowData }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [showOrderItems, setShowOrderItems] = useState(false);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
      setShowOrderItems(!showOrderItems);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;

    return (
      <div>
        <Button onClick={handleClick}>
          {showOrderItems ? (
            <Visibility
              sx={{
                color: "green",
              }}
            />
          ) : (
            <VisibilityOff />
          )}
        </Button>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          <div
            style={{
              margin: "1rem",
              maxHeight: "20vh",
              overflowY: "auto",
            }}
          >
            {rowData.orderItems.map((item) => (
              <div key={item.id}>
                <p>Product Id: {item.productId}</p>
                <p>Product Name: {item.productName}</p>
                <p>Unit Price: {item.unitPrice}</p>
                <p>Quantity: {item.quantity}</p>
                <hr />
              </div>
            ))}
          </div>
        </Popover>
      </div>
    );
  };

  const OrderStatusManagement = ({ orderId, currentStatus }) => {
    const [newStatus, setNewStatus] = useState(currentStatus);

    const handleStatus = (event) => {
      setNewStatus(event.target.value);
    };
    const handleStatusUpdate = async () => {
      try {
        const updatedOrderStatus = await updateOrder({
          orderId,
          updatedOrder: { status: newStatus },
        });
        if (updatedOrderStatus?.error) {
          throw updatedOrderStatus.error;
        }
        setNewStatus(newStatus);
        setIsSnackBarOpen(true);
      } catch (error) {
        console.log(error);
        alert(error?.data?.error || "Unable to update the order!");
      }
    };

    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <TextField
          id="order-status-handle"
          select
          value={newStatus}
          onChange={handleStatus}
          label="orderStatus"
          helperText="Please select status"
        >
          <MenuItem key="PROCESSING" value="PROCESSING" color="blue">
            Processing
          </MenuItem>
          <MenuItem key="DELIVERED" value="DELIVERED" color="green">
            Delivered
          </MenuItem>
          <MenuItem key="CANCELED" value="CANCELED" color="red">
            Canceled
          </MenuItem>
        </TextField>
        <Button
          variant="contained"
          disableElevation
          sx={{
            color: theme.palette.secondary.light,
            "&:hover": {
              background: theme.palette.primary.main,
            },
          }}
          onClick={() => {
            handleStatusUpdate();
          }}
          disabled={isUpdateOrderLoading}
          endIcon={
            isUpdateOrderLoading ? (
              <CircularProgress size={20} color="inherit" />
            ) : undefined
          }
        >
          Update
        </Button>
      </Box>
    );
  };

  const columns = [
    { field: "id", headerName: "Order Id", hide: true },
    { field: "orderedDate", headerName: "Ordered Date", flex: 1 },
    { field: "deliveredDate", headerName: "Last Updated", flex: 1 },
    {
      field: "orderStatus",
      headerName: "Status",
      flex: 1,
      renderCell: (params) => <Box>{renderStatus(params.row.orderStatus)}</Box>,
    },
    { field: "totalAmount", headerName: "Total", flex: 1 },
    {
      field: "orderItems",
      headerName: "OrderItems",
      renderCell: (params) => <OrderItemsToggle rowData={params.row} />,
    },
    {
      field: "updateStatus",
      headerName: "Update Order Fullfilment",
      flex: 2,
      renderCell: (params) => (
        <OrderStatusManagement
          orderId={params.row.id}
          currentStatus={params.row.orderStatus}
        />
      ),
    },
    {
      field: "moreInformation",
      headerName: "More Information",
      flex: 1,
      renderCell: (params) => (
        <IconButton onClick={() => handleSelectedOrderDetails(params.row.id)}>
          <Visibility />
        </IconButton>
      ),
    },
  ];

  const sortModel = [
    {
      field: "id",
      sort: "desc",
    },
  ];

  let content;

  if (isLoading || (isSuccess && isFetching)) {
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

  if (isSuccess && !isFetching) {
    content = (
      <Box
        sx={{
          margin: "1rem 0 0 1rem",
          width: "80vw",
          height: "90vh",
        }}
      >
        <DataGrid
          rows={data}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          getRowId={(row) => row.id}
          checkboxSelection
          disableRowSelectionOnClick
          sortModel={sortModel}
        />
      </Box>
    );
  }

  return (
    <Box>
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
          successfully Updated the Order Status!
        </Alert>
      </Snackbar>
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
  );
};

export default AdminOrders;
