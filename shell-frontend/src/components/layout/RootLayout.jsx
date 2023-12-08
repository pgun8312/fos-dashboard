import { Outlet } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
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
