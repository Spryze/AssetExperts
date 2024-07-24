// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   TextField,
//   Button,
//   Box,
//   Grid,
//   Select,
//   MenuItem,
//   FormControl,
//   InputLabel,
//   Paper,
//   Typography,
//   FormHelperText,
// } from "@mui/material";
// import { useForm, Controller, useWatch } from "react-hook-form";

// import { useLocation } from "react-router-dom";
// import { selectProperties } from "../PropertySlice1";
// import { addProperty, updateProperty } from "../PropertySlice1";
// import { selectUser } from "app/store/userSlice";
// import UploadImages from "./Property-Types-Forms/UploadImages";
// import AreaJson from "../../../../assets/Default/area/result.json";

// const Form = () => {
//   const propertiesData = useSelector(selectProperties);
//   const location = useLocation();
//   const currentPath = location.pathname;
//   const propertyData = propertiesData?.data?.property;
//   console.log("propertyData", propertyData);
//   const dispatch = useDispatch();
//   const user = useSelector(selectUser);
//   const [heading, setHeading] = useState("");
//   const [showComponent, setShowComponent] = useState(true);
//   const [isEditMode, SetisEditMode] = useState(false);
//   // const [selectedState, setSelectedState] = useState('');
//   // const [selectedDistrict, setSelectedDistrict] = useState('');
//   const [districts, setDistricts] = useState([]);
//   const [areas, setAreas] = useState([]);
//   const [minPrice, setMinPrice] = useState("");
//   const [maxPrice, setMaxPrice] = useState("");

// const formData = []

// const { control, watch, setValue,register, errors}  = useForm({
//     defaultValues: {
//     // AboutDeveloper: propertyData?.AboutDeveloper || "",
//     bhk: isEditMode ? propertyData?.bhk : "",
//     Flooring:isEditMode ? propertyData?.Flooring : "",
//     bhk:isEditMode ? propertyData?.bhk : "",
//     PowerBackup:isEditMode ? propertyData?.PowerBackup : "",
//     PropertyAge:isEditMode ? propertyData?.PropertyAge : "",
//     WaterSource:isEditMode ? propertyData?.WaterSource : "",
//     ad_info:isEditMode ? propertyData?.ad_info : "",
//     approved_by:isEditMode ? propertyData?.approved_by : "",
//     bound_wall:isEditMode ? propertyData?.bound_wall : "",
//     comments:isEditMode ? propertyData?.comments : "",
//     developments: isEditMode ?propertyData?.developments : "",
//     dimensions:isEditMode ? propertyData?.dimensions : "",
//     direction:isEditMode ? propertyData?.direction : "",
//     state: propertyData?.state || "",
//     size:isEditMode ? propertyData?.size : "",
//     district:isEditMode ? propertyData?.district : "",
//     document_number:isEditMode ? propertyData?.document_number : "",
//     docfile: [],
//     disputes:isEditMode ? propertyData?.disputes : "",
//     furnshied:isEditMode ? propertyData?.furnshied : "",
//     govt_price:isEditMode ? propertyData?.govt_price : null,
//     landmark:isEditMode ? propertyData?.landmark : "",
//     lift:isEditMode ? propertyData?.lift : "",
//     listing_type:isEditMode ? propertyData?.listing_type : "",
//     latitude:isEditMode ? propertyData?.latitude : 0,
//     longitude:isEditMode ? propertyData?.longitude : 0,
//     med_name:isEditMode ? propertyData?.med_name : "",
//     med_num1:isEditMode ? propertyData?.med_num1 : "",
//     med_num2:isEditMode ? propertyData?.med_num2 : "",
//     num_open_sides:isEditMode ? propertyData?.num_open_sides : "",
//     own_name:isEditMode ? propertyData?.own_name : "",
//     own_num1:isEditMode ? propertyData?.own_num1 : "",
//     own_num2:isEditMode ? propertyData?.own_num2 : "",
//     parking:isEditMode ? propertyData?.parking : false,
//     p_type:isEditMode ? propertyData?.p_type : "",
//     price:isEditMode ? propertyData?.price : 0,
//     prop_name:propertyData?.prop_name || "",
//     rating:isEditMode ? propertyData?.rating : "",
//     reg_loc: isEditMode ?propertyData?.register_location : "",
//     rera:isEditMode ? propertyData?.rera : "",
//     status:isEditMode ? propertyData?.status : "",
//     survey_number:isEditMode ? propertyData?.survey_number : "",
//     unit:isEditMode ? propertyData?.unit : "",
//     user_id:isEditMode ? propertyData?.user_id : "",
//     v_comments:isEditMode ? propertyData?.v_comments : "",
//     v_status:isEditMode ? propertyData?.v_status : false,
//     village:isEditMode ? propertyData?.village : "",
//     loan_eligibile:isEditMode ? propertyData?.loan_eligibile : false,}
//   });

//   const selectedState = watch('state');
//   const selectedDistrict = watch('district');
//   // const [formData, setFormData] = useState({
//   //   // AboutDeveloper: propertyData?.AboutDeveloper || "",
//   //   bhk: propertyData?.bhk || "",
//   //   Flooring: propertyData?.Flooring || "",
//   //   bhk: propertyData?.bhk || "",
//   //   PowerBackup: propertyData?.PowerBackup || "",
//   //   PropertyAge: propertyData?.PropertyAge || "",
//   //   WaterSource: propertyData?.WaterSource || "",
//   //   ad_info: propertyData?.ad_info || "",
//   //   approved_by: propertyData?.approved_by || "",
//   //   bound_wall: propertyData?.bound_wall || "",
//   //   comments: propertyData?.comments || "",
//   //   developments: propertyData?.developments || "",
//   //   dimensions: propertyData?.dimensions || "",
//   //   direction: propertyData?.direction || "",
//   //   state: propertyData?.stat || "",
//   //   size: propertyData?.size || "",
//   //   district: propertyData?.district || "",
//   //   document_number: propertyData?.document_number || "",
//   //   docfile: [],
//   //   disputes: propertyData?.disputes || "",
//   //   furnshied: propertyData?.furnshied || "",
//   //   govt_price: propertyData?.govt_price || null,
//   //   landmark: propertyData?.landmark || "",
//   //   lift: propertyData?.lift || "",
//   //   listing_type: propertyData?.listing_type || "",
//   //   latitude: propertyData?.latitude || 0,
//   //   longitude: propertyData?.longitude || 0,
//   //   med_name: propertyData?.med_name || "",
//   //   med_num1: propertyData?.med_num1 || "",
//   //   med_num2: propertyData?.med_num2 || "",
//   //   num_open_sides: propertyData?.num_open_sides || "",
//   //   own_name: propertyData?.own_name || "",
//   //   own_num1: propertyData?.own_num1 || "",
//   //   own_num2: propertyData?.own_num2 || "",
//   //   parking: propertyData?.parking || false,
//   //   p_type: propertyData?.p_type || "",
//   //   price: propertyData?.price || 0,
//   //   prop_name: propertyData?.prop_name || "",
//   //   rating: propertyData?.rating || "",
//   //   reg_loc: propertyData?.register_location || "",
//   //   rera: propertyData?.rera || "",
//   //   status: propertyData?.status || "",
//   //   survey_number: propertyData?.survey_number || "",
//   //   unit: propertyData?.unit || "",
//   //   user_id: propertyData?.user_id || "",
//   //   v_comments: propertyData?.v_comments || "",
//   //   v_status: propertyData?.v_status || false,
//   //   village: propertyData?.village || "",
//   //   loan_eligibile: propertyData?.loan_eligibile || false,
//   // });

