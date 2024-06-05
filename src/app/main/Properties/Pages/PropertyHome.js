// import React, { useEffect, useState, useCallback } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import {
//   fetchRecentTransactions,
//   selectRecentTransactions,
//   selectSearchResults,
//   SearchResults,
// } from "../PropertySlice1";
// import {
//   Card,
//   CardContent,
//   Typography,
//   Grid,
//   Box,
//   Tooltip,
// } from "@mui/material";
// import LocationOnIcon from "@mui/icons-material/LocationOn";
// import SearchDialogue from "../SearchDialogue";
// import DefaultImg from "src/assets/Default/DegaultImg.gif";

// const debounce = (func, delay) => {
//   let timer;
//   return (...args) => {
//     clearTimeout(timer);
//     timer = setTimeout(() => {
//       func(...args);
//     }, delay);
//   };
// };

// const PropertyHome = () => {
//   const dispatch = useDispatch();
//   const recentTransactions = useSelector(selectRecentTransactions);
//   console.log("recentTransactions",recentTransactions)
//   const searchResults = useSelector(selectSearchResults);
//   const [searchCriteria, setSearchCriteria] = useState({});
//   const [noDataFound, setNoDataFound] = useState(false);
//   const [page, setPage] = useState(1);

//   console.log("page", page);

//   const DataNotFound = useCallback((response) => {
//     if (!response || Object.keys(response).length === 0) {
//       setNoDataFound(true);
//       setTimeout(() => {
//         setNoDataFound(false);
//       }, 3000);
//     } else {
//       setNoDataFound(false);
//     }
//   }, []);

//   const handleScroll = useCallback(
//     debounce(() => {
//       if (
//         window.innerHeight + window.scrollY >=
//         document.body.offsetHeight - 5
//       ) {
//         setPage((prevPage) => prevPage + 1);
//       }
//     }, 200),
//     []
//   );

//   useEffect(() => {
//     dispatch(fetchRecentTransactions(page));
//   }, [dispatch, page]);

//   useEffect(() => {
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, [handleScroll]);

//   const handleSearch = (criteria) => {
//     setSearchCriteria(criteria);
//     dispatch(SearchResults(criteria))
//       .then((response) => {
//         if (response.payload.data.property.length === 0) {
//           setNoDataFound(true);
//         } else {
//           setNoDataFound(false);
//         }
//       })
//       .catch((error) => {
//         console.error("Error fetching search results:", error);
//       });
//   };

//   const handleClick = (propertyId) => {
//     const newWindow = window.open(`/property/${propertyId}`, "_blank");
//     if (newWindow) {
//       newWindow.focus();
//     } else {
//       console.error("Unable to open new window/tab");
//     }
//   };

//   return (
//     <Box sx={{ margin: "20px", position: "relative" }}>
//       <Box
//         // sx={{
//         //   position: "fixed",
//         //   top: 60,
//         //   left:279,
//         //   width: "100%",
//         //   zIndex: 1000,
//         //   backgroundColor: "white",
//         //   padding: "20px",
//         //   boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
//         // }}
//       >
//         <SearchDialogue onSearch={DataNotFound} />
//       </Box>
//       {noDataFound && (
//         <Typography
//           variant="h6"
//           sx={{
//             backgroundColor: "orange",
//             padding: "10px 50px",
//             textAlign: "center",
//             borderRadius: "5px",
//             color: "white",
//             position: "fixed",
//             top: "60px",
//             left: "50%",
//             transform: "translateX(-50%)",
//             zIndex: 1000,
//           }}
//         >
//           No Data Found
//         </Typography>
//       )}
//       <Grid container spacing={1} sx={{ margin: "0", marginTop: "120px" }}>
//         {Object.keys(searchResults).length > 0 && (
//           <div>
//             <Typography variant="h6">Search Results</Typography>
//             <hr style={{ margin: "10px 0px" }} />
//             <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
//               {searchResults.map((item, index) => (
//                 <Tooltip key={index} title={item.listing_type} sx={{ fontSize: "20px" }}>
//                   <Card
//                     sx={{
//                       flex: "0 0 auto",
//                       cursor: "pointer",
//                       height: "auto",
//                       width: "300px",
//                       position: "relative",
//                     }}
//                     onClick={() => handleClick(item.property_id)}
//                   >
//                     <CardContent>
//                       <Box
//                         component="img"
//                         src={item?.prop_images[0] || DefaultImg}
//                         alt="Property"
//                         sx={{
//                           width: "100%",
//                           height: "200px",
//                           objectFit: "cover",
//                           transition: "transform 0.3s ease-in-out",
//                           "&:hover": {
//                             transform: "scale(1.05)",
//                           },
//                         }}
//                       />
//                       <Typography
//                         sx={{
//                           fontSize: "20px",
//                           textTransform: "capitalize",
//                           marginLeft: "25px",
//                           fontWeight: "500",
//                           marginTop: "10px",
//                         }}
//                       >
//                         {`${item?.listing_type}ing, ${item?.area}${item?.unit}s ${item?.prop_type}`}
//                       </Typography>
//                       <Box sx={{ display: "flex", marginTop: "5px" }}>
//                         <LocationOnIcon sx={{ color: "orange" }} />
//                         <Typography sx={{ fontSize: "14px" }}>
//                           {`${item?.landmark}, ${item?.district}`}
//                         </Typography>
//                       </Box>
//                     </CardContent>
//                   </Card>
//                 </Tooltip>
//               ))}
//             </div>
//           </div>
//         )}
//       </Grid>
//       <div>

