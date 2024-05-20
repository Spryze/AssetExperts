import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {  fetchRecentTransactions, selectRecentTransactions,selectSearchResults,} from "../PropertySlice1";
import { Card,CardContent,Typography,Grid,Box,Tooltip} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SearchDialogue from "../SearchDialogue";


const PropertyHome = () => {
  const dispatch = useDispatch();
  const recentTransactions = useSelector(selectRecentTransactions);
  const searchResults = useSelector(selectSearchResults);


  useEffect(() => {
    dispatch(fetchRecentTransactions());
  }, [dispatch]);

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
    <Box sx={{ margin: "20px" }}>
      <SearchDialogue/>
      <Grid container spacing={1} sx={{ margin: "0" }}>
        {searchResults && (
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
        {Transactions && (
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