//   const [formErrors, setFormErrors] = useState({});
//   const [isFormSubmitted, setIsFormSubmitted] = useState(false);
//   const [responseData, setResponseData] = useState(null);

//   // useEffect(() => {
//   //   if (selectedState) {
//   //     const districtsInState = Object.keys(
//   //       AreaJson.district_status[selectedState]
//   //     ).filter((district) => AreaJson.district_status[selectedState][district]);
//   //     setDistricts(districtsInState);
//   //     setSelectedDistrict('');

//   //     setAreas([]);
//   //   }
//   // }, [selectedState]);
//   // console.log(districts);

//   // useEffect(() => {
//   //   if (selectedDistrict) {
//   //     setAreas(AreaJson.areas[selectedDistrict] || []);
//   //     setValue("village", "");
//   //   }
//   //   }, [selectedDistrict]);

//   useEffect(() => {
//     if (selectedState) {
//       const districtsInState = Object.keys(AreaJson.district_status[selectedState])
//         .filter(district => AreaJson.district_status[selectedState][district]);
//       setDistricts(districtsInState);
//       setValue('district', propertyData?.district || '');
//       setAreas([]);
//     }
//   }, [selectedState, setValue, AreaJson, propertyData]);

//   useEffect(() => {
//     if (selectedDistrict) {
//       setAreas(AreaJson.areas[selectedDistrict] || []);
//       setValue('village', propertyData?.village || '');
//     }
//   }, [selectedDistrict, setValue, AreaJson, propertyData]);

//   // const handleSubmit = (data) => {
//   //   console.log(data);
//   // };

//   useEffect(() => {
//     if (currentPath === "/Addproperty") {
//       setHeading("Add Property");
//       SetisEditMode(false);
//     } else if (currentPath === "/UpdateProperty") {
//       setHeading("Update Property");
//       SetisEditMode(true);
//     }
//   }, [currentPath]);

//   useEffect(() => {
//     if (minPrice && maxPrice) {
//       const formattedPriceRange = `${minPrice}-${maxPrice}`;
//       setFormData((prev) => ({
//         ...prev,
//         document_number: formattedPriceRange,
//       }));
//     }
//   }, [minPrice, maxPrice]);

//   const propertyTypes = [
//     "plot",
//     "flat",
//     "land",
//     "PG",
//     "office place",
//     "co working place",
//     "student hostel",
//     "agricultural land",
//     "independent house",
//     "commercial",
//   ];

//   const Units = ["sqft", "sqyd", "sq.m", "acre", "cent"];
//   console.log(formData);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     console.log(`Field Name: ${name}, Field Value: ${value}`);

//     let parsedValue = value;

//     if (
//       ["price", "size", "latitude", "longitude", "govt_price"].includes(name)
//     ) {
//       parsedValue = parseFloat(value);
//     }
//     if (
//       (name === "med_num1" ||
//         name === "med_num2" ||
//         name === "own_num1" ||
//         name === "own_num2") &&
//       value.length > 10
//     ) {
//       return;
//     }

//     if (name === "PropertyStatus") {
//       parsedValue = value === "true";

//       // setFormData({
//       //   ...formData,
//       //   v_status: parsedValue,
//       // });
//       setValue(v_status, parsedValue)
//     } else {
//       console.log(`Parsed Value for ${name}:`, parsedValue);

//       // setFormData({
//       //   ...formData,
//       //   [name]: parsedValue,
//       // });
//       setValue(name,value);

//       // console.log("Updated formData:", formData);
//     }
//   };

//   const handlePriceSubmit = () => {
//     if (minPrice && maxPrice) {
//       const formattedPriceRange = `${minPrice}-${maxPrice}`;
//       setFormData((prev) => ({
//         ...prev,
//         document_number: formattedPriceRange,
//       }));
//     }
//   };

//   // const validateForm = () => {
//   //   const errors = {};
//   //   // if (!formData.prop_name) errors.propertyName = "Property Name is required";
//   //   if (!formData.size) errors.size = "Size is required";
//   //   if (!formData.listing_type)
//   //     errors.listing_type = "Listing Type is required";
//   //   if (!formData.state) errors.state = "State Name is Required";
//   //   if (!formData.district) errors.district = "District Name is Required";
//   //   if (!formData.village) errors.village = "Village Name is Required";
//   //   if (!formData.p_type) errors.p_type = "Property Type is required";
//   //   if (formData.med_num1 && formData?.med_num1?.length > 10) {
//   //     errors.med_num1 = "Phone Number should not contain more than 10 numbers";
//   //   }
//   //   if (formData.med_num2 && formData.med_num2?.length > 10) {
//   //     errors.med_num2 = "Phone Number should not contain more than 10 numbers";
//   //   }
//   //   if (formData.own_num1 && formData?.own_num1?.length > 10) {
//   //     errors.own_num1 = "Phone Number should not contain more than 10 numbers";
//   //   }
//   //   if (formData.own_num2 && formData?.own_num2?.length > 10) {
//   //     errors.own_num2 = "Phone Number should not contain more than 10 numbers";
//   //   }
//   //   if (formData.p_type === "flat" && formData.bhk === "") {
//   //     errors.bhk = "Enter N0. Of BHK";
//   //   }

