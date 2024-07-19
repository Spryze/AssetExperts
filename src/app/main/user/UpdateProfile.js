// import * as React from 'react';
// import { useState } from 'react';
// import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';
// import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
// import DialogTitle from '@mui/material/DialogTitle';
// import { useDispatch } from 'react-redux';
// import { UpdateUser } from 'app/store/userSlice';
// import { selectUser } from 'app/store/userSlice';
// import { useSelector } from 'react-redux';

// export default function UpdateProfile() {
//   const UserData = useSelector(selectUser); 
//   console.log('UserData',UserData)
//   const [open, setOpen] = useState(false);
//   const [emptySubmission, setEmptySubmission] = useState(false);
//   const [formData, setFormData] = useState({
//     name: UserData?.data?.displayName,
//     ph_num_1: UserData?.data?.phone_num_1,
//     ph_num_2: UserData?.data?.phone_num_2,
//     profession: UserData?.data?.profession,
//     address: UserData?.data?.address,
//     requirements: UserData?.data?.requirements,
//   });
//   const dispatch = useDispatch();

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//     setEmptySubmission(false); 
//   };

//   // const handleChange = (event) => {
//   //   const { name, value } = event.target;
//   //   let parsedValue = value;

//   //   // Convert phone number fields to integer
//   //   if (name === 'ph_num_1' || name === 'ph_num_2') {
//   //     parsedValue = parseInt(value, 10);
//   //     parsedValue = isNaN(parsedValue) ? '' : parsedValue;
//   //   }

//   //   setFormData((prevData) => ({
//   //     ...prevData,
//   //     [name]: parsedValue,
//   //   }));
//   // };

//   const handleChange = (event) => {
//   const { name, value } = event.target;
//   let parsedValue = value;

//   // Convert phone number fields to integer with a length check
//   if (name === 'ph_num_1' || name === 'ph_num_2') {
//     if (value.length > 10) {
//       // If the length exceeds 10, ignore the input or show a warning
//       return; // You can also show an error message if needed
//     }
//     parsedValue = parseInt(value, 10);
//     parsedValue = isNaN(parsedValue) ? '' : parsedValue;
//   }

//   setFormData((prevData) => ({
//     ...prevData,
//     [name]: parsedValue,
//   }));
// };


// const handleSubmit = async (event) => {
//   event.preventDefault();

//   // Convert formData to a plain object
//   const formDataObject = {};
//   console.log(formData)
//   // formData.forEach((value, key) => {
//   //     formDataObject[key] = value;
//   // });

//   // Check if at least one field is filled
//   // const hasUpdatedFields = Object.values(formDataObject).some(value => value !== '' && value !== 0);

//   // if (hasUpdatedFields) {
//       // Use the findDifferences function to get updated fields
//       const updatedFields = findDifferences(formData, UserData.data);
      
//       // Only dispatch if there are updated fields
//       if (Object.keys(updatedFields).length > 0) {
//           console.log("Sending updated fields:", updatedFields);
//           dispatch(UpdateUser(updatedFields)).then((response) => {
//               console.log("response", response);
//               if (response.payload.status === "success") {
//                   handleClose();
//                   // Optionally refresh or perform additional actions
//               }
//           });
//       }
//   // } else {
//   //     setEmptySubmission(true); 
//   // }
// };

// // Example findDifferences function
// function findDifferences(formData, userData) {
//   const differences = {};
//   const formDataObject = {};
  
//   formData.forEach((value, key) => {
//       formDataObject[key] = value;
//   });

//   for (const key in userData) {
//       if (userData.hasOwnProperty(key)) {
//           const formValue = formDataObject[key];
//           const userValue = userData[key];

//           if (formValue !== userValue) {
//               differences[key] = { formData: formValue, userData: userValue };
//           }
//       }
//   }

//   return differences;
// }


