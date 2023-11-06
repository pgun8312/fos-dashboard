import { Outlet } from "react-router-dom"
import { ContextProvider } from "../../utils/ContextProvider"
import {Provider, useSelector} from "react-redux"
import store from "../../store/store"
import {ThemeProvider, CssBaseline, createTheme} from "@mui/material"
import { useMemo } from "react"
import { themeSetting } from "../../utils/themeSetting"
import useThemeMode from "../../store/selectors/useThemeMode"
const RootLayout = () => {

  //returning the current theme state
  const theme = useThemeMode();
  //creating the color mode
  // const theme = useMemo(() => createTheme(themeSetting(themeMode)), [themeMode])
  return (
      <ContextProvider> {/* giving access to context details */}
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Outlet />
        </ThemeProvider>
      </ContextProvider>
  )
}

export default RootLayout