//   //   return errors;
//   // };

//   function findUpdatedFields(oldData, newData) {
//     console.log(oldData);
//     const updatedFields = {};

//     // Ensure user_id is always included
//     if (oldData.hasOwnProperty("user_id")) {
//       updatedFields["user_id"] = oldData["user_id"];
//     }

//     // Assuming oldData and newData have the same keys
//     for (let key in oldData) {
//       if (oldData.hasOwnProperty(key) && newData.hasOwnProperty(key)) {
//         if (oldData[key] !== newData[key]) {
//           updatedFields[key] = newData[key];
//         }
//       }
//     }
//     console.log("    return updatedFields", updatedFields);
//     return updatedFields;
//   }

//   const getChangedFields = (propertyData, formData) => {
//     return findUpdatedFields(propertyData, formData);
//   };

//   const handleSubmit = async (e,data) => {
//     console.log(data)
//   // const onSubmit = async (e) => {
//     e.preventDefault();
//     // const errors = validateForm();
//     // if (Object.keys(errors).length === 0) {
//       const action = isEditMode ? updateProperty : addProperty;
//       const p_id = propertyData?.p_id;
//       let payload;

//       if (currentPath === "/UpdateProperty") {
//         console.log(formData, propertyData);
//         payload = getChangedFields(propertyData, formData);

//         if (isEditMode) {
//           payload.p_id = p_id;
//         }
//         console.log("payload", payload);
//       } else {
//         console.log(data);
//         payload = data;
//         if (isEditMode) {
//           payload.p_id = p_id;
//         }
//       }

//       dispatch(action({ payload })).then((response) => {
//         if (
//           response.payload.message === "property added successfully" ||
//           response.payload.message === "Property updated successfully"
//         ) {
//           setResponseData(response.payload);
//           setIsFormSubmitted(true);
//         } else {
//           console.error(response.payload);
//         }
//       });
//     // } else {
//     //   setFormErrors(errors);
//     // }
//   };

//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();
//   //   const errors = validateForm();
//   //   console.log(errors);
//   //   if (Object.keys(errors).length === 0) {
//   //     const action = isEditMode ? updateProperty : addProperty;
//   //     const p_id = propertyData?.property_id;
//   //     console.log(p_id);

//   //     const resultAction = dispatch(action({ formData, p_id })).then(
//   //       (response) => {
//   //         if (
//   //           response.payload.message === "property added successfully" ||
//   //           response.payload.message === "Property updated successfully"
//   //         ) {
//   //           setResponseData(response.payload);
//   //           setIsFormSubmitted(true);
//   //         } else {
//   //           console.error(response.payload);
//   //         }
//   //       }
//   //     );
//   //   } else {
//   //     setFormErrors(errors);
//   //   }
//   // };
//   const filteredStates = AreaJson.state_status
//     .filter((stateObj) => stateObj.status === true)
//     .map((stateObj) => stateObj.state);
//   console.log(filteredStates);

//   if (!user) {
//     return (
//       <div className="flex flex-col flex-auto items-center sm:justify-center min-w-0">
//         <Paper className="flex items-center w-full sm:w-auto min-h-full sm:min-h-auto rounded-0 py-32 px-16 sm:p-48 sm:rounded-2xl sm:shadow">
//           <div className="w-full max-w-320 sm:w-320 mx-auto sm:mx-0">
//             <img
//               className="w-48 mx-auto"
//               src="assets/images/logo/logo.svg"
//               alt="logo"
//             />

//             <Typography className="mt-32 text-4xl font-extrabold tracking-tight leading-tight text-center">
//               Please Login!
//             </Typography>
//           </div>
//         </Paper>
//       </div>
//     );
//   }

//   if (isFormSubmitted) {
//     return <UploadImages responseData={responseData} />;
//   }

//   const UpdatImageFile = () => {
//     setShowComponent(false);
//   };

//   return showComponent ? (
//     <Box
//       component="form"
//       onSubmit={handleSubmit}
//       sx={{ flexGrow: 1, width: "100%", maxWidth: 800, margin: "20px auto" }}
//     >
//       <Typography sx={{ fontSize: "20px", fontWeight: "600" }}>
//         {heading}
//       </Typography>
//       <hr />
//       {currentPath === "/UpdateProperty" && (
//         <Button sx={{ marginTop: "20px" }} onClick={UpdatImageFile}>
//           Update Image/Documents
//         </Button>
//       )}
//       <Grid container spacing={2} sx={{ marginTop: "10px" }}>
//         {(user.role === "admin" || user.role === "staff") && (
//           <Grid item xs={12} sm={6}>
//             <FormControl fullWidth variant="outlined">
//               <InputLabel>Property Status</InputLabel>
//               <Select
//                 label="Property Status"
//                 name="PropertyStatus"
//                 id = "PropertyStatus"
//                 // inputRef={register}
//                 // value={formData.v_status}

