import React, { useState, useEffect } from "react";
import { CardMedia, Box, IconButton } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { selectProperties } from "../PropertySlice1";

const PropertyCarousel = () => {
  const propertydata = useSelector(selectProperties);
  // console.log("propertydata",propertydata)
  const images = propertydata?.images || []; 

  const [currentSlide, setCurrentSlide] = useState(0);
console.log("hii")
  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prevSlide) => (prevSlide - 1 + images.length) % images.length
    );
  };

  useEffect(() => {
    if (images.length > 1) {
      const interval = setInterval(() => {
        nextSlide();
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [images]); 

  if (images.length === 0) {
    return null;
  }

  return (
    <div style={{ position: "relative", marginBottom: "40px" }}>
      <Box display="flex" justifyContent="center">
        <CardMedia
          component="img"
          image={images[currentSlide]}
          alt="Activity Image"
          style={{ marginTop: "16px", width: "1000px", height: "400px" }}
        />
      </Box>
      {images.length > 1 && (
        <>
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
        </>
      )}
    </div>
  );
};

export default PropertyCarousel;
