import React, { useEffect, useState } from "react";
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
import { useForm, Controller } from "react-hook-form";
import { useLocation } from "react-router-dom";
import {
  selectProperties,
  addProperty,
  updateProperty,
} from "../PropertySlice1";
import { selectUser } from "app/store/userSlice";
import UploadImages from "./Property-Types-Forms/UploadImages";
import AreaJson from "../../../../assets/Default/area/result.json";

const Form = () => {
  const propertiesData = useSelector(selectProperties);
  const location = useLocation();
  const currentPath = location.pathname;
  const propertyData = propertiesData?.data?.property || {};
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const [heading, setHeading] = useState("");
  const [showComponent, setShowComponent] = useState(true);
  const [isEditMode, setIsEditMode] = useState(false);
  const [districts, setDistricts] = useState([]);
  const [areas, setAreas] = useState([]);
  const [responseData, setResponseData] = useState(null);
  console.log("isEditMode", isEditMode);
  console.log("propertyData", propertyData);
  const defaultValues = {
    AboutDeveloper: propertyData?.AboutDeveloper || "",
    bhk: propertyData?.bhk || "",
    Flooring: propertyData?.Flooring || "",
    PowerBackup: propertyData?.PowerBackup || "",
    PropertyAge: propertyData?.PropertyAge || "",
    WaterSource: propertyData?.WaterSource || "",
    ad_info: propertyData?.ad_info || "",
    approved_by: propertyData?.approved_by || "",
    bound_wall: propertyData?.bound_wall || "",
    comments: propertyData?.comments || "",
    minPrice: propertyData?.listing_type === "buy" ? propertyData?.minPrice || 100000 : "",
    maxPrice: propertyData?.listing_type === "buy" ? propertyData?.maxPrice || 5000000 : "",
    developments: propertyData?.developments || "",
    dimensions: propertyData?.dimensions || "",
    direction: propertyData?.direction || "",
    state: propertyData?.state || "",
    size: propertyData?.size || "",
    district: propertyData?.district || "",
    document_number: propertyData?.doc_num || "",
    docfile: [],
    disputes: propertyData?.disputes || "",
    furnished: propertyData?.furnished || "",
    govt_price: propertyData?.govt_price || null,
    landmark: propertyData?.landmark || "",
    lift: propertyData?.lift || "",
    listing_type: propertyData?.listing_type || "",
    latitude: propertyData?.latitude || 0,
    longitude: propertyData?.longitude || 0,
    med_name: propertyData?.med_name || "",
    med_num1: propertyData?.med_num1 || "",
    med_num2: propertyData?.med_num2 || "",
    num_open_sides: propertyData?.num_open_sides || "",
    own_name: propertyData?.own_name || "",
    own_num1: propertyData?.own_num1 || "",
    own_num2: propertyData?.own_num2 || "",
    parking: propertyData?.parking || false,
    p_type: propertyData?.p_type || "",
    price: propertyData?.price || 0,
    prop_name: propertyData?.prop_name || "",
    rating: propertyData?.rating || "",
    reg_loc: propertyData?.reg_loc || "",
    rera: propertyData?.rera || "",
    status: propertyData?.status || "",
    survey_number: propertyData?.survey_number || "",
    unit: propertyData?.unit || "",
    user_id: propertyData?.user_id || "",
    v_comments: propertyData?.v_comments || "",
    v_status: propertyData?.v_status || false,
    village: propertyData?.village || "",
    loan_eligibile: propertyData?.loan_eligibile || false,
  };
  console.log("set form default Values 1", defaultValues);
  const {
    control,
    watch,
    handleSubmit,
    getValues,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues,
  });
  useEffect(() => {
    console.log("resetting default values ", defaultValues);
    reset(defaultValues);
  }, [propertiesData]);

  console.log("form default values 2", getValues());
  const selectedPropertyType = watch("p_type");
  const selectedState = watch("state");
  const selectedDistrict = watch("district");
  const handleKeyDown = (event) => {
    if (event.key === "-" || event.key === ".") {
      event.preventDefault();
    }
  };


  useEffect(() => {
    console.log("state change ", selectedState);
    if (selectedState) {
      const districtsInState = Object.keys(
        AreaJson.district_status[selectedState]
      ).filter((district) => AreaJson.district_status[selectedState][district]);
      setDistricts(districtsInState);
      setValue("district", propertyData?.district || "");
      setAreas([]);
    }
  }, [selectedState]);

  useEffect(() => {
    console.log("selected district ", selectedDistrict);
    if (selectedDistrict) {
      setAreas(AreaJson.areas[selectedDistrict] || []);
      setValue("village", propertyData?.village || "");
    }
  }, [selectedDistrict]);

  useEffect(() => {
    if (currentPath === "/Addproperty") {
      setHeading("Add Property");
      setIsEditMode(false);
    } else if (currentPath === "/UpdateProperty") {
      setHeading("Update Property");
      setIsEditMode(true);
    }
  }, [currentPath]);

  useEffect(() => {
    if (propertyData?.listing_type === "buy") {
      if (propertyData?.doc_num) {
       
        const [minPrice, maxPrice] = propertyData.doc_num.split(" - ").map(Number);
        setValue("minPrice", minPrice || ""); 
        setValue("maxPrice", maxPrice || "");
      }
    } 
  }, []);

  const propertyTypes = [
    "plot",
    "flat",
    "land",
    "PG",
    "office place",
    "co working place",
    "student hostel",
    "agricultural land",
    "independent house",
    "commercial",
  ];

  const Units = ["sqft", "sqyd", "sq.m", "acre", "cent"];

  // function findUpdatedFields(oldData, newData) {
  //   const updatedFields = {};
  //   if (oldData.hasOwnProperty("user_id")) {
  //     updatedFields["user_id"] = oldData["user_id"];
  //   }
  //   for (let key in oldData) {
  //     if (oldData.hasOwnProperty(key) && newData.hasOwnProperty(key)) {
  //       if (oldData[key] !== newData[key]) {
  //         updatedFields[key] = newData[key];
  //       }
  //     }
  //   }
  //   return updatedFields;
  // }

  function getUpdatedFields(defaultValues, currentValues) {
    const updatedFields = {};
    for (const key in currentValues) {
      if (currentValues[key] !== defaultValues[key]) {
        updatedFields[key] = currentValues[key];
      }
    }
    return updatedFields;
  }
  function filterNonEmptyFields(data) {
    return Object.keys(data).reduce((acc, key) => {
      if (data[key] !== undefined && data[key] !== null && data[key] !== "") {
        acc[key] = data[key];
      }
      return acc;
    }, {});
  }
  

  // const getChangedFields = (propertyData, formData) => {
  //   return findUpdatedFields(propertyData, formData);
  // };

  const onSubmit = async (data) => {
    // Handle special cases for specific fields
    if (Array.isArray(data.developments)) {
      data.developments = data.developments.join(", ");
    }
    if (data.minPrice !== undefined && data.maxPrice !== undefined) {
      data.doc_num = `${data.minPrice} - ${data.maxPrice}`;
    }
  
    let payload;
  
    if (isEditMode) {
      // In edit mode, send only updated fields
      const updatedFields = getUpdatedFields(defaultValues, data);
      payload = { ...updatedFields, p_id: propertyData?.p_id,user_id:propertyData?.user_id }; // Include p_id for edit mode
    } else {
      // In add mode, send only non-empty fields
      const nonEmptyFields = filterNonEmptyFields(data);
      payload = nonEmptyFields;
    }
  
    // Determine action based on mode
    const action = isEditMode ? updateProperty : addProperty;
  
    dispatch(action({ payload })).then((response) => {
      if (
        response.payload.message === "property added successfully" ||
        response.payload.message === "Property updated successfully"
      ) {
        alert(response.payload.message);
        setResponseData(response.payload);
        setShowComponent(false);
      } else {
        console.error(response.payload);
        alert("Some Error Occurred, Action couldn't be performed");
      }
    });
  };
  