//                 onChange={handleChange}
//               >
//                 <MenuItem value="true">Verified</MenuItem>
//                 <MenuItem value="false">Not Verified</MenuItem>
//               </Select>
//             </FormControl>
//           </Grid>
//         )}
//         <Grid item xs={12} sm={6}>
//           <FormControl
//             fullWidth
//             variant="outlined"
//             error={!!formErrors.listing_type}
//           >
//             <InputLabel>Listing Type*</InputLabel>
//             <Select
//               label="Listing Type"
//               id = "listing_type"
//               name="listing_type"
//               // value={formData.listing_type}
//               onChange={handleChange}
//               // inputRef={register}
//             >
//               <MenuItem value="buy">Buy</MenuItem>
//               <MenuItem value="sell">Sell</MenuItem>
//             </Select>
//             <FormHelperText>{formErrors.listing_type}</FormHelperText>
//           </FormControl>
//         </Grid>
//         <Grid item xs={12} sm={6}>
//           <TextField
//             label="Property Name"
//             name="prop_name"
//             id="prop_name"
//             // value={formData.prop_name}
//             // inputRef={register}
//             defaultValue={propertyData?.prop_name || ""}
//             onChange={handleChange}
//             variant="outlined"
//             fullWidth
//             // required
//             // error={!!formErrors.propertyName}
//             // helperText={formErrors.propertyName}
//           />
//         </Grid>
//         <Grid item xs={12} sm={6}>
//           <FormControl
//             fullWidth
//             variant="outlined"
//             required
//             error={!!formErrors.p_type}
//           >
//             <InputLabel>Property Type</InputLabel>
//             <Select
//             // inputRef={register}
//               label="Property Type"
//               name="p_type"
//               id="p_type"
//               //value={formData.p_type}
//               onChange={handleChange}
//             >
//               {propertyTypes.map((type) => (
//                 <MenuItem key={type} value={type}>
//                   {type}
//                 </MenuItem>
//               ))}
//             </Select>
//             <FormHelperText>{formErrors.p_type}</FormHelperText>
//           </FormControl>
//         </Grid>
//         <Grid item xs={12} sm={6}>
//           <FormControl
//             fullWidth
//             variant="outlined"
//             required
//             error={!!formErrors.unit}
//           >
//             <InputLabel>Unit</InputLabel>
//             <Select
//             // inputRef={register}
//               label="Unit"
//               name="unit"
//               id="unit"
//               // value={formData.unit}
//               onChange={handleChange}
//             >
//               {Units.map((type) => (
//                 <MenuItem key={type} value={type}>
//                   {type}
//                 </MenuItem>
//               ))}
//             </Select>
//             <FormHelperText>{formErrors.unit}</FormHelperText>
//           </FormControl>
//         </Grid>
//         <Grid item xs={12} sm={6}>
//           <TextField
//           // inputRef={register}
//             label="Size"
//             name="size"
//             id="size"
//             type="number"
//             // value={formData.size}
//             onChange={handleChange}
//             variant="outlined"
//             fullWidth
//             required
//             error={!!formErrors.size}
//             helperText={formErrors.size}
//           />
//         </Grid>
//         <Grid item xs={12} sm={6}>
//           <TextField
//           // inputRef={register}
//             label="Dimension"
//             name="dimensions"
//             id="dimensions"
//             type="text"
//             // value={formData.dimensions}
//             onChange={handleChange}
//             variant="outlined"
//             fullWidth
//           />
//         </Grid>
//         {formData.p_type === "flat" && (
//           <Grid item xs={12} sm={6}>
//             <FormControl fullWidth variant="outlined" error={!!formErrors.bhk}>
//               <InputLabel>No. of Bed Rooms</InputLabel>
//               <Select
//                 label="No. of Bed Room"
//                 // inputRef={register}
//                 name="bhk"
//                 id="bhk"
//                 // value={formData.bhk}
//                 onChange={handleChange}
//                 required
//               >
//                 <MenuItem value="1">1 BHK</MenuItem>
//                 <MenuItem value="2">2 BHK</MenuItem>
//                 <MenuItem value="3">3 BHK</MenuItem>
//                 <MenuItem value="4">4 BHK</MenuItem>
//                 <MenuItem value="5">5 BHK</MenuItem>
//                 <MenuItem value="6">6 BHK</MenuItem>
//               </Select>
//               <FormHelperText>{formErrors.bhk}</FormHelperText>
//             </FormControl>
//           </Grid>
//         )}

//         {(formData.p_type === "flat" ||
//           formData.p_type === "PG" ||
//           formData.p_type === "office place" ||
//           formData.p_type === "co working place" ||
//           formData.p_type === "student hostels" ||
//           formData.p_type === "independent house") && (
//           <Grid item xs={12} sm={6}>
//             <FormControl fullWidth variant="outlined">
//               <InputLabel>Furnished</InputLabel>
//               <Select
//               // inputRef={register}
//                 label="Furnished"
//                 name="furnshied"
//                 id="furnshied"
//                 // value={formData.furnshied}
//                 onChange={handleChange}
//               >
//                 <MenuItem value="Yes">Yes</MenuItem>
//                 <MenuItem value="No">No</MenuItem>
//               </Select>
//             </FormControl>
//           </Grid>
//         )}

//         {formData.p_type === "plot" && (
//           <Grid item xs={12} sm={6}>
//             <FormControl fullWidth variant="outlined">
//               <InputLabel>Boundary Wall</InputLabel>
//               <Select
//               // inputRef={register}
//                 label="Boundary Wall"
//                 name="bound_wall"
//                 id="bound_wall"
//                 // value={formData.bound_wall}
//                 onChange={handleChange}
//               >
//                 <MenuItem value="Yes">Yes</MenuItem>
//                 <MenuItem value="No">No</MenuItem>
//               </Select>
//               <FormHelperText>{formErrors.unit}</FormHelperText>
//             </FormControl>
//           </Grid>
//         )}
//         {formData.p_type === "plot" && (
//           <Grid item xs={12} sm={6}>
//             <FormControl fullWidth variant="outlined">
//               <InputLabel>No. of Open Road Sides</InputLabel>
//               <Select
//               // inputRef={register}
//                 label="No. of Open Road Sides"
//                 name="num_open_sides"
//                 id="num_open_sides"
//                 // value={formData.num_open_sides}
//                 onChange={handleChange}
//               >
//                 <MenuItem value="1">1</MenuItem>
//                 <MenuItem value="2">2</MenuItem>
//                 <MenuItem value="3">3</MenuItem>
//                 <MenuItem value="4">4</MenuItem>
//               </Select>
//               <FormHelperText>{formErrors.unit}</FormHelperText>
//             </FormControl>
//           </Grid>
//         )}

//         {formData.p_type === "flat" && (
//           <Grid item xs={12} sm={6}>
//             <FormControl fullWidth variant="outlined">
//               <InputLabel>RERA Status</InputLabel>
//               <Select
//               // inputRef={register}
//                 label="RERA Status"
//                 name="rera"
//                 id="rera"
//                 // value={formData.rera}
//                 onChange={handleChange}
//               >
//                 <MenuItem value="Registered">Registered</MenuItem>
//                 <MenuItem value="Not Registered">Not Registered</MenuItem>
//               </Select>
//             </FormControl>
//           </Grid>
//         )}

