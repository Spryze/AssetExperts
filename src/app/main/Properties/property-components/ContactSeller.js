import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Typography, Button } from "@mui/material";
import { useSelector } from "react-redux";
import { selectSelectedProperty } from "app/store/propertySlice";
import { useDispatch } from "react-redux";
import { PostUserCallRequest } from "../PropertySlice1";
import { useParams  } from "react-router-dom";

const ContactSeller = () => {
  const Properties = useSelector(selectSelectedProperty);
  const { propertyId } = useParams();
  console.log("Properties in contact seller",propertyId)
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    "prop_id":propertyId,
    user_name: "",
    ph_num: "",
    email: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    dispatch(PostUserCallRequest(formData));
  };

  return (
    <Box sx={{ padding: "30px", boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.1)", backgroundColor: "white", borderRadius: "5px" }}>
      <Typography className="heading-text">Request a call</Typography>
      <hr />
      <Box sx={{ display: "flex" }}>
        <h3 style={{ marginTop: "10px", fontWeight: "bold" }}>{Properties?.propertyDeveloper}</h3>
      </Box>
      <Box>
        <h5 className="heading-text">Please Share Your Contact</h5>
      </Box>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "100%" },
          '& .MuiInput-underline:after': {
            borderBottomWidth: '3px'
          }
        }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <TextField
          id="standard-basic"
          label="Name"
          variant="standard"
          name="user_name"
          value={formData.user_name}
          onChange={handleChange}
        />
        <TextField
          id="standard-basic"
          label="Phone"
          variant="standard"
          name="ph_num"
          type="number"
          value={formData.ph_num}
          onChange={handleChange}
        />
        <TextField
          id="standard-basic"
          label="E mail"
          variant="standard"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
        />
        <Button
          type="submit"
          variant="contained"
          sx={{ width: "100%", borderRadius: "5px", backgroundColor: "#FF6600", marginTop: "10px", color: "white", fontWeight: "bold", "&:hover": { backgroundColor: "#FF6600", color: "black" } }}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default ContactSeller;
