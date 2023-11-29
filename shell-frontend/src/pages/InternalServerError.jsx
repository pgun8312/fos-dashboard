import { Box, Button, Paper, Typography, useTheme } from "@mui/material";
import server_error from "../assets/500_internal_server_error.jpg";
import { useNavigate } from "react-router-dom";

const InternalServerError = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        height: "100%",
        flexDirection: "column",
      }}
    >
      <Box
        className="left-container"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "50%",
          margin: "1rem 1rem 0 1rem",
          border: `1px solid ${theme.palette.primary.main}`,
        }}
      >
        <Typography variant="h1" color="red">
          ERROR!
        </Typography>
        <Typography
          sx={{
            margin: "1rem 0",
          }}
        >
          INTERNAL SERVER ERROR
        </Typography>
        <Typography>PLEASE TRY AGAIN LATER</Typography>
        <Button
          variant="contained"
          sx={{
            margin: "1rem 0",
          }}
          onClick={() => navigate("/")}
        >
          REFRESH PAGE
        </Button>
      </Box>
      <Paper
        elevation={2}
        sx={{
          height: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "1rem 1rem 0 1rem",
        }}
      >
        <a href="https://www.freepik.com/free-vector/500-internal-server-error-concept-illustration_7906229.htm#query=500%20internal%20server%20error&position=0&from_view=keyword&track=ais&uuid=2bfeda14-62cf-47bf-b391-017040b6b3e8">
          <img
            src={server_error}
            alt="Image by storyset on Freepik"
            width="80%"
            height="80%"
          />
        </a>
      </Paper>
    </Box>
  );
};

export default InternalServerError;
