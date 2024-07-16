import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import { Typography, Button, CircularProgress, Snackbar, Alert } from "@mui/material";
import { useSelector } from "react-redux";
import { selectSelectedProperty } from "app/store/propertySlice";
import { useDispatch } from "react-redux";
import { PostUserCallRequest } from "../PropertySlice1";
import { useParams } from "react-router-dom";

const ContactSeller = () => {
  const [serverResponse, setServerResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const Properties = useSelector(selectSelectedProperty);
  const { propertyId } = useParams();
  console.log("Properties in contact seller", propertyId);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    prop_id: propertyId,
    user_name: "",
    ph_num: "",
    email: ""
  });

  const [emailError, setEmailError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    // Validate email format
    if (name === "email") {
      const isValidEmail = validateEmail(value);
      setEmailError(!isValidEmail);
    }
  };

  const validateEmail = (email) => {
    // Regular expression for basic email validation
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await dispatch(PostUserCallRequest(formData));
      setServerResponse(response);
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Error submitting form:', error);
      // Handle error if needed
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Paper sx={{ padding: "30px", boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.1)", borderRadius: "5px" }}>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }} 
      >
        <Alert onClose={handleCloseSnackbar} severity="success">
          {serverResponse ? "Request submitted successfully!" : "Failed to submit request."}
        </Alert>
      </Snackbar>
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
          label="Email"
          variant="standard"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          error={emailError}
          helperText={emailError ? "Please enter a valid email address" : ""}
        />
        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
          <Button
            type="submit"
            variant="contained"
            disabled={loading || emailError}
          >
            Submit
          </Button>
          {loading && (
            <CircularProgress
              size={24}
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                marginTop: '-12px',
                marginLeft: '-12px'
              }}
            />
          )}
        </Box>
      </Box>
    </Paper>
  );
};

export default ContactSeller;
