
import React, { useState, useEffect } from "react";
import PropertyCarousel from "./property-components/PropertyCarousel";
import {CircularProgress } from "@mui/material";
import Grid from "@mui/system/Unstable_Grid/Grid";
import { useSelector } from "react-redux";
import Container from "@mui/material/Container";
import { selectProperties } from "./PropertySlice1";
import Maplocation from "./Maplocation";
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
   
      dispatch(fetchProperties(propertyId)).then(()=>{
        setLoading(false);
      });
    }
    setLoading(true);

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          
          setActiveTab(entry.target.dataset.tabId);
        }
      });
    },
    { threshold: 1 } 
  );


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
          <div style={{ overflowY: "auto", height: "calc(100vh - 120px)" }}>
            
            <AllDetails />
          </div>
        </Grid>
        <Grid item xs={12} md={4}>
          <ContactDetails />
        </Grid>
        <Maplocation/>
        <Grid>
        <Recomendedproperties />
        </Grid>
      </Grid>
     
      <Recentlyadded />
     
    </Container>
  );
}

export default Property;
