import React from "react";
import {
  LightModeOutlined,
  DarkModeOutlined,
  Menu as MenuIcon,
  Search,
  SettingsOutlined,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import {
  AppBar,
  Box,
  IconButton,
  InputBase,
  Toolbar,
  useTheme,
  Badge,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setIsCartOpen } from "../../store/slices/cartSlice";
import { useGlobalStore } from "../../store/store";

const TopBar = ({ isSidebarOpen, setIsSideBarOpen, isCartShow }) => {
  const theme = useTheme();
  const { setMode } = useGlobalStore();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.globalCart.cart);

  return (
    <AppBar
      sx={{
        position: "static",
        backgroundColor: "topBar.main",
      }}
    >
      <Toolbar
        sx={{
          justifyContent: "space-between",
        }}
      >
        {/* Left side */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <IconButton
            data-testid="menu-icon-button"
            onClick={() => setIsSideBarOpen(!isSidebarOpen)}
          >
            <MenuIcon />
          </IconButton>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <InputBase placeholder="Search..." />
            <IconButton>
              <Search />
            </IconButton>
          </Box>
        </Box>

        {/* Right side */}
        <Box
          sx={{
            display: "flex",
          }}
        >
          <IconButton
            onClick={() => {
              dispatch(setMode());
            }}
            data-testid="menu-theme-button"
          >
            {theme.palette.mode === "dark" ? (
              <DarkModeOutlined />
            ) : (
              <LightModeOutlined />
            )}
          </IconButton>
          {isCartShow && (
            <Badge
              badgeContent={cart.length}
              color="error"
              invisible={cart.length === 0}
            >
              <IconButton
                onClick={() => {
                  dispatch(setIsCartOpen());
                }}
                data-testid="menu-cart-button"
              >
                <ShoppingCartOutlined />
              </IconButton>
            </Badge>
          )}
          <IconButton>
            <SettingsOutlined />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
