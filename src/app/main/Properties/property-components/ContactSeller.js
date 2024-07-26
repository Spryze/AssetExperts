import React, { useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import {
  Typography,
  Button,
  CircularProgress,
  Snackbar,
  Alert,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { selectSelectedProperty } from "app/store/propertySlice";
import { PostUserCallRequest } from "../PropertySlice1";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { selectProperties } from "../PropertySlice1";
import { selectUser } from "app/store/userSlice";

const ContactSeller = () => {
  const [serverResponse, setServerResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [whatsappRegistered, setWhatsappRegistered] = useState(false);
  const [preferredLanguage, setPreferredLanguage] = useState("");

  const Properties = useSelector(selectSelectedProperty);
  const { propertyId } = useParams();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  console.log("user in contact seller",user)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      prop_id: propertyId,
      user_name: user?.data?.displayName || "",
      ph_num: user?.data?.phone_num_1 || "",
      email: user?.data?.email || "",
      is_whatsapp_user: user?.data?.is_whatsapp_user || false,
      langauge: user?.data?.langauge || "English",
    },
  });

  const handleToggle = (status) => {
    setWhatsappRegistered(status);
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const requestData = {
        ...data,
        is_whatsapp_user: whatsappRegistered,

      };
      console.log("requestData", requestData);
      dispatch(PostUserCallRequest(requestData))
      .then(response => {
        console.log(response)
        setServerResponse(response.payload.data.message);
        setSnackbarOpen(true);
        reset();
      })
      .catch(error => {
        // Handle any errors from dispatch or subsequent operations
        console.error('Error occurred:', error);
      });
    
      
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  // const handleInterestSubmit = async (data) => {
  //   setLoading(true);
  //   try {
  //     const requestData = {
  //       ...data,
  //       is_whatsapp_user: whatsappRegistered,
  //       langauge: preferredLanguage,
  //     };
  //     console.log("requestData", requestData);
  //     const response =  dispatch(PostUserCallRequest(requestData));
  //     setServerResponse(response);
  //     setSnackbarOpen(true);
  //     reset();
  //     await new Promise((resolve) => setTimeout(resolve, 1000));
  //     setServerResponse("Interest submitted successfully!");
  //     setSnackbarOpen(true);
  //   } catch (error) {
  //     console.error("Error submitting interest:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <Paper
      sx={{
        padding: "30px",
        boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.1)",
        borderRadius: "5px",
      }}
    >
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={serverResponse ? "success" : "error"}
        >
          {serverResponse || "Action failed."}
        </Alert>
      </Snackbar>

      {user.role === "guest" ? (
        <>
          <Typography className="heading-text">Request a call</Typography>
          <hr />
          <Box sx={{ display: "flex" }}>
            <h3 style={{ marginTop: "10px", fontWeight: "bold" }}>
              {Properties?.propertyDeveloper}
            </h3>
          </Box>
          <Box>
            <h5 className="heading-text">Please Share Your Contact</h5>
          </Box>
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "100%" },
              "& .MuiInput-underline:after": {
                borderBottomWidth: "3px",
              },
            }}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit(onSubmit)}
          >
            <TextField
              label="Name"
              variant="standard"
              {...register("user_name", { required: "Name is required" })}
              error={!!errors.user_name}
              helperText={errors.user_name?.message}
            />
            <TextField
              label="Phone"
              variant="standard"
              type="number"
              {...register("ph_num", { required: "Phone number is required",
                pattern:{
                  value: /^\d{10}$/,
            message: "Please enter a valid 10-digit phone number"
                }
               })}
              error={!!errors.ph_num}
              helperText={errors.ph_num?.message}
            />
            <TextField
              label="Email"
              variant="standard"
              type="email"
              {...register("email", {
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Please enter a valid email address",
                },
              })}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
            {/* <FormControl sx={{ minWidth: 120, marginTop: 1 }}>
              <InputLabel id="preferred-language-label">
                Preferred Language
              </InputLabel>
              <Select
                labelId="preferred-language-label"
                value={preferredLanguage}
                onChange={(e) => setPreferredLanguage(e.target.value)}
                label="Preferred Language"
                {...register("langauge", {
                  required: "Preferred language is required",
                })}
              >
                <MenuItem value="English">English</MenuItem>
                <MenuItem value="Spanish">Spanish</MenuItem>
                <MenuItem value="French">French</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </Select>
            </FormControl> */}
            <Box sx={{ display: "flex", alignItems: "center", marginTop: 2 }}>
              <Button
                variant={whatsappRegistered ? "contained" : "outlined"}
                onClick={() => handleToggle(true)}
                sx={{ marginRight: 2 }}
              >
                Yes
              </Button>
              <Button
                variant={!whatsappRegistered ? "contained" : "outlined"}
                onClick={() => handleToggle(false)}
                sx={{ marginRight: 2 }}
              >
                No
              </Button>
              <Typography variant="body2">
                {whatsappRegistered ? "Yes" : "No"}
              </Typography>
            </Box>

            <Box
              sx={{ position: "relative", display: "inline-flex", marginTop: 2 }}
            >
              <Button type="submit" variant="contained" disabled={loading}>
                Submit
              </Button>
              {loading && (
                <CircularProgress
                  size={24}
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    marginTop: "-12px",
                    marginLeft: "-12px",
                  }}
                />
              )}
            </Box>
          </Box>
        </>
      ) : (
        <Box>
          <Typography className="heading-text">Submit Interest</Typography>
          <Button
          type="submit"
            onClick={handleSubmit(onSubmit)}
            variant="contained"
            disabled={loading}
            sx={{ marginTop: 2 }}
          >
            Submit Interest
          </Button>
        </Box>
      )}
    </Paper>
  );
};

export default ContactSeller;
