import { useTheme } from '@emotion/react'
import { Anchor,ChevronLeft, ChevronRightOutlined, HomeOutlined, LocalMallOutlined, ManageAccountsOutlined, ShoppingBagOutlined } from '@mui/icons-material'
import { Box, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import useAuthUser from '../../store/selectors/useAuthUser'
import { useLocation, useNavigate } from 'react-router-dom'

const userNavItems = [
  {
    text: "Dashboard",
    path: "/user",
    icon: <HomeOutlined />
  },
  {
    text: "Products",
    icon: null
  },
  {
    text: "Explore Products",
    path: "/user/products",
    icon: <ShoppingBagOutlined />
  },
  {
    text: "Orders",
    icon: null
  },
  {
    text: "My Orders",
    path: "/user/orders",
    icon: <LocalMallOutlined />
  }
]

const GuestNavItems = [
  {
    text: "Dashboard",
    path: "/home",
    icon: <HomeOutlined />
  },
  {
    text: "Products",
    icon: null
  },
  {
    text: "Explore Products",
    path: "/user/products",
    icon: <ShoppingBagOutlined />
  },
  {
    text: "Orders",
    icon: null
  },
  {
    text: "My Orders",
    path: "/auth/signup",
    icon: <LocalMallOutlined />
  }
]

const adminNavItems = [
  {
    text: "Dashboard",
    path: "/admin",
    icon: <HomeOutlined />
  },
  {
    text: "Products",
    icon: null
  },
  {
    text: "All Products",
    path: "/admin/products",
    icon: <ShoppingBagOutlined />
  },
  {
    text: "Orders",
    icon: null
  },
  {
    text: "All Orders",
    path: "/admin/orders",
    icon: <LocalMallOutlined />
  },
  {
    text: "Users",
    icon: null
  },
  {
    text: "Users Management",
    path: "/admin/users",
    icon: <ManageAccountsOutlined />
  }
]

const SideBar = ({
  isSidebarOpen,
  drawerWidth,
  setIsSideBarOpen,
  isMobile
}) => {
  const [activeTab, setActiveTab] = useState("");
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const authUser = useAuthUser();
  const navItems = authUser.role === "User" ? userNavItems : authUser.role === "Admin" ? adminNavItems : GuestNavItems ;

  useEffect(() => {
    console.log(pathname)
    setActiveTab(pathname);
  }, [pathname])

  return (
    <Box component="nav">
      {isSidebarOpen && 
        <Drawer 
          open={isSidebarOpen}
          onClose={() => setIsSideBarOpen(false)}
          variant="persistent"
          anchor="left"
          sx={{
            width: drawerWidth,
            "& .MuiDrawer-paper": {
              color: "primary.main",
              backgroundColor: "sideBar.background",
              boxSizing: "border-box",
              borderWidth: isMobile ? "2px" : 0,
              width: drawerWidth
            }
          }}
        >
          <Box sx={{
            width: "100%"
          }}>
            <Box sx={{
              margin: "1.5rem 2rem 2rem 3 rem"
            }}>
              <Box sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}>
                <Box sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "0.5rem 0.5rem 0 0.5rem",
                  margin: "2rem 0 0 2rem"
                }}>
                  <Typography variant='h4' fontWeight="bold">
                    FOS
                  </Typography>
                  <Typography variant='h6'>
                    Food at your fingertips
                  </Typography>
                </Box>
                {
                  isMobile && (
                    <IconButton onClick={() => setIsSideBarOpen(!isSidebarOpen)}>
                      <ChevronLeft />
                    </IconButton>
                  )
                }
              </Box>
            </Box>
          </Box>
          <List>
                {
                  navItems.map(({ text , icon, path}) => {
                    /* section names */
                    if(!icon) {
                      return (
                        <Typography key={text} variant='h5' sx={{
                          ml: "2rem",
                        }}>
                          {text}
                        </Typography>
                      )
                    }

                    return(
                      <ListItem key={text} disablePadding
                        sx={{
                          border: "1px solid transparent",
                          "&:hover": {
                            border: "1px solid",
                            borderColor: "sideBar.main",
                            color: "sideBar.main"
                          }
                        }}
                      >
                        <ListItemButton
                        onClick={ () => {
                          navigate(path);
                          setActiveTab(path);
                        }}
                        sx={{
                          backgroundColor: 
                            activeTab === path ? "sideBar.main" : "transparent",
                          color:
                            activeTab === path ? "sideBar.light" : "sideBar.dark",
                          "&:hover" : { /* inheriting the parent color when hover */
                            color: "inherit",
                          }
                        }}>
                          <ListItemIcon sx={{
                            marginLeft: "2rem",
                            color: 
                              activeTab === path ? "sideBar.light" : "sideBar.dark",
                            "&:hover" : {
                                color: "inherit",
                              }
                          }}>
                            {icon}
                          </ListItemIcon>
                          <ListItemText primary={text} sx={{
                            flexGrow: 1
                          }}/>
                            {
                              activeTab === path && (
                                <ChevronRightOutlined  />
                              )
                            }
                        </ListItemButton>
                      </ListItem>
                    )
                  })
                }
          </List>
        </Drawer>}
    </Box>
  )
}

export default SideBar