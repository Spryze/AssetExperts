import React, { useRef, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectProperties } from "./PropertySlice1";
import { Card, CardContent, Typography, IconButton } from "@mui/material";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { fetchProperties } from "./PropertySlice1";
import { useDispatch } from "react-redux";
import Property from "./Property";

const Recomendedproperties = () => {
  const dispatch = useDispatch();
  const propertyData = useSelector(selectProperties);
  const scrollContainerRef = useRef(null);
  let scrollInterval = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const handleClick = (propertyId) => {
    const newWindow = window.open(`/property/${propertyId}`, '_blank');
    if (newWindow) {
      newWindow.focus();
    } else {
      console.error('Unable to open new window/tab');
    }
  };

  useEffect(() => {
    startAutoScroll();
    return () => {
      stopAutoScroll();
    };
  }, []);

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      setShowLeftArrow(container.scrollLeft > 0);
      setShowRightArrow(container.scrollLeft < container.scrollWidth - container.clientWidth);
    }
  };

  const startAutoScroll = () => {
    scrollInterval.current = setInterval(() => {
      scrollRight();
    }, 3000); 
  };

  const stopAutoScroll = () => {
    clearInterval(scrollInterval.current);
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -200,
        behavior: "smooth",
      });
      checkScroll();
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 200,
        behavior: "smooth",
      });
      checkScroll();
    }
  };

  return (
    <div
      data-tab-id="recomended"
      className="card"
      style={{ position: "relative", overflowX: "hidden", margin: "10px 0px" }}
      onMouseEnter={stopAutoScroll} 
      onMouseLeave={startAutoScroll}
    >
      <Typography variant="h6">
        Recomended Properties
      </Typography>
      <hr style={{margin:"10px 0px"}}/>
      <IconButton
        style={{
          position: "absolute",
          left: 0,
          top: "50%",
          transform: "translateY(-50%)",
          background: "white",
          visibility: showLeftArrow ? "visible" : "hidden",
        }}
        onClick={scrollLeft}
      >
        <NavigateBeforeIcon />
      </IconButton>
      <div
        ref={scrollContainerRef}
        style={{
          display: "flex",
          gap: "10px",
          padding: "10px",
          scrollBehavior: "smooth",
          overflowX: "hidden",
          width: "100%",
        }}
        onScroll={checkScroll}
      >
        {propertyData?.recomended_prop?.map((item, index) => (
          <Card
            key={index}
            style={{ flex: "0 0 auto", height: "auto", width: "300px",cursor:"pointer"}}
            onClick={() => handleClick(item.property_id)} 
          >
            <CardContent>
              <img
                src={item?.prop_image[0]}
                alt="Property"
                style={{ width: "100%", height: "200px", objectFit: "cover" }}
              />
              <Typography
                sx={{
                  fontSize: "20px",
                  textTransform: "capitalize",
                  marginLeft: "25px",
                  fontWeight: "500",
                  marginTop:"10px",
                }}
              >{`${item?.listing_type}ing, ${item?.area}${item?.unit}s ${item?.prop_type}`}</Typography>
              <div style={{ display: "flex", marginTop: "5px" }}>
                <LocationOnIcon sx={{ color: "orange" }} />
                <Typography sx={{ fontSize: "14px",textTransform:"capitalize" }}>
                  {}
                  {`${item?.landmark}, ${item?.district}`}
                </Typography>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <IconButton
        style={{
          position: "absolute",
          right: 0,
          top: "50%",
          transform: "translateY(-50%)",
          background: "white",
          visibility: showRightArrow ? "visible" : "hidden",
        }}
        onClick={scrollRight}
      >
        <NavigateNextIcon />
      </IconButton>
    </div>
  );
};

export default Recomendedproperties;
