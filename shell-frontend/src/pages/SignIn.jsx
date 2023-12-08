import { Box, Paper } from "@mui/material";
import Login from "../components/Login/Login";

const SignIn = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
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
        <Login />
      </Paper>
    </Box>
  );
};

export default SignIn;
