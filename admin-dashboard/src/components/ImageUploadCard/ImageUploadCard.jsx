import React, { useState } from "react";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/system";
import ice_cream from "../../assets/ice_cream.jpg";
const Img = styled("img")({
  width: "100%",
  height: "256px",
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

const Input = styled("input")({
  display: "none",
});

const styles = {
  root: {
    width: 500,
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
  },
};

const ImageUploadCard = () => {
  const [mainState, setMainState] = useState("initial");
  const [selectedFile, setSelectedFile] = useState(ice_cream);

  const handleUploadClick = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = function (e) {
      setSelectedFile(reader.result);
    };

    reader.readAsDataURL(file);

    setMainState("uploaded");
  };

  const renderInitialState = () => (
    <Grid container direction="column" alignItems="center">
      <Grid item>
        <Img src={selectedFile} />
      </Grid>
      <label htmlFor="contained-button-file">
        <Button variant="contained" component="span">
          Select Image
          <Input
            accept="image/*"
            id="contained-button-file"
            multiple
            type="file"
            onChange={handleUploadClick}
          />
        </Button>
      </label>
    </Grid>
  );

  const renderUploadedState = () => (
    <Grid container direction="column" alignItems="center">
      <Grid item>
        <Img src={selectedFile} />
      </Grid>
      <label htmlFor="contained-button-file">
        <Button variant="contained" component="span">
          Select Image
          <Input
            accept="image/*"
            id="contained-button-file"
            multiple
            type="file"
            onChange={handleUploadClick}
          />
        </Button>
      </label>
    </Grid>
  );

  return (
    <div style={styles.root}>
      <Card>
        {(mainState === "initial" && renderInitialState()) ||
          (mainState === "uploaded" && renderUploadedState())}
        {console.log(mainState, " | ", selectedFile)}
      </Card>
    </div>
  );
};

export default ImageUploadCard;
