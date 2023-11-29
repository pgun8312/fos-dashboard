import { Box, Button, Paper, Typography, useTheme } from "@mui/material";
import page_not_found from "../assets/404_page_not_found.jpg";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
      }}
    >
      <Box
        className="left-container"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "50%",
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
          PAGE NOT FOUND
        </Typography>
        <Button
          variant="contained"
          sx={{
            margin: "1rem 0",
          }}
          onClick={() => navigate("/")}
        >
          BACK To login
        </Button>
      </Box>
      <Paper
        elevation={2}
        sx={{
          width: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "1rem 1rem 0 1rem",
        }}
      >
        <a href="https://www.freepik.com/free-vector/monster-404-error-concept-illustration_7906238.htm#query=404%20page%20not%20found&position=10&from_view=search&track=ais&uuid=4f2d7cf9-15a2-4473-95ec-ec1d47615a9e">
          <img
            src={page_not_found}
            alt="Image by storyset on Freepik"
            width="80%"
            height="80%"
          />
        </a>
      </Paper>
    </Box>
  );
};

export default NotFound;
