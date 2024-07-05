import * as React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import PlaceIcon from "@mui/icons-material/Place";
import ShareIcon from "@mui/icons-material/Share";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import AroundTheproject from "./AroundTheproject";
import Grid from "@mui/system/Unstable_Grid/Grid";
import { useRef } from "react";
import { selectSelectedProperty } from "app/store/propertySlice";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Paper } from "@mui/material";
import { useDispatch } from "react-redux";
import { updateSelectedProperty } from "app/store/propertySlice";

const ScrollableTabs = () => {
  // State Declarations
  const [showFullContent, setShowFullContent] = useState(false);
  const [value, setValue] = useState();
  const [tabvalue, setTabValue] = useState("");
  const [selectedTabvalue, setselectedtabvalue] = useState("");
  const [ShowAll, SetShowAll] = useState(false);
  const Properties = useSelector(selectSelectedProperty);
  const amenitistoShow = ShowAll ? Properties?.Amenities : Properties?.Amenities?.slice(0, 10);
  const elementRef = useRef(null);
  const [visibleIndex, setVisibleIndex] = useState(0);
  const [more, seemore] = useState(false);
  const [activeColor, Setactivecolor] = useState();
  const [activeButton, SetactiveButton] = useState([]);
  const [updatedData, setUpdatedData] = useState(null);
  const data = Object.values(activeButton);
  const dispatch = useDispatch();

  // UseEffect for Initialization
  useEffect(() => {
    if (Properties?.PropertyBHK && Properties.PropertyBHK.length > 0) {
      setTabValue(Properties.PropertyBHK[0].value);
      setselectedtabvalue(Properties.PropertyBHK[0].value);
    }
    const temp = Properties?.PossessionStatus?.filter(
      (PossessionStatus) => PossessionStatus.category === "ReadyToMove"
    );
    if (temp) {
      SetactiveButton(temp);
      Setactivecolor("ReadyToMove");
    }
  }, [Properties]);

  // IntersectionObserver for Scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            setValue(parseInt(id));
          }
        });
      },
      { threshold: 0.5 }
    );

    const sections = document.querySelectorAll(".scrollable-section");
    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  // Function for Tab Change
  const TabhandleChange = (event, newValue) => {
    setTabValue(newValue);
    setselectedtabvalue(newValue);
  };

  // Function for Content Toggle
  const toggleContent = () => {
    setShowFullContent(!showFullContent);
  };

  const toggleShowMore = () => {
    SetShowAll((prevShowAll) => !prevShowAll);
  };
  const toggleSeeMore = () => {
    seemore(!more);
  };
  const displayText = more
    ? Properties.AboutDeveloper
    : Properties.AboutDeveloper?.slice(0, 250) + "....";

  const sampleData = Properties.locality;
  const isFirstIndexVisible = visibleIndex === 0;
  const isLastIndexVisible = visibleIndex === sampleData?.length - 1;
  const handleHorizontalScroll = (scrollContainer, scrollAmount, direction) => {
    if (scrollContainer) {
      if (direction === "left") {
        scrollContainer.scrollLeft -= scrollAmount;
      } else if (direction === "right") {
        scrollContainer.scrollLeft += scrollAmount;
      }
      // Update visibleIndex based on scroll position
      const newIndex = Math.round(scrollContainer.scrollLeft / scrollAmount);
      setVisibleIndex(newIndex);
    }
  };
  const Readytomove = () => {
    const temp = Properties?.PossessionStatus?.filter(
      (PossessionStatus) => PossessionStatus.category === "ReadyToMove"
    );
    if (temp) {
      SetactiveButton(temp);
    }
    Setactivecolor("ReadyToMove");
  };
  const Beyond3Years = () => {
    const temp = Properties?.PossessionStatus?.filter(
      (PossessionStatus) => PossessionStatus.category === "abovethreeyears"
    );
    if (temp) {
      SetactiveButton(temp);
    }
    Setactivecolor("Beyond3Years");
  };
  const In3Years = () => {
    const temp = Properties?.PossessionStatus?.filter(
      (PossessionStatus) => PossessionStatus.category === "in3years"
    );
    if (temp) {
      SetactiveButton(temp);
    }
    Setactivecolor("In3Years");
  };

  const handleUpdateProperty = () => {
    if (updatedData) {
      // Dispatch the update action with updatedData
      updateSelectedProperty(updatedData);
      // Clear updatedData and toggle content
      setUpdatedData(null);
      toggleContent();
    }
  };

  return (
    <>
      <Box>
        <Box sx={{ display: "flex" }}>
          <Box sx={{ flex: "7", overflowY: "auto" }}>
            <Box>
              <Card sx={{ padding: "20px", borderRadius: "0px" }}>
                <Box sx={{ display: "flex" }}>
                  <PlaceIcon sx={{ margin: "0 20px" }} />
                  <Box sx={{marginBottom:"20px"}}>
                    <p>Property Location</p>
                    <h2>{Properties.PropertyLocation}</h2>
                    <h2>About the Project</h2>
                  </Box>
                </Box>
                <AroundTheproject />
                <hr />
                <h3>View More on Maps</h3>
              </Card>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box>
        <Box>
          <Card
            id="0"
            className="scrollable-section"
            sx={{ margin: "20px 0", padding: "20px", borderRadius: "0px" }}
          >
            <Typography variant="h6">{`${Properties.propertyName} Overview`}</Typography>
            <hr />

            <Box
              display="flex"
              flexWrap="wrap"
              justifyContent="space-between"
              margin="20px"
            >
              {Properties?.propertyOverview?.map((item, index) => (
                <div key={index} style={{ width: "30%", marginBottom: "20px" }}>
                  {Object.entries(item).map(([key, value]) => (
                    <div key={key}>
                      <Typography
                        variant="h6"
                        sx={{ fontSize: "15px", color: "#808083" }}
                        gutterBottom
                      >
                        {key}:
                      </Typography>
                      <Typography variant="body1">{value}</Typography>
                    </div>
                  ))}
                </div>
              ))}
            </Box>

            <Box sx={{ display: "flex", justifyContent: "space-around" }}>
              <Button
                variant="contained"
                sx={{ borderRadius: "5px", padding: "10px 40px" }}
              >
                <ShareIcon sx={{ margin: "5px" }} />
                Share
              </Button>
              <Button
                variant="contained"
                sx={{ borderRadius: "5px", padding: "10px 40px" }}
              >
                <SaveAltIcon sx={{ margin: "5px" }} />
                Save
              </Button>
              <Button
                variant="contained"
                // sx={{
                //   borderRadius: "5px",
                //   padding: "10px 40px",
                //   backgroundColor: "#FF6600",
                //   color: "white",
                //   fontWeight: "bold",
                //   "&:hover": {
                //     backgroundColor: "#FF6600",
                //     color: "black",
                //   },
                // }}
              >
                Ask for Details
              </Button>
            </Box>
          </Card>
          <Card
      id="1"
      className="scrollable-section"
      sx={{ padding: "20px", borderRadius: "0" }}
    >
      <div style={{ display: "flex" }}>
        <Typography variant="h6">{`About ${Properties.propertyName}`}</Typography>
        <Button onClick={handleUpdateProperty}>Edit</Button>
      </div>
      <br />
      {Properties.AboutProject ? (
        <>
          {/* Existing content rendering */}
          {showFullContent ? (
            // Full content displayed
            <>
              <Typography variant="body2">
                {Properties.AboutProject}
              </Typography>
              <Button
                onClick={() => toggleContent()}
                // sx={{
                //   margin: "auto",
                //   display: "block",
                //   color: "#FF6600",
                //   fontWeight: "bold",
                // }}
              >
                Show Less
              </Button>
            </>
          ) : (
            // Partial content displayed
            <>
              <Typography variant="body2">
                {Properties.AboutProject.length > 100
                  ? Properties.AboutProject.slice(0, 300) + "..."
                  : Properties.AboutProject}
              </Typography>
              {Properties.AboutProject.length > 100 && (
                <Button
                  onClick={() => toggleContent()}
                  // sx={{
                  //   margin: "auto",
                  //   display: "block",
                  //   color: "#FF6600",
                  //   fontWeight: "bold",
                  // }}
                >
                  See More About Project
                </Button>
              )}
              {/* Update button */}
              <div>
                {updatedData && (
                  <Button onClick={handleUpdateProperty}>
                    Update
                  </Button>
                )}
              </div>
            </>
          )}
        </>
      ) : (
        <Typography variant="body2">No information available.</Typography>
      )}
    </Card>
          <Card
            id="2"
            className="scrollable-section"
            sx={{ margin: "20px 0", padding: "10px", borderRadius: "0" }}
          >
            <Typography variant="h5">
              {`${Properties.propertyName} Price & Floor Plan`}
            </Typography>
            <hr />
            <Box>
              <Tabs
                value={tabvalue}
                onChange={TabhandleChange}
                textColor="secondary"
                indicatorColor="secondary"
              >
                {Properties?.PropertyBHK?.map((item, index) => {
                  return (
                    <Tab
                      key={index}
                      value={item.value}
                      label={item.value}
                      sx={{
                        backgroundColor:
                          tabvalue === item.value ? "#fff" : "#ccc",
                      }}
                    />
                  );
                })}
              </Tabs>
            </Box>

            <hr />
            <Box sx={{ margin: "10px 0" }}>
              <Typography variant="body">{selectedTabvalue}</Typography>
              <Typography
                variant="body"
                sx={{ fontWeight: "bold", float: "right" }}
              >
                ₹ 1.45 Cr
              </Typography>{" "}
              <br />
              <Typography variant="body">
                Saleable Area :
                <span style={{ fontWeight: "bold" }}>1814.00 sq.ft</span>
              </Typography>
            </Box>
            <Box>
              {selectedTabvalue === "1BHK" &&
                Properties?.Propertyimages?.length > 0 && (
                  <img src={Properties.Propertyimages[0]} alt="First Image" />
                )}
              {selectedTabvalue === "2BHK" &&
                Properties?.Propertyimages?.length > 0 && (
                  <img src={Properties.Propertyimages[1]} alt="First Image" />
                )}
            </Box>
            <hr />
            <Typography
              sx={{
                fontSize: "12px",
                color: "#ff6600",
                fontWeight: "bold",
                marginTop: "10px",
              }}
            >
              Price Breakup
            </Typography>
          </Card>
          {/* <Card
            sx={{
              padding: "20px",
              margin: "20px 0",
              borderRadius: "0px",
            }}
          >
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", marginBottom: "10px" }}
            >
              Tour Omsree Skypark: Photos & Video
            </Typography>
            <hr />
            <Typography variant="body" sx={{ fontSize: "18px" }}>
              Project Tour & Photos
            </Typography>
            <Box>
              <img src={Properties.imagePath[0]}/>
            </Box>
          </Card> */}
          <Card
            id="3"
            className="scrollable-section"
            sx={{ padding: "15px", margin: "15px 0", borderRadius: "0px" }}
          >
            <Typography sx={{ fontSize: "2rem", marginBottom: "5px" }}>
              {Properties.propertyName}
            </Typography>
            <hr />
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-between",
              }}
            >
              {amenitistoShow?.map((amenity, index) => (
                <div key={index}>
                  <Typography sx={{ margin: "20px" }}>{amenity}:</Typography>
                </div>
              ))}
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                color: "#FF6600",
                fontWeight: "bold",
              }}
            >
              {Properties?.Amenities?.length && (
                <Button onClick={toggleShowMore}>
                  {ShowAll ? "Show Less" : "Show More"}
                </Button>
              )}
            </div>
          </Card>
          <Card
            id="4"
            className="scrollable-section"
            sx={{ padding: "20px", margin: "15px 0", borderRadius: "0px" }}
          >
            <img src="/assets/images/properties/price trends.png" />
          </Card>
          <Card
            id="5"
            className="scrollable-section"
            sx={{ padding: "20px", margin: "10px 0", borderRadius: "0px" }}
          >
            <Typography variant="h6">
              Property Registery Records of Omsree Skypark
            </Typography>
            <img src="/assets/images/properties/govtprice.png" />
          </Card>
          <Card
            id="6"
            className="scrollable-section"
            sx={{ padding: "20px", margin: "10px 0", borderRadius: "0px" }}
          >
            <Typography
              sx={{
                fontSize: "15px",
                fontWeight: "bold",
                marginBottom: "10px",
              }}
            >
              Helpful Tools
            </Typography>
            <Typography
              variant="p"
              sx={{ color: "#BDBDBD", marginBottom: "10px" }}
            >
              Check your affordability, Home loan eligibility & EMI
            </Typography>
            <hr />
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-evenly",
                marginTop: "15px",
              }}
            >
              <Card
                sx={{
                  height: "90px",
                  width: "600px",
                  borderRadius: "2px",
                  margin: "10px",
                  display: "flex",
                }}
              >
                <img
                  style={{ marginRight: "10px" }}
                  src="assets/images/properties/iconimg.webp"
                />
                <div>
                  <Typography sx={{ fontSize: "12px" }}>
                    EMI Calculator
                    <br /> EMI Starts at 71.9K
                  </Typography>
                </div>
              </Card>
              <Card
                sx={{
                  height: "90px",
                  width: "600px",
                  borderRadius: "2px",
                  margin: "10px",
                  display: "flex",
                }}
              >
                <img
                  style={{ marginRight: "10px" }}
                  src="assets/images/properties/iconimg.webp"
                />

                <Typography sx={{ fontSize: "12px" }}>
                  EMI Calculator <br /> Find the best budget for your home
                  search
                </Typography>
              </Card>
              <Card
                sx={{
                  height: "90px",
                  width: "600px",
                  borderRadius: "2px",
                  margin: "10px",
                  display: "flex",
                }}
              >
                <img
                  style={{ marginRight: "10px" }}
                  src="assets/images/properties/iconimg.webp"
                />
                <Typography sx={{ fontSize: "12px" }}>
                  Eligibility Calculator <br /> Find your homeloan limit
                </Typography>
              </Card>
            </Box>
          </Card>
          <Card
            sx={{ borderRadius: "0px", padding: "20px" }}
            id="7"
            className="scrollable-section"
          >
            <Typography variant="h6" sx={{ borderBottom: " solid black 1px" }}>
              Explore Neighbourhood - Map View
            </Typography>
            <div>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15114.116659710378!2d82.8317478!3d18.7298862!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a3afecd553b3ccd%3A0xd75f9c0b9b36cf90!2sHAL%20Hospital!5e0!3m2!1sen!2sin!4v1713163974753!5m2!1sen!2sin"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                title="Google Maps"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            <Box sx={{ position: "relative" }}>
              <div
                style={{
                  overflowX: "auto",
                  whiteSpace: "nowrap",
                  position: "relative",
                  overflow: "hidden",
                  display: "flex",
                  textAlign: "center",
                  margin: "10px",
                }}
                ref={elementRef}
              >
                {sampleData?.map((card) => (
                  <div key={card.id}>
                    
                    <Card
                      style={{
                        display: "inline-block",
                        margin: "10px",
                        width: "50px",
                        height: "50px",
                        borderRadius: "50%",
                        position:"relative",
                      }}
                    >
                      <PlaceIcon sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />

                    </Card>
                    <br />
                    <h6 style={{ margin: "0px 5px" }}>{card.title}</h6>
                  </div>
                ))}
              </div>

              <Grid
                container
                justifyContent="space-between"
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  zIndex: 3,
                  width: "100%",
                }}
              >
                <Grid
                  item
                  sx={{ backgroundColor: "white", padding: "25px 0px" }}
                >
                  {!isFirstIndexVisible && (
                    <Button
                      color="primary"
                      onClick={() =>
                        handleHorizontalScroll(elementRef.current, 200, "left")
                      }
                      style={{ borderRadius: "2px" }}
                    >
                      <ArrowBackIcon />
                    </Button>
                  )}
                </Grid>
                <Grid
                  item
                  sx={{ backgroundColor: "white", padding: "25px 0px" }}
                >
                  {!isLastIndexVisible && sampleData?.length > 0 && (
                    <Button
                      color="primary"
                      onClick={() =>
                        handleHorizontalScroll(elementRef.current, 200, "right")
                      }
                      style={{ borderRadius: "2px" }}
                    >
                      <ArrowForwardIcon />
                    </Button>
                  )}
                </Grid>
              </Grid>
            </Box>
          </Card>
        </Box>
        <Card id="13"
            className="scrollable-section" sx={{ padding: "20px", borderRadius: "0px", marginTop: "20px", }}>
          <Typography
            sx={{
              fontSize: "20px",
              fontWeight: "bold",
              borderBottom: " solid black 1px",
            }}
          >
            {Properties.propertyName} Developer Information
          </Typography>
          <Paper
            sx={{
              margin: "10px",
              padding: "20px",
              borderRadius: "5px",
              marginTop: "20px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <div>
                <img
                  src={Properties.BuilderImage}
                  style={{ height: "auto", width: "40px", margin: "10px" }}
                />
              </div>
              <div>
                <Typography sx={{ fontSize: "20px", fontWeight: "bold" }}>
                  {Properties.propertyName}
                </Typography>
                <Typography sx={{ display: "flex", marginTop: "40px 0" }}>
                  <div style={{ margin: "10px" }}>
                    <span style={{ fontWeight: "bold" }}>
                      {" "}
                      {Properties.propertyAddyear} <br />
                    </span>
                    Established In
                  </div>
                  <div style={{ margin: "10px" }}>
                    <span style={{ fontWeight: "bold" }}>
                      {" "}
                      {Properties.TotalProjects}
                    </span>{" "}
                    <br />
                    Total Projects
                  </div>
                </Typography>
              </div>
            </div>
            <Typography sx={{ marginTop: "20px" }}>
              {displayText}
              <Button
                onClick={toggleSeeMore}
                style={{
                  color: "#FF6600",
                }}
              >
                {more ? "See Less" : "See more"}
              </Button>
            </Typography>
          </Paper>
          <div style={{ marginTop: "30px", display: "flex" }}>
            <Typography>Possession Status:</Typography>
            <div sx={{}}>
              <div>
                <Button
                  // sx={{
                  //   border: "1px solid grey",
                  //   margin: "5px 5px",
                  //   fontSize: "12px",
                  //   padding: "10px 10px",
                  //   minHeight: "0",
                  //   height: "30px",
                  //   backgroundColor:
                  //     activeColor === "ReadyToMove" ? "#FF6600" : "#F6F6F7",
                  //   "&:hover": {
                  //     backgroundColor: "#FF6600",
                  //     color: "black",
                  //   },
                  // }}
                  onClick={Readytomove}
                >
                  Ready To Move
                </Button>

                <Button
                  sx={{
                    border: "1px solid grey",
                    margin: "5px 5px",
                    fontSize: "12px",
                    padding: "10px 10px",
                    minHeight: "0",
                    height: "30px",
                    backgroundColor:
                      activeColor === "In3Years" ? "#FF6600" : "#F6F6F7",
                    "&:hover": {
                      backgroundColor: "#FF6600",
                      color: "black",
                    },
                  }}
                  onClick={In3Years}
                >
                  In 3 Years
                </Button>

                <Button
                  // sx={{
                  //   border: "1px solid grey",
                  //   margin: "5px 5px",
                  //   fontSize: "12px",
                  //   padding: "10px 10px",
                  //   minHeight: "0",
                  //   height: "30px",
                  //   backgroundColor:
                  //     activeColor === "Beyond3Years" ? "#FF6600" : "#F6F6F7",
                  //   "&:hover": {
                  //     backgroundColor: "#FF6600",
                  //     color: "black",
                  //   },
                  // }}
                  onClick={Beyond3Years}
                >
                  Beyond 3 Years
                </Button>
              </div>
            </div>
          </div>

          <div style={{ display: "flex" }}>
            {activeButton?.map((item, index) => (
              <Card
                key={index}
                sx={{
                  borderRadius: "2px",
                  padding: "20px",
                  margin: "10px",
                  height: "420px",
                  width: "150px",
                }}
              >
                <Typography sx={{ height: "315px"}}>
                  <img
                  src={item.src}
                  style={{height:"135px", width:"auto",marginBottom:"10px"}}/>
                  <div style={{ fontWeight: "bold" }}>{item.Cost}</div>
                  <div style={{ fontWeight: "bold" }}>{item.title}</div>
                  <div>{item.Flats}</div>
                  <div>{item.Area}</div>
                </Typography>
                <Button
                  variant="contained"
                  sx={{
                    borderRadius: "2px",
                    // backgroundColor: "#FF6600",
                    marginTop: "10px",
                  }}
                >
                  Contact
                </Button>
              </Card>
            ))}
          </div>
        </Card>
        <Card sx={{ borderRadius: "0", padding: "20px", marginTop: "20px" }}>
          <Typography
            sx={{
              borderBottom: "solid 0.5px grey",
              fontSize: "20px",
              fontWeight: "Bold",
            }}
          >
            Curated Solutions
          </Typography>
          <img
            style={{ marginTop: "20px" }}
            src="assets/images/properties/fullfilling.png"
          />
        </Card>
      </Box>
    </>
  );
};

export default ScrollableTabs;
