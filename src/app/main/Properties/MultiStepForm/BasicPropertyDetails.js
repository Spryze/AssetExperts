import React, { useState } from "react";
import FormHelperText from "@mui/material/FormHelperText";
import {
  TextField,
  FormControl,
  Box,
  Select,
  MenuItem,
  InputLabel,
  Typography,
  Button,
  Grid,
} from "@mui/material";
const BasicPropertyDetails = (props) => {
  const { formik } = props;
  return (
    <Grid container spacing={2} sx={{marginTop:"10px"}}>
      <Grid item xs={12} md={6}>
        {/* <FormControl fullWidth error={Boolean(formik.touched.PropertyName && formik.errors.PropertyName)}></FormControl> */}
        <TextField
          name="PropertyName"
          label="Property Name"
          variant="outlined"
          type="text"
          fullWidth
          error={Boolean(
            formik.touched.PropertyName && formik.errors.PropertyName
          )}
          onChange={formik.handleChange}
          value={formik.values.PropertyName}
        />
        {formik.errors.PropertyName && (
          <FormHelperText>{formik.errors.PropertyName}</FormHelperText>
        )}
        {/* <FormControl/> */}
      </Grid>
      <Grid item xs={12} md={6}>
        <FormControl
          fullWidth
          error={Boolean(
            formik.touched.PropertyTypes && formik.errors.PropertyTypes
          )}
        >
          <InputLabel id="PropertyTypes">Property Types</InputLabel>
          <Select
            labelId="PropertyTypes"
            id="PropertyTypes"
            value={formik.values.PropertyTypes}
            name="PropertyTypes"
            label="Property Types"
            onChange={formik.handleChange}
          >
            <MenuItem value={"Plots"}>Plot</MenuItem>
            <MenuItem value={"Flats"}>Flat</MenuItem>
            <MenuItem value={"Lands"}>Land</MenuItem>
            <MenuItem value={"WareHouses"}>Ware Houses</MenuItem>
            <MenuItem value={"PG"}>PG(paying Guest)</MenuItem>
            <MenuItem value={"OfficePlace"}>Office Place</MenuItem>
            <MenuItem value={"CoWorkingPlace"}>Co Working Place</MenuItem>
            <MenuItem value={"StudentHostels"}>Student Hostels</MenuItem>
            <MenuItem value ={"Apartment"}>Appartment</MenuItem>
            <MenuItem value ={"IndependentHouse"}>Independent House</MenuItem>

          </Select>
        </FormControl>
        {formik.errors.PropertyTypes && (
          <FormHelperText>{formik.errors.PropertyTypes}</FormHelperText>
        )}
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          name="Area"
          label="Property Area"
          variant="outlined"
          type="number"
          fullWidth
          value={formik.values.PlotArea}
          onChange={formik.handleChange}
          error={formik.touched.PlotArea && Boolean(formik.errors.PlotArea)}
          helperText={formik.touched.PlotArea && formik.errors.PlotArea}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <FormControl
          fullWidth
          error={Boolean(formik.touched.Units && formik.errors.Units)}
        >
          <InputLabel id="Units">Units</InputLabel>
          <Select
            labelId="Units"
            id="Units"
            value={formik.values.Units}
            name="Units"
            label="Units"
            onChange={formik.handleChange}
          >
            {formik.values.PropertyTypes === "Plots" && [
              <MenuItem key="sq.ft" value={"sq.ft"}>
                sq.ft
              </MenuItem>,
            ]}
            {formik.values.PropertyTypes === "Flats" && [
              <MenuItem key="sq.ft" value={"sq.ft"}>
                sq.ft
              </MenuItem>,
            ]}
            {formik.values.PropertyTypes === "Lands" && [
              <MenuItem key="Sq.yards" value={"Sq.yards"}>
                Sq.Yards
              </MenuItem>,
            ]}
            {formik.values.PropertyTypes === "WareHouses" && [
              <MenuItem key="Sq.ft" value={"Sq.ft"}>
                Sq.ft
              </MenuItem>,
            ]}
            {formik.values.PropertyTypes === "PG" && [
              <MenuItem key="Sq.ft" value={"Sq.ft"}>
                Sq.ft
              </MenuItem>,
            ]}
            {formik.values.PropertyTypes === "OfficePlace" && [
              <MenuItem key="Sq.ft" value={"Sq.ft"}>
                Sq.ft
              </MenuItem>,
            ]}
            {formik.values.PropertyTypes === "CoWorkingPlace" && [
              <MenuItem key="Sq.ft" value={"Sq.ft"}>
                Sq.ft
              </MenuItem>,
            ]}
            {formik.values.PropertyTypes === "StudentHostels" && [
              <MenuItem key="ready" value={"Sq.ft"}>
                Ready
              </MenuItem>,
            ]}

            {formik.values.PropertyTypes === "Apartment" && [
              <MenuItem key="sq.Ft" value={"sq.Ft"}>
                sq.Ft
              </MenuItem>,
            ]}
            {formik.values.PropertyTypes === "IndependentHouse" && [
              <MenuItem key="sq.Ft" value={"sq.Ft"}>
                sq.Ft
              </MenuItem>,
            ]}
          </Select>
        </FormControl>
        {formik.errors.Units && (
          <FormHelperText>{formik.errors.Units}</FormHelperText>
        )}
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          name="Location"
          label="Property Location"
          variant="outlined"
          type="text"
          fullWidth
          error={Boolean(formik.touched.Location && formik.errors.Location)}
          onChange={formik.handleChange}
          value={formik.values.Location}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          name="PropertyFacing"
          label="Property Facing"
          variant="outlined"
          type="text"
          fullWidth
          error={Boolean(
            formik.touched.PropertyFacing && formik.errors.PropertyFacing
          )}
          onChange={formik.handleChange}
          value={formik.values.PropertyFacing}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          name="DepositAmount"
          label="Deposit Amount"
          variant="outlined"
          type="number"
          fullWidth
          error={Boolean(
            formik.touched.DepositAmount && formik.errors.DepositAmount
          )}
          onChange={formik.handleChange}
          value={formik.values.DepositAmount}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          name="phone"
          label="Phone Number"
          variant="outlined"
          type="text"
          fullWidth
          error={Boolean(formik.touched.Phone && formik.errors.Phone)}
          onChange={formik.handleChange}
          value={formik.values.Phone}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <FormControl
          fullWidth
          error={Boolean(
            formik.touched.PropertyTypes && formik.errors.PropertyTypes
          )}
        >
          <InputLabel id="PropertyTypes">Property Status</InputLabel>
          <Select
            labelId="PropertyStatus"
            id="PropertyStatus"
            value={formik.values.PropertyStatus}
            name="PropertyStatus"
            label="Property Status"
            onChange={formik.handleChange}
          >
            <MenuItem value={"Ready"}>Ready</MenuItem>
            <MenuItem value={"WithIn6Months"}>With In 6 Months</MenuItem>
            <MenuItem value={"MoreThan6Months"}>More Than 6 Months</MenuItem>
          </Select>
        </FormControl>
        {formik.errors.PropertyTypes && (
            <FormHelperText>{formik.errors.PropertyStatus}</FormHelperText>
          )}
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          name="AboutDeveloper"
          label="About Developer"
          variant="outlined"
          type="text"
          fullWidth
          error={Boolean(
            formik.touched.AboutDeveloper && formik.errors.AboutDeveloper
          )}
          onChange={formik.handleChange}
          value={formik.values.AboutDeveloper}
        />
      </Grid>

      {formik.errors.submit && (
        <Grid item xs={12}>
          <FormHelperText error>{formik.errors.submit}</FormHelperText>
        </Grid>
      )}
    </Grid>
  );
};

export default BasicPropertyDetails;
