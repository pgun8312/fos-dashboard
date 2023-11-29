import React from "react";
import { Link, useParams } from "react-router-dom";
import { useGetProductByIdQuery } from "../store/apis/adminApi";
import { Box, Breadcrumbs, Typography, useTheme } from "@mui/material";
import { HashLoader } from "react-spinners";
import ice_cream from "../assets/ice_cream.jpg";
import { Grain, Home, Whatshot } from "@mui/icons-material";

const AdminProductManagement = () => {
  const { id } = useParams();
  const theme = useTheme();

  const {
    data: fetchedProduct,
    isLoading,
    isError,
    isSuccess,
    isFetching,
  } = useGetProductByIdQuery(id);

  let content;

  if (isLoading || isFetching) {
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
    content = <div>Error: {isError.message}</div>;
  }

  if (isSuccess && !isFetching) {
    content = (
      <>
        <main
          style={{
            display: "flex",
            gap: "1rem",
            marginTop: "1rem",
            justifyContent: "space-between",
            alignContent: "space-around",
          }}
        >
          <Box
            className="left-side-container"
            sx={{
              display: "flex",
              flex: 1,
              minWidth: "40vh",
            }}
          >
            <img src={ice_cream} width="90%" />
          </Box>
          <Box
            className="right-side-container"
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "40vh",
              gap: "1rem",
              marginRight: "1rem",
            }}
          ></Box>
        </main>
      </>
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
      <header
        className="subcontainer-breadcrumb"
        style={{
          margin: "1rem 0 0 1rem",
        }}
      >
        <Breadcrumbs aria-label="breadcrumb">
          <Link
            underline="hover"
            sx={{ display: "flex", alignItems: "center" }}
            color="inherit"
            to="/admin"
          >
            <Home sx={{ mr: 0.5 }} fontSize="inherit" />
            MUI
          </Link>
          <Link
            underline="hover"
            sx={{ display: "flex", alignItems: "center" }}
            color="inherit"
            to="/admin/products"
          >
            <Whatshot sx={{ mr: 0.5 }} fontSize="inherit" />
            Products
          </Link>
          <Typography
            sx={{ display: "flex", alignItems: "center" }}
            color="text.primary"
          >
            <Grain sx={{ mr: 0.5 }} fontSize="inherit" />
            Product_Management
          </Typography>
        </Breadcrumbs>
      </header>
      <Box
        className="subcontainer-body"
        sx={{
          margin: "1rem",
        }}
      >
        {content}
      </Box>
    </Box>
  );
};

export default AdminProductManagement;
