import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import { addProperty, updateProperty } from "../PropertySlice1";
import { selectUser } from "app/store/userSlice";
import UploadImages from "./Property-Types-Forms/UploadImages";

const Form = ({ isEditMode = false, propertyData = {} }) => {
  console.log("isEditMode", isEditMode);
  console.log("propertyData", propertyData);
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  console.log("user", user);

  const [formData, setFormData] = useState({
    prop_name: "" || propertyData?.propertyData?.propertyName,
    p_type: propertyData?.propertyData?.p_type || "",
    dimensions: "" || propertyData?.propertyData?.dimensions,
    unit: "" || propertyData?.propertyData?.unit,
    state: "" || propertyData?.propertyData?.state,
    district: "" || propertyData?.propertyData?.district,
    village: "" || propertyData?.propertyData?.village,
    landmark: "" || propertyData?.propertyData?.landmark,
    price: 0 || propertyData?.propertyData?.price,
    survey_number: "" || propertyData?.propertyData?.survey_number,
    doc_num: "" || propertyData?.propertyData?.doc_num,
    AboutDeveloper: "" || propertyData?.propertyData?.AboutDeveloper,
    ad_info: "" || propertyData?.propertyData?.ad_info,
    size: 0 || propertyData?.propertyData?.size,
    boundry_wall: "" || propertyData?.propertyData?.boundry_wall,
    furnshied: "" || propertyData?.propertyData?.furnshied,
    approved_by: "" || propertyData?.propertyData?.approved_by,
    parking: false || propertyData?.propertyData?.parking,
    WaterSource: "" || propertyData?.propertyData?.WaterSource,
    Flooring: "" || propertyData?.propertyData?.Flooring,
    PowerBackup: "" || propertyData?.propertyData?.PowerBackup,
    num_open_sides: "" || propertyData?.propertyData?.num_open_sides,
    PropertyStatus: "" || propertyData?.propertyData?.PropertyStatus,
    status: "" || propertyData?.propertyData?.status,
    rera: "" || propertyData?.propertyData?.rera,
    bound_wall: "" || propertyData?.propertyData?.bound_wall,
    BHK: "" || propertyData?.propertyData?.BHK,
    lift: "" || propertyData?.propertyData?.lift,
    PropertyAge: "" || propertyData?.propertyData?.PropertyAge,
    comments: "" || propertyData?.propertyData?.comments,
    v_comments: "" || propertyData?.propertyData?.v_comments,
    developments: "" || propertyData?.propertyData?.developments,
    disputes: "" || propertyData?.propertyData?.disputes,
    reg_loc: "" || propertyData?.propertyData?.reg_loc,
    med_name: "" || propertyData?.propertyData?.med_name,
    med_num1: "" || propertyData?.propertyData?.med_num1,
    med_num2: "" || propertyData?.propertyData?.med_num2,
    own_name: "" || propertyData?.propertyData?.own_name,
    own_num1: "" || propertyData?.propertyData?.own_num1,
    own_num2: "" || propertyData?.propertyData?.own_num2,
    longitude: 0 || propertyData?.propertyData?.longitude,
    latitude: 0 || propertyData?.propertyData?.latitude,
    direction: "" || propertyData?.propertyData?.direction,
    listing_type: "" || propertyData?.propertyData?.listing_type,
    loan_eligibile: false || propertyData?.propertyData?.loan_eligibile,
    No_bed_rooms: "" || propertyData?.propertyData?.No_bed_rooms,
    govt_price: "" || propertyData?.propertyData?.govt_price,
    user_id: "" || propertyData?.propertyData?.user_id,
    rating: "" || propertyData?.propertyData?.rating,
  });

  const [formErrors, setFormErrors] = useState({});
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [responseData, setResponseData] = useState(null);

  useEffect(() => {
    if (isEditMode && propertyData) {
      setFormData({ ...propertyData });
    }
  }, [isEditMode, propertyData]);

  const propertyTypes = [
    "plot",
    "flat",
    "land",
    "PG",
    "office place",
    "co working place",
    "student hostels",
    "agricultural lands",
    "independent house",
  ];
  const Units = ["sq.ft", "sqyd", "sq.m", "acres"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    const parsedValue = ["price", "size", "latitude", "longitude"].includes(name)
      ? parseFloat(value)
      : name === "loan_eligibile"
      ? value === "true"
      : value;
    setFormData({
      ...formData,
      [name]: parsedValue,
    });
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.propertyName)
      errors.propertyName = "Property Name is required";
    if (!formData.p_type) errors.p_type = "Property Type is required";
    if (!formData.price) errors.price = "Price is required";
    // if (!formData.govt_price) errors.govt_price = "Government Price is required";
    return errors;
  };

  const handleSubmit = async (e) => {
    console.log("hii");
    e.preventDefault();
    const errors = validateForm();
    console.log("errors", errors);
    if (Object.keys(errors).length === 0) {
      const action = propertyData?.isEditMode ? updateProperty : addProperty;
      const p_id = propertyData?.propertyData?.property_id;
      const resultAction = dispatch(action({ formData, p_id })).then(
        (response) => {
          console.log("response", response);
          if (response.payload.message === "property added successfully") {
            setResponseData(response.payload);
            setIsFormSubmitted(true);
          } else {
            console.error(resultAction.payload);
          }
        }
      );
    } else {
      setFormErrors(errors);
    }
  };

  if (!user) {
    return (
      <div
        className="flex flex-col flex-auto items-center sm:justify-center min-w-0"
        style={{ height: "100vh" }}
      >
        <Paper className="flex items-center w-full sm:w-auto min-h-full sm:min-h-auto rounded-0 py-32 px-16 sm:p-48 sm:rounded-2xl sm:shadow">
          <div className="w-full max-w-320 sm:w-320 mx-auto sm:mx-0">
            <img
              className="w-48 mx-auto"
              src="assets/images/logo/logo.svg"
              alt="logo"
            />

            <Typography className="mt-32 text-4xl font-extrabold tracking-tight leading-tight text-center">
              Please Login!
            </Typography>
          </div>
        </Paper>
      </div>
    );
  }

  if (isFormSubmitted) {
    return <UploadImages responseData={responseData} />;
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ flexGrow: 1, width: "100%", maxWidth: 800, margin: "20px auto" }}
    >
      {propertyData?.isEditMode === true ? (
        <Typography variant="h6" sx={{}}>
          Edit Property
        </Typography>
      ) : (
        <Typography variant="h6" sx={{}}>
          Add Property
        </Typography>
      )}
      <hr />
      <Grid container spacing={2} sx={{ marginTop: "10px" }}>
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
            label="Property Name"
            name="propertyName"
            value={formData.prop_name}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            required
            error={!!formErrors.propertyName}
            helperText={formErrors.propertyName}
          />
        </Grid>
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
          <TextField
            label="Dimension"
            name="dimensions"
            type="text"
            value={formData.dimensions}
            onChange={handleChange}
            variant="outlined"
            fullWidth
          />
        </Grid>
        {formData.p_type === "Flat" && (
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>No. of Bed Rooms</InputLabel>
              <Select
                label="No. of Bed Room"
                name="No_bed_rooms"
                value={formData.No_bed_rooms}
                onChange={handleChange}
              >
                <MenuItem value="1">1 BHK</MenuItem>
                <MenuItem value="2">2 BHK</MenuItem>
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
                name="furnshied"
                value={formData.furnshied}
                onChange={handleChange}
              >
                <MenuItem value="Yes">Yes</MenuItem>
                <MenuItem value="No">No</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        )}

        {formData.p_type === "Plot" && (
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Boundary Wall</InputLabel>
              <Select
                label="Boundary Wall"
                name="bound_wall"
                value={formData.bound_wall}
                onChange={handleChange}
              >
                <MenuItem value="Yes">Yes</MenuItem>
                <MenuItem value="No">No</MenuItem>
              </Select>
              <FormHelperText>{formErrors.unit}</FormHelperText>
            </FormControl>
          </Grid>
        )}
        {formData.p_type === "Plot" && (
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>No. of Open Road Sides</InputLabel>
              <Select
                label="No. of Open Road Sides"
                name="num_open_sides"
                value={formData.num_open_sides}
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

        {formData.p_type === "Flat" && (
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>RERA Status</InputLabel>
              <Select
                label="RERA Status"
                name="rera"
                value={formData.rera}
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
                name="lift"
                value={formData.lift}
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
            label="Price (₹)"
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
          <FormControl fullWidth variant="outlined">
            <InputLabel>Direction</InputLabel>
            <Select
              label="Direction"
              name="direction"
              value={formData.direction}
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
            name="approved_by"
            value={formData.approved_by}
            onChange={handleChange}
            variant="outlined"
            multiline
            fullWidth
          />
        </Grid>
        {(user.role == "admin" || user.role === "staff") && (
          <Grid item xs={12} sm={6}>
            <TextField
              label="Internal Comments"
              name="comments"
              type="text"
              value={formData.comments}
              onChange={handleChange}
              variant="outlined"
              fullWidth
            />
          </Grid>
        )}
        {(user.role == "admin" || user.role === "staff") && (
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Property Rating</InputLabel>
              <Select
                label="property rating"
                name="rating"
                value={formData.rating}
                onChange={handleChange}
              >
                <MenuItem value="1">1</MenuItem>
                <MenuItem value="2">2</MenuItem>
                <MenuItem value="3">3</MenuItem>
                <MenuItem value="4">4</MenuItem>
                <MenuItem value="5">5</MenuItem>
              </Select>
              <FormHelperText>{formErrors.unit}</FormHelperText>
            </FormControl>
          </Grid>
        )}
        {(user.role === "admin" || user.role === "staff") && (
          <Grid item xs={12} sm={6}>
            <TextField
              label="Property Comments"
              name="v_comments"
              type="text"
              value={formData.v_comments}
              onChange={handleChange}
              variant="outlined"
              fullWidth
            />
          </Grid>
        )}

        <Grid item xs={12} sm={6}>
          <TextField
            label="Developments"
            name="developments"
            type="text"
            value={formData.developments}
            onChange={handleChange}
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth variant="outlined">
            <InputLabel>Loan Eligible</InputLabel>
            <Select
              label="Loan Eligible"
              name="loan_eligibile"
              value={formData.loan_eligibile}
              onChange={handleChange}
              required
            >
              <MenuItem value={true}>Yes</MenuItem>
              <MenuItem value={false}>No</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="Disputes"
            name="disputes"
            type="text"
            value={formData.disputes}
            onChange={handleChange}
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Registrar Location"
            name="reg_loc"
            type="text"
            value={formData.reg_loc}
            onChange={handleChange}
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Mediator Name"
            name="med_name"
            type="text"
            value={formData.med_name}
            onChange={handleChange}
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Meidator Number1"
            name="med_num1"
            type="number"
            value={formData.med_num1}
            onChange={handleChange}
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Meidator Number 2"
            name="med_num2"
            type="number"
            value={formData.med_num2}
            onChange={handleChange}
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Owner Name"
            name="own_name"
            type="text"
            value={formData.own_name}
            onChange={handleChange}
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Owner Number 1"
            name="own_num1"
            type="number"
            value={formData.own_num1}
            onChange={handleChange}
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Owner Number 2"
            name="own_num2"
            type="number"
            value={formData.own_num2}
            onChange={handleChange}
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Latitude"
            name="latitude"
            type="number"
            value={formData.latitude}
            onChange={handleChange}
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Longitude"
            name="longitude"
            type="number"
            value={formData.longitude}
            onChange={handleChange}
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Government Price (₹)"
            name="govt_price"
            type="float"
            value={formData.govt_price}
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
            label="Property Information"
            name="ad_info"
            value={formData.ad_info}
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
