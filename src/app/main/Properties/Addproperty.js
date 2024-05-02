import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { TextField, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import Form from "./MultiStepForm/Form";
const Addproperty = () => {
  
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  
  return (
    <Container>
      {/* <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          <Tab label="Basic Information" />
          <Tab label="Location On Map" />
          <Tab label="Gallery Images" />
          <Tab label="Floor Plans" />
          <Tab label="Agent Information" />
          <Tab label="Energy Performance" />
          <Tab label="Misc" />
          <Tab label="Beside" />
          <Tab label="Location" />
          
        </Tabs>
       
        
      </Box> */}
      {/* <Basicinformation/> */}
      <Form/>

    </Container>
  );
};

export default Addproperty;
