import React, { useRef, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectProperties } from "./PropertySlice1";
import { Card, CardContent, Typography, IconButton } from "@mui/material";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import DegaultImg from "src/assets/Default/DegaultImg.gif"


const Recentlyadded = () => {
  const propertyData = useSelector(selectProperties);
  const dispatch = useDispatch();
  const scrollContainerRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  useEffect(() => {
    startAutoScroll();
    return () => {
      stopAutoScroll();
    };
  }, []);

  const checkScroll = () => {
    if (scrollContainerRef?.current) {
      const container = scrollContainerRef.current;
      setShowLeftArrow(container?.scrollLeft > 0);
      setShowRightArrow(
        container?.scrollLeft < container?.scrollWidth - container?.clientWidth
      );
    }
  };

  const startAutoScroll = () => {
    scrollContainerRef?.current?.addEventListener("scroll", checkScroll);
  };

  const stopAutoScroll = () => {
    scrollContainerRef?.current?.removeEventListener("scroll", checkScroll);
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -310,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 310,
        behavior: "smooth",
      });
    }
  };

  const handleClick = (propertyId) => {
    const newWindow = window.open(`/property/${propertyId}`, "_blank");
    if (newWindow) {
      newWindow.focus();
    } else {
      console.error("Unable to open new window/tab");
    }
  };

  return (
    <div
      style={{ position: "relative", overflowX: "hidden", margin: "10px 0px" }}
      onMouseEnter={stopAutoScroll}
      onMouseLeave={startAutoScroll}
    >
      <Typography variant="h6">Recently Added</Typography>
      <hr style={{ margin: "10px 0px" }} />
      {showLeftArrow && (
        <IconButton
          style={{
            position: "absolute",
            left: 0,
            top: "50%",
            transform: "translateY(-50%)",
            background: "white",
          }}
          onClick={scrollLeft}
        >
          <NavigateBeforeIcon />
        </IconButton>
      )}
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
      >
        {propertyData?.recent_properties?.map((item, index) => (
          <Card
            key={index}
            onClick={() => handleClick(item.property_id)}
            style={{
              flex: "0 0 auto",
              height: "auto",
              width: "300px",
              cursor: "pointer",
              padding: "0px",
              borderRadius: "5px",
            }}
          >
            <CardContent sx={{padding:"0px"}}>
              <img
                src={item?.prop_images[0] || DegaultImg}
                alt="Property"
                style={{ width: "100%", height: "200px", objectFit: "cover" }}
                
              />
              <Typography
                sx={{
                  fontSize: "15px",
                  textTransform: "capitalize",
                  fontWeight: "500",
                  margin: "10px 0px 0px 10px",
                  fontWeight: "600"
                }}
              >{`${item?.listing_type}ing, ${item?.area}${item?.unit}s ${item?.prop_type}`}</Typography>
              <div style={{ display: "flex", marginTop: "10px" }}>
                <LocationOnIcon sx={{ color: "orange" }} />
                <Typography sx={{ fontSize: "14px" }}>
                  {`${item?.landmark}, ${item?.district}`}
                </Typography>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      {showRightArrow && (
        <IconButton
          style={{
            position: "absolute",
            right: 0,
            top: "50%",
            transform: "translateY(-50%)",
            background: "white",
          }}
          onClick={scrollRight}
        >
          <NavigateNextIcon />
        </IconButton>
      )}
    </div>
  );
};

export default Recentlyadded;
