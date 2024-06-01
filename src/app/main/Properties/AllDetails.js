// import React, { useState, useEffect } from "react";
// import PropertyCarousel from "./property-components/PropertyCarousel";
// import { Button, CircularProgress } from "@mui/material";
// import Card from "@mui/material/Card";
// import Grid from "@mui/system/Unstable_Grid/Grid";
// import { Box, Typography } from "@mui/material";
// import { useSelector } from "react-redux";
// import Container from "@mui/material/Container";
// import MorePropertyDetails from "./property-components/MorePropertyDetails";
// import withReducer from "app/store/withReducer";
// import reducer from "./PropertySlice1";
// import { selectProperties } from "./PropertySlice1";
// import Tabs from "@mui/material/Tabs";
// import Tab from "@mui/material/Tab";
// import Amenities from "./Amenities";
// import Neighboorhood from "./Neighboorhood";
// import Map from "./Maplocation";
// import { useDispatch } from "react-redux";
// import { fetchProperties } from "./PropertySlice1";

// import PropertyOverview from "./PropertyOverview";

// const AllDetails = () => {
//   const [activeTab, setActiveTab] = useState(0);
//   const [showMore, setShowMore] = useState(false);
//   const dispatch = useDispatch();
//   // const handleChange = (event, newValue) => {
//   //   setActiveTab(newValue);
//   //   const sections = document.getElementsByClassName("scrollable-section");
//   //   if (sections && sections.length > newValue) {
//   //     sections[newValue].scrollIntoView({ behavior: "smooth" });
//   //   }
//   // };

//   const propertyData = useSelector(selectProperties);
//   console.log("propertyData", propertyData);
//   const [loading, setLoading] = useState(true);
//   return (
//     <div>
//       <PropertyOverview />
//       <MorePropertyDetails />
//       <Neighboorhood />
//     </div>
//   );
// };

// export default AllDetails;

import React, { useState } from "react";
import PropertyOverview from "./PropertyOverview";
import MorePropertyDetails from "./property-components/MorePropertyDetails";
import Neighboorhood from "./Neighboorhood";

const AllDetails = () => {
  return (
    <div>
      <PropertyOverview />
      <MorePropertyDetails />
      <Neighboorhood />
    </div>
  );
};

export default AllDetails;

