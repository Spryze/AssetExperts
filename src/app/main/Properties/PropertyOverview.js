import React, { useState, useEffect } from "react";
import PropertyCarousel from "./property-components/PropertyCarousel";
import { Button, CircularProgress } from "@mui/material";
import Card from "@mui/material/Card";
import Grid from "@mui/system/Unstable_Grid/Grid";
import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import Container from "@mui/material/Container";
import MorePropertyDetails from "./property-components/MorePropertyDetails";
import withReducer from "app/store/withReducer";
import reducer from "./PropertySlice1";
import { selectProperties } from "./PropertySlice1";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Amenities from "./Amenities";
import Neighboorhood from "./Neighboorhood";
import Map from "./Maplocation";
import { useDispatch } from "react-redux";
import { fetchProperties } from "./PropertySlice1";
import Recomendedproperties from "./Recomendedproperties";

const PropertyOverview = () => {
    const propertyData = useSelector(selectProperties);
   
    const [showMore, setShowMore] = useState(false);
    const propertyOverview = propertyData?.data?.property?.ad_info;
    const toggleShowMore = () => {
        setShowMore(!showMore);
      };
  return (
    <>
    
    {/* <h6 className="small-text" style={{textTransform:"capitalize"}}>
    <span style={{fontWeight:"bold",marginLeft:"20px",background:"aliceblue",padding:"25px" }}> Listing Type: {propertyData?.data?.property?.listing_type}</span>
    </h6> */}
    {/* <h6 className="small-text" style={{background:"aliceblue",padding:"25px" }}>
    Listing Type: {propertyData?.data?.property?.listing_type}
    </h6> */}

    <Card
    className="card"
    id="overview"
    sx={{
      // background: "white",
      borderRadius: "10px",
      // margin: "20px 0px",
      padding: "30px",
    }}
  >
    <Typography className="heading-text" variant="h6">Property Overview</Typography>
    <hr />
    <Typography sx={{ marginTop:"20px", fontSize: "16px" }}>
   
        {showMore
          ? propertyOverview
          : `${propertyOverview?.slice(0, 100)}...`}
        <button onClick={toggleShowMore} 
        // style={{ color: "orange" }}
        >
          {showMore ? "See Less" : "See More"}
        </button>
      
    </Typography>
    {/* {rows.map((row, rowIndex) => (
      
      <Box
        key={rowIndex}
        id={rowIndex}
        className="scrollable-section"
        sx={{ display: "flex", justifyContent: "space-around" }}
      >
        {row.map((item, index) => {
          const key = Object.keys(item)[0];
          const value = item[key];

          return (
            <div
              key={index}
              style={{
                color: "black",
                padding: "10px",
                textAlign: "left",
                margin: "20px 0px",
              }}
            >
              <div>
                <p>{key}</p>
              </div>
              <div>
                <p style={{ fontWeight: "500" }}>{value}</p>
              </div>
            </div>
          );
        })}
      </Box>
    ))} */}
    <hr />
    {/* <Button
      sx={{
        background: "orange",
        borderRadius: "8px",
        margin: "20px 10px",
      }}
    >
      Contact Builder
    </Button> */}
  </Card>
  </>
  ); 
};

export default PropertyOverview;
