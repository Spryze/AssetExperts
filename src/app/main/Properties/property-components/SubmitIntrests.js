import React, { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectmySubscription } from '../PropertySlice1';

export default function FormDialog() {
  const StateandDistrictList = useSelector(selectmySubscription);

  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    state: '',
    district: '',
    areas: []
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData); 
    handleClose();
  };

  const getFilteredStates = () => {
    const { state_status } = StateandDistrictList;
    return Object.keys(state_status).filter(state => state_status[state]);
  };

  const getFilteredDistricts = (selectedState) => {
    const { district_status } = StateandDistrictList;
    return Object.keys(district_status[selectedState] || {}).filter(district => district_status[selectedState][district]);
  };

  const getAreas = (selectedDistrict) => {
    const { areas } = StateandDistrictList;
    return areas[selectedDistrict] || [];
  };

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen} sx={{ width: "200px", borderRadius: "7px", margin: "10px" }}>
        <AddIcon /> Add Your Interests
      </Button>
    
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: handleSubmit,
        }}
      >
        <DialogTitle>Submit Interests</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ marginBottom: "10px" }}>
            Please select your State, District, and Areas (multiple selection allowed):
          </DialogContentText>
          <FormControl sx={{ width: "100px", margin: "5px 10px" }}>
            <InputLabel>State</InputLabel>
            <Select
              label="state"
              name="state"
              value={formData.state}
              onChange={handleChange}
              fullWidth
            >
              {getFilteredStates().map(state => (
                <MenuItem key={state} value={state}>{state}</MenuItem>
              ))}
            </Select>
          </FormControl>
          {formData.state && (
            <FormControl sx={{ width: "100px", margin: "5px 10px" }}>
              <InputLabel>District</InputLabel>
              <Select
                label="district"
                name="district"
                value={formData.district}
                onChange={handleChange}
                fullWidth
              >
                {getFilteredDistricts(formData.state).map(district => (
                  <MenuItem key={district} value={district}>{district}</MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
          {formData.district && (
            <FormControl sx={{ width: "100px", margin: "5px 10px" }}>
              <InputLabel id="areas-label">Areas</InputLabel>
              <Select
                label="areas"
                id="areas"
                name="areas"
                value={formData.areas}
                onChange={handleChange}
                multiple
                fullWidth
                renderValue={(selected) => selected.join(', ')}
              >
                {getAreas(formData.district).map(area => (
                  <MenuItem key={area.id} value={area.area}>{area.area}</MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Submit</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
