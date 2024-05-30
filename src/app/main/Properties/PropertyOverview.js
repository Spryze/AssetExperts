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
    <Card sx={{ borderRadius: "10px", padding: "20px", marginBottom: "20px" }}>
    <Typography variant='h6' sx={{textTransform:"capitalize"}}>
    <span style={{fontWeight:"bold"}}> Listing Type:</span> {propertyData?.data?.property?.listing_type}
    </Typography>
  </Card>
    <Card
    className="card"
    id="overview"
    sx={{
      background: "white",
      borderRadius: "10px",
      margin: "20px 0px",
      padding: "30px",
    }}
  >
    <Typography variant="h6">Property Overview</Typography>
    <hr />
    <Typography sx={{ padding: "30px", fontSize: "16px" }}>
   
        {showMore
          ? propertyOverview
          : `${propertyOverview?.slice(0, 100)}...`}
        <button onClick={toggleShowMore} style={{ color: "orange" }}>
          {showMore ? "See Less" : "See More"}
        </button>
      
    </Typography>
  </Card>
  </>
  )
}

export default PropertyOverview