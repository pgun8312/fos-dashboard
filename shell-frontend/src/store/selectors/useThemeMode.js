import { createTheme } from "@mui/material";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { themeSetting } from "../../utils/themeSetting";

const useThemeMode = () => {
  //to select the state from the redux store use 'useSelector'
  const themeMode= useSelector((state) => state.theme.mode);//selecting current state of the color mode
  return useMemo(() => createTheme(themeSetting(themeMode)), [themeMode])
};

export default useThemeMode;
