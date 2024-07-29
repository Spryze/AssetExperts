import React, { useState, useEffect } from "react";
import { CardMedia, Box, IconButton } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { selectProperties } from "../PropertySlice1";

const PropertyCarousel = () => {
  const propertydata = useSelector(selectProperties);
  const images = propertydata?.data?.images || []; 

  const [currentSlide, setCurrentSlide] = useState(0);

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
    <div style={{ position: "relative", margin: "40px 0px" }}>
      <Box>
       
        <CardMedia
          component="img"
          image={images[currentSlide]}
          alt="Activity Image"
          style={{ width: "-webkit-fill-available", height: "400px" }}
        />
         <h6
          className="small-text"
          style={{
            background: "#FFA500",
            padding: "10px 25px",
            borderRadius: "0px 10px 10px 0px",
            textAlign: "center",
            bottom:"0",
            fontSize:"20px",
            display: "inline-block",
            position:"absolute",
            textTransform:"capitalize",
            fontWeight:"600",
            
          }}
        >
          Listing Type: {propertydata?.data?.property?.listing_type === 'buy'?("Wanted"):(propertydata?.data?.property?.listing_type)}
        </h6>
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
