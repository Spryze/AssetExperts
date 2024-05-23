// import { useState, useEffect } from "react";
// import Typography from "@mui/material/Typography";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import { Box, Stepper, Step, StepLabel, Grid, FormHelperText, Button } from "@mui/material";
// import CircularProgress from "@mui/material/CircularProgress";
// import Paper from "@mui/material/Paper";
// import BasicPropertyDetails from "./BasicPropertyDetails";
// import MorePropertyInfo from "./MorePropertyInfo";

// import UploadImages from "./Property-Types-Forms/UploadImages";

// const steps = [
//   "Property Details",
//   "Upload Images",
// ];

// const Form = () => {
//   const [activeStep, setActiveStep] = useState(0);
//   const [propertyData, setPropertyData] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const user = localStorage.getItem("user");

//   const handleBack = () => {
//     setActiveStep((prevStep) => prevStep - 1);
//   };

//   const formik = useFormik({
//     initialValues: {
//       propertyName: "",
//       p_type: "",
//       dimensions: "",
//       unit: "",
//       state: "",
//       district: "",
//       village: "",
//       landmark: "",
//       price: 0,
//       survey_number: "",
//       doc_num: "",
//       AboutDeveloper: "",
//       PropertyHighlights: "",
//       size: 0,
//       Amenities: "",
//       aroundtheProject: "",
//       propertyConfiguration: "",
//       AboutProject: "",
//       generalPrice: "",
//       emiprice: "",
//       moreAboutProject: "",
//       RegidtryRecords: "",
//       locality: "",
//       AroundTheProperty: "",
//     },
//     validationSchema: Yup.object().shape({
//       propertyName: Yup.string().required("Property Name is required"),
//       p_type: Yup.string()
//         .required("Property Type is required")
//         .oneOf(
//           [
//             "plot",
//             "flat",
//             "land",
//             "wareHouse",
//             "PG",
//             "officePlace",
//             "coWorkingPlace",
//             "studentHostels",
//             "agriculturalLands",
//             "apartment",
//             "independentHouse",
//           ],
//           "Invalid Property Type"
//         ),
//       dimensions: Yup.string(),
//       unit: Yup.string(),
//       state: Yup.string(),
//       district: Yup.string(),
//       village: Yup.string(),
//       landmark: Yup.string(),
//       aboutProject: Yup.string(),
//       generalPrice: Yup.string(),
//       emiprice: Yup.string(),
//       moreAboutProject: Yup.string(),
//       regidtryRecords: Yup.string(),
//       locality: Yup.string(),
//       price: Yup.number().typeError("Price must be a number").required("Price is required"),
//       AboutDeveloper: Yup.string(),
//       size: Yup.number().typeError("Size must be a number").required("Size is required"),
//     }),
//   });

//   const addBasicDetails = async (values) => {
//     console.log(values);
//     if (activeStep === 0) {
//       try {
//         setLoading(true);
//         const user = localStorage.getItem("user");
//         const User = JSON.parse(user);
//         const cont_user_id = User.uid;

//         const response = await fetch(
//           "https://bac7a5b1-026f-4c31-bb25-b6456ef4b56d-00-1doj8z5pfhdie.sisko.replit.dev/property",
//           {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify({ ...formik.values, cont_user_id }),
//           }
//         );

//         if (!response.ok) {
//           console.log("Network response was not ok");
//         }

//         const data =  await response.json();
//         console.log("data",data);
//         setPropertyData(data.details);
//         console.log("propertyData",propertyData)
//         console.log("Form data submitted successfully:", data);

//         window.alert(` ${data.message}`);
//         setLoading(false);

//         setActiveStep((prevStep) => prevStep + 1);
//       } catch (error) {
//         console.error("There was a problem submitting the form:", error);
//         setLoading(false);
//       }
//     } else if (activeStep > 0 && activeStep < steps.length) {
//       setActiveStep((prevStep) => prevStep + 1);
//     }
//   };

