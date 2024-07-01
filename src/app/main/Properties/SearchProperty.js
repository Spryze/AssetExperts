import React from "react";
import { useDispatch } from "react-redux";
import {
  Button,
  TextField,
  MenuItem,
  Grid,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import {
  fetchPropertyDetails,
  setSelectedProperty,
} from "app/store/propertySlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Paper from "@mui/material/Paper";
import ShareIcon from "@mui/icons-material/Share";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
const SearchProperty = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const PropertyTypes = [
    "Plots",
    "Flats",
    "Lands",
    "WareHouses",
    "PG",
    "OfficePlace",
    "CoWorkingPlace",
    "StudentHostels",
    "AgriculturalLands",
    "Apartment",
    "IndependentHouse",
  ];

  const [expanded, setExpanded] = useState(false);
  const [open, setOpen] = useState(false);
  const [showFullText, setShowFullText] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const toggleShowFullText = (e) => {
    e.stopPropagation();
    setShowFullText(!showFullText);
  };

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const handleCardClick = async (property_id) => {
    try {
      console.log(property_id);
      const actionResult = await dispatch(fetchPropertyDetails(property_id));

      // Check if the fetch operation was successful
      if (fetchPropertyDetails.fulfilled.match(actionResult)) {
        navigate("/properties");
      } else {
        console.error("Error fetching property details:", actionResult.error);
      }
    } catch (error) {
      console.error("Error fetching property details:", error);
    }
  };

  const [searchQuery, setSearchQuery] = useState({
    propertyName: "",
    propertyType: "",
    location: "",
  });
  const [searchData, setSearchData] = useState([]);
  const [showFullDetails, setShowFullDetails] = useState(false);
  const maxCharacters = 5;
  const [showAllPlaces, setShowAllPlaces] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const toggleShowAllPlaces = (e) => {
    e.stopPropagation();
    setDialogOpen(true);
    setShowAllPlaces((prevShowAllPlaces) => !prevShowAllPlaces);
  };
  const handleDialogClose = () => {
    setDialogOpen(false);
  };
  const handleShowMore = (e) => {
    e.stopPropagation();
    setShowFullDetails(!showFullDetails);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchQuery((prevQuery) => ({
      ...prevQuery,
      [name]: value,
    }));
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://db93a4e7-afba-4acc-8fb6-24c6904c08a7-00-wzqnnh54dv12.sisko.replit.dev/search",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(searchQuery),
        }
      );

      if (!response.ok) {
        throw new Error("Search failed");
      }

      const searchData = await response.json();
      console.log(searchData);
      setSearchData(searchData);
    } catch (error) {
      console.error("Error searching properties:", error);
    }
  };

  return (
    <div style={{ margin: "30px" }}>
      <h3>Search Properties</h3>
      <form onSubmit={handleSearch}>
        <TextField
          name="propertyName"
          label="Property Name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={searchQuery.propertyName}
          onChange={handleChange}
        />
        <TextField
          select
          name="propertyType"
          label="Property Type"
          variant="outlined"
          fullWidth
          margin="normal"
          value={searchQuery.propertyType}
          onChange={handleChange}
        >
          {PropertyTypes?.map((type) => (
            <MenuItem key={type} value={type}>
              {type}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          name="location"
          label="Location"
          variant="outlined"
          fullWidth
          margin="normal"
          value={searchQuery.location}
          onChange={handleChange}
        />
        <Button
          type="submit"
          // sx={{
          //   padding: "10px 40px",
          //   backgroundColor: "#FF6600",
          //   borderRadius: "2px",
          //   margin: "20px 10px 0",
          // }}
        >
          Search Properties
        </Button>
      </form>

      <Grid container spacing={2} sx={{ margin: "20px 0" }}>
        {searchData?.map((result, index) => (
          <Grid  key={index} xs={12} sm={6} md={8}>
            <Card
              sx={{ height: "100%", cursor: "pointer" }}
              onClick={() => handleCardClick(result.property_id)}
            >
              <CardContent sx={{ display: "flex" }}>
                <img
                  src={result.Propertyimages[0]}
                  style={{
                    height: "auto",
                    width: "200px",
                    borderRadius: "10px",
                  }}
                  alt="Property"
                />
                <div style={{ margin: "20px" }}>
                  <Typography sx={{ display: "flex" }}>
                    ₹{result.price}{" "}
                    <span
                      style={{
                        color: "#5E23DC",
                        marginLeft: "20px",
                        display: "flex",
                      }}
                    >
                      Emi Starts at ₹{result.emiprice}
                    </span>{" "}
                    <span style={{ float: "right" }}>
                      <ShareIcon />
                      <FavoriteBorderIcon />{" "}
                    </span>
                  </Typography>
                  <Typography variant="h6" component="div">
                    {result.PropertyName}
                  </Typography>

                  <Typography sx={{ fontSize: "12px" }}>
                    Marketed by {result.propertyDeveloper}
                  </Typography>
                  <div>
                    <Paper
                      sx={{
                        display: "flex",
                        borderRadius: "8px",
                        marginTop: "10px",
                      }}
                    >
                      {result.propertyOverview?.map((item, index) => (
                        <div key={index}>
                          {Object.keys(item).map((key) => (
                            <div key={key}>
                              <p style={{ fontSize: "10px", margin: "5px" }}>
                                {key}:{" "}
                                {showFullDetails
                                  ? item[key]
                                  : `${item[key].slice(0, maxCharacters)}...`}
                              </p>
                            </div>
                          ))}
                        </div>
                      ))}
                      {result.propertyOverview?.some((item) =>
                        Object.values(item).some(
                          (val) => val.length > maxCharacters
                        )
                      ) && (
                        <Button
                          onClick={(e) => handleShowMore(e)}
                          // sx={{
                          //   "&:hover": {
                          //     backgroundColor: "transparent",
                          //   },
                          // }}
                        >
                          {showFullDetails ? (
                            <KeyboardArrowUpIcon sx={{ padding: "0" }} />
                          ) : (
                            <KeyboardArrowDownIcon sx={{ padding: "0" }} />
                          )}
                        </Button>
                      )}
                    </Paper>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ marginTop: "10px", fontSize: "12px" }}
                    >
                      {expanded
                        ? result.AboutProject
                        : result.AboutProject.substring(0, 80) + "..."}

                      {/* {!expanded && result.AboutProject.length > 80 && (
                        <span
                          style={{
                            cursor: "pointer",
                            color: "#007BFF",
                            marginLeft: "5px",
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleExpanded();
                          }}
                        >
                          {expanded ? "See Less" : "See More"}
                        </span>
                      )} */}

                      <span style={{ color: "#0000FF" }} onClick={handleOpen}>
                        See More
                      </span>
                      <Dialog
                        open={open}
                        onClose={handleClose}
                        BackdropProps={{
                          invisible: true,
                        }}
                        sx={{
                          "& .MuiPaper-root": {
                            boxShadow: "none",
                            width: "500px",
                            top: "0px",
                          },
                        }}
                      >
                        <DialogContent>
                          <p style={{ fontSize: "12px" }}>
                            {result.AboutProject}
                          </p>
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={handleClose}>Close</Button>
                        </DialogActions>
                      </Dialog>
                    </Typography>
                    <Typography sx={{ fontSize: "12px", display: "flex" }}>
                      5 nearby places:{" "}
                      {showAllPlaces
                        ? result.AroundProject.map((item, i) => (
                            <div key={i}>
                              <p
                                style={{
                                  background: "#F6F5F3",
                                  margin: "0 5px",
                                  padding: "0 3px",
                                }}
                              >
                                {item.category} : {item.name}
                              </p>
                            </div>
                          ))
                        : result.AroundProject.slice(0, 2).map((item, i) => (
                            <div key={i}>
                              <p
                                style={{
                                  background: "#F6F5F3",
                                  margin: "0 5px",
                                  padding: "0 3px",
                                }}
                              >
                                {item.category} : {item.name}
                              </p>
                            </div>
                          ))}
                      {result.AroundProject.length > 2 && (
                        <span
                          style={{
                            cursor: "pointer",
                            color: "#007BFF",
                            marginLeft: "5px",
                          }}
                          onClick={toggleShowAllPlaces}
                        >
                          { "See more"}
                        </span>
                      )}
                    </Typography>
                    <Dialog
                      open={dialogOpen}
                      onClose={handleDialogClose}
                      BackdropProps={{
                        invisible: true,
                      }}
                      sx={{
                        "& .MuiPaper-root": {
                          boxShadow: "none",
                          width: "500px",
                          top: "0px",
                        },
                      }}
                    >
                      <DialogTitle>More Nearby Places</DialogTitle>
                      <DialogContent>
                        {result?.AroundProject?.slice(0, 5).map((item, i) => (
                          <p key={i}>
                            {item.category} : {item.name}
                          </p>
                        ))}
                      </DialogContent>

                      <DialogActions>
                        <Button onClick={handleDialogClose}>Close</Button>
                      </DialogActions>
                    </Dialog>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default SearchProperty;
