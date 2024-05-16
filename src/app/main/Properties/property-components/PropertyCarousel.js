import React, { useState, useEffect } from "react";
import propertyData from "src/Properties.json";
import { CardMedia, Box, IconButton, Grid } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { selectProperties } from "../PropertySlice1";

const PropertyCarousel = () => {
  const propertydata = useSelector(selectProperties)
  const [currentSlide, setCurrentSlide] = useState(0);
  const images = propertyData.properties.images;
  // const images = propertydata?.data?.images;
  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prevSlide) => (prevSlide - 1 + images.length) % images.length
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ position: "relative", marginBottom:"40px" }}>
      <Box display="flex" justifyContent="center">
        <CardMedia
          component="img"
          image={images[currentSlide]}
          alt="Activity Image"
          style={{ marginTop: "16px", width: "1000px", height: "400px" }}
        />
      </Box>
      <Box display="flex" justifyContent="center" mt={2}>
        {images.map((image, index) => (
          <span
            key={index}
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              background: currentSlide === index ? "#000" : "#ccc",
              margin: "0 5px",
              cursor: "pointer",
            }}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </Box>
      <IconButton
        onClick={prevSlide}
        style={{ position: "absolute", top: "50%", left: "10px" }}
      >
        <ChevronLeft />
      </IconButton>
      <IconButton
        onClick={nextSlide}
        style={{ position: "absolute", top: "50%", right: "10px" }}
      >
        <ChevronRight />
      </IconButton>
      {/* <Paper
        elevation={6}
        sx={{
          width: "70%",
          height: "50px",
          display: "flex",
          justifyContent: "center",
          margin: "auto",
          marginTop: "40px",
          marginBottom:"30px",
          background: "#F5F5F5",
        }}
      >
        
        {propertyData.properties.AroundProject.map((item, index) => {
          console.log("Item:", item);
          return (
            <div key={index} style={{ display: "flex", color: "black",padding:"10px" ,borderRight:"solid black 1px"}}>
              <p style={{flex: "1"}}>{item.category} </p>
              <p style={{flex: "1"}}> {item.name}</p>
            </div>
          );
        })}
      </Paper> */}
    </div>
  );
};

export default PropertyCarousel;