//         {(formData.p_type === "flat" ||
//           formData.p_type === "PG" ||
//           formData.p_type === "office place" ||
//           formData.p_type === "co working place" ||
//           formData.p_type === "student hostels" ||
//           formData.p_type === "independent house") && (
//           <Grid item xs={12} sm={6}>
//             <FormControl fullWidth variant="outlined">
//               <InputLabel>Lift</InputLabel>
//               <Select
//               // inputRef={register}
//                 label="Lift"
//                 name="lift"
//                 id="lift"
//                 // value={formData.lift}
//                 onChange={handleChange}
//               >
//                 <MenuItem value="Yes">Yes</MenuItem>
//                 <MenuItem value="No">No</MenuItem>
//               </Select>
//             </FormControl>
//           </Grid>
//         )}

//         <Grid item xs={12} sm={6}>
//         <FormControl fullWidth variant="outlined" error={!!formErrors?.state}>
//             <InputLabel>State*</InputLabel>
//             <Controller
//               name="state"
//               id="state"
//               control={control}
//               render={({ field }) => (
//                 <Select
//                 // inputRef={register}
//                   label="State"
//                   {...field}
//                   onChange={(e) => {
//                     setValue("state", e.target.value);
//                     setSelectedState(e.target.value);
//                   }}
//                 >
//                   {filteredStates.map((state) => (
//                     <MenuItem key={state} value={state}>
//                       {state}
//                     </MenuItem>
//                   ))}
//                 </Select>
//               )}
//             />
//             <FormHelperText>{formErrors?.state}</FormHelperText>
//           </FormControl>

//           {/* <FormControl fullWidth variant="outlined" error={!!formErrors.state}>
//             <InputLabel>State*</InputLabel>

//             <Select
//               label="State"
//               name="state"
//               value={formData.state}
//               onChange={(e) => {
//                 setSelectedState(e.target.value);
//                 handleChange(e);
//               }}
//             >
//               {filteredStates.map((state) => (
//                 <MenuItem key={state} value={state}>
//                   {state}
//                 </MenuItem>
//               ))}
//             </Select>
//             <FormHelperText>{formErrors.state}</FormHelperText>
//           </FormControl> */}
//         </Grid>
//         <Grid item xs={12} sm={6}>
//           {/* <FormControl
//             fullWidth
//             variant="outlined"
//             error={!!formErrors.district}
//           >
//             <InputLabel>District*</InputLabel>
//             <Select
//               label="District"
//               name="district"
//               defaultValue={propertyData?.district}
//               value={formData.district}
// onChange={(e) => {
//   setSelectedDistrict(e.target.value);
//   handleChange(e);
// }}
//             >
//               {districts.map((district) => (
//                 <MenuItem key={district} value={district}>
//                   {district}
//                 </MenuItem>
//               ))}
//             </Select>
//             <FormHelperText>{formErrors.district}</FormHelperText>
//           </FormControl> */}
//           <FormControl fullWidth variant="outlined" error={!!formErrors?.district}>
//             <InputLabel>District*</InputLabel>
//             <Controller
//               name="district"
//               id="district"
//               control={control}
//               render={({ field }) => (
//                 <Select
//                   label="District"
//                   // inputRef={register}
//                   {...field}
//                   onChange={(e) => {
//                     setValue("district", e.target.value);
//                     setSelectedDistrict(e.target.value);
//                   }}
//                 >
//                   {districts.map((district) => (
//                     <MenuItem key={district} value={district}>
//                       {district}
//                     </MenuItem>
//                   ))}
//                 </Select>
//               )}
//             />
//             <FormHelperText>{formErrors?.district}</FormHelperText>
//           </FormControl>
//         </Grid>
//         <Grid item xs={12} sm={6}>
//           {/* <FormControl
//             fullWidth
//             variant="outlined"
//             error={!!formErrors.village}
//           >
//             <InputLabel>Area*</InputLabel>
//             <Select
//               label="Area"
//               name="village"
//               value={formData.village}
//               onChange={handleChange}
//             >
//               {console.log(areas)}

//               {areas.map((area) => (
//                 <MenuItem key={area.id} value={area.area}>
//                   {area.area}
//                 </MenuItem>
//               ))}
//             </Select>
//             <FormHelperText>{formErrors.village}</FormHelperText>
//           </FormControl> */}
//           <FormControl fullWidth variant="outlined" error={!!formErrors?.village}>
//             <InputLabel>Area*</InputLabel>
//             <Controller
//               name="village"
//               id="village"
//               control={control}
//               render={({ field }) => (
//                 <Select
//                 // inputRef={register}
//                   label="Area"
//                   {...field}
//                 >
//                   {areas.map((area) => (
//                     <MenuItem key={area.id} value={area.area}>
//                       {area.area}
//                     </MenuItem>
//                   ))}
//                 </Select>
//               )}
//             />
//             <FormHelperText>{formErrors?.village}</FormHelperText>
//           </FormControl>
//         </Grid>
//         <Grid item xs={12} sm={6}>
//           <TextField
//             label="Landmark"
//             name="landmark"
//             id="landmark"
//             // inputRef={register}
//             value={formData.landmark}
//             // onChange={handleChange}
//             variant="outlined"
//             fullWidth
//           />
//         </Grid>
//         {console.log("isEditMode", isEditMode)}

//         {(formData.listing_type === "sell" && !isEditMode && (
//           <Grid item xs={12} sm={6}>
//             <TextField
//               label="Price (₹)"
//               name="price"
//               id="price"
//               // inputRef={register}
//               type="number"
//               // value={formData.price}
//               onChange={handleChange}
//               variant="outlined"
//               fullWidth
//               required
//               error={!!formErrors.price}
//               helperText={formErrors.price}
//             />
//           </Grid>
//         )) ||
//           (formData.listing_type === "sell" &&
//             isEditMode &&
//             (user.role === "admin" || user.role === "staff") && (
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   label="Price (₹)"
//                   name="price"
//                   id="price"
//                   // inputRef={register}
//                   type="number"
//                   // value={formData.price}
//                   onChange={handleChange}
//                   variant="outlined"
//                   fullWidth
//                   required
//                   error={!!formErrors.price}
//                   helperText={formErrors.price}
//                 />
//               </Grid>
//             ))}

//         {/* {(formData.listing_type === 'sell' && !isEditMode) || user.role === 'admin' || user.role ==='staff' || user.role ==='user' && (
//           <Grid item xs={12} sm={6}>
//             <TextField
//               label="Price (₹)"
//               name="price"
//               type="number"
//               value={formData.price}
//               onChange={handleChange}
//               variant="outlined"
//               fullWidth
//               required
//               error={!!formErrors.price}
//               helperText={formErrors.price}
//             />
//           </Grid>
//         )}  */}
//         {(formData.listing_type === "buy" && !isEditMode && (
//           <Grid item xs={12} sm={6}>
//             <TextField
//               label="Minimum Price"
//               placeholder="Enter minimum price"
//               type="number"

