import React from 'react'
import {
    LightModeOutlined,
    DarkModeOutlined,
    Menu as MenuIcon,
    Search,
    SettingsOutlined,
    ArrowDropDownCircleOutlined,
    ShoppingCartOutlined
} from "@mui/icons-material"
import {
    AppBar,
    Button,
    Box,
    Typography,
    IconButton,
    InputBase,
    Toolbar,
    Menu,
    MenuItem,
    useTheme,
    Badge
} from "@mui/material"
import {useDispatch, useSelector} from "react-redux"
import {setMode} from "../../store/slices/themeSlice"
import {setIsCartOpen} from "../../store/slices/cartSlice";

const TopBar = ({isSidebarOpen,setIsSideBarOpen}) => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart.cart);

  return (
    <AppBar sx={{
        position: "static",
        backgroundColor: "topBar.main"
    }}>
        <Toolbar sx={{
            justifyContent: "space-between"
        }}>
            {/* Left side */}
            <Box sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems:"center"
            }}>
                <IconButton onClick={() => setIsSideBarOpen(!isSidebarOpen)}>
                    <MenuIcon />
                </IconButton>
                <Box sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems:"center"
                }}>
                    <InputBase placeholder='Search...' />
                    <IconButton>
                        <Search />
                    </IconButton>
                </Box>
            </Box>

            {/* Right side */}
            <Box
                sx={{
                    display: "flex"
                }}
            >
                <IconButton onClick={() => {dispatch(setMode())}} >
                    {
                        theme.palette.mode === "dark" ? <DarkModeOutlined /> : <LightModeOutlined />
                    }
                </IconButton>
                <Badge
                    badgeContent={cart.length}
                    color='error'
                    invisible={cart.length === 0}
                >
                    <IconButton onClick={() => {
                        dispatch(setIsCartOpen());
                    }}>
                        <ShoppingCartOutlined />
                    </IconButton>
                </Badge>
                <IconButton>
                    <SettingsOutlined />
                </IconButton>
            </Box>
        </Toolbar>
    </AppBar>
  )
}

export default TopBar