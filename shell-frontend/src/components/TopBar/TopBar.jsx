import React from 'react'
import {
    LightModeOutlined,
    DarkModeOutlined,
    Menu as MenuIcon,
    Search,
    SettingsOutlined,
    ArrowDropDownCircleOutlined
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
    useTheme
} from "@mui/material"
import {useDispatch} from "react-redux"
import {setMode} from "../../store/slices/themeSlice"

const TopBar = ({isSidebarOpen,setIsSideBarOpen}) => {
    const theme = useTheme();
    const dispatch = useDispatch();

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
                <IconButton>
                    <SettingsOutlined />
                </IconButton>
            </Box>
        </Toolbar>
    </AppBar>
  )
}

export default TopBar