//       </div>
//       <Grid container spacing={1} sx={{ margin: "0" }}>
//         {recentTransactions.length > 0 && (
//           <div>
//             <Typography variant="h6">Recent Properties</Typography>
//             <hr style={{ margin: "10px 0px" }} />
//             <div style={{ display: "flex", gap: "10px", flexWrap: "wrap",justifyContent:"center"}}>
//               {recentTransactions.map((item, index) => (
//                 <Tooltip key={index} title={item.listing_type} sx={{ fontSize: "20px" }}>
//                   <Card
//                     sx={{
//                       flex: "0 0 auto",
//                       cursor: "pointer",
//                       height: "auto",
//                       width: "300px",
//                       position: "relative",
//                       padding: "0px",
//                       borderRadius: "5px",
//                     }}
//                     onClick={() => handleClick(item.property_id)}
//                   >
//                     <CardContent sx={{ padding: "0px" }}>
//                       <Box
//                         component="img"
//                         src={item?.prop_images[0] || DefaultImg}
//                         alt="Property"
//                         sx={{
//                           width: "100%",
//                           height: "200px",
//                           objectFit: "cover",
//                           borderRadius: "5px",
//                           transition: "transform 0.3s ease-in-out",
//                           "&:hover": {
//                             transform: "scale(1.05)",
//                           },
//                         }}
//                       />
//                       <div>
//                         <Typography
//                           sx={{
//                             fontSize: "15px",
//                             textTransform: "capitalize",
//                             fontWeight: "500",
//                             margin: "10px 0px 0px 10px",
//                             fontWeight: "600",
//                           }}
//                         >
//                           {`${item?.listing_type === 'buy' ? 'Wanted' : `${item?.listing_type}ing`}, ${item?.area}${item?.unit}s ${item?.prop_type}`}
//                         </Typography>
//                         <Box sx={{ display: "flex" }}>
//                           <LocationOnIcon sx={{ color: "orange" }} />
//                           <Typography sx={{ fontSize: "14px", textTransform: "capitalize", fontWeight: "600", color: "#707273" }}>
//                             {`${item?.landmark}, ${item?.district}`}
//                           </Typography>
//                         </Box>
//                       </div>
//                     </CardContent>
//                   </Card>
//                 </Tooltip>
//               ))}
//             </div>
//           </div>
//         )}
//       </Grid>
//     </Box>
//   );
// };

// export default PropertyHome;

import React, { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchRecentTransactions,
  selectRecentTransactions,
  selectSearchResults,
  SearchResults,
} from "../PropertySlice1";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Box,
  Tooltip,
  Paper,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SearchDialogue from "../SearchDialogue";
