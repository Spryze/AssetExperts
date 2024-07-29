import React from 'react';
import AddAreasDialoge from '../property-components/AddAreasDialoge';
// import AddAreasDialoge from "../property-components/AddAreasDialoge";
import GetAppIcon from "@mui/icons-material/GetApp";
import { Button } from '@mui/material';
import { GetUpdatedJson } from '../PropertySlice1';
import { useDispatch } from 'react-redux';
const ManageAreas = () => {
  const dispatch = useDispatch();
  return (
    <div>
    
    <div style={{ display: "flex", flexDirection: "column" }}>
    <AddAreasDialoge />
    <Button
      variant="outlined"
      onClick={() => {dispatch(GetUpdatedJson())}}
      sx={{ width: "200px", borderRadius: "7px", margin: "10px" }}
    >
      <GetAppIcon /> Get latest Areas
    </Button>
  </div>
    </div>
  )
}

export default ManageAreas