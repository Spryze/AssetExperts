// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import Container from "@mui/material/Container";
// import { Box, Paper, Grid } from "@mui/material";
// import ScrollableTabs from "./property-components/ScrollableTabs";
// import ContactSeller from "./property-components/ContactSeller";
// import PropertyDetails from "./property-components/PropertyDetails";
// import PropertyCarousel from "./property-components/PropertyCarousel";
// import Tabs from "@mui/material/Tabs";
// import Tab from "@mui/material/Tab";
// import ArrowBack from "@mui/icons-material/ArrowBack";
// import SearchProperty from "./SearchProperty";
// import { fetchPropertyDetails, selectProperties } from "app/store/propertySlice";

// const Property = () => {
//   const [value, setValue] = useState("0");
//   // const properties = useSelector(selectProperties);
//   // const dispatch = useDispatch();

//   // useEffect(() => {
//   //   const params = {};
//   //   dispatch(fetchPropertyDetails(params)).then(() => {});
//   // }, []);

//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//     const section = document.getElementById(newValue.toString());
//     if (section) {
//       section.scrollIntoView({ behavior: "smooth" });
//     }
//   };

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             const id = entry.target.id;
//             setValue(id);
//           }
//         });
//       },
//       { threshold: 0.5 }
//     );

//     const sections = document.querySelectorAll(".scrollable-section");
//     sections.forEach((section) => {
//       observer.observe(section);
//     });

//     return () => {
//       observer.disconnect();
//     };
//   }, []);

//   return (
//     <Container>
//       {/* <PropertyCarousel/> */}
//       <Grid container spacing={2}>
//         {/* <SearchProperty /> */}

//         <PropertyDetails />

//         {/* Tabs */}
//         <Box sx={{ position: 'sticky', top: '6%', width: "inherit", zIndex: '1' }}>
//           <Box
//             sx={{
//               maxWidth: '100%', // Ensure the box takes full width
//               overflowX: 'auto', // Enable horizontal scrolling if needed
//               bgcolor: 'background.paper',
//               margin: '20px 0',
//             }}
//           >
//             <Tabs
//               value={value}
//               onChange={handleChange}
//               variant="scrollable"
//               scrollButtons="auto"
//               aria-label="scrollable auto tabs example"
//             >
//               <Tab label= {"Overview/Home"} value="0" />
//               <Tab label="Around This Project" value="1" />
//               <Tab label="Floor plan" value="2" />
//               <Tab label="Floor plan" value="3" />
//               <Tab label="Amenities" value="4"/>
//               <Tab label="Price Trends" value="5"/>
//               <Tab label="Registry Records" value="6"/>
//               <Tab label="Calculator" value="7"/>
//               <Tab label="Tour This Project" value="8"/>
//               <Tab label="Locality" value="9"/>
//               <Tab label="Compare Properties" value="10"/>
//               <Tab label="About Developer" value="11"/>
//               <Tab label="Q & A" value="12"/>
//               <Tab label="Frequently Asked Questions" value="13"/>
//               <Tab label="Similar Project" value="14"/>
//               <Tab label="News" value="15"/>
//             </Tabs>
//           </Box>
//         </Box>

//         <Grid
//           item
//           xs={12}
//           sm={12}
//           md={8}
//           lg={8}
//           sx={{
//             overflowY: "auto",
//             '@media (max-width: 900px)': {
//               height: "650px",
//             },

//           }}
//         >
//           <Box sx={{ height: "150px", width: "-webkit-fill-available" }}>
//             <img src="/assets/images/properties/banner.jpg" alt="" />
//             <ScrollableTabs />
//           </Box>
//         </Grid>

//         <Grid item xs={12} sm={12} md={4} lg={4}>
//           <Box sx={{ position: "sticky", top: "20%" }}>
//             <Paper
//               sx={{
//                 padding: "20px 30px",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 borderRadius: "5px",
//                 margin: "20px",
//                 backgroundColor: '#FBD1A9',
//                 border: "1px solid #EE7707",
//                 fontSize: "16px"
//               }}
//             >
//               Great choice! This is the most viewed project in this area.
//             </Paper>
//             <ContactSeller />
//           </Box>
//         </Grid>
//       </Grid>
//     </Container>
//   );
// };

