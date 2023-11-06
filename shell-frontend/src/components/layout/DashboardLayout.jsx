import { Box, useMediaQuery } from '@mui/material'
import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import SideBar from "../SideBar/SideBar"
import TopBar from '../TopBar/TopBar'

const DashboardLayout = () => {
  const isMobile = useMediaQuery("(max-width: 600px");
  const [isSidebarOpen, setIsSideBarOpen] = useState(true);

  return (
    <Box sx={{
      display: isMobile ? "block" : "flex",
      width: "100%",
      height: "100%"
    }}>
      <SideBar
        isSidebarOpen={isSidebarOpen}
        setIsSideBarOpen={setIsSideBarOpen}
        drawerWidth="250px"
        isMobile={isMobile}
      />
      
      <Box sx={{
        flexGrow: 1
      }}>
        <TopBar 
          isSidebarOpen={isSidebarOpen}
          setIsSideBarOpen={setIsSideBarOpen}
        />
        <Outlet />
      </Box>

    </Box>
  )
}

export default DashboardLayout