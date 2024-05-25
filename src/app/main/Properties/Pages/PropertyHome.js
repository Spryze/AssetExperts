import React, { useEffect, useState } from "react";
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
  Typography,
  Grid,
  Box,
  Tooltip,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SearchDialogue from "../SearchDialogue";
import { ToastContainer, toast } from "react-toastify";
// import 'react-toastify/dist/';
import "react-toastify/dist/ReactToastify.css";

const PropertyHome = () => {
  const dispatch = useDispatch();
  const recentTransactions = useSelector(selectRecentTransactions);
  const searchResults = useSelector(selectSearchResults);
  const [searchCriteria, setSearchCriteria] = useState({});
  const [noDataFound, setNoDataFound] = useState(false);
  console.log("noDataFound",noDataFound)


  const DataNotFound = (response) => {
    if (!response || Object.keys(response).length === 0) {
      setNoDataFound(true);
      setTimeout(() => {
        setNoDataFound(false);
      }, 3000);
    } else {
      setNoDataFound(false);
    }
  };
  
  
  useEffect(() => {
    dispatch(fetchRecentTransactions());
  }, [dispatch]);

  const handleSearch = (criteria) => {
    console.log("criteria",criteria)
    setSearchCriteria(criteria);
    dispatch(SearchResults(criteria))
    .then((response) => {
      console.log("response",response)
      if (response.payload.data.property === 0) {
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

  const shuffleArray = (array) => {
    if (!array) return [];
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };
  const Transactions = shuffleArray(
    recentTransactions?.property?.buy_properties.concat(
      recentTransactions?.property?.sell_properties
    ) || []
  );

  return (
    <Box sx={{ margin: "20px", position:"relative" }}>
      
      <SearchDialogue onSearch={DataNotFound} />

      
       {noDataFound && (
      <Typography variant="h6" sx={{ backgroundColor: "orange", padding: "10px 50px",textAlign:'center', borderRadius: "5px",transform: "translate(-50%, -50%)", color: "white", position:"absolute", top:"20px",left:"50%" }}>
        No Data Found
      </Typography>
    )}
      <Grid container spacing={1} sx={{ margin: "0" }}>
       
        {Object.keys(searchResults).length > 0 && (
          <div>
            <Typography variant="h6">Search Results</Typography>
            <hr style={{ margin: "10px 0px" }} />
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              {searchResults.map((item, index) => (
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
                      <img
                        src={item?.prop_images[0]}
                        alt="Property"
                        style={{ width: "100%", height: "200px", objectFit: "cover" }}
                      />
                      <Typography
                        sx={{
                          fontSize: "20px",
                          textTransform: "capitalize",
                          marginLeft: "25px",
                          fontWeight: "500",
                          marginTop: "10px",
                        }}
                      >{`${item?.listing_type}ing, ${item?.area}${item?.unit}s ${item?.prop_type}`}</Typography>
                      <div style={{ display: "flex", marginTop: "5px" }}>
                        <LocationOnIcon sx={{ color: "orange" }} />
                        <Typography sx={{ fontSize: "14px" }}>
                          {`${item?.landmark}, ${item?.district}`}
                        </Typography>
                      </div>
                    </CardContent>
                  </Card>
                </Tooltip>
              ))}
            </div>
          </div>
        )}
      </Grid>
      <Grid container spacing={1} sx={{ margin: "0" }}>
        {Transactions.length > 0 && (
          <div>
            <Typography variant="h6">Recent Properties</Typography>
            <hr style={{ margin: "10px 0px" }} />
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              {Transactions.map((item, index) => (
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
                      <img
                        src={item?.prop_images[0]}
                        alt="Property"
                        style={{
                          width: "100%",
                          height: "200px",
                          objectFit: "cover",
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
                      >{`${item?.listing_type}ing, ${item?.area}${item?.unit}s ${item?.prop_type}`}</Typography>
                      <div style={{ display: "flex", marginTop: "5px" }}>
                        <LocationOnIcon sx={{ color: "orange" }} />
                        <Typography sx={{ fontSize: "14px" }}>
                          {`${item?.landmark}, ${item?.district}`}
                        </Typography>
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