import DefaultImg from "src/assets/Default/DegaultImg.gif";

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
  const recentTransactions = useSelector(selectRecentTransactions);
  console.log("recentTransactions", recentTransactions);
  const searchResults = useSelector(selectSearchResults);
  console.log("searchResults", searchResults);
  const [searchCriteria, setSearchCriteria] = useState({});
  const [noDataFound, setNoDataFound] = useState(false);
  const [page, setPage] = useState(1);

  console.log("page", page);
  const transactions = recentTransactions?.property?.buy_properties?.concat(
    recentTransactions?.property?.sell_properties
  );
  console.log("transactions", transactions);
  const DataNotFound = useCallback((response) => {
    if (!response || Object.keys(response).length === 0) {
      setNoDataFound(true);
      setTimeout(() => {
        setNoDataFound(false);
      }, 3000);
    } else {
      setNoDataFound(false);
    }
  }, []);

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

  useEffect(() => {
    dispatch(fetchRecentTransactions(page));
  }, [dispatch, page]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const handleSearch = (criteria) => {
    setSearchCriteria(criteria);
    dispatch(SearchResults(criteria))
      .then((response) => {
        if (response.payload.data.property.length === 0) {
          setNoDataFound(true);
        } else {
          setNoDataFound(false);
        }
      })
      .catch((error) => {
        console.error("Error fetching search results:", error);
      });
  };

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
            "linear-gradient(90deg, rgba(233,233,233,1) 0%, rgba(255,255,255,1) 100%)",
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
          <SearchDialogue onSearch={DataNotFound} />
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
            top: "60px",
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
          <div>
            <Typography variant="h6">Search Results</Typography>
            <hr style={{ margin: "10px 0px" }} />
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              {searchResults?.map((item, index) => (
                <Tooltip
                  key={index}
                  title={item.listing_type}
                  sx={{ fontSize: "20px" }}
                >
                  <Card
                    sx={{
                      flex: "0 0 auto",
                      cursor: "pointer",
                      height: "auto",
                      width: "300px",
                      position: "relative",
                    }}
                    onClick={() => handleClick(item.property_id)}
                  >
                    <CardContent>
                      <Box
                        component="img"
                        src={item?.prop_images[0] || DefaultImg}
                        alt="Property"
                        sx={{
                          width: "100%",
                          height: "200px",
                          objectFit: "cover",
                          transition: "transform 0.3s ease-in-out",
                          "&:hover": {
                            transform: "scale(1.05)",
                          },
                        }}
                      />
                      <Typography
                        sx={{
                          fontSize: "20px",
                          textTransform: "capitalize",
                          marginLeft: "25px",
                          fontWeight: "500",
                          marginTop: "10px",
                        }}
                      >
                        {`${item?.listing_type}ing, ${item?.area}${item?.unit}s ${item?.prop_type}`}
                      </Typography>
                      <Box sx={{ display: "flex", marginTop: "5px" }}>
                        <LocationOnIcon sx={{ color: "orange" }} />
                        <Typography sx={{ fontSize: "14px" }}>
                          {`${item?.landmark}, ${item?.district}`}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Tooltip>
              ))}
            </div>
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
            sx={{
              flex: "0 0 auto",
              width: "250px",
              height: "400px",
              position: "relative",
              borderRadius: "5px",
              justifyContent: "center",
              overflow: "hidden",
              margin:"20px 0"
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
                  background:"white",
                  padding: "3px 76px",

                }}
              >
                Srikakulam
              </Typography>
              <img
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
            sx={{
              flex: "0 0 auto",
              width: "250px",
              height: "400px",
              position: "relative",
              borderRadius: "5px",
              justifyContent: "center",
              overflow: "hidden",
              margin:"20px 0",

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
                  background:"white",
                  padding: "3px 76px",
                }}
              >
                Visakhapatnam
              </Typography>
              <img
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
            sx={{
              flex: "0 0 auto",
              width: "250px",
              height: "400px",
              position: "relative",
              borderRadius: "5px",
              justifyContent: "center",
              overflow: "hidden",
              margin:"20px 0"
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
                  background:"white",
                  padding: "3px 76px",
                }}
              >
                Vizianagaram
              </Typography>
              <img
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
            sx={{
              flex: "0 0 auto",
              width: "250px",
              height: "400px",
              position: "relative",
              borderRadius: "5px",
              justifyContent: "center",
              overflow: "hidden",
              margin:"20px 0",
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
                  background:"white",
                  padding: "3px 76px",
                  width:"max-content"
                }}
              >
                East Godavari
              </Typography>
              <img
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
      </div>
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
              {recentTransactions.map((item, index) => (
                <Tooltip
                  key={index}
                  title={item.listing_type}
                  sx={{ fontSize: "20px" }}
                >
                  <Card
                    sx={{
                      flex: "0 0 auto",
                      cursor: "pointer",
                      height: "auto",
                      width: "300px",
                      position: "relative",
                      padding: "0px",
                      borderRadius: "5px",
                      margin: "30px 0px",
                      
                    }}
                    onClick={() => handleClick(item.property_id)}
                  >
                    <CardContent sx={{ padding: "0px" }}>
                      <Box
                        component="img"
                        src={item?.prop_images[0] || DefaultImg}
                        alt="Property"
                        sx={{
                          width: "100%",
                          position:"relative",
                          height: "200px",
                          objectFit: "cover",
                          borderRadius: "5px",
                          transition: "transform 0.3s ease-in-out",
                          "&:hover": {
                            transform: "scale(1.05)",
                          },
                        }}
                      />
                      {item?.listing_type !== "buy" && (<Paper sx={{fontWeight:"600", position:"absolute",padding:"10px", top:"0",borderRadius:"0px 0px 5px 0px", background: "linear-gradient(90deg, rgba(233,233,233,1) 100%, rgba(255,255,255,1) 100%)"}}>{ "₹" + item?.unit_price}</Paper>)}
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
                        </Box>
                      </div>
                    </CardContent>
                  </Card>
                </Tooltip>
              ))}
            </div>
          </div>
        )}
      </Grid>
    </Box>
  );
};

export default PropertyHome;
