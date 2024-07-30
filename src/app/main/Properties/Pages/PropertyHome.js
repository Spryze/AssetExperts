import React, { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchRecentTransactions,
  selectRecentTransactions,
  selectNormalSearchResults,
  SearchResults,
  selectnormaltotalResults,
  LocalResults,
  CardsClick,
  selectStats
} from "../PropertySlice1";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  Paper,
  Button,
} from "@mui/material";
import WipeImage from "../property-components/WipeImage";
import { selectUser } from "app/store/userSlice";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SearchDialogue from "../SearchDialogue";
import DefaultImg from "src/assets/Default/DegaultImg.gif";
import CircularProgress from "@mui/material/CircularProgress";
import { differenceInDays, parseISO } from "date-fns";
import CircularRotationCards from "../property-components/CircularRotationCards";
import AnimatedText from "../property-components/AnimatedText";
import ScrollToTopButton from "../property-components/ScrollToButton";

const CurrencyFormatter = ({ value, currency }) => {
  const formattedValue = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: currency,
  }).format(value);

  return <>{formattedValue}</>;
};

const debounce = (func, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

const PropertyHome = () => {
  const dispatch = useDispatch();
  const user = selectUser(selectUser);
  const Stats = useSelector(selectStats);
  console.log("Stats",Stats);
  const recentTransactions = useSelector(selectRecentTransactions);
  console.log("recentTransactions", recentTransactions);
  const searchResults = useSelector(selectNormalSearchResults);
  const [formData, setformData] = useState(null);
  const [noDataFound, setNoDataFound] = useState(false);
  const [offset, setoffset] = useState(0);
  const [page, setPage] = useState(0);
  const [Loading, setLoading] = useState(false);
  const isAdminSearch = false;
  const total_properties = useSelector(selectnormaltotalResults);
  const PropertyState = "ExistingProperty";
  const [LocalProperies, setLocalProperties] = useState();
  const [HomeProperties, SetHomeProperties] = useState();
  const [localLoading, setLocalLoading] = useState(false);
  const [HomePropertiesLoader, SetHomePropertiesLoader] = useState(false);
 


  const HandleFormData = (data) => {
    console.log("data", data);
    setformData(data);
  };
  const SeeMoreResults = () => {
    console.log("offset, formData", offset, formData);
    setLoading(true);
    dispatch(
      SearchResults({
        formData: formData,
        offset: offset,
        isAdminSearch: isAdminSearch,
        PropertyState: PropertyState,
      })
    )
      .then((response) => {
        console.log("response of admin", response);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching more results:", error);
        setLoading(false);
      });
    setoffset((prevOffset) => prevOffset + 40);
  };

  const transactions = recentTransactions?.property?.buy_properties?.concat(
    recentTransactions?.property?.sell_properties
  );
  console.log("transactions", transactions);
  const DataNotFound = useCallback((response) => {
    console.log("response in no data founf",response)
    if (!response || response.payload.properties.length == 0) {
      setNoDataFound(true);
      setTimeout(() => {
        setNoDataFound(false);
      }, 3000);
    } else {
      setNoDataFound(false);
    }
  }, []);

  const calculateDaysAgo = (dateString) => {
    const parsedDate = parseISO(dateString);
    const now = new Date();
    return differenceInDays(now, parsedDate);
  };
  const handleScroll = useCallback(
    debounce(() => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 5
      ) {
        setoffset((prevoffset) => prevoffset + 40);
      }
    }, 200),
    []
  );

  const handleLocalClick = (district) => {
    setLocalLoading(true),
      dispatch(
        LocalResults({
          formData: {
            p_type: "",
            listing_type: "",
            min_price: "",
            max_price: "",
            state: "Andhra Pradesh",
            district: district,
            approved_by: "",
            status: "",
            loan_eligible: "",
            updated_by: "",
            notified: 0,
            v_status: true,
            own_name: "",
            med_name: "",
            landmark: "",
            offset: 0,
          },
          isAdminSearch: "local",
        })
      ).then((response) => {
        console.log("Lovcal Response", response);
        setLocalLoading(false);
        setLocalProperties(response.payload.properties);
      });
  };
  const CardClick = (propertyType) => {
    SetHomePropertiesLoader(true),
      dispatch(
        CardsClick({
          formData: {
            p_type: propertyType,
            listing_type: "",
            min_price: "",
            max_price: "",
            state: "",
            district: "",
            approved_by: "",
            status: "",
            loan_eligible: "",
            updated_by: "",
            notified: 0,
            v_status: true,
            own_name: "",
            med_name: "",
            landmark: "",
            offset: 0,
          },
          isAdminSearch: "local",
        })
      ).then((response) => {
        console.log("Lovcal Response", response);
        SetHomePropertiesLoader(false);
        SetHomeProperties(response.payload.properties);
      });
  };

  useEffect(() => {}, [user]);
  useEffect(() => {
    dispatch(fetchRecentTransactions(offset));
  }, [dispatch, offset]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const handleClick = (propertyId) => {
    const newWindow = window.open(`/property/${propertyId}`, "_blank");
    if (newWindow) {
      newWindow.focus();
    } else {
      console.error("Unable to open new window/tab");
    }
  };

  return (
    <Box>
     
      <Box className="home-blue-background">
        <Box
          sx={{
            // width: "97%",
            maxWidth: "100%",
            position: "relative",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            
          }}
        >
          <Grid container spacing={2} sx={{ width: "100%" }}>
            <Grid item xs={12} md={7}>
              <Box
              className="AnimatedBox"
                sx={{
                  margin: "80px",
                }}
              >
                <AnimatedText />
                <SearchDialogue
                  FormData={HandleFormData}
                  onSearch={DataNotFound}
                  isAdminSearch={isAdminSearch}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={5}>
              <div
                style={{
                  width: "100%",
                  height: "500px",
                  margin: "50px 0px",
                  display:"flex",
                  justifyContent:"center",
                  background:"transparent",
                 
                }}
              >
               
                <video width="250" height="200" style={{borderRadius:"35px",position:"absolute"}} autoPlay loop>
                  <source
                    src="/assets/cardimages/phone (2).mp4"
                    type="video/mp4"
                  />
                </video>
               
              </div>
              <WipeImage/>
              
            </Grid>
          </Grid>
        </Box>
      </Box>

      {noDataFound && (
        <Typography
          variant="h6"
          sx={{
            backgroundColor: "orange",
            padding: "5px 40px",
            textAlign: "center",
            borderRadius: "5px",
            color: "white",
            position: "fixed",
            top: "100px",
            left: "50%",
            width:"250px",
            transform: "translateX(-50%)",
            zIndex: 1000,
          }}
        >
          No Data Found
        </Typography>
      )}

      <Grid container spacing={1}>
        {Object.keys(searchResults)?.length > 0 && (
          <div style={{ marginTop: "20px" }}>
            <Typography variant="h6" sx={{marginLeft:"30px"}}>
              Search Results({total_properties})
            </Typography>
            <hr style={{ margin: "10px 0px" }} />
            <div
              style={{
                display: "flex",
                gap: "10px",
                flexWrap: "wrap",
                justifyContent: "space-around",
              }}
            >
              {searchResults
                ?.filter((item) => item.price !== 0)
                ?.map((item, index) => (
                  <Card
                    key={index}
                    sx={{
                      flex: "0 0 auto",
                      cursor: "pointer",
                      height: "auto",
                      width: "320px",
                      position: "relative",
                      padding: "0px",
                      borderRadius: "5px",
                      margin: "30px 0px",
                    }}
                    onClick={() => handleClick(item.p_id)}
                  >
                    <CardContent sx={{ padding: "0px" }}>
                      <Box
                        component="img"
                        src={
                          item?.prop_images && item.prop_images.length > 0
                            ? item.prop_images[0]
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
                      <Paper
                        sx={{
                          fontWeight: "600",
                          position: "absolute",
                          padding: "10px",
                          top: "160px",
                          right: "0",
                          borderRadius: "0px 5px 5px 0px",
                          boxShadow: "none",
                          background: "rgba(0, 0, 0, 0.5)",
                          color: "white",
                        }}
                      >
                        <Typography>
                          {item?.p_created_on &&
                            `${calculateDaysAgo(item.p_created_on)} days ago`}
                        </Typography>
                      </Paper>
                      {item?.listing_type !== "buy" && (
                        <Paper
                          sx={{
                            fontWeight: "600",
                            position: "absolute",
                            padding: "10px",
                            top: "0",
                            borderRadius: "0px 0px 5px 0px",
                            background: "rgba(0, 0, 0, 0.5)",
                            color: "white",
                          }}
                        >
                          <CurrencyFormatter
                            value={item?.unit_price}
                            currency="INR"
                          />{" "}
                          / {item?.unit}
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
                          <LocationOnIcon sx={{ color: "#0b6c00" }} />
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
                        </Box>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
            {Loading && (
              <Box sx={{ display: "flex", justifyContent: "center" }}>
   
                <CircularProgress />
              </Box>
            )}
            <Box sx={{ display: "flex", justifyContent: "end" }}>

              <Button
                onClick={() => {
                  SeeMoreResults();
                }}
              >
                See More
              </Button>
            </Box>
          </div>
        )}
      </Grid>
      <div>
        <CircularRotationCards />
      </div>
      <hr/>

      <div>
        <Typography
          className="heading-text Text-Center"
          sx={{ margin: "40px 0px" }}
        >
          We Are Available In Your Local cities..
        </Typography>
        <div
          className="Local-cities"
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-around",
          }}
        >
          <Card
            onClick={() => {
              handleLocalClick("Srikakulam");
            }}
            sx={{
              flex: "0 0 auto",
              width: "250px",
              height: "300px",
              position: "relative",
              borderRadius: "5px",
              justifyContent: "center",
              overflow: "hidden",
              margin: "20px 0",
              cursor: "pointer",
              position: "relative",
            }}
          >
            <CardContent
              sx={{ padding: "0px", position: "relative", height: "100%" }}
            >
              <Typography
                sx={{
                  fontSize: "18px",
                  textTransform: "capitalize",
                  fontWeight: "600",
                  textAlign: "center",
                  position: "absolute",
                  top: "20%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  zIndex: "10",
                  background: "white",
                  padding: "3px 76px",
                }}
              >
                Srikakulam
              </Typography>
              <img
                className="card-image"
                src="assets/images/properties/Srikakulam.jpg"
                alt="Property"
                style={{
                  width: "100%",
                  height: "300px",
                  objectFit: "cover",
                  borderRadius: "5px",
                }}
              />
            </CardContent>
          </Card>
          <Card
            onClick={() => {
              handleLocalClick("Visakhapatnam");
            }}
            sx={{
              flex: "0 0 auto",
              width: "250px",
              height: "300px",
              position: "relative",
              borderRadius: "5px",
              justifyContent: "center",
              overflow: "hidden",
              margin: "20px 0",
              cursor: "pointer",
            }}
          >
            <CardContent
              sx={{ padding: "0px", position: "relative", height: "100%" }}
            >
              <Typography
                sx={{
                  fontSize: "18px",
                  textTransform: "capitalize",
                  fontWeight: "600",
                  textAlign: "center",
                  position: "absolute",
                  top: "20%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  zIndex: "10",
                  background: "white",
                  padding: "3px 76px",
                }}
              >
                Visakhapatnam
              </Typography>
              <img
                className="card-image"
                src="assets/images/properties/visakhapatnam.jpg"
                alt="Property"
                style={{
                  width: "100%",
                  height: "300px",
                  objectFit: "cover",
                  borderRadius: "5px",
                }}
              />
            </CardContent>
          </Card>
          <Card
            onClick={() => {
              handleLocalClick("Vizianagaram");
            }}
            sx={{
              flex: "0 0 auto",
              width: "250px",
              height: "300px",
              position: "relative",
              borderRadius: "5px",
              justifyContent: "center",
              overflow: "hidden",
              margin: "20px 0",
              cursor: "pointer",
            }}
          >
            <CardContent
              sx={{ padding: "0px", position: "relative", height: "100%" }}
            >
              <Typography
                sx={{
                  fontSize: "18px",
                  textTransform: "capitalize",
                  fontWeight: "600",
                  textAlign: "center",
                  position: "absolute",
                  top: "20%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  zIndex: "10",
                  background: "white",
                  padding: "3px 76px",
                  cursor: "pointer",
                }}
              >
                Vizianagaram
              </Typography>
              <img
                className="card-image"
                src="assets/images/properties/vizayanagaram.jpg"
                alt="Property"
                style={{
                  width: "100%",
                  height: "300px",
                  objectFit: "cover",
                  borderRadius: "5px",
                }}
              />
            </CardContent>
          </Card>
          <Card
            onClick={() => {
              handleLocalClick("East Godavari");
            }}
            sx={{
              flex: "0 0 auto",
              width: "250px",
              height: "300px",
              position: "relative",
              borderRadius: "5px",
              justifyContent: "center",
              overflow: "hidden",
              margin: "20px 0",
              cursor: "pointer",
            }}
          >
            <CardContent
              sx={{ padding: "0px", position: "relative", height: "100%" }}
            >
              <Typography
                sx={{
                  fontSize: "18px",
                  textTransform: "capitalize",
                  fontWeight: "600",
                  textAlign: "center",
                  position: "absolute",
                  top: "20%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  zIndex: "10",
                  background: "white",
                  padding: "3px 76px",
                  width: "max-content",
                  cursor: "pointer",
                }}
              >
                East Godavari
              </Typography>
              <img
                className="card-image"
                src="assets/images/properties/Godavari_old_and_new_bridges.jpg"
                alt="Property"
                style={{
                  width: "100%",
                  height: "300px",
                  objectFit: "cover",
                  borderRadius: "5px",
                }}
              />
            </CardContent>
          </Card>
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          {localLoading && <CircularProgress />}
        </div>
      </div>

      {LocalProperies?.length > 0 && (
        <Grid container spacing={1} sx={{ marginTop: "20px" }}>
          <div>
            <hr style={{ margin: "10px 0px" }} />
            <Typography
              variant="h6"
              sx={{ marginLeft: "30px", textTransform: "capitalize" }}
            >
              {LocalProperies[0].district}
            </Typography>
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                flexWrap: "wrap",
                // justifyContent: "center",
              }}
            >
              {LocalProperies?.filter((item) => item.price !== 0)?.map(
                (item, index) => (
                  <Card
                    key={index}
                    sx={{
                      flex: "0 0 auto",
                      cursor: "pointer",
                      height: "auto",
                      width: "320px",
                      position: "relative",
                      padding: "0px",
                      borderRadius: "5px",
                      margin: "30px 0px",
                    }}
                    onClick={() => handleClick(item.p_id)}
                  >
                    <CardContent sx={{ padding: "0px" }}>
                      <Box
                        component="img"
                        src={
                          item?.prop_images && item.prop_images.length > 0
                            ? item.prop_images[0]
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
                            background: "rgba(0, 0, 0, 0.5)",
                            color: "white",
                          }}
                        >
                          <CurrencyFormatter
                            value={item?.unit_price}
                            currency="INR"
                          />{" "}
                          / {item?.unit}
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
                          <LocationOnIcon sx={{ color: "#0b6c00" }} />
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
                          <Typography
                            className=""
                            sx={{
                              width: "-webkit-fill-available",
                              fontSize: "14px",
                              textTransform: "capitalize",
                              fontWeight: "600",
                              color: "black",
                            }}
                          >
                            <Paper
                        sx={{
                          fontWeight: "600",
                          position: "absolute",
                          padding: "10px",
                          top: "160px",
                          right: "0",
                          borderRadius: "0px 5px 5px 0px",
                          boxShadow: "none",
                          background: "rgba(0, 0, 0, 0.5)",
                          color: "white",
                        }}
                      >
                        <Typography>
                          {item?.p_created_on &&
                            `${calculateDaysAgo(item.p_created_on)} days ago`}
                        </Typography>
                      </Paper>
                            
                          </Typography>
                        </Box>
                      </div>
                    </CardContent>
                  </Card>
                )
              )}
            </div>
          </div>
        </Grid>
      )}
     <div style={{display:"flex",justifyContent:"space-evenly", flexWrap:"wrap"}}>
        
          <Card
            sx={{
              borderRadius: "5px",
              height: "210px",
              width: "250px",
              backgroundColor: "#f8f8f8",
              boxShadow: "none",
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
              margin:"10px",
              cursor: "pointer",
            }}
            onClick={() => {
              CardClick("plot");
            }}
          >
            <CardContent
              sx={{
                height: "200px",
                width: "250px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  padding: "20px",
                  border: "2px dotted #FACF39",
                  height: "180px",
                  width: "230px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "white",
                  transition: "background-color 0.3s ease",
                  "&:hover": {
                    backgroundColor: "#FACF39",
                    "& .circular-box": {
                      backgroundColor: "#FFFFFF",
                    },
                    "& .text": {
                      color: "#FFFFFF",
                    },
                  },
                }}
              >
                <Box
                  className="circular-box"
                  sx={{
                    height: "100px",
                    width: "100px",
                    borderRadius: "50%",
                    border: "2px dotted #FACF39",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    transition: "background-color 0.3s ease",
                    backgroundColor: "transparent",
                  }}
                >
                  <img
                    src="assets/icons/icon-villa.png"
                    style={{ height: "auto", width: "60px" }}
                  />
                </Box>
                <Typography
                  className="text"
                  sx={{
                    margin: "10px 0px 0px 0px",
                    fontSize: "14px",
                    fontWeight: "700",
                    textAlign: "center",
                    transition: "color 0.3s ease",
                  }}
                >
                  Plots
                </Typography>
                <Typography
                  className="text"
                  sx={{
                    fontWeight:"600",
                    fontSize: "14px",
                    textAlign: "center",
                    transition: "color 0.3s ease",
                  }}
                >
                 {Stats.plots_count}
                </Typography>
              </Box>
            </CardContent>
          </Card>
      
        
          <Card
            onClick={() => {
              CardClick("land");
            }}
            sx={{
              cursor: "pointer",
              borderRadius: "5px",
              height: "210px",
              width: "250px",
              backgroundColor: "#f8f8f8",
              boxShadow: "none",
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
              margin:"10px",
              alignItems: "center",
            }}
          >
            <CardContent
              sx={{
                height: "200px",
                width: "250px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  padding: "20px",
                  border: "2px dotted #FACF39",
                  height: "180px",
                  width: "230px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#ffffff",
                  transition: "background-color 0.3s ease",
                  "&:hover": {
                    backgroundColor: "#FACF39",
                    "& .circular-box": {
                      backgroundColor: "#FFFFFF",
                    },
                    "& .text": {
                      color: "#FFFFFF",
                    },
                  },
                }}
              >
                <Box
                  className="circular-box"
                  sx={{
                    height: "100px",
                    width: "100px",
                    borderRadius: "50%",
                    border: "2px dotted #FACF39",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    transition: "background-color 0.3s ease",
                    backgroundColor: "transparent",
                  }}
                >
                  <img
                    src="assets/icons/icon-farmland.png"
                    style={{ height: "auto", width: "60px" }}
                  />
                </Box>
                <Typography
                  className="text"
                  sx={{
                    margin: "10px 0px",
                    fontSize: "14px",
                    fontWeight: "700",
                    textAlign: "center",
                    transition: "color 0.3s ease",
                  }}
                >
                  Agricultural Land
                </Typography>
                <Typography
                  className="text"
                  sx={{
                    fontWeight:"600",
                    fontSize: "14px",
                    textAlign: "center",
                    transition: "color 0.3s ease",
                  }}
                >
                 {Stats.agricultural_count}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        
          <Card
            sx={{
              cursor: "pointer",
              borderRadius: "5px",
              height: "210px",
              width: "250px",
              backgroundColor: "#f8f8f8",
              boxShadow: "none",
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
              margin:"10px",
              alignItems: "center",
            }}
            onClick={() => {
              CardClick("commercial");
            }}
          >
            <CardContent
              sx={{
                height: "200px",
                width: "250px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  padding: "20px",
                  border: "2px dotted #FACF39",
                  height: "180px",
                  width: "230px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#ffffff",
                  transition: "background-color 0.3s ease",
                  "&:hover": {
                    backgroundColor: "#FACF39",
                    "& .circular-box": {
                      backgroundColor: "#FFFFFF",
                    },
                    "& .text": {
                      color: "#FFFFFF",
                    },
                  },
                }}
              >
                <Box
                  className="circular-box"
                  sx={{
                    height: "100px",
                    width: "100px",
                    borderRadius: "50%",
                    border: "2px dotted #FACF39",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    transition: "background-color 0.3s ease",
                    backgroundColor: "transparent",
                  }}
                >
                  <img
                    src="assets/icons/icon-commercial.png"
                    style={{ height: "auto", width: "60px" }}
                  />
                </Box>
                <Typography
                  className="text"
                  sx={{
                    margin: "10px 0px",
                    fontSize: "14px",
                    fontWeight: "700",
                    textAlign: "center",
                    transition: "color 0.3s ease",
                  }}
                >
                  Commercial
                </Typography>
                <Typography
                  className="text"
                  sx={{
                    fontWeight:"600",
                    fontSize: "14px",
                    textAlign: "center",
                    transition: "color 0.3s ease",
                  }}
                >
                 {Stats.commercial_count}
                </Typography>
              </Box>
            </CardContent>
          </Card>
       
          <Card
            sx={{
              cursor: "pointer",
              borderRadius: "5px",
              height: "210px",
              width: "250px",
              backgroundColor: "#f8f8f8",
              boxShadow: "none",
              justifyContent: "center",
              alignItems: "center",
              margin:"10px",
              display: "flex",
              alignItems: "center",
            }}
            onClick={() => {
              CardClick("flat");
            }}
          >
            <CardContent
              sx={{
                height: "200px",
                width: "250px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  padding: "20px",
                  border: "2px dotted #FACF39",
                  height: "180px",
                  width: "230px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#ffffff",
                  transition: "background-color 0.3s ease",
                  "&:hover": {
                    backgroundColor: "#FACF39",
                    "& .circular-box": {
                      backgroundColor: "#FFFFFF",
                    },
                    "& .text": {
                      color: "#FFFFFF",
                    },
                  },
                }}
              >
                <Box
                  className="circular-box"
                  sx={{
                    height: "100px",
                    width: "100px",
                    borderRadius: "50%",
                    border: "2px dotted #FACF39",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    transition: "background-color 0.3s ease",
                    backgroundColor: "transparent",
                  }}
                >
                  <img
                    src="assets/icons/icon-apartment (1).png"
                    style={{ height: "auto", width: "60px" }}
                  />
                </Box>
                <Typography
                  className="text"
                  sx={{
                    margin: "10px 0px",
                    fontSize: "14px",
                    fontWeight: "700",
                    textAlign: "center",
                    transition: "color 0.3s ease",
                  }}
                >
                  Flats
                </Typography>
                <Typography
                  className="text"
                  sx={{
                   fontWeight:"600",
                    fontSize: "14px",
                    textAlign: "center",
                    transition: "color 0.3s ease",
                  }}
                >
                 {Stats.flats_count}
                </Typography>
              </Box>
            </CardContent>
          </Card>
  </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        {HomePropertiesLoader && <CircularProgress />}
      </div>
      {HomeProperties?.length > 0 && (
        <Grid container spacing={1} sx={{ marginTop: "20px" }}>
          <div>
            <hr style={{ margin: "10px 0px" }} />
            <Typography
              variant="h6"
              sx={{ marginBottom: "10px", textTransform: "capitalize" }}
            >
              {/* {HomeProperties[0].district} */}
            </Typography>
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                flexWrap: "wrap",
                // justifyContent: "center",
              }}
            >
              {HomeProperties?.filter((item) => item.price !== 0)?.map(
                (item, index) => (
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
                      margin: "3px 0px",
                    }}
                    onClick={() => handleClick(item.p_id)}
                  >
                    <CardContent sx={{ padding: "0px" }}>
                      <Box
                        component="img"
                        src={
                          item?.prop_images && item.prop_images.length > 0
                            ? item.prop_images[0]
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
                            background: "rgba(0, 0, 0, 0.5)",
                            color: "white",
                          }}
                        >
                          <CurrencyFormatter
                            value={item?.unit_price}
                            currency="INR"
                          />{" "}
                          / {item?.unit}
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
                          <LocationOnIcon sx={{ color: "#0b6c00" }} />
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
                          <Typography
                            className=""
                            sx={{
                              width: "-webkit-fill-available",
                              fontSize: "14px",
                              textTransform: "capitalize",
                              fontWeight: "600",
                              color: "black",
                            }}
                          >
                            <Button>
                              {item?.p_created_on &&
                                `${calculateDaysAgo(
                                  item.p_created_on
                                )} days ago`}
                            </Button>
                          </Typography>
                        </Box>
                      </div>
                    </CardContent>
                  </Card>
                )
              )}
            </div>
          </div>
        </Grid>
      )}

      <Grid container spacing={1} sx={{ marginTop: "20px" }}>
        {recentTransactions.length > 0 && (
          <div>
            <hr style={{ margin: "10px 0px" }} />
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Typography
                sx={{
                  marginBottom: "10px",
                  fontWeight: "bold",
                  fontSize: "2.5rem",
                }}
              >
                Recent  Properties
              </Typography>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                flexWrap: "wrap",
                // justifyContent: "center",
              }}
            >
              {recentTransactions
                ?.filter((item) => item.price !== 0)
                ?.map((item, index) => (
                  <Card
                    key={index}
                    sx={{
                      flex: "0 0 auto",
                      cursor: "pointer",
                      height: "auto",
                      width: "320px",
                      position: "relative",
                      padding: "0px",
                      borderRadius: "5px",
                      margin: "30px 0px",
                    }}
                    onClick={() => handleClick(item.property_id)}
                  >
                    <CardContent
                      sx={{ padding: "0px" }}
                      className="recentcards"
                    >
                      <Box
                        component="img"
                        src={
                          item?.prop_images && item.prop_images.length > 0
                            ? item.prop_images[0]
                            : DefaultImg
                        }
                        alt="Property"
                        sx={{
                          paddingBottom: "0px",
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
                            background: "rgba(0, 0, 0, 0.5)",
                            color: "white",
                          }}
                        >
                          <CurrencyFormatter
                            value={item?.unit_price}
                            currency="INR"
                          />{" "}
                          / {item?.unit}
                        </Paper>
                      )}
                      <div>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "right",
                            position: "absolute",
                            right: "0",
                            top: "159px",
                          }}
                        >
                          <Paper
                            sx={{
                              fontWeight: "600",
                              position: "absolute",
                              padding: "10px",

                              borderRadius: "5px 0px 0px 0px",
                              background: "rgba(0, 0, 0, 0.5)",
                              color: "white",
                              width: "max-content",
                            }}
                          >
                            {`${
                              item?.listing_type === "buy"
                                ? "Wanted"
                                : `${item?.listing_type}ing`
                            }, ${item?.area}${item?.unit}s ${item?.prop_type}`}
                          </Paper>
                          {/* <Button
                            variant="contained"
                            sx={{
                              // background: "#f1eeee",
                              borderRadius: "5px 0px 0px 0px",
                              margin: "5px 0px",
                            }}
                          >
                            {item?.p_created_on &&
                              `${calculateDaysAgo(item.p_created_on)} days ago`}
                          </Button> */}
                        </div>
                        <Typography
                          sx={{
                            fontSize: "15px",
                            textTransform: "capitalize",
                            fontWeight: "500",
                            margin: "3px 0px 0px 5px",
                            fontWeight: "700",
                            // color:"#0b6c00"
                          }}
                        >
                          {`${
                            item?.listing_type === "buy"
                              ? "Wanted"
                              : `${item?.listing_type}ing`
                          }, ${item?.area}${item?.unit}s ${item?.prop_type}`}
                        </Typography>
                        <Box sx={{ display: "flex", margin: "5px 0px" }}>
                          <LocationOnIcon sx={{ color: "#0b6c00" }} />
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
                          {/* <Typography
                            className=""
                            sx={{
                              width: "-webkit-fill-available",
                              fontSize: "14px",
                              textTransform: "capitalize",
                              fontWeight: "600",
                              color: "black",
                            }}
                          ></Typography> */}
                        </Box>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        )}
      </Grid>
    </Box>
  );
};

export default PropertyHome;
