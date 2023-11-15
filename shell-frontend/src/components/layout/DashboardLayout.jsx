import { Box, useMediaQuery } from "@mui/material";
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../SideBar/SideBar";
import TopBar from "../TopBar/TopBar";
import Cart from "../Cart/Cart";

const DashboardLayout = ({ isCartShow = false, navItems = {} }) => {
  const isMobile = useMediaQuery("(max-width: 600px)");
  const [isSidebarOpen, setIsSideBarOpen] = useState(true);

  return (
    <Box
      sx={{
        display: isMobile ? "block" : "flex",
        width: "100%",
        height: "100%",
      }}
    >
      <SideBar
        isSidebarOpen={isSidebarOpen}
        setIsSideBarOpen={setIsSideBarOpen}
        drawerWidth="250px"
        isMobile={isMobile}
        navItems={navItems}
      />

      <Box
        sx={{
          flexGrow: 1,
        }}
      >
        <TopBar
          isSidebarOpen={isSidebarOpen}
          setIsSideBarOpen={setIsSideBarOpen}
          isCartShow={isCartShow}
        />
        <Outlet />
      </Box>
      {isCartShow && <Cart isMobile={isMobile} />}
    </Box>
  );
};

export default DashboardLayout;
