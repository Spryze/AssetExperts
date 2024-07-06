import * as React from "react";
import { useState } from "react";
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
import statesData from "./statesData.json";
import PriceDetails from "./PriceDetails.json";
import { selectUser } from "app/store/userSlice";
import { useSelector } from "react-redux";

const SearchDialogue = ({ FormData, onSearch, isAdminSearch }) => {
  const [open, setOpen] = useState(false);
  const user = useSelector(selectUser);
  const PropertyState = "NewProperty";

  const initialFormData = {
    p_type: "",
    listing_type: "",
    min_price: "",
    max_price: "",
    state: "",
    district: "",
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

    if (name === "state") {
      const selectedState = statesData.states.find(
        (state) => state.name === value
      );
      setDistrictOptions(selectedState ? selectedState.district : []);
      setFormData((prevFormData) => ({
        ...prevFormData,
        district: "",
      }));
    }
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

  const handleSubmit = async () => {
    try {
      const payload = {
        ...formData,
        price_range: {
          min: parseInt(formData.min_price, 10),
          max: parseInt(formData.max_price, 10),
        },
      };
      FormData(payload);
      setIsLoading(true);
      await dispatch(
        SearchResults({
          formData: payload,
          offset: 0,
          isAdminSearch: isAdminSearch,
          PropertyState: PropertyState,
        })
      ).then(() => {
        setIsLoading(false);
      });
      
      // onSearch(result);
      // {console.log('result',result)}
      //       if (!result || !result.data || result.properties.length === 0) {
      //         setNoDataFound(true);
      //         onSearch(result);
      //       } else {
      //         setNoDataFound(false);
      //       }
    } catch (error) {
      console.error("Failed to fetch data:", error);
      setNoDataFound(true);
    } finally {
      setIsLoading(false);
      handleClose();
    }
  };

  return (
    <React.Fragment>
      <Box
        // className="SearchBox"
        sx={{
          display: "flex",
          alignItems: "end",
          padding: "2px 10px",
          // margin: "20px 30px",
          textTransform: "capitalize",
          // justifyContent: "center",
          width: "100%",
        }}
      >
        <TextField
          variant="outlined"
          size="medium"
          placeholder="search ..."
          onClick={handleClickOpen}
          sx={{
            // marginRight: { xs: "0", sm: "120px" },
            width: "400px",
            fontSize: "45px",
            background: "white",
            borderRadius: "20px",
            boxShadow: "-3px 9px 38px #444444",
            // top:"-78px",
            // left: "60px",
            "& .MuiInputBase-root": {
              borderRadius: "20px",
            },
            "& .MuiFilledInput-root": {
              borderRadius: "20px",
              padding: "0 15px",
            },
            input: {
              height: "60px",
              boxSizing: "border-box",
              padding: 0,
              fontSize: "20px",
              lineHeight: "100px",
              textAlign: "center",
              borderRadius: "20px",
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
                <MenuItem value=" ">Any</MenuItem>
                <MenuItem value="plot">Plots</MenuItem>
                <MenuItem value="flat">Flats</MenuItem>
                <MenuItem value="land">Lands</MenuItem>
                <MenuItem value="WareHouses">WareHouses</MenuItem>
                <MenuItem value="PG">PG</MenuItem>
                <MenuItem value="OfficePlace">OfficePlace</MenuItem>
                <MenuItem value="CoWorkingPlace">CoWorkingPlace</MenuItem>
                <MenuItem value="StudentHostels">StudentHostels</MenuItem>
                <MenuItem value="AgriculturalLands">AgriculturalLands</MenuItem>
                <MenuItem value="Apartment">Apartment</MenuItem>
                <MenuItem value="IndependentHouse">IndependentHouse</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box sx={{ marginTop: "10px" }}>
            <FormControl sx={{ mt: 2, minWidth: "200px", margin: "4px 5px" }}>
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
              placeholder="Maximum value"
              name="max_price"
              type="number"
              value={formData.max_price}
              onChange={handleChange}
              variant="outlined"
              sx={{ margin: "6px" }}
            />
            <FormControl sx={{ mt: 2, minWidth: "130px", margin: "6px 5px" }}>
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
            {/* <FormControl sx={{ mt: 2, minWidth: "180px", margin: "4px 5px" }}>
              <InputLabel id="budget-label">Budget ₹</InputLabel>
              <Select
                labelId="price_range"
                id="budget"
                name="price_range"
                value={formData.price_range}
                onChange={handleChange}
                label="Budget ₹"
              >
                {Object.keys(PriceDetails.PriceDetails).map((key) => (
                  <MenuItem key={key} value={key}>
                    {key === "Any"
                      ? "Any"
                      : `₹${PriceDetails.PriceDetails[
                          key
                        ].min.toLocaleString()} - ₹${PriceDetails.PriceDetails[
                          key
                        ].max.toLocaleString()}`}
                  </MenuItem>
                ))}
              </Select>
            </FormControl> */}

            <FormControl sx={{ minWidth: "140px", mt: 2, margin: "4px 5px" }}>
              <InputLabel>Select State</InputLabel>
              <Select
                name="state"
                value={formData.state}
                onChange={handleChange}
                label="Select State"
              >
                {statesData.states.map((state) => (
                  <MenuItem
                    key={state.id}
                    value={state.name}
                    sx={{ textTransform: "capitalize" }}
                  >
                    {state.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl sx={{ mt: 2, minWidth: "130px", margin: "6px 5px" }}>
              <InputLabel>District</InputLabel>
              <Select
                name="district"
                value={formData.district}
                onChange={handleChange}
                label="Select District"
              >
                {districtOptions.map((district) => (
                  <MenuItem
                    key={district}
                    value={district}
                    sx={{ textTransform: "capitalize" }}
                  >
                    {district}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {user.role === "admin" && (
              <FormControl sx={{ mt: 2, minWidth: "130px", margin: "6px 5px" }}>
                <TextField
                  name="landmark"
                  value={formData.landmark}
                  onChange={handleChange}
                  label="Landmark"
                  variant="outlined"
                />
              </FormControl>
            )}

            <FormControl sx={{ mt: 2, minWidth: "130px", margin: "6px 5px" }}>
              <InputLabel>Approved</InputLabel>
              <Select
                name="approved_by"
                value={formData.approved_by}
                onChange={handleChange}
                label="Select Approved"
              >
                <MenuItem value=" ">Any</MenuItem>
                <MenuItem value="Panchayat">Panchayat</MenuItem>
                <MenuItem value="Vuda">Vuda</MenuItem>
                <MenuItem value="Rera">Rera</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ mt: 2, minWidth: "140px", margin: "6px 5px" }}>
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
            {user.role === "admin" && (
              <TextField
                label="Updated By"
                name="updated_by"
                value={formData.updated_by}
                onChange={handleChange}
                variant="outlined"
                sx={{ margin: "6px" }}
              />
            )}
            {user.role === "admin" && (
              <TextField
                label="Owner Name"
                name="own_name"
                value={formData.own_name}
                onChange={handleChange}
                variant="outlined"
                sx={{ margin: "6px" }}
              />
            )}
            {user.role === "admin" && (
              <TextField
                label="Mediator Name"
                name="med_name"
                value={formData.med_name}
                onChange={handleChange}
                variant="outlined"
                sx={{ margin: "6px" }}
              />
            )}
            {user.role === "admin" && (
              <FormControl sx={{ mt: 2, minWidth: "140px", margin: "6px 5px" }}>
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
            {user.role === "admin" && (
              <FormControl sx={{ mt: 2, minWidth: "165px", margin: "6px 5px" }}>
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
          </Box>
        </DialogContent>

        <DialogActions>
          <Box
            sx={{ display: "flex", justifyContent: "center", width: "100%" }}
          >
            {isLoading ? (
              <CircularProgress />
            ) : (
              // <Button
              //   onClick={handleSubmit}
              //   sx={{ backgroundColor: "#1D2432", color: "white" }}
              // >
              //   Submit
              // </Button>
              <Button
                onClick={handleSubmit}
                sx={{
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
