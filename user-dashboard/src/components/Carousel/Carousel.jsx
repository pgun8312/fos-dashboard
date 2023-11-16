import React, { useState } from "react";
import { motion } from "framer-motion";
import img1 from "../../assets/strawberry.jpg";
import img2 from "../../assets/eat_vegs.jpg";
import img3 from "../../assets/ice_cream.jpg";
import img4 from "../../assets/dragon_fruits.jpg";
import img5 from "../../assets/soft_drinks.jpg";
import img6 from "../../assets/rice.jpg";
import img7 from "../../assets/chicken.jpg";
import styled from "@emotion/styled";
import { Box, Button, Typography } from "@mui/material";
import { ChevronLeftOutlined, ChevronRightOutlined } from "@mui/icons-material";
import { useTheme } from "@emotion/react";

const Carousel = () => {
  const [positionIndexes, setPositionIndexes] = useState([0, 1, 2, 3, 4, 5, 6]);
  const [overlayVisibe, setOverlayVisible] = useState(false);
  const theme = useTheme();

  const handleNext = () => {
    setPositionIndexes((prev) => {
      return prev.map((index) => (index + 1) % 7);
    });
  };

  const handleBack = () => {
    setPositionIndexes((prev) => {
      return prev.map((index) => (index + 6) % 7);
    });
  };

  const images = [img1, img2, img3, img4, img5, img6, img7];
  const positions = ["center", "left", "left1", "left2", "right", "right1", "right2"];

  const imageVariants = {
    center: { x: "0%", scale: 1, zIndex: 5 },
    left1: { x: "-30%", scale: 0.8, zIndex: 4 },
    left2: { x: "-60%", scale: 0.6, zIndex: 3 },
    left: { x: "-90%", scale: 0.5, zIndex: 2 },
    right: { x: "90%", scale: 0.5, zIndex: 2 },
    right2: { x: "60%", scale: 0.6, zIndex: 3 },
    right1: { x: "30%", scale: 0.8, zIndex: 4 },
  };


  const RootContainer = styled(Box)(({theme}) => ({
    display: "flex",
    flexDirection: "column",
    padding: 16,
    borderRadius: 16,
    height: "60vh",
    margin: '2rem',
    zIndex: 1,
    backgroundColor:
        theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.4)',
    backdropFilter: 'blur(40px)',
    position: "relative"
  }))

  const MainContainer = styled(Box)(({}) => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "stretch",
    padding: 16,
    borderRadius: 16,
    height: "50vh",
    margin: '2rem',
    zIndex: 1,
    backgroundColor:
        theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.4)',
    backdropFilter: 'blur(40px)',
  }))

  const HandlerButton = styled(Button)(({theme}) => ({
    flex: "0 0 auto", /* to take a less width */
    border: "none",
    backgroundColor: "transparent",
    zIndex: 100,
    

  }))
;

  const ImageContainer = styled(Box)(({theme}) => ({
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }))

  const Overlay = styled(Box)(({theme}) => ({
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.palette.mode === "dark" ? "rgba(0, 0, 0, 0.6)" : "rgba(255, 255, 255, 0.4)",
    backdropFilter: "blur(40px)",
    opacity: overlayVisibe ? 1: 0,
    transform: "opacity 1s ease",
    zIndex: 2,
    height: "30%"
  }))

  //handing the overlay show/hide

  return (
        <RootContainer style={{
            border: "1px solid",
            borderColor: "#00ae2b"
        }}
        onMouseOver={() => {setOverlayVisible(true)}}
        onMouseOut={() => {setOverlayVisible(false)}}
        >
            <MainContainer>
                <HandlerButton onClick={handleBack} sx={{
                        "&:hover": {
                            border: "1px solid",
                            borderColor: "primary.main",
                            color: "primary.main"
                        }
                }}>
                    <ChevronLeftOutlined />
                </HandlerButton>
                <ImageContainer>
                    {
                        images.map((img,index) => {
                            return (
                                <motion.img
                                key={img}
                                src={img}
                                alt={img}
                                style={{ borderRadius: "12px", width: "40%", position: "absolute" }}
                                initial="center"
                                animate={positions[positionIndexes[index]]}
                                variants={imageVariants}
                                transition={{ duration: 0.5 }}
                            />
                            )
                        })
                    }
                </ImageContainer>
                <HandlerButton onClick={handleNext} sx={{
                        "&:hover": {
                            border: "1px solid",
                            borderColor: "primary.main",
                            color: "primary.main"
                        }
                }}>
                    <ChevronRightOutlined />
                </HandlerButton>
            </MainContainer>
        {overlayVisibe &&
            (<Overlay>
                <Typography variant="h2" color="primary.main">Explore Our Products</Typography>
            </Overlay>)
        }

        </RootContainer>
    )
};

export default Carousel;
