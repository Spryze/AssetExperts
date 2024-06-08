// import React from 'react';
// import SearchDialogue from '../SearchDialogue';
// import { Typography, Grid, Card, CardContent, Box, Paper } from '@mui/material';
// import LocationOnIcon from "@mui/icons-material/LocationOn";
// import { selectSearchResults } from '../PropertySlice1';
// import { useSelector } from 'react-redux';
// import DefaultImg from "src/assets/Default/DegaultImg.gif";
// import { useState,useCallback } from 'react';

// const ManageProperties = () => {
//   const searchResults = useSelector(selectSearchResults);
//   const [noDataFound, setNoDataFound] = useState(false);

//   const handleClick = (propertyId) => {
//     const newWindow = window.open(`/property/${propertyId}`, "_blank");
//     if (newWindow) {
//       newWindow.focus();
//     } else {
//       console.error("Unable to open new window/tab");
//     }
//   };
  
//   const DataNotFound = useCallback((response) => {
//     console.log("response",response)
//     if (!response || response.length === 0) {
//       setNoDataFound(true);
//       setTimeout(() => {
//         setNoDataFound(false);
//       }, 3000);
//     } else {
//       setNoDataFound(false);
//     }
//   }, []);



//   return (
//     <div style={{ margin: "20px" }}>
//       <div style={{ justifyContent: "center", display: "flex" }}>
//         <SearchDialogue onSearch={DataNotFound} />
//       </div>
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
//             top: "170px",
//             left: "50%",
//             transform: "translateX(-50%)",
//             zIndex: 1000,
//           }}
//         >
//           No Data Found
//         </Typography>
//       )}
//       <Grid container spacing={1}>
//         {searchResults && searchResults.length > 0 && (
//           <div>
//             <Typography variant="h6">Search Results</Typography>
//             <hr style={{ margin: "10px 0px" }} />
//             <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
//               {searchResults.map((item, index) => (
              
//                 <Card
                
//                   key={index}
//                   sx={{
//                     flex: "0 0 auto",
//                     cursor: "pointer",
//                     height: "auto",
//                     width: "300px",
//                     position: "relative",
//                     padding: "0px",
//                     borderRadius: "5px",
//                     margin: "30px 0px",
//                   }}
//                   onClick={() => handleClick(item.prop_id)}
//                 >
                    
//                   <CardContent sx={{ padding: "0px" }}>
//                     <Box
//                       component="img"
//                       src={item?.prop_images[0] || DefaultImg}
//                       alt="Property"
//                       sx={{
//                         width: "100%",
//                         position: "relative",
//                         height: "200px",
//                         objectFit: "cover",
//                         borderRadius: "5px",
//                         transition: "transform 0.3s ease-in-out",
//                         "&:hover": {
//                           transform: "scale(1.05)",
//                         },
//                       }}
//                     />
//                      { console.log("item",item)}
//                     {item?.listing_type !== "buy" && (
//                       <Paper
//                         sx={{
//                           fontWeight: "600",
//                           position: "absolute",
//                           padding: "10px",
//                           top: "0",
//                           borderRadius: "0px 0px 5px 0px",
//                           background: "linear-gradient(90deg, rgba(233,233,233,1) 100%, rgba(255,255,255,1) 100%)"
//                         }}
//                       >
//                         {"₹" + item?.unit_price}
//                       </Paper>
//                     )}
//                     <div>
//                       <Typography
//                         sx={{
//                           fontSize: "15px",
//                           textTransform: "capitalize",
//                           fontWeight: "700",
//                           margin: "10px 0px 0px 10px",
//                         }}
//                       >
//                         {`${item?.listing_type === "buy" ? "Wanted" : `${item?.listing_type}ing`}, ${item?.area}${item?.unit}s ${item?.prop_type}`}
//                       </Typography>
//                       <Box sx={{ display: "flex" }}>
//                         <LocationOnIcon sx={{ color: "orange" }} />
//                         <Typography
//                           sx={{
//                             fontSize: "14px",
//                             textTransform: "capitalize",
//                             fontWeight: "600",
//                             color: "#707273",
//                           }}
//                         >
//                           {`${item?.landmark}, ${item?.district}`}
//                         </Typography>
//                       </Box>
//                     </div>
//                   </CardContent>
//                 </Card>
//               ))}
//             </div>
//           </div>
//         )}
//       </Grid>
//     </div>
//   );
// };

// export default ManageProperties;