//               value={minPrice}
//               onChange={(e) => setMinPrice(e.target.value)}
//               variant="outlined"
//               fullWidth
//               required
//             />
//             <TextField
//               label="Maximum Price"
//               placeholder="Enter maximum price"
//               type="number"
//               value={maxPrice}
//               onChange={(e) => setMaxPrice(e.target.value)}
//               variant="outlined"
//               fullWidth
//               required
//             />
//           </Grid>
//         )) ||
//           (formData.listing_type === "buy" &&
//             isEditMode &&
//             (user.role === "admin" || user.role === "staff") && (
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   label="Minimum Price"
//                   placeholder="Enter minimum price"
//                   type="number"
//                   value={minPrice}
//                   onChange={(e) => setMinPrice(e.target.value)}
//                   variant="outlined"
//                   fullWidth
//                   required
//                 />
//                 <TextField
//                   label="Maximum Price"
//                   placeholder="Enter maximum price"
//                   type="number"
//                   value={maxPrice}
//                   onChange={(e) => setMaxPrice(e.target.value)}
//                   variant="outlined"
//                   fullWidth
//                   required
//                 />
//               </Grid>
//             ))}

//         <Grid item xs={12} sm={6}>
//           <TextField
//             label="Survey Number"
//             name="survey_number"
//             // inputRef={register}
//             id="survey_number"
//             // value={formData.survey_number}
//             onChange={handleChange}
//             variant="outlined"
//             fullWidth
//           />
//         </Grid>

//         <Grid item xs={12} sm={6}>
//           <FormControl fullWidth variant="outlined">
//             <InputLabel>Direction</InputLabel>
//             <Select
//               label="Direction"
//               // inputRef={register}
//               name="direction"
//               id="direction"
//               // value={formData.direction}
//               onChange={handleChange}
//             >
//               <MenuItem value="East">East</MenuItem>
//               <MenuItem value="West">West</MenuItem>
//               <MenuItem value="North">North</MenuItem>
//               <MenuItem value="South">South</MenuItem>
//             </Select>
//           </FormControl>
//         </Grid>
//         {formData.listing_type !== "buy" && (
//           <Grid item xs={12} sm={6}>
//             <TextField
//               label="Document Number"
//               name="doc_num"
//               id="doc_num"
//               // inputRef={register}
//               // value={formData.doc_num}
//               onChange={handleChange}
//               variant="outlined"
//               fullWidth
//             />
//           </Grid>
//         )}
//         {/* {(user.role === "admin" || user.role === "staff") && (
//           <Grid item xs={12} sm={6}>
//             <Button
//               component="label"
//               role={undefined}
//               variant="contained"
//               tabIndex={-1}
//               startIcon={<CloudUploadIcon />}
//             >
//               <input
//                 id="fileUpload"
//                 type="file"
//                 multiple
//                 onChange={handleFileChange}
//               />
//             </Button>
//           </Grid>
//         )} */}
//         <Grid item xs={12} sm={6}>
//           <FormControl fullWidth variant="outlined">
//             <InputLabel>Approoved By</InputLabel>
//             <Select
//               label="Approoved By"
//               name="approved_by"
//               // inputRef={register}
//               id="approved_by"
//               // value={formData.approved_by}
//               onChange={handleChange}
//             >
//               <MenuItem value="VUDA">VUDA</MenuItem>
//               <MenuItem value="Panchayat">Panchayat</MenuItem>
//               <MenuItem value="Rera">RERA</MenuItem>
//             </Select>
//           </FormControl>
//           {/* <TextField
//             label="Approved By"
//             name="approved_by"
//             value={formData.approved_by}
//             onChange={handleChange}
//             variant="outlined"
//             multiline
//             fullWidth
//           /> */}
//         </Grid>
//         {(user.role === "admin" || user.role === "staff") && (
//           <Grid item xs={12} sm={6}>
//             <TextField
//               label="Internal Comments"
//               name="comments"
//               id="comments"
//               // inputRef={register}
//               type="text"
//               // value={formData.comments}
//               onChange={handleChange}
//               variant="outlined"
//               fullWidth
//             />
//           </Grid>
//         )}
//         {(user.role === "admin" || user.role === "staff") && (
//           <Grid item xs={12} sm={6}>
//             <FormControl fullWidth variant="outlined">
//               <InputLabel>Property Rating</InputLabel>
//               <Select
//                 label="property rating"
//                 name="rating"
//                 id="rating"
//                 // inputRef={register}
//                 // value={formData.rating}
//                 onChange={handleChange}
//               >
//                 <MenuItem value="1">1</MenuItem>
//                 <MenuItem value="2">2</MenuItem>
//                 <MenuItem value="3">3</MenuItem>
//                 <MenuItem value="4">4</MenuItem>
//                 <MenuItem value="5">5</MenuItem>
//               </Select>
//               <FormHelperText>{formErrors.unit}</FormHelperText>
//             </FormControl>
//           </Grid>
//         )}
//         {(user.role === "admin" || user.role === "staff") && (
//           <Grid item xs={12} sm={6}>
//             <TextField
//               label="Property Comments"
//               name="v_comments"
//               id="v_comments"
//               inputRef={register}
//               type="text"
//               // value={formData.v_comments}
//               onChange={handleChange}
//               variant="outlined"
//               fullWidth
//             />
//           </Grid>
//         )}

//         <Grid item xs={12} sm={6}>
//           <TextField
//             label="Developments"
//             name="developments"
//             id="developments"
//             // inputRef={register}
//             type="text"
//             // value={formData.developments}
//             onChange={handleChange}
//             variant="outlined"
//             fullWidth
//           />
//         </Grid>
//         <Grid item xs={12} sm={6}>
//           <FormControl fullWidth variant="outlined">
//             <InputLabel>Loan Eligible</InputLabel>
//             <Select
//               label="Loan Eligible"
//               name="loan_eligibile"
//               id="loan_eligibile"
//               // inputRef={register}
//               // value={formData.loan_eligibile}
//               onChange={handleChange}
//             >
//               <MenuItem value={true}>Yes</MenuItem>
//               <MenuItem value={false}>No</MenuItem>
//             </Select>
//           </FormControl>
//         </Grid>

