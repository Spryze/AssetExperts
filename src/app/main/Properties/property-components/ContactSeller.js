import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Checkbox, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { margin } from "@mui/system";
import {useSelector}from "react-redux"
import { selectSelectedProperty } from "app/store/propertySlice";

const ContactSeller = () => {
  const Properties = useSelector(selectSelectedProperty)
  // console.log("Properties",Properties)
  return (
    <Box sx={{ padding:"30px",boxShadow:"2px 2px 4px rgba(0, 0, 0, 0.1)",backgroundColor:"white",borderRadius:"5px", }}>
      <Typography className="heading-text" >Request a call</Typography>
      <hr/>
      <Box sx={{display:"flex"}}>
        
        <h3 style={{ marginTop: "10px", fontWeight:"bold"}}>{Properties?.propertyDeveloper}</h3>
        </Box>
        <Box>
        
        <h5 className="heading-text">
          Please Share Your Contact
        </h5>
        </Box>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "100%" },
            '& .MuiInput-underline:after': {
              borderBottomWidth: '3px'}
          }}
          noValidate
          autoComplete="off"
           
        >
          <TextField id="standard-basic" label="Name" variant="standard" />
          <TextField id="standard-basic" label="Phone" variant="standard" />
          <TextField id="standard-basic" label="E mail" variant="standard" />
        </Box>
        {/* <Box sx={{ display: "flex",margin:"20px 0" }}>
          <Checkbox />
          <p>
            I agree to be contacted by Housing and other agents via WhatsApp,
            SMS, phone, email etc
          </p>
        </Box>
        <Box sx={{ display: "flex",margin:"20px 0" }}>
          <Checkbox />
          <p>
            I am interested in Home Loans I hereby authorize Housing.com, it's
            partners & its partnering banks to contact me via whatsapp, sms,
            phone, email etc.T&C Apply
          </p>
        </Box> */}
        <Button variant="contained"sx={{width:"100%",borderRadius:"5px",backgroundColor:"#FF6600",marginTop:"10px",color:"white",fontWeight:"bold","&:hover": {
          backgroundColor: "#FF6600", 
          color:"black",
        },}}>Submit</Button>

      </Box>
    
  );
};

export default ContactSeller;
