import React from "react";
import { useSelector } from "react-redux";
import { selectProperties } from "../PropertySlice1";
import { Card, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { use } from "i18next";
import { fontWeight } from "@mui/system";

const MorePropertyDetails = () => {
  const propertyData = useSelector(selectProperties);
  console.log("propertyData", propertyData);
  const [propertyType, setPropertyType] = useState("");
  console.log("propertyType", propertyType);

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  useEffect(() => {
    if (propertyData?.data?.property?.p_type) {
      setPropertyType(propertyData.data.property.p_type);
    }
  }, [propertyData]);

  return (
    <>
      <Card
        id="PropertyDetails"
        className="card"
        sx={{
          borderRadius: "10px",
          padding: "30px",
          display: "flex",
          flexDirection: "column",
          margin: "20px 0px",
        }}
      >
        <Typography variant="h6">Property Details</Typography>
        <hr />
      
          <div
            style={{
              display: "flex",
              flexDirection: "column",
          
            }}
          >
            <Typography variant="p" sx={{ margin: "10px 0", fontSize: "15px" }}>
             <span style={{fontWeight:"bold"}}> Price per {propertyData?.data?.property?.unit}:</span>
              <span style={{ marginLeft: "20px" }}>
                ₹ {propertyData?.data?.property?.price}
              </span>
            </Typography>
            <Typography variant="p" sx={{ margin: "10px 0", fontSize: "15px" }}>
             <span style={{fontWeight:"bold"}}> Approoved by :</span>
              <span style={{ marginLeft: "20px" }}>
                {propertyData?.data?.property?.approved_by}
              </span>
            </Typography>
            <Typography variant="p" sx={{ margin: "10px 0", fontSize: "15px" }}>
             <span style={{fontWeight:"bold"}}> Area :</span>
              <span style={{ marginLeft: "20px" }}>
                {propertyData?.data?.property?.area}
              </span>
            </Typography>
            <Typography variant="p" sx={{ margin: "10px 0", fontSize: "15px" }}>
             <span style={{fontWeight:"bold"}}> Property Type :</span>
              <span style={{ marginLeft: "20px" }}>
                {propertyData?.data?.property?.p_type}
              </span>
            </Typography>
            <Typography variant="p" sx={{ margin: "10px 0", fontSize: "15px" }}>
             <span style={{fontWeight:"bold"}}> Dimensions :</span>
              <span style={{ marginLeft: "20px" }}>
                {propertyData?.data?.property?.dimensions}
              </span>
            </Typography>
            <Typography variant="p" sx={{ margin: "10px 0", fontSize: "15px" }}>
              <span style={{fontWeight:"bold"}}>Facing :</span>
              <span style={{ textTransform: "capitalize", marginLeft: "20px" }}>
                {propertyData?.data?.property?.direction}
              </span>
            </Typography>
            <Typography variant="p" sx={{ margin: "10px 0", fontSize: "15px" }}>
              <span style={{fontWeight:"bold"}}>Landmark :</span>
              <span style={{ textTransform: "capitalize", marginLeft: "20px" }}>
                {propertyData?.data?.property?.landmark}
              </span>
            </Typography>
            {propertyType === "Flat" && (
              <Typography
                variant="p"
                sx={{ margin: "10px 0", fontSize: "15px" }}
              >
               <span style={{fontWeight:"bold"}}> Established Year :</span>
                <span
                  style={{ textTransform: "capitalize", marginLeft: "20px" }}
                >
                  {propertyData?.data?.property?.est_year}
                </span>
              </Typography>
            )}
            {propertyType === "Flat" && (
              <Typography
                variant="p"
                sx={{ margin: "10px 0", fontSize: "15px" }}
              >
               <span style={{fontWeight:"bold"}}> Furnished :</span>
                <span
                  style={{ textTransform: "capitalize", marginLeft: "20px" }}
                >
                  {propertyData?.data?.property?.est_year}
                </span>
              </Typography>
            )}
            {propertyType === "Flat" && (
              <Typography
                variant="p"
                sx={{ margin: "10px 0", fontSize: "15px" }}
              >
                RERA Status :
                <span
                  style={{ textTransform: "capitalize", marginLeft: "20px" }}
                >
                  {propertyData?.data?.property?.est_year}
                </span>
              </Typography>
            )}
            {propertyType === "Flat" && (
              <Typography
                variant="p"
                sx={{ margin: "10px 0", fontSize: "15px" }}
              >
                Lift :
                <span
                  style={{ textTransform: "capitalize", marginLeft: "20px" }}
                >
                  {propertyData?.data?.property?.est_year}
                </span>
              </Typography>
            )}
            {propertyType === "Plot" && (
              <Typography
                variant="p"
                sx={{ margin: "10px 0", fontSize: "15px" }}
              >
                Boundry Wall :
                <span
                  style={{ textTransform: "capitalize", marginLeft: "20px" }}
                >
                  {propertyData?.data?.property?.est_year}
                </span>
              </Typography>
            )}
            {propertyType === "Plot" && (
              <Typography
                variant="p"
                sx={{ margin: "10px 0", fontSize: "15px" }}
              >
                No.Of.OpenSides :
                <span
                  style={{ textTransform: "capitalize", marginLeft: "20px" }}
                >
                  {propertyData?.data?.property?.est_year}
                </span>
              </Typography>
            )}
            <Typography variant="p" sx={{ margin: "10px 0", fontSize: "15px" }}>
             <span style={{fontWeight:"bold"}}>Address :</span> 
              <span style={{ marginLeft: "20px" }}>
                {`${propertyData?.data?.property?.village}, ${propertyData?.data?.property?.district}, ${propertyData?.data?.property?.state}`}
              </span>
            </Typography>
          </div>

      </Card>
    </>
  );
};

export default MorePropertyDetails;