// export default Property;
import React, { useState, useEffect } from "react";
import PropertyCarousel from "./property-components/PropertyCarousel";
import { Button, CircularProgress } from "@mui/material";
// import CircularProgress from '@mui/material/CircularProgress';
import Grid from "@mui/system/Unstable_Grid/Grid";
import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import Container from "@mui/material/Container";
import MorePropertyDetails from "./property-components/MorePropertyDetails";
import withReducer from "app/store/withReducer";
import reducer from "./PropertySlice1";
import { selectProperties } from "./PropertySlice1";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Amenities from "./Amenities";
import Map from "./Maplocation";
import { useDispatch } from "react-redux";
import { fetchProperties } from "./PropertySlice1";
import Recomendedproperties from "./Recomendedproperties";
import Recentlyadded from "./Recentlyadded";
import AllDetails from "./AllDetails";
import ContactDetails from "./ContactDetails";
import { useParams } from "react-router-dom";



function Property() {
  
  const propertiesData = useSelector(selectProperties);
  const [propertyData, setPropertyData] = useState({});
  const { propertyId } = useParams()
  
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
 
  const [showMore, setShowMore] = useState(false);
  const dispatch = useDispatch();


  console.log("propertiesData", propertiesData);
  console.log("propertyId", propertyId);

  const handleChange = (event, newValue) => {
    setActiveTab(newValue);
    const sections = document.getElementsByClassName("card");
    const sectionId = newValue;
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: "smooth" });
    }
  };
  

useEffect(()=>{
  if(!propertiesData)
    {
      const propdata = propertiesData.get(propertyId);
      if (propdata)
        {
          setPropertyData(propdata);
          setLoading(false);
        }
      
    }
},[propertiesData]);

 

useEffect(() => {


    {
      console.log('dispatch properties ');
      dispatch(fetchProperties(propertyId)).then(()=>{
        setLoading(false);
      });
    }
    setLoading(true);

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Assuming each card has a unique ID or data attribute
          setActiveTab(entry.target.dataset.tabId);
        }
      });
    },
    { threshold: 1 } // Adjust threshold as needed
  );

  // Observe all cards within each tab
  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => {
    observer.observe(card);
  });

  return () => {
    observer.disconnect();
  };
}, []);

 

 

  return (
    <Container maxWidth="lg" sx={{ background: "#F5F5F5",position:"relative" }}>
      {loading && <CircularProgress sx={{position:"absolute",zIndex:"1" ,top:"10%",left:"50%",}} />}
      {loading && <div style={{width:"100%",height:"100vh",background:"white",opacity:"0.5"}}></div>}
      <PropertyCarousel />
      <Grid container spacing={5}>
        <Grid item xs={12} md={8} sx={{ overflowY: "auto" }}>
          {/* <Box sx={{ position: "sticky", top: 0, zIndex: 1000, bgcolor: "#ffffff" }}>
            <Tabs
              value={activeTab}
              onChange={handleChange}
              variant="scrollable"
              scrollButtons="auto"
              aria-label="scrollable auto tabs example"
              sx={{ "& .MuiTabs-indicator": { backgroundColor: "orange" } }}
            >
              <Tab label="Overview" value="overview" />
              <Tab label="Project Details" value="PropertyDetails" />
              <Tab label="Amenities" value="neighboorhood"/>
              <Tab label="Neighborhood" value="recomended"/>
              
            </Tabs>
          </Box> */}
          <div style={{ overflowY: "auto", height: "calc(100vh - 120px)" }}>
            
            <AllDetails />
          </div>
        </Grid>
        <Grid item xs={12} md={4}>
          
          <ContactDetails />
        </Grid>
        <Grid>
        <Map color ="red"/>
       
        </Grid>
        <Grid>
        <Recomendedproperties />
        </Grid>
      </Grid>
     
      <Recentlyadded />
    </Container>
  );
}

export default Property;