//   const finalSubmit = async () => {
//     try {
//       setLoading(true);
//       const dataToSend = { ...formik.values };
//       console.log(dataToSend);

//       const response = await fetch(
//         "https://bac7a5b1-026f-4c31-bb25-b6456ef4b56d-00-1doj8z5pfhdie.sisko.replit.dev/property",
//         {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(dataToSend),
//         }
//       );
//       if (!response.ok) {
//         console.log("Network response was not ok");
//       }
//       const data = await response.json();
//       console.log("Form data submitted successfully:", data);
//       window.alert(` ${data}`);
//       setLoading(false);
//       setActiveStep((prevStep) => prevStep + 1);
//     } catch (error) {
//       console.error("There was a problem submitting the form:", error);
//       setLoading(false);
//     }
//   };

//   const handleNext = async () => {
//     if (activeStep === 0) {
//       await addBasicDetails();

//     } else {
//       setActiveStep((prevStep) => prevStep + 1);
//     }
//   };

//   const formContent = (step) => {
//     switch (step) {
//       case 0:
//         return <BasicPropertyDetails formik={formik} />;
//       case 1:
//         return <UploadImages formik={formik} propertyData={propertyData} />;
//       default:
//         return <div>404: Not Found</div>;
//     }
//   };

//   console.log("propertyData",propertyData);
//   console.log("active step",activeStep)
//   if (!user) {
//     return (
//       <div className="flex flex-col flex-auto items-center sm:justify-center min-w-0" style={{ height: "100vh" }}>
//         <Paper className="flex items-center w-full sm:w-auto min-h-full sm:min-h-auto rounded-0 py-32 px-16 sm:p-48 sm:rounded-2xl sm:shadow">
//           <div className="w-full max-w-320 sm:w-320 mx-auto sm:mx-0">
//             <img className="w-48 mx-auto" src="assets/images/logo/logo.svg" alt="logo" />

//             <Typography className="mt-32 text-4xl font-extrabold tracking-tight leading-tight text-center">
//               Please Login!
//             </Typography>
//           </div>
//         </Paper>
//       </div>
//     );
//   }

//   return (
//     <Box
//       sx={{
//         maxWidth: "100%",
//         padding: 2,
//         marginTop: "40px",
//         position: "relative",
//       }}
//     >
//       <Stepper activeStep={activeStep} orientation="horizontal">
//         {steps.map((label, index) => (
//           <Step key={index}>
//             <StepLabel>{label}</StepLabel>
//           </Step>
//         ))}
//       </Stepper>
//       <Grid container>
//         <Grid item xs={12} sx={{ padding: "20px" }}>
//           {formContent(activeStep)}
//         </Grid>
//         {formik.errors.submit && (
//           <Grid item xs={12}>
//             <FormHelperText error>{formik.errors.submit}</FormHelperText>
//           </Grid>
//         )}
//         <Grid item xs={12}>
//           {activeStep !== steps.length - 1 && (
//             <Button
//               sx={{
//                 padding: "10px 40px",
//                 borderRadius: "2px",
//                 margin: "0px 10px",
//               }}
//               disabled={activeStep === 0}
//               onClick={handleBack}
//             >
//               Back
//             </Button>
//           )}

//           {activeStep !== steps.length - 1 ? (
//             <Button
//               sx={{
//                 padding: "10px 40px",
//                 backgroundColor: "#FF6600",
//                 borderRadius: "2px",
//                 margin: "0px 10px",
//               }}
//               onClick={()=> {handleNext();

