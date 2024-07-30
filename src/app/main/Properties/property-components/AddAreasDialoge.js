// import * as React from 'react';
// import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';
// import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import AddIcon from '@mui/icons-material/Add';
// import DialogTitle from '@mui/material/DialogTitle';
// import Select from '@mui/material/Select';
// import MenuItem from '@mui/material/MenuItem';
// import mySubscription from '../../../../assets/Default/area/result.json'
// import { useSelector } from 'react-redux';
// import { selectmySubscription } from '../PropertySlice1';
// import { AddAreas } from '../PropertySlice1';
// import { useDispatch } from 'react-redux';

// const AddAreasDialoge = () => {
//   // const mySubscription = useSelector(selectmySubscription);
//   const dispatch = useDispatch();

//   const [open, setOpen] = React.useState(false);
//   const [state, setState] = React.useState('');
//   const [district, setDistrict] = React.useState('');
//   const [areas, setArea] = React.useState('');

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     const formData = {
//       status:"add",
//       state,
//       district,
//       areas,
//     };
//     dispatch(AddAreas(formData));

//     handleClose();
//   };

//   const handleStateChange = (event) => {
//     setState(event.target.value);
//     setDistrict('');
//   };

  
//   const states = mySubscription?.state_status?.map(stateObj => stateObj?.state);

//   const districts = state ? Object.keys(mySubscription?.district_status[state] || {}) : [];

//   return (
//     <React.Fragment>
//       <Button variant="outlined" onClick={handleClickOpen} sx={{ width: "200px", borderRadius: "7px", margin: "10px" }}>
//         <AddIcon /> Add Areas
//       </Button>
//       <Dialog
//         open={open}
//         onClose={handleClose}
//         PaperProps={{
//           component: 'form',
//           onSubmit: handleSubmit,
//         }}
//       >
//         <DialogTitle>Add Areas</DialogTitle>
//         <DialogContent>

//           <div style={{ display: "flex", justifyContent: "space-between" }}>
//             <Select
//               sx={{ margin: "0px 10px" }}
//               value={state}
//               onChange={handleStateChange}
//               displayEmpty
//               margin="dense"
//             >
//               <MenuItem value="" disabled>Select State</MenuItem>
//               {states?.map((stateName, index) => (
//                 <MenuItem key={index} value={stateName}>{stateName}</MenuItem>
//               ))}
//             </Select>
//             <Select
//               value={district}
//               sx={{ margin: "0px 10px" }}
//               onChange={(e) => setDistrict(e.target.value)}
//               displayEmpty
//               margin="dense"
//               disabled={!state}
//             >
//               <MenuItem value="" disabled>Select District</MenuItem>
//               {districts?.map((districtName, index) => (
//                 <MenuItem key={index} value={districtName}>{districtName}</MenuItem>
//               ))}
//             </Select>
//           </div>
//           <TextField
//             autoFocus
//             required
//             fullWidth
//             margin="dense"
//             id="areas"
//             name="areas"
//             label="Area Names"
//             type="text"
//             variant="standard"
//             value={areas}
//             onChange={(e) => setArea(e.target.value)}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClose}>Cancel</Button>
//           <Button type="submit">Submit</Button>
//         </DialogActions>
//       </Dialog>
//     </React.Fragment>
//   );
// }

// export default AddAreasDialoge;

// import * as React from 'react';
// import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';
// import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import AddIcon from '@mui/icons-material/Add';
// import DialogTitle from '@mui/material/DialogTitle';
// import Select from '@mui/material/Select';
// import MenuItem from '@mui/material/MenuItem';
// import mySubscription from '../../../../assets/Default/area/result.json'
// import { useDispatch } from 'react-redux';
// import { AddAreas } from '../PropertySlice1';

// const AddAreasDialoge = () => {
//   const dispatch = useDispatch();

//   const [open, setOpen] = React.useState(false);
//   const [state, setState] = React.useState('');
//   const [district, setDistrict] = React.useState('');
//   const [areas, setArea] = React.useState('');

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     const formData = {
//       status: "add",
//       state,
//       district,
//       areas,
//     };
//     dispatch(AddAreas(formData));

//     handleClose();
//   };

//   const handleStateChange = (event) => {
//     setState(event.target.value);
//     setDistrict('');
//   };

//   const states = mySubscription?.state_status?.map(stateObj => stateObj?.state).sort();
//   const districts = state ? Object.keys(mySubscription?.district_status[state] || {}).sort() : [];

//   return (
//     <React.Fragment>
//       <Button variant="outlined" onClick={handleClickOpen} sx={{ width: "200px", borderRadius: "7px", margin: "10px" }}>
//         <AddIcon /> Add Areas
//       </Button>
//       <Dialog
//         open={open}
//         onClose={handleClose}
//         PaperProps={{
//           component: 'form',
//           onSubmit: handleSubmit,
//         }}
//       >
//         <DialogTitle>Add Areas</DialogTitle>
//         <DialogContent>
//           <div style={{ display: "flex", justifyContent: "space-between" }}>
//             <Select
//               sx={{ margin: "0px 10px" }}
//               value={state}
//               onChange={handleStateChange}
//               displayEmpty
//               margin="dense"
//             >
//               <MenuItem value="" disabled>Select State</MenuItem>
//               {states?.map((stateName, index) => (
//                 <MenuItem key={index} value={stateName}>{stateName}</MenuItem>
//               ))}
//             </Select>
//             <Select
//               value={district}
//               sx={{ margin: "0px 10px" }}
//               onChange={(e) => setDistrict(e.target.value)}
//               displayEmpty
//               margin="dense"
//               disabled={!state}
//             >
//               <MenuItem value="" disabled>Select District</MenuItem>
//               {districts?.map((districtName, index) => (
//                 <MenuItem key={index} value={districtName}>{districtName}</MenuItem>
//               ))}
//             </Select>
//           </div>
//           <TextField
//             autoFocus
//             required
//             fullWidth
//             margin="dense"
//             id="areas"
//             name="areas"
//             label="Area Names"
//             type="text"
//             variant="standard"
//             value={areas}
//             onChange={(e) => setArea(e.target.value)}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClose}>Cancel</Button>
//           <Button type="submit">Submit</Button>
//         </DialogActions>
//       </Dialog>
//     </React.Fragment>
//   );
// }

// export default AddAreasDialoge;


import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import AddIcon from '@mui/icons-material/Add';
import DialogTitle from '@mui/material/DialogTitle';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import mySubscription from '../../../../assets/Default/area/result.json'
import { useDispatch } from 'react-redux';
import { AddAreas } from '../PropertySlice1';

const AddAreasDialoge = () => {
  const dispatch = useDispatch();

  const [open, setOpen] = React.useState(false);
  const [state, setState] = React.useState('');
  const [district, setDistrict] = React.useState('');
  const [areas, setAreas] = React.useState([]);
  const [areaEnglish, setAreaEnglish] = React.useState('');
  const [areaTelugu, setAreaTelugu] = React.useState('');
  const [areaHindi, setAreaHindi] = React.useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newArea = {
      English: areaEnglish,
      Telugu: areaTelugu,
      Hindi: areaHindi
    };
    const updatedAreas = [...areas, newArea];
    const formData = {
      state,
      district,
      areas: updatedAreas
    };
    console.log(formData); // Log the final data structure
    dispatch(AddAreas(formData));

    handleClose();
  };

  const handleStateChange = (event) => {
    setState(event.target.value);
    setDistrict('');
  };

  const states = mySubscription?.state_status?.map(stateObj => stateObj?.state).sort();
  const districts = state ? Object.keys(mySubscription?.district_status[state] || {}).sort() : [];

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen} sx={{ width: "200px", borderRadius: "7px", margin: "10px" }}>
        <AddIcon /> Add Areas
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
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Select
              sx={{ margin: "0px 10px" }}
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
              sx={{ margin: "0px 10px" }}
              onChange={(e) => setDistrict(e.target.value)}
              displayEmpty
              margin="dense"
              disabled={!state}
            >
              <MenuItem value="" disabled>Select District</MenuItem>
              {districts?.map((districtName, index) => (
                <MenuItem key={index} value={districtName}>{districtName}</MenuItem>
              ))}
            </Select>
          </div>
          <TextField
            autoFocus
            required
            fullWidth
            margin="dense"
            id="areaEnglish"
            name="areaEnglish"
            label="Area Name (English)"
            type="text"
            variant="standard"
            value={areaEnglish}
            onChange={(e) => setAreaEnglish(e.target.value)}
          />
          <TextField
            required
            fullWidth
            margin="dense"
            id="areaTelugu"
            name="areaTelugu"
            label="Area Name (Telugu)"
            type="text"
            variant="standard"
            value={areaTelugu}
            onChange={(e) => setAreaTelugu(e.target.value)}
          />
          <TextField
            required
            fullWidth
            margin="dense"
            id="areaHindi"
            name="areaHindi"
            label="Area Name (Hindi)"
            type="text"
            variant="standard"
            value={areaHindi}
            onChange={(e) => setAreaHindi(e.target.value)}
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

