import React, { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchRecentTransactions,
  selectRecentTransactions,
  selectNormalSearchResults,
  SearchResults,
  selectnormaltotalResults,
  LocalResults,
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
import { selectUser } from "app/store/userSlice";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SearchDialogue from "../SearchDialogue";
import DefaultImg from "src/assets/Default/DegaultImg.gif";
import CircularProgress from "@mui/material/CircularProgress";
import { differenceInDays, parseISO } from "date-fns";
import SubmitIntrests from "../property-components/SubmitIntrests";

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
  const recentTransactions = useSelector(selectRecentTransactions);
  console.log("recentTransactions", recentTransactions);
  const searchResults = useSelector(selectNormalSearchResults);
  console.log("searchResults", searchResults);
  const [formData, setformData] = useState(null);
  const [noDataFound, setNoDataFound] = useState(false);
  const [offset, setoffset] = useState(0);
  const [page, setPage] = useState(0);
  const [Loading, setLoading] = useState(false);
  const isAdminSearch = false;
  const total_properties = useSelector(selectnormaltotalResults);
  const PropertyState = "ExistingProperty";
  const [LocalProperies, setLocalProperties] = useState();
  const [localLoading, setLocalLoading] = useState(false);
  console.log("LocalProperies", LocalProperies);

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
    if (!response || response.properties.length === 0) {
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
        setPage((prevPage) => prevPage + 1);
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
            state: "andhra pradesh",
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

  useEffect(() => {}, [user]);
  useEffect(() => {
    dispatch(fetchRecentTransactions(page));
  }, [dispatch, page]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // const handleSearch = (criteria) => {
  //   setSearchCriteria(criteria);
  //   dispatch(SearchResults(criteria))
  //     .then((response) => {
  //       if (response.payload.data.property.length === 0) {
  //         setNoDataFound(true);
  //       } else {
  //         setNoDataFound(false);
  //       }
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching search results:", error);
  //     });
  // };

  const handleClick = (propertyId) => {
    const newWindow = window.open(`/property/${propertyId}`, "_blank");
    if (newWindow) {
      newWindow.focus();
    } else {
      console.error("Unable to open new window/tab");
    }
  };

  return (
    <Box sx={{ margin: "20px", position: "relative" }}>
      <Box
        sx={{
          background:
            "linear-gradient(16deg, rgba(225,240,218,1) 0%, rgba(255,255,255,1) 100%);",
          // height: "60vh",
          width: "100%",
          maxWidth: "100%",
          borderRadius: "30px",
          position: "relative",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Grid container spacing={2} sx={{ width: "100%" }}>
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box sx={{ textAlign: "center" }}>
              <h1 className="BigText">Easy Way To Find a Perfect Property</h1>
              <p
                style={{
                  fontSize: "20px",
                  textAlign: "left",
                  margin: "20px 0 0 30px",
                }}
              >
                We provide a complete service for the sale, purchase of real
                estate..
              </p>
            </Box>
          </Grid>
          <Grid item xs={12} md={6} sx={{ position: "relative" }}>
            <img
              className="HomeImage"
              src="/assets/images/properties/pexels-binyaminmellish-1396122-removebg-preview copy.png"
              alt="Girl in a jacket"
              style={{
                position: "absolute",
                bottom: "-191px",
                right: "-33px",
                maxWidth: "100%",
              }}
            />
          </Grid>
          <SearchDialogue
            FormData={HandleFormData}
            onSearch={DataNotFound}
            isAdminSearch={isAdminSearch}
          />
        </Grid>
      </Box>

      {noDataFound && (
        <Typography
          variant="h6"
          sx={{
            backgroundColor: "orange",
            padding: "10px 50px",
            textAlign: "center",
            borderRadius: "5px",
            color: "white",
            position: "fixed",
            top: "100px",
            left: "50%",
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
            <Typography variant="h6">
              Search Results({total_properties})
            </Typography>
            <hr style={{ margin: "10px 0px" }} />
            <div
              style={{
                display: "flex",
                gap: "10px",
                flexWrap: "wrap",
                justifyContent: "center",
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
                      width: "300px",
                      position: "relative",
                      padding: "0px",
                      borderRadius: "5px",
                      margin: "3px 0px",
                    }}
                    onClick={() => handleClick(item.property_id)}
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
                          {" "}
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
                        </Box>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
            {Loading && (
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                {" "}
                <CircularProgress />{" "}
              </Box>
            )}
            <Box sx={{ display: "flex", justifyContent: "end" }}>
              {" "}
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
              handleLocalClick("srikakulam");
            }}
            sx={{
              flex: "0 0 auto",
              width: "250px",
              height: "400px",
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
                  height: "400px",
                  objectFit: "cover",
                  borderRadius: "5px",
                }}
              />
            </CardContent>
          </Card>
          <Card
            onClick={() => {
              handleLocalClick("visakhapatnam");
            }}
            sx={{
              flex: "0 0 auto",
              width: "250px",
              height: "400px",
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
                  height: "400px",
                  objectFit: "cover",
                  borderRadius: "5px",
                }}
              />
            </CardContent>
          </Card>
          <Card
            onClick={() => {
              handleLocalClick("vizianagaram");
            }}
            sx={{
              flex: "0 0 auto",
              width: "250px",
              height: "400px",
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
                  height: "400px",
                  objectFit: "cover",
                  borderRadius: "5px",
                }}
              />
            </CardContent>
          </Card>
          <Card
            onClick={() => {
              handleLocalClick("east godavari");
            }}
            sx={{
              flex: "0 0 auto",
              width: "250px",
              height: "400px",
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
                  height: "400px",
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
      <Grid container spacing={2} className="Plot&LandCards">
        <Grid item xs = {12} md = {3} sm ={6}>
          <Card
            sx={{
              borderRadius: "5px",
              height: "210px",
              width: "250px",
              backgroundColor: "#d0f3cc",
              boxShadow: "none",
              justifyContent: "center",
              alignItems:"center",
              display: "flex",
              alignItems: "center",
              cursor:"pointer",
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
                  border: "2px dotted #91f387",
                  height: "180px",
                  width: "230px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#E1F0DA",
                  transition: "background-color 0.3s ease",
                  "&:hover": {
                    backgroundColor: "#053200",
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
                    border: "2px dotted #91f387",
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
                    margin: "10px 0px",
                    fontSize: "14px",
                    fontWeight: "700",
                    textAlign: "center",
                    transition: "color 0.3s ease",
                  }}
                >
                  Plots
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs = {12} md = {3} sm ={6}>
          <Card
            sx={{
              cursor:"pointer",
              borderRadius: "5px",
              height: "210px",
              width: "250px",
              backgroundColor: "#d0f3cc",
              boxShadow: "none",
              justifyContent: "center",
              alignItems:"center",
              display: "flex",
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
                  border: "2px dotted #91f387",
                  height: "180px",
                  width: "230px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#E1F0DA",
                  transition: "background-color 0.3s ease",
                  "&:hover": {
                    backgroundColor: "#053200",
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
                    border: "2px dotted #91f387",
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
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs = {12} md = {3} sm ={6}>
          <Card
            sx={{
              cursor:"pointer",
              borderRadius: "5px",
              height: "210px",
              width: "250px",
              backgroundColor: "#d0f3cc",
              boxShadow: "none",
              justifyContent: "center",
              alignItems:"center",
              display: "flex",
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
                  border: "2px dotted #91f387",
                  height: "180px",
                  width: "230px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#E1F0DA",
                  transition: "background-color 0.3s ease",
                  "&:hover": {
                    backgroundColor: "#053200",
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
                    border: "2px dotted #91f387",
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
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs = {12} md = {3} sm ={6}>
          <Card
            sx={{
              cursor:"pointer",
              borderRadius: "5px",
              height: "210px",
              width: "250px",
              backgroundColor: "#d0f3cc",
              boxShadow: "none",
              justifyContent: "center",
              alignItems:"center",
              display: "flex",
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
                  border: "2px dotted #91f387",
                  height: "180px",
                  width: "230px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#E1F0DA",
                  transition: "background-color 0.3s ease",
                  "&:hover": {
                    backgroundColor: "#053200",
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
                    border: "2px dotted #91f387",
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
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {LocalProperies?.length > 0 && (
        <Grid container spacing={1} sx={{ marginTop: "20px" }}>
          <div>
            <hr style={{ margin: "10px 0px" }} />
            <Typography
              variant="h6"
              sx={{ marginBottom: "10px", textTransform: "capitalize" }}
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
                      width: "300px",
                      position: "relative",
                      padding: "0px",
                      borderRadius: "5px",
                      margin: "3px 0px",
                    }}
                    onClick={() => handleClick(item.property_id)}
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
                            value={item?.price}
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
            <Typography variant="h6" sx={{ marginBottom: "10px" }}>
              Recent Properties
            </Typography>
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
                      width: "300px",
                      position: "relative",
                      padding: "0px",
                      borderRadius: "5px",
                      margin: "3px 0px",
                    }}
                    onClick={() => handleClick(item.property_id)}
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
                        <div
                          style={{ display: "flex", justifyContent: "right" }}
                        >
                          <Button
                            variant="contained"
                            sx={{
                              background: "#f1eeee",
                              borderRadius: "5px 0px 0px 5px",
                              margin: "5px 0px",
                            }}
                          >
                            {item?.p_created_on &&
                              `${calculateDaysAgo(item.p_created_on)} days ago`}
                          </Button>
                        </div>
                        <Typography
                          sx={{
                            fontSize: "15px",
                            textTransform: "capitalize",
                            fontWeight: "500",
                            margin: "2px 0px 0px 10px",
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
                          ></Typography>
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
