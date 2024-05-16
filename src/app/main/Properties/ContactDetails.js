
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
import ContactSeller from "./property-components/ContactSeller";

const ContactDetails = () => {
    
  const propertyData = useSelector(selectProperties);
  const makeCall = () => {
    
    const telUrl = `tel:${propertyData?.data?.property?.med_num1}`;
    window.open(telUrl);
  };
  return (
    <>
    <Card sx={{ borderRadius: "10px", padding: "20px",marginBottom:"20px" }}>
            <Typography variant="h6"> Mediator Details</Typography>
            <div sx={{ display: "flex", fontSize: "18px" }}>
              <Typography
                style={{ margin: "10px 10px 0 0", textTransform: "capitalize" }}
              >
                {propertyData?.data?.property?.med_name}:
              </Typography>
              <Typography style={{ margin: "10px 10px 0 0" }}>
                {propertyData?.data?.property?.med_num1}
              </Typography>
            </div>
            <Button
              sx={{
                background: "orange",
                borderRadius: "8px",
                marginTop: "20px",
              }}
              onClick={makeCall}
            >
              Make a call
            </Button>
          </Card>
          <Card>
          <ContactSeller/>
          </Card>
    </>
  )
}

export default ContactDetails