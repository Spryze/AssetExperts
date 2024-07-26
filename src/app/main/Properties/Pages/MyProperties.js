import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Grid, Typography, Card, Box, CardContent, Paper, Button } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import DefaultImg from "src/assets/Default/DegaultImg.gif";
import Addproperty from "../Addproperty";
import { selectUser } from "app/store/userSlice";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect } from "react";

const MyProperties = () => {
  const userData = useSelector(selectUser);
  console.log("userData",userData)
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const handleClick = (property) => {
    setSelectedProperty(property);
    setIsEditMode(true);
  };

  const handleCloseForm = () => {
    setSelectedProperty(null);
    setIsEditMode(false);
  };
  // useEffect(() => {
   
  //   console.log('Component reloading due to role change');

  // }, [userData]);
  const handlePropertyClick = (propertyId) => {
    const newWindow = window.open(`/property/${propertyId}`, "_blank");
    if (newWindow) {
      newWindow.focus();
    } else {
      console.error("Unable to open new window/tab");
    }
  };

  // Conditional rendering based on user's role
  if (userData.role === "guest") {
    return (
      <div className="flex flex-col flex-auto items-center sm:justify-center min-w-0">
        <Paper className="flex items-center w-full sm:w-auto min-h-full sm:min-h-auto rounded-0 py-32 px-16 sm:p-48 sm:rounded-2xl sm:shadow">
          <div className="w-full max-w-320 sm:w-320 mx-auto sm:mx-0">
            <img
              className="w-48 mx-auto"
              src="assets/images/logo/logo.svg"
              alt="logo"
            />
            <Typography className="mt-32 text-4xl font-extrabold tracking-tight leading-tight text-center">
              Please Login!
            </Typography>
          </div>
        </Paper>
      </div>
    );
  }

  
  return (
    <>
      <div style={{ display: "flex", justifyContent: "right", cursor: "pointer" }}>
        {selectedProperty !== null && (
          <CloseIcon
            onClick={() => {
              handleCloseForm();
            }}
          />
        )}
      </div>
      {!isEditMode && (
        <Grid container spacing={1}>
          {userData?.data?.properties?.length > 0 ? (
            <div style={{ margin: "30px" }}>
              <Typography variant="h6" sx={{ marginBottom: "10px" }}>
                My Properties
              </Typography>
              <hr style={{ margin: "10px 0px" }} />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                }}
              >
                {userData?.data?.properties?.map((item, index) => (
                  <Card
                    key={index}
                    sx={{
                      flex: "0 0 auto",
                      cursor: "pointer",
                      height: "auto",
                      width: "300px",
                      position: "relative",
                      padding: "0px",
                      borderRadius: "5px",
                      margin: "20px",
                    }}
                    onClick={() => handlePropertyClick(item.property_id)}
                  >
                    <CardContent sx={{ padding: "0px" }}>
                      <Box
                        component="img"
                        src={
                          item.prop_image?.length > 0
                            ? item.prop_image[0]
                            : DefaultImg
                        }
                        alt="Property"
                        sx={{
                          width: "100%",
                          position: "relative",
                          height: "200px",
                          objectFit: "cover",
                          borderRadius: "5px",
                          transition: "transform 0.3s ease-in-out",
                          "&:hover": {
                            transform: "scale(1.05)",
                          },
                        }}
                      />
                      {item?.listing_type !== "buy" && (
                        <Paper
                          sx={{
                            fontWeight: "600",
                            position: "absolute",
                            padding: "10px",
                            top: "0",
                            borderRadius: "0px 0px 5px 0px",
                            background:
                              "linear-gradient(90deg, rgba(233,233,233,1) 100%, rgba(255,255,255,1) 100%)",
                          }}
                        >
                          {"₹" + item?.price + "/" + item?.unit }
                        </Paper>
                      )}
                      <div>
                        <Typography
                          sx={{
                            fontSize: "15px",
                            textTransform: "capitalize",
                            fontWeight: "500",
                            margin: "10px 0px 0px 10px",
                            fontWeight: "700",
                          }}
                        >
                          {`${
                            item?.listing_type === "buy"
                              ? "Wanted"
                              : `${item?.listing_type}ing`
                          }, ${item?.area}${item?.unit}s ${item?.p_type}`}
                        </Typography>
                        <Box sx={{ display: "flex" }}>
                          <LocationOnIcon sx={{ color: "orange" }} />
                          <Typography
                            sx={{
                              fontSize: "14px",
                              textTransform: "capitalize",
                              fontWeight: "600",
                              color: "#707273",
                            }}
                          >
                            {`${item?.landmark}, ${item?.district}`}
                          </Typography>
                          {/* <Button
                            sx={{
                              fontSize: "12px",
                              fontWeight: "bold",
                              color: "black",
                              padding: "0px",
                              margin: "5px",
                              borderRadius: "5px",
                              width: "190px",
                              border: "solid #ffa500 1px",
                            }}
                            variant="outlined"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleClick(item);
                            }}
                          >
                            Update Property
                          </Button> */}
                        </Box>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ):(<Typography sx={{display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft:"50%",
            fontWeight:"600",
            fontSize:"20px",
            minHeight: '100vh', }}>No Properties</Typography>)}
        </Grid>
      )}
      {isEditMode && (
        <Addproperty
          isEditMode={isEditMode}
          propertyData={selectedProperty}
          onClose={handleCloseForm}
        />
      )}
    </>
  );
};

export default MyProperties;
