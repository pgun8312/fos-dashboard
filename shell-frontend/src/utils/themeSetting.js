import { palette } from "./colors";
//MUI theme setting
export const themeSetting = (mode) => {
  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            primary: {
              ...palette.dark.primary,
              main: palette.dark.primary[500],
              dark: palette.dark.primary[900],
              light: palette.dark.primary[100],
            },
            background: {
              default: palette.dark.secondary[800],
            },
            topBar: {
              main: palette.dark.secondary[800],
            },
            sideBar: {
              background: palette.dark.secondary[900],
              main: palette.dark.primary[500],
              light: palette.dark.secondary[900],
              dark: palette.dark.secondary[100],
            },
          }
        : {
            //for the light theme
            primary: {
              ...palette.light.primary,
              main: palette.light.primary[500],
              dark: palette.light.primary[100],
              light: palette.light.primary[900],
            },
            secondary: {
              ...palette.light.secondary,
              main: palette.light.secondary[500],
              dark: palette.light.secondary[900],
              light: palette.light.secondary[100],
            },
            background: {
              default: palette.light.secondary[200],
            },
            topBar: {
              main: palette.light.secondary[200],
            },
            sideBar: {
              background: palette.light.secondary[100],
              main: palette.light.primary[500],
              light: palette.dark.secondary[100],
              dark: palette.dark.secondary[900],
            },
          }),
    },
    typography: {
      h6: {
        fontSize: "1rem",
      },
    },
  };
};
