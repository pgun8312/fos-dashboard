import { Box, Paper } from "@mui/material";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <Box
      sx={{
        // width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      <Paper
        elevation={12}
        square={false}
        sx={{
          width: "90vw",
          height: "90vh",
          marginTop: "1rem",
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: "50%",
            height: "90%",
            // overflowY: "auto",
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1551963831-b3b1ca40c98e"
            alt="Login image"
            loading="lazy"
            style={{
              width: "100%",
              height: "100%",
            }}
          />
        </Box>
        <Box
          sx={{
            width: "40%",
            height: "90%",
            display: "flex",
            flexDirection: "column",
            overflowY: "auto",
          }}
        >
          <Outlet />
        </Box>
      </Paper>
    </Box>
  );
};

export default AuthLayout;
