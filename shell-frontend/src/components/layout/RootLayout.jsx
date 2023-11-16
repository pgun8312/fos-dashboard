import { Outlet } from "react-router-dom";
import { ContextProvider } from "../../utils/ContextProvider";
import { Provider, useSelector } from "react-redux";
import store, {
  StoreProvider,
} from "shell_frontend/store"; /* NEED TO PROVIDE GLOBAL STORE TO NOT THE LOCAL IMPORT */
import { ThemeProvider, CssBaseline, createTheme } from "@mui/material";
import { useMemo } from "react";
import { themeSetting } from "../../utils/themeSetting";
import useThemeMode from "../../store/selectors/useThemeMode";
const RootLayout = () => {
  //returning the current theme state
  const theme = useThemeMode();
  //creating the color mode
  // const theme = useMemo(() => createTheme(themeSetting(themeMode)), [themeMode])
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Outlet />
    </ThemeProvider>
  );
};

export default RootLayout;