//         <Grid item xs={12} sm={6}>
//           <TextField
//             label="Disputes"
//             name="disputes"
//             id="disputes"
//             // inputRef={register}
//             type="text"
//             // value={formData.disputes}
//             onChange={handleChange}
//             variant="outlined"
//             fullWidth
//           />
//         </Grid>
//         <Grid item xs={12} sm={6}>
//           <TextField
//             label="Registrar Location"
//             name="reg_loc"
//             id="reg_loc"
//             // inputRef={register}
//             type="text"
//             // value={formData.reg_loc}
//             onChange={handleChange}
//             variant="outlined"
//             fullWidth
//           />
//         </Grid>
//         <Grid item xs={12} sm={6}>
//           <TextField
//             label="Mediator Name"
//             name="med_name"
//             id="med_name"
//             // inputRef={register}
//             type="text"
//             // value={formData.med_name}
//             onChange={handleChange}
//             variant="outlined"
//             fullWidth
//           />
//         </Grid>
//         <Grid item xs={12} sm={6}>
//           <TextField
//             label="Mediator Number1"
//             name="med_num1"
//             id="med_num1"
//             type="number"
//             // inputRef={register}
//             // value={formData.med_num1}
//             error={!!formErrors.med_num1}
//             helperText={formErrors.med_num1}
//             onChange={handleChange}
//             variant="outlined"
//             fullWidth
//           />
//         </Grid>
//         <Grid item xs={12} sm={6}>
//           <TextField
//             label="Mediator Number 2"
//             name="med_num2"
//             id="med_num2"
//             // inputRef={register}
//             type="number"
//             error={!!formErrors.med_num2}
//             // value={formData.med_num2}
//             onChange={handleChange}
//             helperText={formErrors.med_num2}
//             variant="outlined"
//             fullWidth
//           />
//         </Grid>
//         <Grid item xs={12} sm={6}>
//           <TextField
//             label="Owner Name"
//             name="own_name"
//             id="own_name"
//             // inputRef={register}
//             type="text"
//             // value={formData.own_name}
//             onChange={handleChange}
//             variant="outlined"
//             fullWidth
//           />
//         </Grid>
//         <Grid item xs={12} sm={6}>
//           <TextField
//             label="Owner Number 1"
//             name="own_num1"
//             id="own_num1"
//             type="number"
//             // inputRef={register}
//             // value={formData.own_num1}
//             error={!!formErrors.own_num1}
//             helperText={formErrors.own_num1}
//             onChange={handleChange}
//             variant="outlined"
//             fullWidth
//           />
//         </Grid>
//         <Grid item xs={12} sm={6}>
//           <TextField
//             label="Owner Number 2"
//             name="own_num2"
//             id="own_num2"
//             type="number"
//             // inputRef={register}
//             error={!!formErrors.own_num2}
//             // value={formData.own_num2}
//             onChange={handleChange}
//             helperText={formErrors.own_num2}
//             variant="outlined"
//             fullWidth
//           />
//         </Grid>
//         <Grid item xs={12} sm={6}>
//           <TextField
//             label="Latitude"
//             name="latitude"
//             id="latitude"
//             // inputRef={register}
//             type="number"
//             // value={formData.latitude}
//             onChange={handleChange}
//             variant="outlined"
//             fullWidth
//           />
//         </Grid>
//         <Grid item xs={12} sm={6}>
//           <TextField
//             label="Longitude"
//             name="longitude"
//             id="longitude"
//             // inputRef={register}
//             type="number"
//             // value={formData.longitude}
//             onChange={handleChange}
//             variant="outlined"
//             fullWidth
//           />
//         </Grid>
//         {
//           <Grid item xs={12} sm={6}>
//             <TextField
//               label="Government Price (₹)"
//               name="govt_price"
//               id="govt_price"
//               // inputRef={register}
//               type="number"
//               // value={formData.govt_price}
//               onChange={handleChange}
//               variant="outlined"
//               fullWidth
//             />
//           </Grid>
//         }
//         {/* <Grid item xs={12}>
//           <TextField
//             label="About Developer"
//             name="AboutDeveloper"
//             value={formData.AboutDeveloper}
//             onChange={handleChange}
//             variant="outlined"
//             multiline
//             rows={4}
//             fullWidth
//           />
//         </Grid> */}

//         <Grid item xs={12}>
//           <TextField
//             label="Property Information"
//             name="ad_info"
//             id="ad_info"
//             // inputRef={register}
//             // value={formData.ad_info}
//             onChange={handleChange}
//             variant="outlined"
//             multiline
//             rows={4}
//             fullWidth
//           />
//         </Grid>

//         <Grid item xs={12}>
//           <Button type="submit" variant="contained" fullWidth>
//             Submit
//           </Button>
//         </Grid>
//       </Grid>
//     </Box>
//   ) : (
//     <UploadImages responseData={responseData} />
//   );
// };