import React, { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Typography, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SearchDialogue from '../SearchDialogue';
import { selectSearchResults } from '../PropertySlice1';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const ManageProperties = () => {
  const searchResults = useSelector(selectSearchResults);
  const [noDataFound, setNoDataFound] = useState(false);
  const [expandedRows, setExpandedRows] = useState({});

  const handleExpandClick = (index, field) => {
    setExpandedRows((prev) => ({
      ...prev,
      [index]: {
        ...prev[index],
        [field]: !prev[index]?.[field],
      },
    }));
  };

  const handleClick = (propertyId) => {
    const newWindow = window.open(`/property/${propertyId}`, "_blank");
    if (newWindow) {
      newWindow.focus();
    } else {
      console.error("Unable to open new window/tab");
    }
  };

  const DataNotFound = useCallback((response) => {
    if (!response || response.length === 0) {
      setNoDataFound(true);
      setTimeout(() => {
        setNoDataFound(false);
      }, 3000);
    } else {
      setNoDataFound(false);
    }
  }, []);

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

  return (
    <div style={{ margin: "20px" }}>
      <div style={{ justifyContent: "center", display: "flex" }}>
        <SearchDialogue onSearch={DataNotFound} />
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
      <Grid container spacing={1}>
        {searchResults && searchResults.length > 0 && (
          <div>
            <Typography variant="h6">Search Results</Typography>
            <hr style={{ margin: "10px 0px" }} />
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow sx={{textTransform:"capitalize"}}>
                    <TableCell>Property ID</TableCell>
                    <TableCell align="left">Property Name</TableCell>
                    <TableCell align="left">Area</TableCell>
                    <TableCell align="left">District</TableCell>
                    <TableCell align="left">Landmark</TableCell>
                    <TableCell align="left">Listing Type</TableCell>
                    <TableCell align="left">Property Type</TableCell>
                    <TableCell align="left">Unit</TableCell>
                    <TableCell align="left">Price Per Unit</TableCell>
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
                  {searchResults.map((item, index) => (
                    <TableRow
                      key={index}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      onClick={() => handleClick(item.property_id)}
                      style={{ cursor: 'pointer',textTransform:"capitalize" }}
                    >
                      <TableCell align="left">{item.property_id}</TableCell>
                      <TableCell align="left">{trimText(item.property_name, index, 'property_name')}</TableCell>
                      <TableCell align="left">{item.area}</TableCell>
                      <TableCell align="left">{item.district}</TableCell>
                      <TableCell align="left">{trimText(item.landmark, index, 'landmark')}</TableCell>
                      <TableCell align="left">{item.listing_type}</TableCell>
                      <TableCell align="left">{item.p_type}</TableCell>
                      <TableCell align="left">{item.unit}</TableCell>
                      <TableCell align="left">{item.unit_price}</TableCell>
                      <TableCell align="left">{trimText(item.ad_info, index, 'ad_info')}</TableCell>
                      <TableCell align="left">{trimText(item.approved_by, index, 'approved_by')}</TableCell>
                      <TableCell align="left">{trimText(item.bound_wall, index, 'bound_wall')}</TableCell>
                      <TableCell align="left">{trimText(item.comments, index, 'comments')}</TableCell>
                      <TableCell align="left">{trimText(item.developments, index, 'developments')}</TableCell>
                      <TableCell align="left">{trimText(item.dimensions, index, 'dimensions')}</TableCell>
                      <TableCell align="left">{trimText(item.direction, index, 'direction')}</TableCell>
                      <TableCell align="left">{trimText(item.disputes, index, 'disputes')}</TableCell>
                      <TableCell align="left">{trimText(item.document_number, index, 'document_number')}</TableCell>
                      <TableCell align="left">{trimText(item.government_price, index, 'government_price')}</TableCell>
                      <TableCell align="left">{item.est_year}</TableCell>
                      <TableCell align="left">{item.latitude}</TableCell>
                      <TableCell align="left">{item.longitude}</TableCell>
                      <TableCell align="left">{trimText(item.lift, index, 'lift')}</TableCell>
                      <TableCell align="left">{item.loan_eligible}</TableCell>
                      <TableCell align="left">{item.med_name}</TableCell>
                      <TableCell align="left">{item.med_num1}</TableCell>
                      <TableCell align="left">{item.med_num2}</TableCell>
                      <TableCell align="left">{item.own_name}</TableCell>
                      <TableCell align="left">{item.own_num1}</TableCell>
                      <TableCell align="left">{item.own_num2}</TableCell>
                      <TableCell align="left">{item.num_open_sides}</TableCell>
                      <TableCell align="left">{item.p_created_on}</TableCell>
                      <TableCell align="left">{item.p_updated_on}</TableCell>
                      <TableCell align="left">{item.updated_by}</TableCell>
                      <TableCell align="left">{item.parking}</TableCell>
                      <TableCell align="left">{item.rating}</TableCell>
                      <TableCell align="left">{trimText(item.register_location, index, 'register_location')}</TableCell>
                      <TableCell align="left">{item.rera_status}</TableCell>
                      <TableCell align="left">{item.state}</TableCell>
                      <TableCell align="left">{item.village}</TableCell>
                      <TableCell align="left">{item.survey_number}</TableCell>
                      <TableCell align="left">{trimText(item.v_comments, index, 'v_comments')}</TableCell>
                      <TableCell align="left">{item.v_status}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        )}
      </Grid>
    </div>
  );
};

export default ManageProperties;



