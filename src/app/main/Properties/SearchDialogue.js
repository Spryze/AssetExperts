import * as React from 'react';
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
import Switch from '@mui/material/Switch';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import { FormControlLabel } from '@mui/material';
import TextField from '@mui/material/TextField';

const SearchDialogue = () => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullWidth: true,
    maxWidth: 'sm',
    propertyType: '',
    transactionType: ''
  });

  const handleChange = (event) => {
    const name = event.target.name;
    setFormData({
      ...formData,
      [name]: event.target.value
    });
  };

  const handleSwitchChange = (event) => {
    const name = event.target.name;
    setFormData({
      ...formData,
      [name]: event.target.checked
    });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button variant="contained" onClick={handleClickOpen} sx={{ padding: '5px 20px', backgroundColor: '#ECEEF0' }}>
        Search Properties <SearchIcon sx={{ margin: '0px 5px' }} />
      </Button>
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
                name="propertyType"
                value={formData.propertyType}
                label="Property Types"
                onChange={handleChange}
              >
                <MenuItem value="Plots">Plots</MenuItem>
                <MenuItem value="Flats">Flats</MenuItem>
                <MenuItem value="Lands">Lands</MenuItem>
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

          <Box sx={{marginTop:"10px"}}>
            <FormControl sx={{ mt: 2, minWidth:"180px",margin:"0px 5px" }}>
              <InputLabel>Transaction Type</InputLabel>
              <Select
                name="transactionType"
                value={formData.transactionType}
                onChange={handleChange}
                label="Transaction Type"
              >
                <MenuItem value="Sell">Sell</MenuItem>
                <MenuItem value="Buy">Buy</MenuItem>
                <MenuItem value="Rent">Rent</MenuItem>
                <MenuItem value="UnderConstruction">Under Construction</MenuItem>
                <MenuItem value="ReadyToMove">Ready To Move</MenuItem>
                <MenuItem value="NewleyLaunched">Newley Launched</MenuItem>
              </Select>
            </FormControl>
         
        
            <FormControl sx={{ mt: 2, minWidth:"80px", margin:"0px 5px" }}>
              
              <TextField id="Budget in ₹" label="Budget in ₹" variant="outlined" />
            </FormControl>
            <FormControl sx={{minWidth:"120px"}}>
              <InputLabel>Select State</InputLabel> 
              <Select
              name="Slectstate"
              value={formData.state}
              onChange={handleChange}
              label="Select State">
                <MenuItem value="Telangana">Telangana</MenuItem>
                <MenuItem value="AndhraPradesh">Andhra Pradesh</MenuItem>
                </Select> 
            </FormControl>
          </Box>

          
         
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Submit</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default SearchDialogue;