// export default Form;

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

  const {
    control,
    watch,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
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
      developments: propertyData?.developments || "",
      dimensions: propertyData?.dimensions || "",
      direction: propertyData?.direction || "",
      state: propertyData?.state || "",
      size: propertyData?.size || "",
      district: propertyData?.district || "",
      document_number: propertyData?.document_number || "",
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
    },
  });

  const selectedState = watch("state");
  const selectedDistrict = watch("district");

  useEffect(() => {
    console.log('state change ');
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
    console.log('selected district ');
    if (selectedDistrict) {
      setAreas(AreaJson.areas[selectedDistrict] || []);
      setValue("village", propertyData?.village || "");
    }
  }, [selectedDistrict]);

  // useEffect(() => {
  //   if (selectedState) {
  //     const districtsInState = Object.keys(AreaJson.district_status[selectedState] || {})
  //       .filter((district) => AreaJson.district_status[selectedState][district]);
  //     setDistricts(districtsInState);
      
  //     // Set default value for district if propertyData.district is null or empty
  //     if (!propertyData.district) {
  //       setValue("district", districtsInState[0] || "");
  //     } else {
  //       setValue("district", propertyData.district);
  //     }
      
  //     setAreas([]);
  //   }
  // }, [selectedState, setValue, AreaJson, propertyData]);
  
  // useEffect(() => {
  //   if (selectedDistrict) {
  //     setAreas(AreaJson.areas[selectedDistrict] || []);
      
  //     // Set default value for village if propertyData.village is null or empty
  //     if (!propertyData.village) {
  //       setValue("village", (AreaJson.areas[selectedDistrict] || [])[0]?.area || "");
  //     } else {
  //       setValue("village", propertyData.village);
  //     }
  //   }
  // }, [selectedDistrict, setValue, AreaJson, propertyData]);
  

  useEffect(() => {
    if (currentPath === "/Addproperty") {
      setHeading("Add Property");
      setIsEditMode(false);
    } else if (currentPath === "/UpdateProperty") {
      setHeading("Update Property");
      setIsEditMode(true);
    }
  }, [currentPath]);

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

  function findUpdatedFields(oldData, newData) {
    const updatedFields = {};
    if (oldData.hasOwnProperty("user_id")) {
      updatedFields["user_id"] = oldData["user_id"];
    }
    for (let key in oldData) {
      if (oldData.hasOwnProperty(key) && newData.hasOwnProperty(key)) {
        if (oldData[key] !== newData[key]) {
          updatedFields[key] = newData[key];
        }
      }
    }
    return updatedFields;
  }

  const getChangedFields = (propertyData, formData) => {
    return findUpdatedFields(propertyData, formData);
  };

  const onSubmit = async (data) => {
    console.log("form data", data);
    const action = isEditMode ? updateProperty : addProperty;
    const p_id = propertyData?.p_id;
    let payload;
    if (currentPath === "/UpdateProperty") {
      payload = getChangedFields(propertyData, data);
      if (isEditMode) {
        payload.p_id = p_id;
      }
    } else {
      payload = data;
      if (isEditMode) {
        payload.p_id = p_id;
      }
    }
    dispatch(action({ payload })).then((response) => {
      if (
        response.payload.message === "property added successfully" ||
        response.payload.message === "Property updated successfully"
      ) {
        setResponseData(response.payload);
        setShowComponent(false);
      } else {
        console.error(response.payload);
      }
    });
  };

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

  console.log('form data ', getValues());

  return (
    <Box
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
          onClick={() => setShowComponent(false)}
        >
          Update Image/Documents
        </Button>
      )}
      <Grid container spacing={2} sx={{ marginTop: "10px" }}>
        {(user.role === "admin" || user.role === "staff") && (
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Property Status</InputLabel>
              <Controller
                name="v_status"
                control={control}
                render={({ field }) => (
                  <Select {...field} label="Property Status">
                    <MenuItem value="true">Verified</MenuItem>
                    <MenuItem value="false">Not Verified</MenuItem>
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
              control={control}
              render={({ field }) => (
                <Select {...field} label="Unit">
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
            render={({ field }) => (
              <TextField
                {...field}
                label="Size"
                type="number"
                variant="outlined"
                fullWidth
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
        <Grid item xs={12} sm={6}>
        {/* {formData.p_type === "flat" && (
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth variant="outlined" error={!!formErrors.bhk}>
              <InputLabel>No. of Bed Rooms</InputLabel>
              <Select
                label="No. of Bed Room"
                // inputRef={register}
                name="bhk"
                id="bhk"
                // value={formData.bhk}
                onChange={handleChange}
                required
              >
                <MenuItem value="1">1 BHK</MenuItem>
                <MenuItem value="2">2 BHK</MenuItem>
                <MenuItem value="3">3 BHK</MenuItem>
                <MenuItem value="4">4 BHK</MenuItem>
                <MenuItem value="5">5 BHK</MenuItem>
                <MenuItem value="6">6 BHK</MenuItem>
              </Select>
              <FormHelperText>{formErrors.bhk}</FormHelperText>
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
              // inputRef={register}
                label="Furnished"
                name="furnshied"
                id="furnshied"
                // value={formData.furnshied}
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
              // inputRef={register}
                label="Boundary Wall"
                name="bound_wall"
                id="bound_wall"
                // value={formData.bound_wall}
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
              // inputRef={register}
                label="No. of Open Road Sides"
                name="num_open_sides"
                id="num_open_sides"
                // value={formData.num_open_sides}
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
              // inputRef={register}
                label="RERA Status"
                name="rera"
                id="rera"
                // value={formData.rera}
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
              // inputRef={register}
                label="Lift"
                name="lift"
                id="lift"
                // value={formData.lift}
                onChange={handleChange}
              >
                <MenuItem value="Yes">Yes</MenuItem>
                <MenuItem value="No">No</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        )} */}
        


          <FormControl fullWidth variant="outlined" error={!!errors.state}>
            <InputLabel>State*</InputLabel>
            <Controller
              name="state"
              control={control}
              rules={{ required: "State Type is required" }}
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
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth variant="outlined" error={!!errors.district}>
            <InputLabel>District*</InputLabel>
            <Controller
              name="district"
              control={control}
              rules={{ required: "District Type is required" }}
             
              render={({ field }) => (
                <Select
                  {...field}
                  label="District"
                  onChange={(e) => {
                    field.onChange(e);
                    console.log('disctrict e ', e.target.value);
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
                  {areas.map((area) => (
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
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Price (₹)"
                  type="number"
                  variant="outlined"
                  fullWidth
                  error={!!errors.price}
                  helperText={errors.price?.message}
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
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Price (₹)"
                      type="number"
                      variant="outlined"
                      fullWidth
                      error={!!errors.price}
                      helperText={errors.price?.message}
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
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Minimum Price"
                  placeholder="Enter minimum price"
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
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Maximum Price"
                  placeholder="Enter maximum price"
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
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Minimum Price"
                      placeholder="Enter minimum price"
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
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Maximum Price"
                      placeholder="Enter maximum price"
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
                name="comments"
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
            <Grid item xs={12} sm={6}>
              <Controller
                name="v_comments"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Property Comments"
                    type="text"
                    variant="outlined"
                    fullWidth
                    error={!!errors.v_comments}
                    helperText={errors.v_comments?.message}
                  />
                )}
              />
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
                label="Registrar Location"
                type="text"
                variant="outlined"
                fullWidth
                error={!!errors.reg_loc}
                helperText={errors.reg_loc?.message}
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
    </Box>
  );
};

export default Form;
