import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Grid, Typography, Card, Box, CardContent, Paper, Button } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import DefaultImg from "src/assets/Default/DegaultImg.gif";
import Addproperty from "../Addproperty";
import { selectUser } from "app/store/userSlice";
import CloseIcon from "@mui/icons-material/Close";

const MyProperties = () => {
  const userData = useSelector(selectUser);
  console.log("myproperties")
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const handleClick = (property) => {
    console.log("property", property);
    setSelectedProperty(property);
    setIsEditMode(true);
  };

  const handleCloseForm = () => {
    setSelectedProperty(null);
    setIsEditMode(false);
  };

  return (
    <>
      <div
        style={{ display: "flex", justifyContent: "right", cursor: "pointer" }}
      >
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
          {userData?.data?.properties?.length > 0 && (
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
                  >
                    <CardContent sx={{ padding: "0px" }}>
                      <Box
                        component="img"
                        src={item?.prop_images?.[0] || DefaultImg}
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
                          {"₹" + item?.unit_price}
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
                          }, ${item?.area}${item?.unit}s ${item?.prop_type}`}
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
                          <Button
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
                          </Button>
                        </Box>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
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
