import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectSelectedProperty,selectProperties } from "app/store/propertySlice";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import ShowMore from "./ShowMore";
import PropertyCarousel from "./PropertyCarousel";
import propertiesdata from 'src/Properties.json'
import { Paper } from "@mui/material";


const PropertyDetails = () => {
  // State variables
  const [properties, setProperties] = useState([]);
  const [configuration, setConfiguration] = useState([]);
  const [imagePath, setImagePath] = useState([]);
  const [showMoreVisible, setShowMoreVisible] = useState(false); // State variable for Show More visibility

  // Redux state
  const property = useSelector(selectSelectedProperty);
  console.log(property)

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
      
  //       setProperties(Properties);
  //       setImagePath(Properties.images);
  //       setConfiguration(Properties.propertyConfiguration);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
        
  //     }
  //   };

  //   fetchData();
  // }, [Properties]);

  return (
    <Container>
      <PropertyCarousel/>
      <Grid>
        <Paper sx={{ marginTop: "40px" }}>
          {/* Property details */}
          <Grid container sx={{ margin: "20px" }}>
            <Grid item xs={12} md={6} lg={6} sm={6}>
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                {property.propertyName}
              </Typography>
              <p style={{ margin: "10px 0" }}>
                By <span> {property.propertyDeveloper}</span>
              </p>
              <p style={{ margin: "10px 0" }}>
                {property.address}
              </p>
            </Grid>

            {/* Pricing and contact button */}
            <Grid item xs={12} md={6} sm={6} lg={6}>
              <Typography variant="h6">
                <span style={{ fontWeight: "bold", margin: "5px 0" }}>
                ₹{property.price}
                </span>{" "}
                |{" "}
                <span style={{ fontSize: "15px" }}>
                  {property.generalPrice}
                </span>
              </Typography>
              <p style={{ margin: "10px 0" }}>EMI starts at ₹71.99 K</p>
              <p style={{ margin: "10px 0" }}>All Inclusive Prices</p>
              <Button variant="contained">Contact Developer</Button>
            </Grid>
          </Grid>

          {/* Property images and Show More button */}
          <Box style={{ display: "flex", marginTop: "20px" }}>
            <Box sx={{ flex: "8" }}>
              <img
                style={{
                  width: "-webkit-fill-available",
                  margin: "5px",
                  boxShadow: "5px 12px 5px -6px #888888",
                }}
                src={property?.images?.length > 0 ? property?.images[0] : ""}
                alt="image1"
              />
            </Box>

            <Box sx={{ flex: "4" }}>
              <img
                style={{ margin: "5px" }}
                src={property?.images?.length > 0 ? property?.images[1] : ""}
              />
              <Box sx={{ position: "relative", display: "inline-block" }}>
                {/* Show More button */}
                {!showMoreVisible && (
                  <Button
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      zIndex: 1,
                    }}
                    onClick={() => setShowMoreVisible(true)}
                  >
                    Show More
                  </Button>
                )}
                {/* Additional image */}
                <img
                  style={{
                    margin: "5px",
                    filter: "grayscale(70%)",
                    opacity: "0.5",
                  }}
                  src={property?.images?.length > 0 ? property?.images[2] : ""}
                />
              </Box>
            </Box>
            {showMoreVisible && <ShowMore setShowMoreVisible={setShowMoreVisible} />}
          </Box>

          {/* Configuration */}
          <Box sx={{ margin: "30px", display: "flex" }}>
            <Grid container spacing={2}>
              {configuration?.map((config, index) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                  <h4
                    key={index}
                    style={{ borderRight: "1px solid black", marginLeft: "30px" }}
                  >
                    {config}
                  </h4>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Paper>
      </Grid>
    </Container>
  );
};

export default PropertyDetails;
