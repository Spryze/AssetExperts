import { useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Grid,
  FormHelperText,
  Button,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import BasicPropertyDetails from "./BasicPropertyDetails";
import MorePropertyInfo from "./MorePropertyInfo";
import ReviewInfo from "./ReviewInfo";
import UploadImages from "./Property-Types-Forms/UploadImages";

const steps = [
  "Basic Details",
  "Property Details",
  "Review and Submit",
  "Upload Images",
];

const Form = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [property_id, setproperty_id] = useState();
  const [loading, setloading] = useState(false);
  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const formik = useFormik({
    initialValues: {
      PropertyName: "",
      PropertyTypes: "",
      Location: "",
      PropertyFacing: "",
      DepositAmount: "",
      phone: "",
      PropertyStatus: "",
      AboutDeveloper: "",
      Units: "",
      PropertyHighlights: "",
      Area: "",
      Amenities: "",
      aroundtheProject: "",
      propertyConfiguration: "",
      price: "",
      AboutProject: "",
      generalPrice: "",
      emiprice: "",
      moreAboutProject: "",
      RegidtryRecords: "",
      locality: "",
    },
    validationSchema: Yup.object().shape({
      PropertyName: Yup.string().required("Property Name is required"),
      //   .PropertyName('property name is required'),
      PropertyTypes: Yup.string()
        .required("Property Type is required")
        .oneOf(
          [
            "Plots",
            "Flats",
            "Lands",
            "WareHouses",
            "PG",
            "OfficePlace",
            "CoWorkingPlace",
            "StudentHostels",
            "AgriculturalLands",
            "Apartment",
            "IndependentHouse",
          ],
          "Invalid Property Type"
        ),
      Location: Yup.string().required("Property Location is required"),
      PropertyFacing: Yup.string(),
      DepositAmount: Yup.string(),
      phone: Yup.string(),
      PropertyStatus: Yup.string()
        .required("Select Property Status")
        .oneOf(["Ready", "WithIn6Months", "MoreThan6Months"]),
      AboutDeveloper: Yup.string(),
      Area: Yup.string(),
    }),

    // const dataToSend = {
    //   ...formik.values,
    //   posted_by: userId,
    // };

    onSubmit: async () => {
      
      if (activeStep === 0) {
        try {
          setloading(true);
          const user = localStorage.getItem("user");
          const User = JSON.parse(user);
          const posted_by = User.uid;

          const response = await fetch(
            "https://db93a4e7-afba-4acc-8fb6-24c6904c08a7-00-wzqnnh54dv12.sisko.replit.dev/property",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },

              body: JSON.stringify({ ...formik.values, posted_by }),
            }
          );
          if (!response.ok) {
            console.log("Network response was not ok");
          }
          const data = await response.json();
          console.log(data.property_id);
          setproperty_id(data.property_id);
          console.log("Form data submitted successfully:", data);
          window.alert(` ${data.message}`);
          setloading(false);
          setActiveStep((prevStep) => prevStep + 1);
        } catch (error) {
          console.error("There was a problem submitting the form:", error);
          
        }
      }
      if (activeStep > 0 && activeStep <= steps.length) {
        setActiveStep((prevStep) => prevStep + 1);
      }
    },
  });

  const finalSubmit = async () => {
    try {
      setloading(true);
      const dataToSend = { ...formik.values, property_id };
      console.log(dataToSend);

      const response = await fetch(
        "https://db93a4e7-afba-4acc-8fb6-24c6904c08a7-00-wzqnnh54dv12.sisko.replit.dev/property",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataToSend),
        }
      );
      if (!response.ok) {
        console.log("Network response was not ok");
      }
      const data = await response.json();
      console.log("Form data submitted successfully:", data);
      window.alert(` ${data}`);
      setloading(false);
      setActiveStep((prevStep) => prevStep + 1);
    } catch (error) {
      console.error("There was a problem submitting the form:", error);
      
    }
  };

  const formContent = (step) => {
    switch (step) {
      case 0:
        return <BasicPropertyDetails formik={formik} />;
      case 1:
        return <MorePropertyInfo formik={formik} />;
      case 2:
        return <ReviewInfo formik={formik} />;
      case 3:
        return <UploadImages formik={formik} property_id={property_id} />;
      default:
        return <div>404: Not Found</div>;
    }
  };

  return (
    <Box
      sx={{
        maxWidth: "100%",
        padding: 2,
        marginTop: "40px",
        position:"relative",
      }}
    >
      <Stepper activeStep={activeStep} orientation="horizontal">
        {steps.map((label, index) => (
          <Step key={index}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Grid container>
        <Grid item xs={12} sx={{ padding: "20px" }}>
          {formContent(activeStep)}
        </Grid>
        {formik.errors.submit && (
          <Grid item xs={12}>
            <FormHelperText error>{formik.errors.submit}</FormHelperText>
          </Grid>
        )}
        <Grid item xs={12}>
          {activeStep === steps.length - 1 ? null : ( 
            <Button
              sx={{
                padding: "10px 40px",
                borderRadius: "2px",
                margin: "0px 10px",
              }}
              disabled={activeStep === 0 || activeStep === 1}
              onClick={handleBack}
            >
              Back
            </Button>
          )}

          {activeStep !== steps.length - 1 && (
            <Button
              sx={{
                padding: "10px 40px",
                backgroundColor: "#FF6600",
                borderRadius: "2px",
                margin: "0px 10px",
              }}
              onClick={
                activeStep === steps.length - 2
                  ? finalSubmit
                  : formik.handleSubmit
              }
            >
              {activeStep === steps.length - 2 ? "Submit" : "Next"}
            </Button>
          )}
        </Grid>
        {loading && (
          <Grid item xs ={12}>
            <div style={{width:"100%",height:"100%",background:"white",position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",opacity:"0.8"}}></div>
            <CircularProgress sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            // background:"white"
          }}/></Grid>
        )}
      </Grid>
    </Box>
  );
};

export default Form;
