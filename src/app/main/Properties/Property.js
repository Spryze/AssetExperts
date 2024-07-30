import React, { useState, useEffect } from "react";
import PropertyCarousel from "./property-components/PropertyCarousel";
import { Button, CircularProgress } from "@mui/material";
import Grid from "@mui/system/Unstable_Grid/Grid";
import { selectUser } from "app/store/userSlice";
import { useSelector } from "react-redux";
import Container from "@mui/material/Container";
import { selectProperties } from "./PropertySlice1";
import Addproperty from "./Addproperty";
import Map from "./Maplocation";
import { useDispatch } from "react-redux";
import { fetchProperties } from "./PropertySlice1";
import Recomendedproperties from "./Recomendedproperties";
import Recentlyadded from "./Recentlyadded";
import AllDetails from "./AllDetails";
import ContactDetails from "./ContactDetails";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

function Property() {
  const Navigate = useNavigate();
  const user = useSelector(selectUser);
  console.log("user", user);
  const propertiesData = useSelector(selectProperties);

  const propertyData = propertiesData?.data?.property;
  console.log("propertyData", propertyData);
  const { propertyId } = useParams();
  console.log("propertyId in property", propertyId);
  const PropertyID = propertiesData?.data?.property?.p_id;
  console.log("UserPropertyID", PropertyID);

  const UserPropertyIDs = user?.data?.properties?.map(
    (property) => property.property_id
  );
  console.log("UserPropertyIDs", UserPropertyIDs);
  const [loading, setLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const isPropertyInUserProperties = UserPropertyIDs?.includes(PropertyID);
  console.log("isPropertyInUserProperties", isPropertyInUserProperties);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!propertiesData) {
      const propdata = propertiesData.get(propertyId);
      if (propdata) {
        setPropertyData(propdata);
        setLoading(false);
      }
    }
  }, [propertiesData]);

  useEffect(() => {
    dispatch(fetchProperties(propertyId)).then(() => {
      setLoading(false);
    });

    setLoading(true);
  }, []);

  const handleClick = () => {
    Navigate("/UpdateProperty");
    setSelectedProperty(propertiesData);

    setIsEditMode(true);
  };

  const handleCloseForm = () => {
    setSelectedProperty(null);
    setIsEditMode(false);
  };

  return (
    <Container maxWidth="lg" sx={{ position: "relative" }}>
      {user.role == "admin" && (
        <Typography
          className="TextNone"
          component={Link}
          to="/manage/properties"
          variant="contained"
          color="primary"
        >
          <ArrowBackIosIcon />
          Back to Search{" "}
        </Typography>
      )}
      {/* <div style={{display:"flex",justifyContent:"end"}}>
      {isEditMode && (
        <CloseIcon
          onClick={() => handleCloseForm()}
          sx={{ cursor: "pointer" }}
        />
      )}</div> */}
      {loading && (
        <CircularProgress
          sx={{ position: "absolute", zIndex: "1", top: "10%", left: "50%" }}
        />
      )}

      {loading && (
        <div
          style={{
            width: "100%",
            height: "100vh",
            background: "white",
            opacity: "0.5",
          }}
        ></div>
      )}

      {!isEditMode && <PropertyCarousel />}
      <Grid container spacing={5}>
        <Grid item xs={12} md={8}>
          <div>{!isEditMode && <AllDetails />}</div>
        </Grid>
        <Grid item xs={12} md={4}>
          {!isEditMode && <ContactDetails />}
          {console.log("isPropertyInUserProperties",isPropertyInUserProperties)}
          {isPropertyInUserProperties || user.role === "admin" || user.role ==="staff" ? (
            <Button
              variant="contained"
              onClick={() => {
                handleClick();
              }}
            >
              Edit Property
            </Button>
          ) : null}

          {/* {isEditMode  && (
            <Addproperty
              isEditMode={isEditMode}
              propertyData={propertyData}
              onClose={handleCloseForm}
            />
          )} */}
        </Grid>

        {!isEditMode && <Map color="red" />}

        <Grid>
          {!isEditMode && user.role !== "admin" && <Recomendedproperties />}
        </Grid>
      </Grid>

      {!isEditMode && user.role !== "admin" && <Recentlyadded />}
    </Container>
  );
}

export default Property;
