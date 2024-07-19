import React, { useState, useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {Typography,Grid,Table,TableBody,TableCell,TableContainer,TableHead,TableRow,IconButton,} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SearchDialogue from "../SearchDialogue";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import {selectAdminSearchResults,selectadmintotalProperties,SearchResults} from "../PropertySlice1";
import _ from "lodash";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { useLocation } from "react-router-dom";
import { showMessage } from "app/store/rabit/messageSlice";
import Card from "@mui/material/Card";
const ManageProperties = () => {
  const dispatch = useDispatch();
  const searchResults = useSelector(selectAdminSearchResults);
  console.log("admin searchResults",searchResults);
  const totalSearchResults = useSelector(selectadmintotalProperties);
  const isAdminSearch = true;
  const PropertyState = "ExistingProperty";

  const location = useLocation(); 
  console.log("location",location);

  const [noDataFound, setNoDataFound] = useState(false);
  const [expandedRows, setExpandedRows] = useState({});
  const [offset, setOffset] = useState(0);
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [allDataLoaded, setAllDataLoaded] = useState(false); 

  const handleFormData = (data) => {
    console.log("data", data);
    setFormData(data);
    setOffset(0); 
    setAllDataLoaded(false); 
  };

  const handleExpandClick = (index, field) => {
    setExpandedRows((prev) => ({
      ...prev,
      [index]: {
        ...prev[index],
        [field]: !prev[index]?.[field],
      },
    }));
  };

  const dataNotFound = useCallback((response) => {
    console.log("response for nodatafound",response);
    if (!response || response?.properties?.length === 0) {
      setNoDataFound(true);
      setTimeout(() => {
        setNoDataFound(false);
      }, 3000);
    } else {
      setNoDataFound(false);
    }
  }, []);
  
 showMessage('No results Found');
 
  const trimText = (text, index, field) => {
    if (text && text.length > 15) {
      const isExpanded = expandedRows[index]?.[field];
      return (
        <>
          {isExpanded ? text : `${text.substring(0, 15)}... `}
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              handleExpandClick(index, field);
            }}
            size="small"
          >
            <ExpandMoreIcon />
          </IconButton>
        </>
      );
    }
    return text;
  };

  const handleScroll = useCallback(
    _.throttle(() => {
      if (
        !loading &&
        !allDataLoaded && 
        window.innerHeight + document.documentElement.scrollTop >=
          document.documentElement.offsetHeight - 40
      ) {
        setLoading(true);
        const newOffset = offset + 40;
        
        if (newOffset >= totalSearchResults) {
          setAllDataLoaded(true); 
          setLoading(false);
          return;
        }

        dispatch(SearchResults({ formData, offset: newOffset, isAdminSearch: true, PropertyState }))
        .then(
          (response) => {
            console.log("response of admin", response);
            setOffset(newOffset);
            setLoading(false);
          }
        );
      }
    }, 300),
    [loading, offset, totalSearchResults, formData, dispatch, allDataLoaded]
  );

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);
  const convertUtcToLocal = (utcTimeString) => {
        // Create a Date object with the UTC time string
        const utcDate = new Date(utcTimeString);

        // Get the offset of the local timezone from UTC in minutes
        const offsetMinutes = utcDate.getTimezoneOffset();

        // Adjust the UTC date by the offset to get local time
        const localDate = new Date(utcDate.getTime() - (offsetMinutes * 60 * 1000));

        // Format options for displaying in 12-hour format with hours and minutes
        const options = {
            year: 'numeric', month: '2-digit', day: '2-digit',
            hour: 'numeric', minute: '2-digit',
            hour12: true,
            timeZoneName: 'short'
        };

        // Format the local date time using Intl.DateTimeFormat
        return new Intl.DateTimeFormat('en-US', options).format(localDate);
    };

  return (
    <div style={{ margin: "20px" }}>
      <div style={{ justifyContent: "center", display: "flex" }}>
        <SearchDialogue FormData={handleFormData} onSearch={dataNotFound} isAdminSearch={isAdminSearch} />
      </div>
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
            top: "170px",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 1000,
          }}
        >
          No Data Found
        </Typography>
      )}
      <Card sx={{overflow:"auto",borderRadius:"2px",padding:"10px"}}>
      <Grid container spacing={1}>
        {console.log("searchResults", searchResults)}
        {searchResults?.length > 0 && (
          <div>
            <Typography variant="h6">
              Search Results ({totalSearchResults})
            </Typography>
            <hr style={{ margin: "10px 0px" }} />
            <TableContainer>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow sx={{ textTransform: "capitalize" }}>
                    <TableCell>Property ID</TableCell>
                    <TableCell align="left">Property Name</TableCell>
                    <TableCell align="left">Area</TableCell>
                    <TableCell align="left">Unit</TableCell>
                    <TableCell align="left">Price Per Unit</TableCell>
                    <TableCell align="left">District</TableCell>
                    <TableCell align="left">Landmark</TableCell>
                    <TableCell align="left">Listing Type</TableCell>
                    <TableCell align="left">Property Type</TableCell>
                    <TableCell align="left">Property Info</TableCell>
                    <TableCell align="left">Approved By</TableCell>
                    <TableCell align="left">Boundary Wall</TableCell>
                    <TableCell align="left">Comments</TableCell>
                    <TableCell align="left">Developments</TableCell>
                    <TableCell align="left">Dimensions</TableCell>
                    <TableCell align="left">Directions</TableCell>
                    <TableCell align="left">Property Disputes</TableCell>
                    <TableCell align="left">Document Number</TableCell>
                    <TableCell align="left">Government Price</TableCell>
                    <TableCell align="left">Established Year</TableCell>
                    <TableCell align="left">Latitude</TableCell>
                    <TableCell align="left">Longitude</TableCell>
                    <TableCell align="left">Lift</TableCell>
                    <TableCell align="left">Loan Eligibility</TableCell>
                    <TableCell align="left">Mediator</TableCell>
                    <TableCell align="left">Mediator Number 1</TableCell>
                    <TableCell align="left">Mediator Number 2</TableCell>
                    <TableCell align="left">Owner Name</TableCell>
                    <TableCell align="left">Owner Number 1</TableCell>
                    <TableCell align="left">Owner Number 2</TableCell>
                    <TableCell align="left">Number of Open Sides</TableCell>
                    <TableCell align="left">Property Created On</TableCell>
                    <TableCell align="left">Property Updated On</TableCell>
                    <TableCell align="left">Property Updated By</TableCell>
                    <TableCell align="left">Parking</TableCell>
                    <TableCell align="left">Rating</TableCell>
                    <TableCell align="left">Register Location</TableCell>
                    <TableCell align="left">RERA Status</TableCell>
                    <TableCell align="left">State</TableCell>
                    <TableCell align="left">Village</TableCell>
                    <TableCell align="left">Survey Number</TableCell>
                    <TableCell align="left">Verified Comments</TableCell>
                    <TableCell align="left">Verification Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {searchResults?.map((item, index) => (
                    <TableRow
                      key={index}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                      style={{ textTransform: "capitalize" }}
                    >
                      <TableCell align="left">
                        <Link
                          style={{color:"blue",textDecoration:"underline",background:"none"}}
                          to={`/property/${item.property_id}`}
                          rel="noopener noreferrer"
                          myVariable={"yourVariable"}
                        >
                          {item.property_id}
                        </Link>
                      </TableCell>
                      <TableCell align="left">
                        {trimText(item.prop_name, index, "property_name")}
                      </TableCell>
                      <TableCell align="left">{item.area}</TableCell>
                      <TableCell align="left">{item.unit}</TableCell>
                      <TableCell align="left">{item.price}</TableCell>
                      <TableCell align="left">{item.district}</TableCell>
                      <TableCell align="left">
                        {trimText(item.landmark, index, "landmark")}
                      </TableCell>
                      <TableCell align="left">{item.listing_type}</TableCell>
                      <TableCell align="left">{item.p_type}</TableCell>
                      <TableCell align="left">
                        {trimText(item.ad_info, index, "ad_info")}
                      </TableCell>
                      <TableCell align="left">
                        {trimText(item.approved_by, index, "approved_by")}
                      </TableCell>
                      <TableCell align="left">
                        {trimText(item.bound_wall, index, "bound_wall")}
                      </TableCell>
                      <TableCell align="left">
                        {trimText(item.comments, index, "comments")}
                      </TableCell>
                      <TableCell align="left">
                        {trimText(item.developments, index, "developments")}
                      </TableCell>
                      <TableCell align="left">
                        {trimText(item.dimensions, index, "dimensions")}
                      </TableCell>
                      <TableCell align="left">
                        {trimText(item.directions, index, "directions")}
                      </TableCell>
                      <TableCell align="left">
                        {trimText(item.disputes, index, "disputes")}
                      </TableCell>
                      <TableCell align="left">{item.document_number}</TableCell>
                      <TableCell align="left">{item.gov_price}</TableCell>
                      <TableCell align="left">{item.est_year}</TableCell>
                      <TableCell align="left">{item.latitude}</TableCell>
                      <TableCell align="left">{item.longitude}</TableCell>
                      <TableCell align="left">{item.lift}</TableCell>
                      <TableCell align="left">{item.loan_eligibility}</TableCell>
                      <TableCell align="left">{item.mediator}</TableCell>
                      <TableCell align="left">{item.mediator_no1}</TableCell>
                      <TableCell align="left">{item.mediator_no2}</TableCell>
                      <TableCell align="left">{item.owner_name}</TableCell>
                      <TableCell align="left">{item.owner_no1}</TableCell>
                      <TableCell align="left">{item.owner_no2}</TableCell>
                      <TableCell align="left">{item.open_sides}</TableCell>
                      <TableCell align="left">{convertUtcToLocal(item.p_created_on)}</TableCell>
                      <TableCell align="left">{convertUtcToLocal(item.property_updated_on)}</TableCell>
                      <TableCell align="left">{item.updated_by}</TableCell>
                      <TableCell align="left">{item.parking}</TableCell>
                      <TableCell align="left">{item.rating}</TableCell>
                      <TableCell align="left">{item.reg_location}</TableCell>
                      <TableCell align="left">{item.rera_status}</TableCell>
                      <TableCell align="left">{item.state}</TableCell>
                      <TableCell align="left">{item.village}</TableCell>
                      <TableCell align="left">{item.survey_number}</TableCell>
                      <TableCell align="left">
                        {trimText(
                          item.verifier_comments,
                          index,
                          "verified_comments"
                        )}
                      </TableCell>
                      <TableCell align="left">
                        {item.verification_status}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        )}
        
      </Grid>
      </Card>
      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <CircularProgress />
        </Box>
      )}
      
    </div>
  );
};

export default ManageProperties;
