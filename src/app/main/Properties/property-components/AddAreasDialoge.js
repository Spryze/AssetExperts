import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import AddIcon from '@mui/icons-material/Add';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useSelector } from 'react-redux';
import { selectmySubscription } from '../PropertySlice1';
import { useDispatch } from 'react-redux';

const AddAreasDialoge = () => {
  const mySubscription = useSelector(selectmySubscription);
  console.log("mySubscription",mySubscription)
  const [open, setOpen] = React.useState(false);
  const [state, setState] = React.useState('');
  const [district, setDistrict] = React.useState('');
  const [area, setArea] = React.useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = {
      state,
      district,
      area,
    };
    console.log(formData);
    // Submit formData to the backend here
    handleClose();
  };

  const handleStateChange = (event) => {
    setState(event.target.value);
    setDistrict(''); 
  };

  const states = mySubscription?.states?.map(sub => sub?.name);
  const districts = state ? mySubscription?.states.find(sub => sub.name === state)?.district : {};

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}sx={{ width: "200px", borderRadius: "7px" ,margin:"10px"}}>
      <AddIcon/> Add Areas
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: handleSubmit,
        }}
      >
        <DialogTitle>Add Areas</DialogTitle>
        <DialogContent>
          {/* <DialogContentText>
            To add new areas, please select the state, district, and enter the area names.
          </DialogContentText> */}
          <div style={{display:"flex",justifyContent:"space-between"}}>
          <Select
          sx={{margin:"0px 10px"}}
            value={state}
            onChange={handleStateChange}
            displayEmpty

            margin="dense"
          >
            <MenuItem value="" disabled>Select State</MenuItem>
            {states?.map((stateName, index) => (
              <MenuItem key={index} value={stateName}>{stateName}</MenuItem>
            ))}
          </Select>
          <Select
            value={district}
            sx={{margin:"0px 10px"}}
            onChange={(e) => setDistrict(e.target.value)}
            displayEmpty
            margin="dense"
            disabled={!state}
          >
            <MenuItem value="" disabled>Select District</MenuItem>
            {Object.keys(districts)?.map((districtName, index) => (
              <MenuItem key={index} value={districtName}>{districtName}</MenuItem>
            ))}
          </Select>
          </div>
          <TextField
            autoFocus
            required
            fullWidth
            margin="dense"
            id="area"
            name="area"
            label="Area Names"
            type="text"
            variant="standard"
            value={area}
            onChange={(e) => setArea(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Submit</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default AddAreasDialoge;
