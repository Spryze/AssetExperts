import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  fetchRecentTransactions,
  selectrecenttransactions,
} from "../PropertySlice1";
import Box from "@mui/material/Box";
import { useRef, useState } from "react";
import { Card, CardContent, Typography, IconButton } from "@mui/material";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Container from "@mui/material/Container";
import { useDispatch } from "react-redux";

const PropertyHome = () => {
  const dispatch = useDispatch();
  const buyCarouselRef = useRef(null); // Ref for Buyings carousel
  const sellCarouselRef = useRef(null); // Ref for Sellings carousel
  let buyScrollInterval = useRef(null);
  let sellScrollInterval = useRef(null);
  const [showBuyLeftArrow, setShowBuyLeftArrow] = useState(false);
  const [showBuyRightArrow, setShowBuyRightArrow] = useState(true);
  const [showSellLeftArrow, setShowSellLeftArrow] = useState(false);
  const [showSellRightArrow, setShowSellRightArrow] = useState(true);
  const recentTransactions = useSelector(selectrecenttransactions);

  console.log("recentTransactions", recentTransactions);
  useEffect(() => {
    dispatch(fetchRecentTransactions());
  }, []);

  useEffect(() => {
    startAutoScroll(buyScrollInterval, buyCarouselRef, setShowBuyLeftArrow, setShowBuyRightArrow);
    startAutoScroll(sellScrollInterval, sellCarouselRef, setShowSellLeftArrow, setShowSellRightArrow);

    return () => {
      stopAutoScroll(buyScrollInterval);
      stopAutoScroll(sellScrollInterval);
    };
  }, []);

  const checkScroll = (carouselRef, setShowLeftArrow, setShowRightArrow) => {
    if (carouselRef.current) {
      const container = carouselRef.current;
      setShowLeftArrow(container.scrollLeft > 0);
      setShowRightArrow(container.scrollLeft < container.scrollWidth - container.clientWidth);
    }
  };

  const startAutoScroll = (scrollInterval, carouselRef, setShowLeftArrow, setShowRightArrow) => {
    scrollInterval.current = setInterval(() => {
      scrollRight(scrollInterval, carouselRef, setShowLeftArrow, setShowRightArrow);
    }, 3000);
  };

  const stopAutoScroll = (scrollInterval) => {
    clearInterval(scrollInterval.current);
  };

  const scrollLeft = (carouselRef, setShowLeftArrow, setShowRightArrow) => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: -400,
        behavior: "smooth",
      });
      checkScroll(carouselRef, setShowLeftArrow, setShowRightArrow);
    }
  };

  const scrollRight = (scrollInterval, carouselRef, setShowLeftArrow, setShowRightArrow) => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: 400,
        behavior: "smooth",
      });
      checkScroll(carouselRef, setShowLeftArrow, setShowRightArrow);
    }
  };

  return (
    <Box sx={{ margin: "20px" }}>
      {/* Buyings Carousel */}
      <div
        style={{
          position: "relative",
          overflowX: "hidden",
          margin: "10px 0px",
        }}
        onMouseEnter={() => stopAutoScroll(buyScrollInterval)}
        onMouseLeave={() => startAutoScroll(buyScrollInterval, buyCarouselRef, setShowBuyLeftArrow, setShowBuyRightArrow)}
      >
        <Typography variant="h6">Recent Buyings</Typography>
        <hr style={{ margin: "10px 0px" }} />
        <IconButton
          style={{
            position: "absolute",
            left: 0,
            top: "50%",
            transform: "translateY(-50%)",
            background: "white",
            visibility: showBuyLeftArrow ? "visible" : "hidden",
          }}
          onClick={() => scrollLeft(buyCarouselRef, setShowBuyLeftArrow, setShowBuyRightArrow)}
        >
          <NavigateBeforeIcon />
        </IconButton>
        <div
          ref={buyCarouselRef}
          style={{
            display: "flex",
            gap: "10px",
            padding: "10px",
            scrollBehavior: "smooth",
            overflowX: "hidden",
            width: "100%",
          }}
          onScroll={() => checkScroll(buyCarouselRef, setShowBuyLeftArrow, setShowBuyRightArrow)}
        >
          {recentTransactions?.property?.buy_properties?.map((item, index) => (
            <Card
              key={index}
              sx={{
                flex: "0 0 auto",
                height: "auto",
                width: "300px",
                cursor: "pointer",
                background: "transparent",
              }}
              onClick={() => handleClick(item.property_id)}
            >
              <CardContent>
                <img
                  src={item?.prop_images[0]}
                  alt="Property"
                  style={{ width: "100%", height: "200px", objectFit: "cover" }}
                />
                <Typography
                  sx={{
                    fontSize: "20px",
                    textTransform: "capitalize",
                    marginLeft: "25px",
                    fontWeight: "500",
                    marginTop: "10px",
                  }}
                >{`${item?.listing_type}ing, ${item?.area}${item?.unit}s ${item?.prop_type}`}</Typography>
                <div style={{ display: "flex", marginTop: "5px" }}>
                  <LocationOnIcon sx={{ color: "orange" }} />
                  <Typography sx={{ fontSize: "14px" }}>
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
            visibility: showBuyRightArrow ? "visible" : "hidden",
          }}
          onClick={() => scrollRight(buyScrollInterval, buyCarouselRef, setShowBuyLeftArrow, setShowBuyRightArrow)}
        >
          <NavigateNextIcon />
        </IconButton>
      </div>

      {/* Sellings Carousel */}
      <div
        style={{
          position: "relative",
          overflowX: "hidden",
          margin: "10px 0px",
        }}
        onMouseEnter={() => stopAutoScroll(sellScrollInterval)}
        onMouseLeave={() => startAutoScroll(sellScrollInterval, sellCarouselRef, setShowSellLeftArrow, setShowSellRightArrow)}
      >
        <Typography variant="h6">Recent Sellings</Typography>
        <hr style={{ margin: "10px 0px" }} />
        <IconButton
          style={{
            position: "absolute",
            left: 0,
            top: "50%",
            transform: "translateY(-50%)",
            background: "white",
            visibility: showSellLeftArrow ? "visible" : "hidden",
          }}
          onClick={() => scrollLeft(sellCarouselRef, setShowSellLeftArrow, setShowSellRightArrow)}
        >
          <NavigateBeforeIcon />
        </IconButton>
        <div
          ref={sellCarouselRef}
          style={{
            display: "flex",
            gap: "10px",
            padding: "10px",
            scrollBehavior: "smooth",
            overflowX: "hidden",
            width: "100%",
          }}
          onScroll={() => checkScroll(sellCarouselRef, setShowSellLeftArrow, setShowSellRightArrow)}
        >
          {recentTransactions?.property?.sell_properties?.map((item, index) => (
            <Card
              key={index}
              sx={{
                flex: "0 0 auto",
                height: "auto",
                width: "300px",
                cursor: "pointer",
                background: "transparent",
              }}
              onClick={() => handleClick(item.property_id)}
            >
              <CardContent>
                <img
                  src={item?.prop_images[0]}
                  alt="Property"
                  style={{ width: "100%", height: "200px", objectFit: "cover" }}
                />
                <Typography
                  sx={{
                    fontSize: "20px",
                    textTransform: "capitalize",
                    marginLeft: "25px",
                    fontWeight: "500",
                    marginTop: "10px",
                  }}
                >{`${item?.listing_type}ing, ${item?.area}${item?.unit}s ${item?.prop_type}`}</Typography>
                <div style={{ display: "flex", marginTop: "5px" }}>
                  <LocationOnIcon sx={{ color: "orange" }} />
                  <Typography sx={{ fontSize: "14px" }}>
                    {"Hii"}
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
            visibility: showSellRightArrow ? "visible" : "hidden",
          }}
          
          onClick={() => scrollRight(sellScrollInterval, sellCarouselRef, setShowSellLeftArrow, setShowSellRightArrow)}
        >
          <NavigateNextIcon />
        </IconButton>
      </div>
    </Box>
  );
};

export default PropertyHome;