//   return (
//     <React.Fragment>
//       <Button sx={{ margin: "20px 0px" }} variant="outlined" onClick={handleClickOpen}>
//         Update Profile
//       </Button>
//       <Dialog
//         open={open}
//         onClose={handleClose}
//         PaperProps={{
//           component: 'form',
//           onSubmit: handleSubmit,
//         }}
//       >
//         <DialogTitle>Update Profile</DialogTitle>
//         <DialogContent>
//           {emptySubmission && (
//             <DialogContentText color="error">
//               Please enter at least one field.
//             </DialogContentText>
//           )}
//           <TextField
//             autoFocus
//             margin="dense"
//             id="name"
//             name="name"
//             label="Name"
//             value={formData.name}
//             onChange={handleChange}
//             fullWidth
//             variant="standard"
//           />
//           <TextField
//             margin="dense"
//             id="phone1"
//             name="ph_num_1"
//             label="Phone 1"
//             type='number'
//             value={formData.ph_num_1}
//             onChange={handleChange}
//             fullWidth
//             variant="standard"
//           />
//           <TextField
//             margin="dense"
//             id="phone2"
//             name="ph_num_2"
//             type='number'
//             label="Phone 2"
//             value={formData.ph_num_2}
//             onChange={handleChange}
//             fullWidth
//             variant="standard"
//           />
//           <TextField
//             margin="dense"
//             id="profession"
//             name="profession"
//             label="Profession"
//             value={formData.profession}
//             onChange={handleChange}
//             fullWidth
//             variant="standard"
//           />
//           <TextField
//             margin="dense"
//             id="address"
//             name="address"
//             label="Address"
//             value={formData.address}
//             onChange={handleChange}
//             fullWidth
//             variant="standard"
//           />
//           <TextField
//             margin="dense"
//             id="requirements"
//             name="requirements"
//             label="Requirements"
//             value={formData.requirements}
//             onChange={handleChange}
//             fullWidth
//             variant="standard"
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClose}>Cancel</Button>
//           <Button variant='contained' type="submit">Submit</Button>
//         </DialogActions>
//       </Dialog>
//     </React.Fragment>
//   );
// }


import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch, useSelector } from 'react-redux';
import { UpdateUser, selectUser } from 'app/store/userSlice';

export default function UpdateProfile() {
  const Userdata = useSelector(selectUser);
  const UserData = Userdata.data;
  const [open, setOpen] = useState(false);
  const [emptySubmission, setEmptySubmission] = useState(false);
  const [formData, setFormData] = useState({
    name: UserData?.displayName || '',
    ph_num_1: UserData?.phone_num_1 || '',
    ph_num_2: UserData?.phone_num_2 || '',
    profession: UserData?.profession || '',
    address: UserData?.address || '',
    requirements: UserData?.requirements || '',
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

    // Restrict phone number length to 10
    if ((name === 'ph_num_1' || name === 'ph_num_2') && value.length > 10) {
      return;
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const updatedFields = findDifferences(formData, UserData);

    if (Object.keys(updatedFields).length > 0) {
      console.log("Sending updated fields:", updatedFields);
      const response = await dispatch(UpdateUser(updatedFields));
      console.log("response", response);
      if (response.payload.status === "success") {
        handleClose();
        // Optionally refresh or perform additional actions
      }
    } else {
      setEmptySubmission(true);
    }
  };

  function findDifferences(formData, userData) {
    const differences = {};

    for (const key in formData) {
      if (formData.hasOwnProperty(key) && formData[key] !== userData[key]) {
        differences[key] = formData[key];
      }
    }

    return differences;
  }

  return (
    <React.Fragment>
      <Button sx={{ margin: "20px 0px" }} variant="outlined" onClick={handleClickOpen}>
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
            type='tel'
            value={formData.ph_num_1}
            onChange={handleChange}
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            id="phone2"
            name="ph_num_2"
            type='tel'
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
          <Button variant='contained' type="submit">Submit</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