//               }}
//             >
//               Next
//             </Button>
//           ) : (
//             <Button
//               sx={{
//                 padding: "10px 40px",
//                 backgroundColor: "#FF6600",
//                 borderRadius: "2px",
//                 margin: "0px 10px",
//               }}
//               onClick={finalSubmit}
//             >
//               Submit
//             </Button>
//           )}
//         </Grid>
//         {loading && (
//           <Grid item xs={12}>
//             <div
//               style={{
//                 width: "100%",
//                 height: "100%",
//                 background: "white",
//                 position: "absolute",
//                 top: "50%",
//                 left: "50%",
//                 transform: "translate(-50%, -50%)",
//                 opacity: "0.8",
//               }}
//             ></div>
//             <CircularProgress
//               sx={{
//                 position: "absolute",
//                 top: "50%",
//                 left: "50%",
//                 transform: "translate(-50%, -50%)",
//               }}
//             />
//           </Grid>
//         )}
//       </Grid>
//     </Box>
//   );
// };

// export default Form;

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  TextField,
  Button,
  Box,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Paper,
  Typography,
  FormHelperText,
} from "@mui/material";
import { addProperty } from "../PropertySlice1";
import UploadImages from "./Property-Types-Forms/UploadImages";

const Form = () => {
  const dispatch = useDispatch();
  const user = localStorage.getItem("user");

  const [formData, setFormData] = useState({
    propertyName: "",
    p_type: "",
    dimensions: "",
    unit: "",
    state: "",
    district: "",
    village: "",
    landmark: "",
    price: 0,
    survey_number: "",
    doc_num: "",
    AboutDeveloper: "",
    PropertyHighlights: "",
    size: 0,
    BoundryWall: "",
    Furnished: "",
    ApproveedBy: "",
    Parking: "",
    WaterSource: "",
    Flooring: "",
    PowerBackup: "",
    NoOfOpenSides: "",
    Registered: "",
    PropertyStatus: "",
    RERAStatus: "",
    BouandaryWall: "",
    BHK: "",
    Lift: "",
    PropertyAge: "",
    Comments:"",
    Developments:"",
    Disputes:"",
    RegistrarLocation:"",
    MediatorName:"",
    MeidatorNumber:"",
    OwnerName:"",
    OwnerNumber:"",
    Longitude:"",
    Latitude:"",
    Dimension:"",
    Direction:"",
    listing_type:"",
    LoanEligibility:"",
  });

  const [formErrors, setFormErrors] = useState({});
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [responseData, setResponseData] = useState(null);

  const propertyTypes = [
    "Plot",
    "Flat",
    // "wareHouse",
    "PG",
    "Office Place",
    "Co Working Place",
    "Student Hostels",
    "Agricultural Lands",
    "Independent House",
  ];
  const Units = ["sq.ft", "Sq.yards", "Sq.ft", "ready", "sq.Ft"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.propertyName)
      errors.propertyName = "Property Name is required";
    if (!formData.p_type) errors.p_type = "Property Type is required";
    if (!formData.price) errors.price = "Price is required";
    return errors;
  };

  const handleSubmit = async (e) => {

    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      const resultAction = await dispatch(addProperty(formData));
 if (resultAction.type === addProperty.fulfilled.type) {
        setResponseData(resultAction.payload);
        setIsFormSubmitted(true);
      } else {
        console.error(resultAction.payload);
      }
    } else {
      setFormErrors(errors);
    }
  };
  
  if (!user) {
        return (
          <div className="flex flex-col flex-auto items-center sm:justify-center min-w-0" style={{ height: "100vh" }}>
            <Paper className="flex items-center w-full sm:w-auto min-h-full sm:min-h-auto rounded-0 py-32 px-16 sm:p-48 sm:rounded-2xl sm:shadow">
              <div className="w-full max-w-320 sm:w-320 mx-auto sm:mx-0">
                <img className="w-48 mx-auto" src="assets/images/logo/logo.svg" alt="logo" />
    
                <Typography className="mt-32 text-4xl font-extrabold tracking-tight leading-tight text-center">
                  Please Login!
                </Typography>
              </div>
            </Paper>
          </div>
        );
      }

  if (isFormSubmitted) {
    return <UploadImages responseData={responseData.details} />;
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ flexGrow: 1, width: "100%", maxWidth: 800, margin: "20px auto" }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <FormControl
            fullWidth
            variant="outlined"
            required
            error={!!formErrors.p_type}
          >
            <InputLabel>Property Type</InputLabel>
            <Select
              label="Property Type"
              name="p_type"
              value={formData.p_type}
              onChange={handleChange}
            >
              {propertyTypes.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>{formErrors.p_type}</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Property Name"
            name="propertyName"
            value={formData.propertyName}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            required
            error={!!formErrors.propertyName}
            helperText={formErrors.propertyName}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="Size"
            name="size"
            type="number"
            value={formData.size}
            onChange={handleChange}
            variant="outlined"
            fullWidth
          />
        </Grid>
        

        <Grid item xs={12} sm={6}>
          <FormControl
            fullWidth
            variant="outlined"
            required
            error={!!formErrors.unit}
          >
            <InputLabel>Unit</InputLabel>
            <Select
              label="Unit"
              name="unit"
              value={formData.unit}
              onChange={handleChange}
            >
              {Units.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>{formErrors.unit}</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="State"
            name="state"
            value={formData.state}
            onChange={handleChange}
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="District"
            name="district"
            value={formData.district}
            onChange={handleChange}
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Village"
            name="village"
            value={formData.village}
            onChange={handleChange}
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Landmark"
            name="landmark"
            value={formData.landmark}
            onChange={handleChange}
            variant="outlined"
            fullWidth
          />
        </Grid>
        {formData.p_type === "Plot" && (
          <Grid item xs={12} sm={6}>
            <TextField
              label="Boundary Wall"
              name="BouandaryWall"
              value={formData.BouandaryWall}
              onChange={handleChange}
              variant="outlined"
              fullWidth
            />
          </Grid>
        )}
        {formData.p_type === "Plot" && (
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>No. of Open Sides</InputLabel>
              <Select
                label="No. of Open Sides"
                name="NoOfOpenSides"
                value={formData.NoOfOpenSides}
                onChange={handleChange}
              >
                <MenuItem value="1">1</MenuItem>
                <MenuItem value="2">2</MenuItem>
                <MenuItem value="3">3</MenuItem>
                <MenuItem value="4">4</MenuItem>
              </Select>
              <FormHelperText>{formErrors.unit}</FormHelperText>
            </FormControl>
          </Grid>
        )}
        {(formData.p_type === "Flat" ||
          formData.p_type === "PG" ||
          formData.p_type === "Office Place" ||
          formData.p_type === "Co Working Place" ||
          formData.p_type === "Student Hostels" ||
          formData.p_type === "Independent House") && (
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Furnished</InputLabel>
              <Select
                label="Furnished"
                name="Furnished"
                value={formData.Furnished}
                onChange={handleChange}
              >
                <MenuItem value="Yes">Yes</MenuItem>
                <MenuItem value="No">No</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        )}
        {formData.p_type === "Flat" && (
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>RERA Status</InputLabel>
              <Select
                label="RERA Status"
                name="RERAStatus"
                value={formData.RERAStatus}
                onChange={handleChange}
              >
                <MenuItem value="Registered">Registered</MenuItem>
                <MenuItem value="Not Registered">Not Registered</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        )}
        {formData.p_type === "Flat" && (
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Property Status</InputLabel>
              <Select
                label="Property Status"
                name="PropertyStatus"
                value={formData.PropertyStatus}
                onChange={handleChange}
              >
                <MenuItem value="Completed">Completed</MenuItem>
                <MenuItem value="Under Construction">
                  Under Construction
                </MenuItem>
                <MenuItem value="Ready To Move">Ready To Move</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        )}

        {(formData.p_type === "Flat" ||
          formData.p_type === "PG" ||
          formData.p_type === "Office Place" ||
          formData.p_type === "Co Working Place" ||
          formData.p_type === "Student Hostels" ||
          formData.p_type === "Independent House") && (
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Lift</InputLabel>
              <Select
                label="Lift"
                name="Lift"
                value={formData.Lift}
                onChange={handleChange}
              >
                <MenuItem value="Yes">Yes</MenuItem>
                <MenuItem value="No">No</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        )}
        <Grid item xs={12} sm={6}>
          <TextField
            label="Price"
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            required
            error={!!formErrors.price}
            helperText={formErrors.price}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="Survey Number"
            name="survey_number"
            value={formData.survey_number}
            onChange={handleChange}
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Dimension"
            name="Dimension"
            type="text"
            value={formData.Dimension}
            onChange={handleChange}
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
        <FormControl fullWidth variant="outlined">
              <InputLabel>Direction</InputLabel>
              <Select
                label="Direction"
                name="Direction"
                value={formData.Direction}
                onChange={handleChange}
              >
                <MenuItem value="East">East</MenuItem>
                <MenuItem value="West">West</MenuItem>
                <MenuItem value="North">North</MenuItem>
                <MenuItem value="West">South</MenuItem>
              </Select>
            </FormControl>
            </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Document Number"
            name="doc_num"
            value={formData.doc_num}
            onChange={handleChange}
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Approoved By"
            name="ApproveedBy"
            value={formData.ApproveedBy}
            onChange={handleChange}
            variant="outlined"
            multiline
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Comments"
            name="Comments"
            type="text"
            value={formData.Comments}
            onChange={handleChange}
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Developments"
            name="Developments"
            type="text"
            value={formData.Developments}
            onChange={handleChange}
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
        <FormControl fullWidth variant="outlined">
              <InputLabel>Loan Eligibility</InputLabel>
              <Select
                label="Loan Eligibility"
                name="LoanEligibility"
                value={formData.LoanEligibility}
                onChange={handleChange}
              >
                <MenuItem value="Yes">Yes</MenuItem>
                <MenuItem value="No">No</MenuItem>
              </Select>
            </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
        <FormControl fullWidth variant="outlined">
              <InputLabel>Listing Type</InputLabel>
              <Select
                label="Listing Type"
                name="listing_type"
                value={formData.listing_type}
                onChange={handleChange}
              >
                <MenuItem value="buy">Buy</MenuItem>
                <MenuItem value="sell">Sell</MenuItem>
              </Select>
            </FormControl>
            </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Disputes"
            name="Disputes"
            type="text"
            value={formData.Disputes}
            onChange={handleChange}
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Registrar Location"
            name="RegistrarLocation"
            type="text"
            value={formData.RegistrarLocation}
            onChange={handleChange}
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Mediator Name"
            name="MediatorName"
            type="text"
            value={formData.MediatorName}
            onChange={handleChange}
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="MeidatorNumber"
            name="MeidatorNumber"
            type="number"
            value={formData.MeidatorNumber}
            onChange={handleChange}
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Owner Name"
            name="OwnerName"
            type="text"
            value={formData.OwnerName}
            onChange={handleChange}
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Owner Number"
            name="OwnerNumber"
            type="number"
            value={formData.OwnerNumber}
            onChange={handleChange}
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Latitude"
            name="Latitude"
            type="number"
            value={formData.Latitude}
            onChange={handleChange}
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Longitude"
            name="Longitude"
            type="number"
            value={formData.Longitude}
            onChange={handleChange}
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="About Developer"
            name="AboutDeveloper"
            value={formData.AboutDeveloper}
            onChange={handleChange}
            variant="outlined"
            multiline
            rows={4}
            fullWidth
          />
        </Grid>
        
        <Grid item xs={12}>
          <TextField
            label="Property Highlights"
            name="PropertyHighlights"
            value={formData.PropertyHighlights}
            onChange={handleChange}
            variant="outlined"
            multiline
            rows={4}
            fullWidth
          />
        </Grid>

        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Submit
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Form;
