import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import { useDispatch } from 'react-redux';
import { SearchResults} from './PropertySlice1';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';

const SearchDialogue = ({onSearch}) => {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [responseData,setresponseData]= useState('');
  const [formData, setFormData] = useState({
    
    
    p_type: '',
    listing_type: '',
    price: '',
    state: '',
    district: '',
    approved_by: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [noDataFound, setNoDataFound] = useState(false);

  const dispatch = useDispatch(); 

  const handleChange = (event) => {
    const name = event.target.name;
    setFormData({
      ...formData,
      [name]: event.target.value,
    });
  };

  const handleSwitchChange = (event) => {
    const name = event.target.name;
    setFormData({
      ...formData,
      [name]: event.target.checked,
    });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  

  

const handleSubmit = async () => {
  setIsLoading(true);
  try {
    const result = await dispatch(SearchResults(formData)).unwrap();
    console.log("result", result);

    if (result.data?.property?.length === 0) {
      console.log("No data found");
      onSearch(null); 
    } else {
      onSearch(result.data); 
    }
  } catch (error) {
    console.error('Failed to fetch data:', error);
    onSearch(null); 
  } finally {
    setIsLoading(false);
    handleClose();
  }
};







  const handleSearch = () => {
    console.log('Search query:', searchQuery);
    
  };

  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'end',padding: '2px 10px', marginBottom: '30px' }}>
        <TextField
          variant="outlined"
          size="medium"
          placeholder="Search ..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ marginRight: '120px', width: '600px' ,fontSize: '45px'}}
        />
        <Button
          variant="contained"
          onClick={handleSearch}
          sx={{ padding: '5px 20px', backgroundColor: '#4caf50', '&:hover': { backgroundColor: '#45a049' } }}
        >
          Search
        </Button>
        <Button
          variant="contained"
          onClick={handleClickOpen}
          sx={{ marginLeft: '20px', padding: '5px 15px', backgroundColor: '#ff9900', '&:hover': { backgroundColor: '#ffa733' } }}
        >
          Options
        </Button>
      </Box>

      
      <Dialog
        fullWidth={formData.fullWidth}
        maxWidth={formData.maxWidth}
        open={open}
        onClose={handleClose}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <DialogTitle>Choose Your Requirements</DialogTitle>
          <CloseIcon sx={{ cursor: 'pointer', margin: '10px' }} onClick={handleClose} />
        </div>
        <DialogContent>
        

          <Box>
            <FormControl fullWidth>
              <InputLabel id="property-type-label">Property Types</InputLabel>
              <Select
                labelId="property-type-label"
                id="property-type"
                name="p_type"
                value={formData.p_type}
                label="Property Types"
                onChange={handleChange}
              >
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

          <Box sx={{ marginTop: '10px' }}>
            <FormControl sx={{ mt: 2, minWidth: '200px', margin: '0px 5px' }}>
              <InputLabel>Transaction Type</InputLabel>
              <Select
                name="listing_type"
                value={formData.listing_type}
                onChange={handleChange}
                label="Transaction Type"
              >
                <MenuItem value="sell">Sell</MenuItem>
                <MenuItem value="buy">Buy</MenuItem>
                <MenuItem value="rent">Rent</MenuItem>
                <MenuItem value="UnderConstruction">Under Construction</MenuItem>
                <MenuItem value="ReadyToMove">Ready To Move</MenuItem>
                <MenuItem value="NewleyLaunched">Newley Launched</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ mt: 2, minWidth: '130px', margin: '0px 5px' }}>
              <InputLabel id="budget-label">Budget ₹</InputLabel>
              <Select
                labelId="budget-label"
                id="budget"
                name="price"
                value={formData.price}
                onChange={handleChange}
                label="Budget ₹"
              >
                <MenuItem value="20 Lac">₹20 Lac - ₹25 Lac</MenuItem>
                <MenuItem value="25 Lac">₹25 Lac - ₹30 Lac</MenuItem>
                <MenuItem value="30 Lac">₹30 Lac - ₹35 Lac</MenuItem>
                <MenuItem value="35 Lac">₹35 Lac - ₹40 Lac</MenuItem>
                <MenuItem value="40 Lac">₹40 Lac - ₹45 Lac</MenuItem>
                <MenuItem value="45 Lac">₹45 Lac - ₹50 Lac</MenuItem>
                <MenuItem value="50 Lac">₹50 Lac - ₹55 Lac</MenuItem>
                <MenuItem value="55 Lac">₹55 Lac - ₹60 Lac</MenuItem>
                <MenuItem value="60 Lac">₹60 Lac - ₹65 Lac</MenuItem>
                <MenuItem value="65 Lac">₹65 Lac - ₹70 Lac</MenuItem>
                <MenuItem value="70 Lac">₹70 Lac - ₹75 Lac</MenuItem>
                <MenuItem value="75 Lac">₹75 Lac - ₹80 Lac</MenuItem>
                <MenuItem value="80 Lac">₹80 Lac - ₹85 Lac</MenuItem>
                <MenuItem value="85 Lac">₹85 Lac - ₹90 Lac</MenuItem>
                <MenuItem value="90 Lac">₹90 Lac - ₹95 Lac</MenuItem>
                <MenuItem value="95 Lac">₹95 Lac - ₹1Cr</MenuItem>
                <MenuItem value="1Cr ">₹1Cr - ₹1.5Cr</MenuItem>
                
              </Select>
            </FormControl>
            <FormControl sx={{ minWidth: '140px' }}>
              <InputLabel>Select State</InputLabel>
              <Select
                name="state"
                value={formData.state}
                onChange={handleChange}
                label="Select State"
              >
                <MenuItem value="Telangana">Telangana</MenuItem>
                <MenuItem value="AndhraPradesh">Andhra Pradesh</MenuItem>
                <MenuItem value="Tamil Nadu">Tamil Nadu</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ mt: 2, minWidth: '130px', margin: '6px 5px' }}>
              <InputLabel>District</InputLabel>
              <Select
                name="district"
                value={formData.district}
                onChange={handleChange}
                label="Select District"
              >
                <MenuItem value="visakhapatnam">visakhapatnam</MenuItem>
                <MenuItem value="hyderabad">hyderabad</MenuItem>
                <MenuItem value="vizianagaram">vizianagaram</MenuItem>
                <MenuItem value="srikakulam">srikakulam</MenuItem>
                <MenuItem value="west godavari">west godavari</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ mt: 2, minWidth: '130px', margin: '6px 5px' }}>
              <InputLabel>Approved</InputLabel>
              <Select
                name="approved_by"
                value={formData.approved_by}
                onChange={handleChange}
                label="Select Approved"
              >
                <MenuItem value="Default">Default</MenuItem>
                <MenuItem value="Panchayat">Panchayat</MenuItem>
                <MenuItem value="Vuda">Vuda</MenuItem>
                <MenuItem value="Rera">Rera</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        
        <DialogActions>
          <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            {isLoading ? (
              <CircularProgress />
            ) : (
              <Button onClick={ handleSubmit }>Submit</Button>
            )}
          </Box>
        </DialogActions>
      </Dialog>
      {isLoading &&(<Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
      >
        <CircularProgress color="inherit" />
      </Backdrop>)}
      
    </React.Fragment>
    
     
    
    
  );
};

export default SearchDialogue;