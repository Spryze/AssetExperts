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
import { useLocation } from "react-router-dom";
import { selectProperties } from "../PropertySlice1";
import { addProperty, updateProperty } from "../PropertySlice1";
import { selectUser } from "app/store/userSlice";
import UploadImages from "./Property-Types-Forms/UploadImages";
import AreaJson from "../../../../assets/Default/area/result.json";

const Form = () => {
  // const propertiesData = useSelector(selectProperties);
  // const propertiesdata = useSelector(selectProperties);
  // console.log("propertiesData in form", propertiesData);
  // const location = useLocation();
  // const currentPath = location.pathname;
  // const propertyData = propertiesData?.data?.property;
  // const dispatch = useDispatch();
  // const user = useSelector(selectUser);
  // const [heading, setHeading] = useState();
  // const [showComponent, setShowComponent] = useState(true);
  // const [selectedState, setSelectedState] = useState("");
  // const [selectedDistrict, setSelectedDistrict] = useState("");
  // const [districts, setDistricts] = useState([]);
  // const [areas, setAreas] = useState([]);
  // console.log("areas", areas);

  // const [formData, setFormData] = useState({
  //   AboutDeveloper: propertyData?.AboutDeveloper || "",
  //   bhk: propertyData?.BHK || "",
  //   Flooring: propertyData?.Flooring || "",
  //   bhk: propertyData?.bhk || "",
  //   PowerBackup: propertyData?.PowerBackup || "",
  //   PropertyAge: propertyData?.PropertyAge || "",
  //   WaterSource: propertyData?.WaterSource || "",
  //   ad_info: propertyData?.ad_info || "",
  //   approved_by: propertyData?.approved_by || "",
  //   bound_wall: propertyData?.bound_wall || "",
  //   comments: propertyData?.comments || "",
  //   developments: propertyData?.developments || "",
  //   dimensions: propertyData?.dimensions || "",
  //   direction: propertyData?.direction || "",
  //   district: propertyData?.district || "",
  //   document_number: propertyData?.document_number || "",
  //   docfile: [],
  //   disputes: propertyData?.disputes || "",
  //   furnshied: propertyData?.furnshied || "",
  //   govt_price: propertyData?.govt_price || null,
  //   landmark: propertyData?.landmark || "",
  //   lift: propertyData?.lift || "",
  //   listing_type: propertyData?.listing_type || "",
  //   latitude: propertyData?.latitude || 0,
  //   longitude: propertyData?.longitude || 0,
  //   med_name: propertyData?.med_name || "",
  //   med_num1: propertyData?.med_num1 || "",
  //   med_num2: propertyData?.med_num2 || "",
  //   num_open_sides: propertyData?.num_open_sides || "",
  //   own_name: propertyData?.own_name || "",
  //   own_num1: propertyData?.own_num1 || "",
  //   own_num2: propertyData?.own_num2 || "",
  //   parking: propertyData?.parking || false,
  //   price: propertyData?.price || 0,
  //   prop_name: propertyData?.property_name || "",
  //   rating: propertyData?.rating || "",
  //   reg_loc: propertyData?.reg_loc || "",
  //   rera: propertyData?.rera || "",
  //   state: propertyData?.state || "",
  //   status: propertyData?.status || "",
  //   survey_number: propertyData?.survey_number || "",
  //   unit: propertyData?.unit || "",
  //   user_id: propertyData?.user_id || "",
  //   v_comments: propertyData?.v_comments || "",
  //   v_status: propertyData?.PropertyStatus || false,
  //   village: propertyData?.village || "",
  //   loan_eligibile: propertyData?.loan_eligibile || false,
  // });

  // const [formErrors, setFormErrors] = useState({});
  // const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  // const [responseData, setResponseData] = useState(null);
  // const [isEditMode, SetisEditMode] = useState();

  // useEffect(() => {
  //   if (selectedState) {
  //     console.log(selectedState);
  //     const districtsInState = Object.keys(
  //       AreaJson.district_status[selectedState]
  //     ).filter((district) => AreaJson.district_status[selectedState][district]);
  //     setDistricts(districtsInState);
  //     setSelectedDistrict("");
  //     setAreas([]);
  //   }
  // }, [selectedState]);

  // useEffect(() => {
  //   if (selectedDistrict) {
  //     setAreas(AreaJson.areas[selectedDistrict] || []);
  //   }
  // }, [selectedDistrict]);
  // useEffect(() => {
  //   if (currentPath === "/Addproperty") {
  //     setHeading("Add Property");
  //     SetisEditMode(false);
  //   } else if (currentPath === "/UpdateProperty") {
  //     setHeading("Update Property");
  //     SetisEditMode(true);
  //   }
  // }, [currentPath]);

  // const propertyTypes = [
  //   "plot",
  //   "flat",
  //   "land",
  //   "PG",
  //   "office place",
  //   "co working place",
  //   "student hostels",
  //   "agricultural lands",
  //   "independent house",
  //   "commercial",
  // ];
  // const Units = ["sqft", "sqyd", "sq.m", "acre", "cent"];

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   const parsedValue = [
  //     "price",
  //     "size",
  //     "latitude",
  //     "longitude",
  //     "govt_price",
  //   ].includes(name)
  //     ? parseFloat(value)
  //     : name === "loan_eligibile"
  //     ? value === "true"
  //     : value;
  //   setFormData({
  //     ...formData,
  //     [name]: parsedValue,
  //   });
  // };

  // const handleFileChange = (e) => {
  //   const docFiles = document.getElementById("fileUpload").files;
  //   const filesArray = Array.from(docFiles).map((file) => ({
  //     name: file.name,
  //     lastModified: file.lastModified,
  //     lastModifiedDate: file.lastModifiedDate,
  //     size: file.size,
  //     type: file.type,
  //   }));

  //   setFormData({
  //     ...formData,
  //     docfile: filesArray,
  //   });
  // };

  // const validateForm = () => {
  //   const errors = {};
  //   if (!formData.prop_name) errors.propertyName = "Property Name is required";
  //   if (!formData.p_type) errors.p_type = "Property Type is required";
  //   if (formData.med_num1 && formData.med_num1.replace(/\D/g, '').length > 10) {
  //     errors.med_num1 = "Phone Number should not contain more than 10 numbers";
  //   }
  //   if (formData.med_num2 && formData.med_num2.replace(/\D/g, '').length > 10) {
  //     errors.med_num2 = "Phone Number should not contain more than 10 numbers";
  //   }
  //   if (formData.own_num1 && formData.med_num2.replace(/\D/g, '').length > 10) {
  //     errors.own_num1 = "Phone Number should not contain more than 10 numbers";
  //   }
  //   if (formData.own_num2 && formData.med_num2.replace(/\D/g, '').length > 10) {
  //     errors.own_num2 = "Phone Number should not contain more than 10 numbers";
  //   }
  //   return errors;
  // };

  // const deepObjectDifference = (obj1, obj2) => {
  //   const diff = {};

  //   // Check all keys in obj1
  //   Object.keys(obj1).forEach(key => {
  //     // If obj2 does not have the key or values differ
  //     if (!obj2.hasOwnProperty(key) || obj1[key] !== obj2[key]) {
  //       // If both values are objects, recursively check for differences
  //       if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
  //         const nestedDiff = deepObjectDifference(obj1[key], obj2[key]);
  //         if (Object.keys(nestedDiff).length > 0) {
  //           diff[key] = nestedDiff;
  //         }
  //       } else {
  //         // Otherwise, add to differences
  //         diff[key] = obj1[key];
  //       }
  //     }
  //   });

  //   // Check keys in obj2 that are not in obj1
  //   Object.keys(obj2).forEach(key => {
  //     if (!obj1.hasOwnProperty(key)) {
  //       diff[key] = obj2[key];
  //     }
  //   });

  //   return diff;
  // };

  // const getChangedFields = (formData, propertyData) => {
  //   return deepObjectDifference(formData, propertyData);
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const errors = validateForm();
  //   console.log(errors);

  //   if (Object.keys(errors).length === 0) {
  //     const action = isEditMode ? updateProperty : addProperty;
  //     const p_id = propertyData?.property_id;
  //     console.log(p_id);

  //     let payload;

  //     if (currentPath === "/UpdateProperty") {
  //     console.log("formData, propertyData going for update check",formData, propertyData);
  //       payload = getChangedFields(formData, propertyData);
  //       console.log("payload result aftr update check",payload)

  //       if (isEditMode) {
  //         // Include property_id if editing
  //         payload.property_id = p_id;
  //       }
  //     } else {
  //       // Send all data if currentPath is not "/UpdateProperty"
        
  //       payload = formData;
  //       console.log(formData);
  //       if (isEditMode) {
  //         payload.property_id = p_id;
  //       }
  //     }

  //     const resultAction = dispatch(action({ formData: payload })).then(
  //       (response) => {
  //         if (
  //           response.payload.message === "property added successfully" ||
  //           response.payload.message === "Property updated successfully"
  //         ) {
  //           setResponseData(response.payload);
  //           setIsFormSubmitted(true);
  //         } else {
  //           console.error(response.payload);
  //         }
  //       }
  //     );
  //   } else {
  //     setFormErrors(errors);
  //   }
  // };
  const propertiesData = useSelector(selectProperties);
  const location = useLocation();
  const currentPath = location.pathname;
  const propertyData = propertiesData?.data?.property;
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [heading, setHeading] = useState('');
  const [showComponent, setShowComponent] = useState(true);
  const [selectedState, setSelectedState] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [districts, setDistricts] = useState([]);
  const [areas, setAreas] = useState([]);
  const [formData, setFormData] = useState({
    AboutDeveloper: propertyData?.AboutDeveloper || "",
    bhk: propertyData?.bhk || "",
    Flooring: propertyData?.Flooring || "",
    bhk: propertyData?.bhk || "",
    PowerBackup: propertyData?.PowerBackup || "",
    PropertyAge: propertyData?.PropertyAge || "",
    WaterSource: propertyData?.WaterSource || "",
    ad_info: propertyData?.ad_info || "",
    approved_by: propertyData?.approved_by || "",
    bound_wall: propertyData?.bound_wall || "",
    comments: propertyData?.comments || "",
    developments: propertyData?.developments || "",
    dimensions: propertyData?.dimensions || "",
    direction: propertyData?.direction || "",
    district: propertyData?.district || "",
    document_number: propertyData?.document_number || "",
    docfile: [],
    disputes: propertyData?.disputes || "",
    furnshied: propertyData?.furnshied || "",
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
    p_type:propertyData?.p_type ||"",
    price: propertyData?.price || 0,
    prop_name: propertyData?.property_name || "",
    rating: propertyData?.rating || "",
    reg_loc: propertyData?.reg_loc || "",
    rera: propertyData?.rera || "",
    state: propertyData?.state || "",
    status: propertyData?.status || "",
    survey_number: propertyData?.survey_number || "",
    unit: propertyData?.unit || "",
    user_id: propertyData?.user_id || "",
    v_comments: propertyData?.v_comments || "",
    v_status: propertyData?.PropertyStatus || false,
    village: propertyData?.village || "",
    loan_eligibile: propertyData?.loan_eligibile || false,
  });

  const [formErrors, setFormErrors] = useState({});
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [responseData, setResponseData] = useState(null);
  const [isEditMode, SetisEditMode] = useState(false);

  useEffect(() => {
    if (selectedState) {
      const districtsInState = Object.keys(AreaJson.district_status[selectedState])
        .filter(district => AreaJson.district_status[selectedState][district]);
      setDistricts(districtsInState);
      setSelectedDistrict('');
      setAreas([]);
    }
  }, [selectedState]);

  useEffect(() => {
    if (selectedDistrict) {
      setAreas(AreaJson.areas[selectedDistrict] || []);
    }
  }, [selectedDistrict]);

  useEffect(() => {
    if (currentPath === "/Addproperty") {
      setHeading("Add Property");
      SetisEditMode(false);
    } else if (currentPath === "/UpdateProperty") {
      setHeading("Update Property");
      SetisEditMode(true);
    }
  }, [currentPath]);

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
    "commercial",
  ];

  const Units = ["sqft", "sqyd", "sq.m", "acre", "cent"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    const parsedValue = ["price", "size", "latitude", "longitude", "govt_price"].includes(name)
      ? parseFloat(value)
      : name === "loan_eligibile"
      ? value === "true"
      : value;
    setFormData({
      ...formData,
      [name]: parsedValue,
    });
  };

  const handleFileChange = (e) => {
    const docFiles = document.getElementById("fileUpload").files;
    const filesArray = Array.from(docFiles).map(file => ({
      name: file.name,
      lastModified: file.lastModified,
      lastModifiedDate: file.lastModifiedDate,
      size: file.size,
      type: file.type,
    }));
    setFormData({
      ...formData,
      docfile: filesArray,
    });
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.prop_name) errors.propertyName = "Property Name is required";
    if (!formData.p_type) errors.p_type = "Property Type is required";
    if (formData.med_num1 && formData.med_num1.replace(/\D/g, '').length > 10) {
      errors.med_num1 = "Phone Number should not contain more than 10 numbers";
    }
    if (formData.med_num2 && formData.med_num2.replace(/\D/g, '').length > 10) {
      errors.med_num2 = "Phone Number should not contain more than 10 numbers";
    }
    if (formData.own_num1 && formData.med_num2.replace(/\D/g, '').length > 10) {
      errors.own_num1 = "Phone Number should not contain more than 10 numbers";
    }
    if (formData.own_num2 && formData.med_num2.replace(/\D/g, '').length > 10) {
      errors.own_num2 = "Phone Number should not contain more than 10 numbers";
    }
    return errors;
  };

  function findUpdatedFields(oldData, newData) {
    console.log(oldData);
    const updatedFields = {};

    // Ensure user_id is always included
    if (oldData.hasOwnProperty('user_id')) {
        updatedFields['user_id'] = oldData['user_id'];
    }

    // Assuming oldData and newData have the same keys
    for (let key in oldData) {
        if (oldData.hasOwnProperty(key) && newData.hasOwnProperty(key)) {
            if (oldData[key] !== newData[key]) {
                updatedFields[key] = newData[key];
            }
        }
    }

    return updatedFields;
}



  const getChangedFields = ( propertyData,formData) => {
    return findUpdatedFields( propertyData,formData);
  };
 

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      const action = isEditMode ? updateProperty : addProperty;
      const p_id = propertyData?.property_id;
      let payload;

      if (currentPath === "/UpdateProperty") {
        console.log(formData, propertyData)
        payload = getChangedFields( propertyData,formData);
        
        if (isEditMode) {
          payload.p_id = p_id;
        }
        console.log("payload",payload)
      } else {
        payload = formData;
        if (isEditMode) {
          payload.p_id = p_id;
        }
      }

      dispatch(action({payload })).then((response) => {
        if (
          response.payload.message === "property added successfully" ||
          response.payload.message === "Property updated successfully"
        ) {
          setResponseData(response.payload);
          setIsFormSubmitted(true);
        } else {
          console.error(response.payload);
        }
      });
    } else {
      setFormErrors(errors);
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const errors = validateForm();
  //   console.log(errors);
  //   if (Object.keys(errors).length === 0) {
  //     const action = isEditMode ? updateProperty : addProperty;
  //     const p_id = propertyData?.property_id;
  //     console.log(p_id);

  //     const resultAction = dispatch(action({ formData, p_id })).then(
  //       (response) => {
  //         if (
  //           response.payload.message === "property added successfully" ||
  //           response.payload.message === "Property updated successfully"
  //         ) {
  //           setResponseData(response.payload);
  //           setIsFormSubmitted(true);
  //         } else {
  //           console.error(response.payload);
  //         }
  //       }
  //     );
  //   } else {
  //     setFormErrors(errors);
  //   }
  // };
  const filteredStates = AreaJson.state_status
    .filter((stateObj) => stateObj.status === true)
    .map((stateObj) => stateObj.state);
  console.log(filteredStates);
  console.log(filteredStates);

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

  if (isFormSubmitted) {
    return <UploadImages responseData={responseData} />;
  }

  const UpdatImageFile = () => {
    setShowComponent(false);
  };

  return showComponent ? (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ flexGrow: 1, width: "100%", maxWidth: 800, margin: "20px auto" }}
    >
      <Typography sx={{ fontSize: "20px", fontWeight: "600" }}>
        {heading}
      </Typography>
      <hr />
      {currentPath === "/UpdateProperty" && (
        <Button sx={{ marginTop: "20px" }} onClick={UpdatImageFile}>
          Update Image/Documents
        </Button>
      )}
      <Grid container spacing={2} sx={{ marginTop: "10px" }}>
        {(user.role === "admin" || user.role === "staff") && (
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Property Status</InputLabel>
              <Select
                label="Property Status"
                name="PropertyStatus"
                value={formData.PropertyStatus}
                onChange={handleChange}
              >
                <MenuItem value="true">Verified</MenuItem>
                <MenuItem value="false">Not Verified</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        )}
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
            name="prop_name"
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
        {formData.p_type === "flat" && (
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>No. of Bed Rooms</InputLabel>
              <Select
                label="No. of Bed Room"
                name="bhk"
                value={formData.bhk}
                onChange={handleChange}
              >
                <MenuItem value="1">1 BHK</MenuItem>
                <MenuItem value="2">2 BHK</MenuItem>
                <MenuItem value="1">3 BHK</MenuItem>
                <MenuItem value="2">4 BHK</MenuItem>
                <MenuItem value="1">5 BHK</MenuItem>
                <MenuItem value="2">6 BHK</MenuItem>
              </Select>
              <FormHelperText>{formErrors.unit}</FormHelperText>
            </FormControl>
          </Grid>
        )}

        {(formData.p_type === "flat" ||
          formData.p_type === "PG" ||
          formData.p_type === "office place" ||
          formData.p_type === "co working place" ||
          formData.p_type === "student hostels" ||
          formData.p_type === "independent house") && (
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

        {formData.p_type === "plot" && (
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
        {formData.p_type === "plot" && (
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

        {formData.p_type === "flat" && (
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

        {(formData.p_type === "flat" ||
          formData.p_type === "PG" ||
          formData.p_type === "office place" ||
          formData.p_type === "co working place" ||
          formData.p_type === "student hostels" ||
          formData.p_type === "independent house") && (
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
          {/* <TextField
            label="State"
            name="state"
            value={formData.state}
            onChange={handleChange}
            variant="outlined"
            fullWidth
          /> */}
          <FormControl fullWidth variant="outlined">
            <InputLabel>State</InputLabel>
            {/* <Select
                label="State"
                name="state"
                value={formData.state}
                onChange={(e) => {
                  setSelectedState(e.target.value);
                  handleChange(e);
                }}
              >
                {Object.keys(AreaJson.district_status).map((state) => (
                  <MenuItem key={state} value={state}>
                    {state}
                  </MenuItem>
                ))}
              </Select> */}
            <Select
              label="State"
              name="state"
              value={formData.state}
              onChange={(e) => {
                setSelectedState(e.target.value);
                handleChange(e);
              }}
              // name="state"
              // value={selectedState}
              // onChange={(e) => {
              //   setSelectedState(e.target.value);
              //   setFormData({
              //     ...formData,
              //     state: e.target.value,
              //     district: "",
              //     village: "",
              //   });
              // }}
              // fullWidth
            >
              {filteredStates.map((state) => (
                <MenuItem key={state} value={state}>
                  {state}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          {/* <TextField
            label="District"
            name="district"
            value={formData.district}
            onChange={handleChange}
            variant="outlined"
            fullWidth
          /> */}
          <FormControl fullWidth variant="outlined">
            <InputLabel>District</InputLabel>
            <Select
              label="District"
              name="district"
              value={formData.district}
              onChange={(e) => {
                setSelectedDistrict(e.target.value);
                handleChange(e);
              }}
            >
              {districts.map((district) => (
                <MenuItem key={district} value={district}>
                  {district}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          {/* <TextField
            label="Village"
            name="village"
            value={formData.village}
            onChange={handleChange}
            variant="outlined"
            fullWidth
          /> */}
          <FormControl fullWidth variant="outlined">
            <InputLabel>Area</InputLabel>
            <Select
              label="Area"
              name="village"
              value={formData.village}
              onChange={handleChange}
            >
              {console.log(areas)}
              {/* {Object.keys(areas).map((district) => (
      <optgroup key={district} label={district}>
        {areas.map((item) => (
        
          <MenuItem key={item.id} value={item.area}>
            {item.area}
          </MenuItem>
        ))}
         
      </optgroup>
    ))} */}
              {areas.map((area) => (
                <MenuItem key={area.id} value={area.area}>
                  {area.area}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
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
        {formData.listing_type == "buy" && (
          <Grid item xs={12} sm={6}>
            <TextField
              label="price"
              placeholder="Enter your price range eg: 1000000-2000000"
              name="document_number"
              type="text"
              value={formData.document_number}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              required
            />
          </Grid>
        )}
        {formData.listing_type == "sell" && (
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
        )}

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
              <MenuItem value="South">South</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        {formData.listing_type !== "buy" && (
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
        )}
        {/* {(user.role === "admin" || user.role === "staff") && (
          <Grid item xs={12} sm={6}>
            <Button
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
            >
              <input
                id="fileUpload"
                type="file"
                multiple
                onChange={handleFileChange}
              />
            </Button>
          </Grid>
        )} */}
        <Grid item xs={12} sm={6}>
          <TextField
            label="Approved By"
            name="approved_by"
            value={formData.approved_by}
            onChange={handleChange}
            variant="outlined"
            multiline
            fullWidth
          />
        </Grid>
        {(user.role === "admin" || user.role === "staff") && (
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
        {(user.role === "admin" || user.role === "staff") && (
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
            label="Mediator Number1"
            name="med_num1"
            type="number"
            value={formData.med_num1}
            error={!!formErrors.med_num1}
            helperText={formErrors.med_num1}
            onChange={handleChange}
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Mediator Number 2"
            name="med_num2"
            type="number"
            error={!!formErrors.med_num2}
            value={formData.med_num2}
            onChange={handleChange}
            helperText={formErrors.med_num2}
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
            error={!!formErrors.own_num1}
            helperText={formErrors.own_num1}
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
            error={!!formErrors.own_num2}
            value={formData.own_num2}
            onChange={handleChange}
            helperText={formErrors.own_num2}
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
          <Button type="submit" variant="contained" fullWidth>
            Submit
          </Button>
        </Grid>
      </Grid>
    </Box>
  ) : (
    <UploadImages responseData={responseData} />
  );
};

export default Form;
