import {
  ChevronLeft,
  ChevronRightOutlined,
  LogoutOutlined,
} from "@mui/icons-material";
import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAuthUser, setToken } from "../../store/slices/authUserSlice";

const SideBar = ({
  isSidebarOpen,
  drawerWidth,
  setIsSideBarOpen,
  isMobile,
  navItems,
}) => {
  const [activeTab, setActiveTab] = useState("");
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    console.log(pathname);
    setActiveTab(pathname);
  }, [pathname]);

  return (
    <Box component="nav">
      {isSidebarOpen && (
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
              width: drawerWidth,
            },
          }}
        >
          <Box
            sx={{
              width: "100%",
            }}
          >
            <Box
              sx={{
                margin: "1.5rem 2rem 2rem 3 rem",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "0.5rem 0.5rem 0 0.5rem",
                    margin: "2rem 0 0 2rem",
                  }}
                >
                  <Typography variant="h4" fontWeight="bold">
                    FOS
                  </Typography>
                  <Typography variant="h6">Food at your fingertips</Typography>
                </Box>
                {isMobile && (
                  <IconButton onClick={() => setIsSideBarOpen(!isSidebarOpen)}>
                    <ChevronLeft />
                  </IconButton>
                )}
              </Box>
            </Box>
          </Box>
          <List>
            {navItems.map(({ text, icon, path }, id) => {
              /* section names */
              if (!icon) {
                return (
                  <Typography
                    key={text}
                    variant="h5"
                    sx={{
                      ml: "2rem",
                    }}
                  >
                    {text}
                  </Typography>
                );
              }

              return (
                <ListItem
                  key={text}
                  disablePadding
                  sx={{
                    border: "1px solid transparent",
                    "&:hover": {
                      border: "1px solid",
                      borderColor: "sideBar.main",
                      color: "sideBar.main",
                    },
                  }}
                >
                  <ListItemButton
                    data-testid={`sidebar-nav-${id}`}
                    onClick={() => {
                      navigate(path);
                      setActiveTab(path);
                    }}
                    sx={{
                      backgroundColor:
                        activeTab === path ? "sideBar.main" : "transparent",
                      color:
                        activeTab === path ? "sideBar.light" : "sideBar.dark",
                      "&:hover": {
                        /* inheriting the parent color when hover */
                        color: "inherit",
                      },
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        marginLeft: "2rem",
                        color:
                          activeTab === path ? "sideBar.light" : "sideBar.dark",
                        "&:hover": {
                          color: "inherit",
                        },
                      }}
                    >
                      {icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={text}
                      sx={{
                        flexGrow: 1,
                      }}
                    />
                    {activeTab === path && <ChevronRightOutlined />}
                  </ListItemButton>
                </ListItem>
              );
            })}
            {/* LOGOUT BUTTON */}
            <ListItem
              disablePadding
              sx={{
                border: "1px solid transparent",
                marginTop: "1rem",
                "&:hover": {
                  border: "1px solid",
                  borderColor: "sideBar.main",
                  color: "sideBar.main",
                },
              }}
            >
              <ListItemButton
                onClick={() => {
                  sessionStorage.clear();
                  dispatch(
                    setAuthUser({
                      id: null,
                      userSub: "",
                      userName: "",
                      name: "",
                      phone: "",
                      email: "",
                      status: "",
                      role: "",
                      createdDate: "",
                      modifiedDate: null,
                    })
                  );
                  dispatch(setToken(""));
                  navigate("/auth/signin");
                }}
                sx={{
                  backgroundColor: "transparent",
                  color: "sideBar.dark",
                  "&:hover": {
                    /* inheriting the parent color when hover */
                    color: "red",
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    marginLeft: "2rem",
                    color: "red",
                  }}
                >
                  <LogoutOutlined />
                </ListItemIcon>
                <ListItemText
                  primary="Logout"
                  sx={{
                    flexGrow: 1,
                  }}
                />
              </ListItemButton>
            </ListItem>
          </List>
        </Drawer>
      )}
    </Box>
  );
};

export default SideBar;
