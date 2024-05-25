import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch } from 'react-redux';
import { UpdateUser } from 'app/store/userSlice';

export default function UpdateProfile() {
  const [open, setOpen] = React.useState(false);
  const [emptySubmission, setEmptySubmission] = React.useState(false);
  const [formData, setFormData] = React.useState({
    name: '',
    ph_num_1: 0,
    ph_num_2: 0,
    profession: '',
    address: '',
    requirements: '',
  });
  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEmptySubmission(false); 
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    let parsedValue = value;

    
    if (name === 'ph_num_1' || name === 'ph_num_2') {
        parsedValue = parseInt(value, 10); 
        parsedValue = isNaN(parsedValue) ? '' : parsedValue; 
    }

    setFormData((prevData) => ({
        ...prevData,
        [name]: parsedValue,
    }));
};


  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const hasUpdatedFields = Object.values(formData).some(value => value !== '');
    console.log("formData",formData)
    if (hasUpdatedFields) {
      console.log(formData);
      handleClose();
      dispatch(UpdateUser(formData)); 
      setEmptySubmission(true);
    }
  };
  

  return (
    <React.Fragment>
      <Button sx={{marginTop:"20px"}} variant="outlined" onClick={handleClickOpen}>
        Update Profile
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: handleSubmit,
        }}
      >
        <DialogTitle>Update Profile</DialogTitle>
        <DialogContent>
          {emptySubmission && (
            <DialogContentText color="error">
              Please enter at least one field.
            </DialogContentText>
          )}
          <TextField
            autoFocus
            margin="dense"
            id="name"
            name="name"
            label="Name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            id="phone1"
            name="ph_num_1"
            label="Phone 1"
            type='number'
            value={formData.ph_num_1}
            onChange={handleChange}
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            id="phone2"
            name="ph_num_2"
            type='number'
            label="Phone 2"
            value={formData.ph_num_2}
            onChange={handleChange}
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            id="profession"
            name="profession"
            label="Profession"
            value={formData.profession}
            onChange={handleChange}
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            id="address"
            name="address"
            label="Address"
            value={formData.address}
            onChange={handleChange}
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            id="requirements"
            name="requirements"
            label="Requirements"
            value={formData.requirements}
            onChange={handleChange}
            fullWidth
            variant="standard"
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
