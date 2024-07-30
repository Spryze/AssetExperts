import * as React from "react";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import { useDispatch } from "react-redux";
import { SearchResults } from "./PropertySlice1";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";

import AreaJson from "../../../assets/Default/area/result.json";
import { selectUser } from "app/store/userSlice";
import { useSelector } from "react-redux";

const SearchDialogue = ({ FormData, onSearch, isAdminSearch }) => {
  const [open, setOpen] = useState(false);
  const user = useSelector(selectUser);
  const PropertyState = "NewProperty";
  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [districts, setDistricts] = useState([]);
  const [areas, setAreas] = useState([]);

  const initialFormData = {
    p_type: "",
    bhk:"",
    listing_type: "",
    min_price: "",
    max_price: "",
    state: "",
    district: "",
    area:"",
    approved_by: "",
    status: "",
    loan_eligible: "",
    updated_by: "",
    notified: 0,
    unit: "",
    v_status: true,
    own_name: "",
    med_name: "",
    landmark: "",
    offset: 0,
    status:"",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [isLoading, setIsLoading] = useState(false);
  const [noDataFound, setNoDataFound] = useState(false);
  const [districtOptions, setDistrictOptions] = useState([]);
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: name === "v_status" ? value === "true" : value,
    }));


  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setDistrictOptions([]);
  };

  const removeEmptyFields = (obj) => {
    return Object.fromEntries(
      Object.entries(obj).filter(([_, value]) => value !== "" && value !== null && value !== undefined)
    );
  };

  const handleSubmit = async () => {
    try {

       

      const payload = {
        ...formData,
        price_range: {
          min: parseInt(formData.min_price, 10),
          max: parseInt(formData.max_price, 10),
        },
      };
      const filteredFormData = removeEmptyFields(payload);
      FormData(filteredFormData);
      console.log("payload going to backend", filteredFormData);
      setIsLoading(true);
      await dispatch(
        SearchResults({
          formData: filteredFormData,
          offset: 0,
          isAdminSearch: isAdminSearch,
          PropertyState: PropertyState,
        })
      ).then((result) => {
        console.log(result);
        onSearch(result);
        setIsLoading(false);
      });

    } catch (error) {
      console.error("Failed to fetch data:", error);
      setNoDataFound(true);
    } finally {
      setIsLoading(false);
      handleClose();
    }
  };

  useEffect(() => {
    if (selectedState) {
      console.log(selectedState);
      const districtsInState = Object.keys(
        AreaJson.district_status[selectedState]
      ).filter((district) => AreaJson.district_status[selectedState][district]);
      setDistricts(districtsInState);
      setSelectedDistrict("");
      setAreas([]);
    }
  }, [selectedState]);

  useEffect(() => {
    if (selectedDistrict) {
      setAreas(AreaJson.areas[selectedDistrict] || []);
    }
  }, [selectedDistrict]);

  const filteredStates = AreaJson.state_status
    .filter((stateObj) => stateObj.status === true)
    .map((stateObj) => stateObj.state);
  console.log(filteredStates);
  console.log(filteredStates);

  return (
    <React.Fragment>
      <Box

        sx={{
          display: "flex",
          alignItems: "end",
          padding: "2px 10px",
   
          textTransform: "capitalize",
          
          width: "100%",
        }}
      >
        <TextField
          variant="outlined"
          size="medium"
          placeholder="search ..."
          onClick={handleClickOpen}
          sx={{
 
            width: "400px",
            fontSize: "45px",
            background: "white",
            borderRadius: "10px",
            boxShadow: "-3px 9px 38px #444444",

            "& .MuiInputBase-root": {
              borderRadius: "10px",
            },
            "& .MuiFilledInput-root": {
              borderRadius: "10px",
              padding: "0 15px",
            },
            input: {
              height: "40px",
              boxSizing: "border-box",
              padding: 0,
              fontSize: "15px",
              lineHeight: "100px",
              textAlign: "center",
              borderRadius: "5px",
            },
          }}
        />
      </Box>

      <Dialog
        fullWidth={true}
        maxWidth="md"
        open={open}
        onClose={handleClose}
        sx={{ textTransform: "capitalize" }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <DialogTitle>Choose Your Requirements</DialogTitle>
          <CloseIcon
            sx={{ cursor: "pointer", margin: "10px" }}
            onClick={handleClose}
          />
        </Box>
        <DialogContent>
          <Box>
            <FormControl fullWidth>
              <InputLabel id="property-type-label">Property Types</InputLabel>
              <Select
                labelId="property-type-label"
                id="property-type-select"
                name="p_type"
                value={formData.p_type}
                label="Property select"
                onChange={handleChange}
              >
                <MenuItem value="plot">Plots</MenuItem>
                <MenuItem value="flat">Flats</MenuItem>
                <MenuItem value="land">Lands</MenuItem>
                <MenuItem value="warehouse">Ware House</MenuItem>
                <MenuItem value="pg">PG</MenuItem>
                <MenuItem value="officeplace">Office Place</MenuItem>
                <MenuItem value="coworkingplace">Co-Working Place</MenuItem>
                <MenuItem value="student hostel">Student Hostel</MenuItem>
                <MenuItem value="agricultural lands">
                  AgriculturalLands
                </MenuItem>
                <MenuItem value="apartment">Apartment</MenuItem>
                <MenuItem value="independenthouse">Independent House</MenuItem>
              </Select>
            </FormControl>
          </Box>
          {formData.p_type == "flat" &&<FormControl fullWidth sx={{ mt: 2, margin: "6px 5px" }}>
              <InputLabel>BHK</InputLabel>
              <Select
                name="bhk"
                value={formData.bhk}
                onChange={handleChange}
                label="Select BHK"
              >
                <MenuItem value="1">1</MenuItem>
                <MenuItem value="2">2</MenuItem>
                <MenuItem value="3">3</MenuItem>
                <MenuItem value="4">4</MenuItem>
                <MenuItem value="5">5</MenuItem>
                <MenuItem value="6">6</MenuItem>
              </Select>
            </FormControl>}

          <Box sx={{ marginTop: "10px" }}>
            <FormControl fullWidth sx={{ mt: 2, margin: "4px 5px" }}>
              <InputLabel>Listing Type</InputLabel>
              <Select
                name="listing_type"
                value={formData.listing_type}
                onChange={handleChange}
                label="Listing Type"
              >
                <MenuItem value="sell">Sell</MenuItem>
                <MenuItem value="buy">Buy</MenuItem>
                <MenuItem value="rent">Rent</MenuItem>
                <MenuItem value="UnderConstruction">
                  Under Construction
                </MenuItem>
              </Select>
            </FormControl>

            <TextField
              fullWidth
              label="Min Budget"
              placeholder="Minimum value"
              name="min_price"
              type="number"
              value={formData.min_price}
              onChange={handleChange}
              variant="outlined"
              sx={{ margin: "6px" }}
            />

            <TextField
              label="Max Budget"
              fullWidth
              placeholder="Maximum value"
              name="max_price"
              type="number"
              value={formData.max_price}
              onChange={handleChange}
              variant="outlined"
              sx={{ margin: "6px" }}
            />
            <FormControl fullWidth sx={{ mt: 2, margin: "6px 5px" }}>
              <InputLabel>Unit</InputLabel>
              <Select
                name="unit"
                value={formData.unit}
                onChange={handleChange}
                label="Unit"
              >
                <MenuItem value="sqft">sqft</MenuItem>
                <MenuItem value="sqyd">sqyd</MenuItem>
                <MenuItem value="sq.m">sq.m</MenuItem>
                <MenuItem value="acre">acre</MenuItem>
                <MenuItem value="cent">cent</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth sx={{ mt: 2, margin: "4px 5px" }}>
              <InputLabel>Select State</InputLabel>
              
              <Select
                label="State"
                name="state"
                value={formData.state}
                onChange={(e) => {
                  setSelectedState(e.target.value);
                  handleChange(e);
                }}
                
              >
                {filteredStates.map((state) => (
                  <MenuItem key={state} value={state}>
                    {state}
                  </MenuItem>
                ))}
              </Select>
              {/* </FormControl> */}
            </FormControl>

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
            <FormControl fullWidth variant="outlined">
              <InputLabel>Area</InputLabel>
              <Select
                label="Area"
                name="area"
                value={formData.area}
                onChange={handleChange}
              >
                {console.log(areas)}
                
                {areas.map((area) => (
                  <MenuItem key={area.id} value={area.area}>
                    {area.area}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {user.role === "admin" ||user.role === "staff"&& (
              <FormControl fullWidth sx={{ mt: 2, margin: "6px 5px" }}>
                <TextField
                  name="landmark"
                  value={formData.landmark}
                  onChange={handleChange}
                  label="Landmark"
                  variant="outlined"
                />
              </FormControl>
            )}

            <FormControl fullWidth sx={{ mt: 2, margin: "6px 5px" }}>
              <InputLabel>Approved</InputLabel>
              <Select
                name="approved_by"
                value={formData.approved_by}
                onChange={handleChange}
                label="Select Approved"
              >
                <MenuItem value="Panchayat">Panchayat</MenuItem>
                <MenuItem value="Vuda">Vuda</MenuItem>
                <MenuItem value="Rera">Rera</MenuItem>
              </Select>
            </FormControl>
           
            <FormControl fullWidth sx={{ mt: 2, margin: "6px 5px" }}>
              <InputLabel>Loan Eligibility</InputLabel>
              <Select
                name="loan_eligible"
                value={formData.loan_eligible}
                onChange={handleChange}
                label="Select Loan Eligibility"
              >
                <MenuItem value="true">Yes</MenuItem>
                <MenuItem value="false">No</MenuItem>
              </Select>
            </FormControl>
            {user.role === "admin" || user.role === "staff" && (
              <TextField
                label="Updated By"
                name="updated_by"
                value={formData.updated_by}
                onChange={handleChange}
                variant="outlined"
                sx={{ margin: "6px" }}
              />
            )}
            {user.role === "admin" ||user.role === "staff"&& (
              <TextField
                label="Owner Name"
                name="own_name"
                value={formData.own_name}
                onChange={handleChange}
                variant="outlined"
                sx={{ margin: "6px" }}
              />
            )}
            {user.role === "admin" ||user.role === "staff"&& (
              <TextField
                label="Mediator Name"
                name="med_name"
                value={formData.med_name}
                onChange={handleChange}
                variant="outlined"
                sx={{ margin: "6px" }}
              />
            )}
            {user.role === "admin" || user.role === "staff" && (
              <FormControl fullWidth sx={{ mt: 2, margin: "6px 5px" }}>
                <InputLabel>Notified</InputLabel>
                <Select
                  name="notified"
                  value={formData.notified}
                  onChange={handleChange}
                  label="Notified"
                >
                  <MenuItem value="1">True</MenuItem>
                  <MenuItem value="0">False</MenuItem>
                </Select>
              </FormControl>
            )}
            {user.role === "admin" || user.role === "staff" && (
              <FormControl fullWidth sx={{ mt: 2, margin: "6px 5px" }}>
                <InputLabel>Verification Status</InputLabel>
                <Select
                  name="v_status"
                  value={formData.v_status.toString()}
                  onChange={handleChange}
                  label="Verification Status"
                >
                  <MenuItem value="true">Verified</MenuItem>
                  <MenuItem value="false">Not Verified</MenuItem>
                </Select>
              </FormControl>
            )}
            {user.role === "admin" || user.role === "staff"&& (
              <FormControl fullWidth sx={{ mt: 2, margin: "6px 5px" }}>
                <InputLabel>Property Status</InputLabel>
                <Select
                  name="status"
                  value={formData.status.toString()}
                  onChange={handleChange}
                  label="Verification Status"
                >
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="inactive">In Active</MenuItem>
                </Select>
              </FormControl>
            )}
          </Box>
        </DialogContent>

        <DialogActions>
          <Box
            sx={{ display: "flex", justifyContent: "center", width: "100%" }}
          >
            {isLoading ? (
              <CircularProgress />
            ) : (
 
              <>
              <Button
                onClick={handleSubmit}
                sx={{
                  margin:"0px 10px",
                  borderRadius: "8px",
                  padding: "5px 20px",
                  backgroundColor: "#4ea944",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "#0d7e00",
                  },
                }}
              >
                Submit
              </Button>
              <Button
                onClick={resetForm}
                sx={{
                  margin:"0px 10px",
                  borderRadius: "8px",
                  padding: "5px 20px",
                  backgroundColor: "#4ea944",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "#0d7e00",
                  },
                }}
              >
                Reset
              </Button>
              </>
            )}
          </Box>
        </DialogActions>
      </Dialog>
      {isLoading && (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={true}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
    </React.Fragment>
  );
};

export default SearchDialogue;
