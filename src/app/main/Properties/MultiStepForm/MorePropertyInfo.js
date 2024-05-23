import React, { useState } from "react";
import {  TextField, Grid,} from "@mui/material";
import { styled } from "@mui/material/styles";
import UploadImages from "./Property-Types-Forms/UploadImages";

const MorePropertyInfo = (props) => {
  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });
  const { formik } = props;
  console.log("formik",formik)
  

  return (
    <>
    {/*<Grid container spacing={2}>
      
       <Grid item xs={12} md={6}>
        <TextField
          name="PropertyHighlights"
          label="Property Highlights"
          variant="outlined"
          type="text"
          fullWidth
          error={Boolean(
            formik.touched.PropertyHighlights &&
              formik.errors.PropertyHighlights
          )}
          onChange={formik.handleChange}
          value={formik.values.PropertyHighlights}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          name="Amenities"
          label="Amenities"
          variant="outlined"
          type="text"
          fullWidth
          error={Boolean(
            formik.touched.Amenities &&
              formik.errors.Amenities
          )}
          onChange={formik.handleChange}
          value={formik.values.Amenities}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          name="aroundtheProject"
          label="Around the Project"
          variant="outlined"
          type="text"
          fullWidth
          error={Boolean(
            formik.touched.aroundtheProject &&
              formik.errors.aroundtheProject
          )}
          onChange={formik.handleChange}
          value={formik.values.aroundtheProject}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          name="propertyConfiguration"
          label="Property Configuration"
          variant="outlined"
          type="text"
          fullWidth
          error={Boolean(
            formik.touched.propertyConfiguration &&
              formik.errors.propertyConfiguration
          )}
          onChange={formik.handleChange}
          value={formik.values.propertyConfiguration}
        />
      </Grid>
      
      
      <Grid item xs={12} md={6}>
        <TextField
          name="AboutProject"
          label="About Project"
          variant="outlined"
          type="text"
          fullWidth
          error={Boolean(
            formik.touched.AboutProject &&
              formik.errors.AboutProject
          )}
          onChange={formik.handleChange}
          value={formik.values.AboutProject}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          name="generalPrice"
          label="General Price"
          variant="outlined"
          type="number"
          fullWidth
          error={Boolean(
            formik.touched.generalPrice &&
              formik.errors.generalPrice
          )}
          onChange={formik.handleChange}
          value={formik.values.generalPrice}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          name="emiprice"
          label="Emi Price"
          variant="outlined"
          type="number"
          fullWidth
          error={Boolean(
            formik.touched.emiprice &&
              formik.errors.emiprice
          )}
          onChange={formik.handleChange}
          value={formik.values.emiprice}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          name="moreAboutProject"
          label="More About Project"
          variant="outlined"
          type="text"
          fullWidth
          error={Boolean(
            formik.touched.moreAboutProject &&
              formik.errors.moreAboutProject
          )}
          onChange={formik.handleChange}
          value={formik.values.moreAboutProject}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          name="RegidtryRecords"
          label="Registry Records"
          variant="outlined"
          type="text"
          fullWidth
          error={Boolean(
            formik.touched.RegidtryRecords &&
              formik.errors.RegidtryRecords
          )}
          onChange={formik.handleChange}
          value={formik.values.RegidtryRecords}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          name="locality"
          label="Locality"
          variant="outlined"
          type="text"
          fullWidth
          error={Boolean(
            formik.touched.locality &&
              formik.errors.locality
          )}
          onChange={formik.handleChange}
          value={formik.values.locality}
        />
      </Grid>
      
    </Grid> */}
    <UploadImages/>
    </>
  );
};

export default MorePropertyInfo;