// old functioning code with filtering of updated feilds

  // const onSubmit = async (data) => {
  //   if (Array.isArray(data.developments)) {
  //     data.developments = data.developments.join(", ");
  //   }
  //   if (data.minPrice !== undefined && data.maxPrice !== undefined) {
  //     const doc_num = `${data.minPrice} - ${data.maxPrice}`;

  //     data.doc_num = doc_num;
  //   }

  //   console.log("form data", data);

  //   const action = isEditMode ? updateProperty : addProperty;
  //   const p_id = propertyData?.p_id;
  //   let payload;
  //   if (currentPath === "/UpdateProperty") {
  //     payload = data
  //     //  getChangedFields(propertyData, data);
  //     if (isEditMode) {
  //       payload.p_id = p_id;
  //     }
  //   } else {
  //     payload = data;
  //     if (isEditMode) {
  //       payload.p_id = p_id;
  //     }
  //   }
  //   dispatch(action({ payload })).then((response) => {
  //     console.log(response)
  //     // alert(response.payload.message);
  //     if (
  //       response.payload.message === "property added successfully" ||
  //       response.payload.message === "Property updated successfully"
  //     ) {
  //       alert(response.payload.message);
  //       setResponseData(response.payload);
  //       setShowComponent(false);
  //     } else {
  //       console.error(response.payload);
  //       alert("Some Error Occurred, Action couldn't be performed");
  //     }
  //   });
  // };

  const filteredStates = AreaJson.state_status
    .filter((stateObj) => stateObj.status === true)
    .map((stateObj) => stateObj.state);

  if (!user) {
    return (
      <div className="flex flex-col flex-auto items-center sm:justify-center min-w-0">
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

  if (responseData) {
    return <UploadImages responseData={responseData} />;
  }
  // {showComponent && <UploadImages/>}


  console.log("form data ", getValues());

  return (
    <>    {showComponent ? (<Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ flexGrow: 1, width: "100%", maxWidth: 800, margin: "20px auto" }}
    >
      <Typography sx={{ fontSize: "20px", fontWeight: "600" }}>
        {heading}
      </Typography>
      <hr />
      {currentPath === "/UpdateProperty" && (
        <Button
          sx={{ marginTop: "20px" }}
          onClick={() => setShowComponent(!showComponent)}
        
        >
          Update Image/Documents
        </Button>
        
      )}
        {isEditMode && <Typography sx={{fontWeight:"600",fontSize:"16px",margin:"10px 0px"}}><span style={{color:"red",margin:"0px 10px"}}>*Note</span>Please Add Price in Property Comments To Change the price </Typography>}
      <Grid container spacing={2} sx={{ marginTop: "10px" }}>
        {(user.role === "admin" || user.role === "staff") && (
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Property Status</InputLabel>
              <Controller
                name="v_status"
                control={control}
                render={({ field }) => (
                  <Select {...field} label="Property Status"  onChange={(e) => field.onChange(e.target.value === 'true')}
                  value={field.value ? 'true' : 'false'}>
                    <MenuItem value="true">Verified</MenuItem>
                    <MenuItem value="false">Not Verified</MenuItem>
                  </Select>
                )}
              />
            </FormControl>
          </Grid>
        )}
        {isEditMode &&
          (user.role === "admin" ||
            user.role === "staff" ||
            user.role === "user") && (
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth variant="outlined">
                <InputLabel> Status</InputLabel>
                <Controller
                  name="status"
                  control={control}
                  render={({ field }) => (
                    <Select {...field} label="Property Status">
                      <MenuItem value="active">Active</MenuItem>
                      <MenuItem value="inactive">In Active</MenuItem>
                    </Select>
                  )}
                />
              </FormControl>
            </Grid>
          )}
        <Grid item xs={12} sm={6}>
          <FormControl
            fullWidth
            variant="outlined"
            error={!!errors.listing_type}
          >
            <InputLabel>Listing Type*</InputLabel>
            <Controller
              name="listing_type"
              control={control}
              rules={{ required: "Listing Type is required" }}
              render={({ field }) => (
                <Select {...field} label="Listing Type">
                  <MenuItem value="buy">Buy</MenuItem>
                  <MenuItem value="sell">Sell</MenuItem>
                </Select>
              )}
            />
            <FormHelperText>{errors.listing_type?.message}</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name="prop_name"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Property Name"
                variant="outlined"
                fullWidth
                error={!!errors.prop_name}
                helperText={errors.prop_name?.message}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth variant="outlined" error={!!errors.p_type}>
            <InputLabel>Property Type*</InputLabel>
            <Controller
              name="p_type"
              control={control}
              rules={{ required: "Property Type is required" }}
              render={({ field }) => (
                <Select {...field} label="Property Type">
                  {propertyTypes.map((type) => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
            <FormHelperText>{errors.p_type?.message}</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth variant="outlined" error={!!errors.unit}>
            <InputLabel>Unit</InputLabel>
            <Controller
              name="unit"
              rules={{ required: "Unit is required" }}
              control={control}
              render={({ field }) => (
                <Select {...field} label="Unit*">
                  {Units.map((type) => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
            <FormHelperText>{errors.unit?.message}</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name="size"
            control={control}
            rules={{ required: "Size is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Size"
                type="number"
                variant="outlined"
                fullWidth
                required
                error={!!errors.size}
                helperText={errors.size?.message}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name="dimensions"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Dimension"
                type="text"
                variant="outlined"
                fullWidth
                error={!!errors.dimensions}
                helperText={errors.dimensions?.message}
              />
            )}
          />
        </Grid>

        {selectedPropertyType === "flat" && (
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth variant="outlined" error={!!errors.bhk}>
              <InputLabel>No. of Bed Rooms *</InputLabel>
              <Controller
                name="bhk"
                control={control}
                rules={{ required: "Bed Room Type is required" }}
                render={({ field }) => (
                  <Select
                    {...field}
                    label="No. of Bed Room"
                    onChange={(e) => {
                      field.onChange(e); // Ensure onChange is passed down correctly
                    }}
                  >
                    <MenuItem value="1">1 BHK</MenuItem>
                    <MenuItem value="2">2 BHK</MenuItem>
                    <MenuItem value="3">3 BHK</MenuItem>
                    <MenuItem value="4">4 BHK</MenuItem>
                    <MenuItem value="5">5 BHK</MenuItem>
                    <MenuItem value="6">6 BHK</MenuItem>
                  </Select>
                )}
              />
              <FormHelperText>{errors.bhk?.message}</FormHelperText>
            </FormControl>
          </Grid>
        )}
        {selectedPropertyType === "flat" && (
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>RERA Status</InputLabel>
              <Controller
                name="rera_status"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    label="RERA Status"
                    onChange={(e) => {
                      field.onChange(e);
                    }}
                  >
                    <MenuItem value="Registered">Registered</MenuItem>
                    <MenuItem value="Not Registered">Not Registered</MenuItem>
                  </Select>
                )}
              />
            </FormControl>
          </Grid>
        )}
        {selectedPropertyType === "flat" && (
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Furnished</InputLabel>
              <Controller
                name="furnished"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    label="Furnished"
                    onChange={(e) => {
                      field.onChange(e);
                    }}
                  >
                    <MenuItem value="Yes">Yes</MenuItem>
                    <MenuItem value="No">No</MenuItem>
                  </Select>
                )}
              />
            </FormControl>
          </Grid>
        )}
        {(selectedPropertyType === "flat" ||
          selectedPropertyType === "PG" ||
          selectedPropertyType === "office place" ||
          selectedPropertyType === "co working place" ||
          selectedPropertyType === "student hostels" ||
          selectedPropertyType === "independent house") && (
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Lift</InputLabel>
              <Controller
                name="lift"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    label="Lift"
                    onChange={(e) => {
                      field.onChange(e);
                    }}
                  >
                    <MenuItem value="Yes">Yes</MenuItem>
                    <MenuItem value="No">No</MenuItem>
                  </Select>
                )}
              />
            </FormControl>
          </Grid>
        )}

        {selectedPropertyType === "plot" && (
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Boundary Wall</InputLabel>
              <Controller
                name="boundary_wall"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    label="Boundary Wall"
                    onChange={(e) => {
                      field.onChange(e);
                    }}
                  >
                    <MenuItem value="Yes">Yes</MenuItem>
                    <MenuItem value="No">No</MenuItem>
                  </Select>
                )}
              />
            </FormControl>
          </Grid>
        )}
        {selectedPropertyType === "plot" && (
          <Grid item xs={12} sm={6}>
         
              <FormControl fullWidth variant="outlined">
                <InputLabel>No. of Open Road Sides</InputLabel>
                <Controller
                  name="num_open_sides"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      label="No. of Open Road Sides"
                      onChange={(e) => {
                        field.onChange(e);
                      }}
                    >
                      <MenuItem value="1">1</MenuItem>
                      <MenuItem value="2">2</MenuItem>
                      <MenuItem value="3">3</MenuItem>
                      <MenuItem value="4">4</MenuItem>
                    </Select>
                  )}
                />
              </FormControl>
       
          </Grid>
        )}

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth variant="outlined" error={!!errors.state}>
            <InputLabel>State*</InputLabel>
            <Controller
              name="state"
              control={control}
              rules={{ required: "State is required" }}
              render={({ field }) => (
                <Select
                  {...field}
                  label="State"
                  onChange={(e) => {
                    field.onChange(e); // Ensure onChange is passed down correctly
                    console.log(e);
                    setDistricts(
                      Object.keys(AreaJson.district_status[e.target.value])
                    );
                    setAreas([]);
                    // setValue("district", ""); // Reset district when state changes
                    setValue("village", "");
                  }}
                >
                  {filteredStates.map((state) => (
                    <MenuItem key={state} value={state}>
                      {state}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />

            <FormHelperText>{errors.state?.message}</FormHelperText>
          </FormControl>
        </Grid>
        {isEditMode && <Grid item xs={12} sm={6}>
              <Controller
                name="comments"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Property Comments"
                    type="text"
                    variant="outlined"
                    fullWidth
 
                  />
                )}
              />
            </Grid>}
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth variant="outlined" error={!!errors.district}>
            <InputLabel>District*</InputLabel>
            <Controller
              name="district"
              control={control}
              rules={{ required: "District  is required" }}
              render={({ field }) => (
                <Select
                  {...field}
                  label="District"
                  onChange={(e) => {
                    field.onChange(e);
                    console.log("disctrict e ", e.target.value);
                    setValue("district", e.target.value);
                    // setAreas(AreaJson.areas[e.target.value] || []);
                    // setValue("village", "");
                  }}
                >
                  {districts.map((district) => (
                    <MenuItem key={district} value={district}>
                      {district}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
            <FormHelperText>{errors.district?.message}</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth variant="outlined" error={!!errors.village}>
            <InputLabel>Area*</InputLabel>
            <Controller
              name="village"
              control={control}
              rules={{ required: "Area is required" }}
              render={({ field }) => (
                <Select {...field} label="Area">
                  {areas
                    .filter((area) => area.area !== "All Areas")
                    .map((area) => (
                      <MenuItem key={area.id} value={area.area}>
                        {area.area}
                      </MenuItem>
                    ))}
                </Select>
              )}
            />
            <FormHelperText>{errors.village?.message}</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name="landmark"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Landmark"
                variant="outlined"
                fullWidth
                error={!!errors.landmark}
                helperText={errors.landmark?.message}
              />
            )}
          />
        </Grid>
        {(watch("listing_type") === "sell" && !isEditMode && (
          <Grid item xs={12} sm={6}>
            <Controller
              name="price"
              rules={{ required: "Price is required" }}
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Price (₹)"
                  type="number"
                  variant="outlined"
                  fullWidth
                  required
                  error={!!errors.price}
                  helperText={errors.price?.message}
                  onChange={(e) => field.onChange(parseFloat(e.target.value))}
                />
              )}
            />
          </Grid>
        )) ||
          (watch("listing_type") === "sell" &&
            isEditMode &&
            (user.role === "admin" || user.role === "staff") && (
              <Grid item xs={12} sm={6}>
                <Controller
                  name="price"
                  control={control}
                  rules={{ required: "Price is required" }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Price (₹)"
                      type="number"
                      variant="outlined"
                      fullWidth
                      error={!!errors.price}
                      helperText={errors.price?.message}
                      onChange={(e) =>
                        field.onChange(parseFloat(e.target.value))
                      }
                    />
                  )}
                />
              </Grid>
            ))}
        {(watch("listing_type") === "buy" && !isEditMode && (
          <Grid item xs={12} sm={6}>
            <Controller
              name="minPrice"
              control={control}
              rules={{ required: "Minimum Price is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Minimum Price"
                  placeholder="Enter minimum price*"
                  type="number"
                  variant="outlined"
                  fullWidth
                  error={!!errors.minPrice}
                  helperText={errors.minPrice?.message}
                />
              )}
            />
            <Controller
              name="maxPrice"
              control={control}
              rules={{ required: "Maximum Price is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Maximum Price"
                  placeholder="Enter maximum price*"
                  type="number"
                  variant="outlined"
                  fullWidth
                  error={!!errors.maxPrice}
                  helperText={errors.maxPrice?.message}
                />
              )}
            />
          </Grid>
        )) ||
          (watch("listing_type") === "buy" &&
            isEditMode &&
            (user.role === "admin" || user.role === "staff") && (
              <Grid item xs={12} sm={6}>
                <Controller
                  name="minPrice"
                  control={control}
                  rules={{ required: "Minimum Price is required" }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Minimum Price*"
                      placeholder="Enter minimum price*"
                      type="number"
                      variant="outlined"
                      fullWidth
                      error={!!errors.minPrice}
                      helperText={errors.minPrice?.message}
                    />
                  )}
                />
                <Controller
                  name="maxPrice"
                  control={control}
                  rules={{ required: "Maximum Price is required*" }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Maximum Price*"
                      placeholder="Enter maximum price*"
                      type="number"
                      variant="outlined"
                      fullWidth
                      error={!!errors.maxPrice}
                      helperText={errors.maxPrice?.message}
                    />
                  )}
                />
              </Grid>
            ))}
        <Grid item xs={12} sm={6}>
          <Controller
            name="survey_number"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Survey Number"
                variant="outlined"
                fullWidth
                error={!!errors.survey_number}
                helperText={errors.survey_number?.message}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth variant="outlined" error={!!errors.direction}>
            <InputLabel>Direction</InputLabel>
            <Controller
              name="direction"
              control={control}
              render={({ field }) => (
                <Select {...field} label="Direction">
                  <MenuItem value="East">East</MenuItem>
                  <MenuItem value="West">West</MenuItem>
                  <MenuItem value="North">North</MenuItem>
                  <MenuItem value="South">South</MenuItem>
                </Select>
              )}
            />
            <FormHelperText>{errors.direction?.message}</FormHelperText>
          </FormControl>
        </Grid>
        {watch("listing_type") === "sell" && (
          <Grid item xs={12} sm={6}>
            <Controller
              name="document_number"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Document Number"
                  variant="outlined"
                  fullWidth
                  error={!!errors.document_number}
                  helperText={errors.document_number?.message}
                />
              )}
            />
          </Grid>
        )}

        <Grid item xs={12} sm={6}>
          <FormControl
            fullWidth
            variant="outlined"
            error={!!errors.approved_by}
          >
            <InputLabel>Approved By</InputLabel>
            <Controller
              name="approved_by"
              control={control}
              render={({ field }) => (
                <Select {...field} label="Approved By">
                  <MenuItem value="VUDA">VUDA</MenuItem>
                  <MenuItem value="Panchayat">Panchayat</MenuItem>
                  <MenuItem value="Rera">RERA</MenuItem>
                </Select>
              )}
            />
            <FormHelperText>{errors.approved_by?.message}</FormHelperText>
          </FormControl>
        </Grid>
        {(user.role === "admin" || user.role === "staff") && (
          <>
            <Grid item xs={12} sm={6}>
              <Controller
                name="v_comments"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Internal Comments"
                    type="text"
                    variant="outlined"
                    fullWidth
                    error={!!errors.comments}
                    helperText={errors.comments?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth variant="outlined" error={!!errors.rating}>
                <InputLabel>Property Rating</InputLabel>
                <Controller
                  name="rating"
                  control={control}
                  render={({ field }) => (
                    <Select {...field} label="Property Rating">
                      <MenuItem value="1">1</MenuItem>
                      <MenuItem value="2">2</MenuItem>
                      <MenuItem value="3">3</MenuItem>
                      <MenuItem value="4">4</MenuItem>
                      <MenuItem value="5">5</MenuItem>
                    </Select>
                  )}
                />
                <FormHelperText>{errors.rating?.message}</FormHelperText>
              </FormControl>
            </Grid>
            
          </>
        )}
        <Grid item xs={12} sm={6}>
          <Controller
            name="developments"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Developments"
                type="text"
                variant="outlined"
                fullWidth
                error={!!errors.developments}
                helperText={errors.developments?.message}
                
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl
            fullWidth
            variant="outlined"
            error={!!errors.loan_eligibile}
          >
            <InputLabel>Loan Eligible</InputLabel>
            <Controller
              name="loan_eligibile"
              control={control}
              render={({ field }) => (
                <Select {...field} label="Loan Eligible">
                  <MenuItem value={true}>Yes</MenuItem>
                  <MenuItem value={false}>No</MenuItem>
                </Select>
              )}
            />
            <FormHelperText>{errors.loan_eligibile?.message}</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name="disputes"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Disputes"
                type="text"
                variant="outlined"
                fullWidth
                error={!!errors.disputes}
                helperText={errors.disputes?.message}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name="reg_loc"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Register Location"
                type="text"
                variant="outlined"
                fullWidth
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name="med_name"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Mediator Name"
                type="text"
                variant="outlined"
                fullWidth
                error={!!errors.med_name}
                helperText={errors.med_name?.message}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name="med_num1"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Mediator Number1"
                type="number"
                variant="outlined"
                fullWidth
                error={!!errors.med_num1}
                helperText={errors.med_num1?.message}
                onKeyDown={handleKeyDown}
                onChange={(e) => {
                  const value = e.target.value;
                  const newValue = value.replace(/\D/g, "");
                  if (newValue.length > 10) {
                    return;
                  }
                  field.onChange(newValue);
                }}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name="med_num2"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Mediator Number 2"
                type="number"
                variant="outlined"
                fullWidth
                error={!!errors.med_num2}
                helperText={errors.med_num2?.message}
                onKeyDown={handleKeyDown}
                onChange={(e) => {
                  const value = e.target.value;
                  const newValue = value.replace(/\D/g, "");
                  if (newValue.length > 10) {
                    return;
                  }
                  field.onChange(newValue);
                }}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name="own_name"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Owner Name"
                type="text"
                variant="outlined"
                fullWidth
                error={!!errors.own_name}
                helperText={errors.own_name?.message}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name="own_num1"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Owner Number 1"
                type="number"
                variant="outlined"
                fullWidth
                error={!!errors.own_num1}
                helperText={errors.own_num1?.message}
                onKeyDown={handleKeyDown}
                onChange={(e) => {
                  const value = e.target.value;
                  const newValue = value.replace(/\D/g, "");
                  if (newValue.length > 10) {
                    return;
                  }
                  field.onChange(newValue);
                }}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name="own_num2"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Owner Number 2"
                type="number"
                variant="outlined"
                fullWidth
                error={!!errors.own_num2}
                helperText={errors.own_num2?.message}
                onKeyDown={handleKeyDown}
                onChange={(e) => {
                  const value = e.target.value;
                  const newValue = value.replace(/\D/g, "");
                  if (newValue.length > 10) {
                    return;
                  }
                  field.onChange(newValue);
                }}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name="latitude"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Latitude"
                type="number"
                variant="outlined"
                fullWidth
                error={!!errors.latitude}
                helperText={errors.latitude?.message}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name="longitude"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Longitude"
                type="number"
                variant="outlined"
                fullWidth
                error={!!errors.longitude}
                helperText={errors.longitude?.message}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name="govt_price"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Government Price (₹)"
                type="number"
                variant="outlined"
                fullWidth
                error={!!errors.govt_price}
                helperText={errors.govt_price?.message}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="ad_info"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Property Information"
                variant="outlined"
                multiline
                rows={4}
                fullWidth
                error={!!errors.ad_info}
                helperText={errors.ad_info?.message}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" fullWidth>
            Submit
          </Button>
        </Grid>
      </Grid>
    </Box>) : (
      <UploadImages />
    )}
    </>
  );
  

};

export default Form;
