import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Button, List, ListItem, ListItemText, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SubmitIntrests from "../property-components/SubmitIntrests";
import { selectUser } from 'app/store/userSlice';
import { selectmySubscription } from '../PropertySlice1';
import { useSelector } from 'react-redux';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import AddAreasDialoge from '../property-components/AddAreasDialoge';
import GetAppIcon from '@mui/icons-material/GetApp';

const MySubscriptions = () => {
  const StateandDistrictList = useSelector(selectmySubscription);
  const user = useSelector(selectUser);
  const [editingStateIndex, setEditingStateIndex] = useState(null);
  const [editingDistrictName, setEditingDistrictName] = useState(null);
  const [stateData, setStateData] = useState([]);
  const [editingStateData, setEditingStateData] = useState(null);
  const [removedItems, setRemovedItems] = useState([]);

  useEffect(() => {
   
    const transformedStateData = Object.entries(StateandDistrictList.district_status).map(([stateName, districts]) => ({
      name: stateName,
      districts: Object.entries(districts)
        .filter(([districtName, isActive]) => isActive && StateandDistrictList.areas[districtName]?.length > 0)
        .map(([districtName]) => ({
          name: districtName,
          areas: StateandDistrictList.areas[districtName].map(area => area.area)
        }))
    })).filter(state => state.districts.length > 0); 
    setStateData(transformedStateData);
  }, [StateandDistrictList]);

  const handleEditClick = (stateIndex, districtName) => {
    setEditingStateIndex(stateIndex);
    setEditingDistrictName(districtName);
    setEditingStateData({ ...stateData[stateIndex] });
    setRemovedItems([]);
  };

  const handleAddItem = (item) => {
    const updatedItems = [...editingStateData.districts.find(d => d.name === editingDistrictName).areas, item];
    setEditingStateData({
      ...editingStateData,
      districts: editingStateData.districts.map(d =>
        d.name === editingDistrictName ? { ...d, areas: updatedItems } : d
      )
    });
    setRemovedItems(removedItems.filter(i => i !== item));
  };

  const handleRemoveItem = (item) => {
    const updatedItems = editingStateData.districts.find(d => d.name === editingDistrictName).areas.filter(i => i !== item);
    setEditingStateData({
      ...editingStateData,
      districts: editingStateData.districts.map(d =>
        d.name === editingDistrictName ? { ...d, areas: updatedItems } : d
      )
    });
    setRemovedItems([...removedItems, item]);
  };

  const handleSaveChanges = () => {
    const updatedStateData = [...stateData];
    updatedStateData[editingStateIndex] = editingStateData;
    setStateData(updatedStateData);
    setEditingStateIndex(null);
    setEditingDistrictName(null);
    setEditingStateData(null);
    setRemovedItems([]);
  };

  const handleCancelEdit = () => {
    setEditingStateIndex(null);
    setEditingDistrictName(null);
    setEditingStateData(null);
    setRemovedItems([]);
  };

  return (
    <>
      <h1 style={{ margin: "10px" }}>My Subscriptions</h1>
      <hr />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <SubmitIntrests />
        {user.role === "admin" && (
          <div style={{ display: "flex", flexDirection: "column" }}>
            <AddAreasDialoge />
            <Button variant="outlined" onClick={() => {}} sx={{ width: "200px", borderRadius: "7px", margin: "10px" }}>
              <GetAppIcon /> Get latest Areas
            </Button>
          </div>
        )}
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        {stateData.map((stateObj, stateIndex) => (
          <div key={stateIndex} style={{ margin: '10px 20px', width: "100%" }}>
            <Typography variant="h5" component="div">
              {stateObj.name}
            </Typography>
            <div style={{ display: 'flex', overflowX: 'auto', flexWrap: "wrap" }}>
              {stateObj.districts.map((district, districtIndex) => (
                <Card key={districtIndex} style={{ margin: '5px', minWidth: "300px", position: 'relative' }}>
                  <CardContent>
                    <div style={{ display: "flex" }}>
                      <Typography variant="h6" component="div" style={{ marginTop: '5px' }}>
                        {district.name}
                      </Typography>
                      {editingStateIndex === stateIndex && editingDistrictName === district.name && (
                        <IconButton
                          sx={{ position: 'absolute', top: 0, right: 0 }}
                          aria-label="cancel"
                          onClick={handleCancelEdit}
                        >
                          <CloseIcon />
                        </IconButton>
                      )}
                    </div>

                    <hr />
                    <List>
                      {(editingStateIndex === stateIndex && editingDistrictName === district.name ? editingStateData.districts.find(d => d.name === district.name).areas : district.areas).map((item, idx) => (
                        <ListItem key={idx}>
                          <ListItemText primary={item} />
                          {editingStateIndex === stateIndex && editingDistrictName === district.name && (
                            <IconButton edge="end" aria-label="delete" onClick={() => handleRemoveItem(item)}>
                              <DeleteIcon />
                            </IconButton>
                          )}
                        </ListItem>
                      ))}
                    </List>
                    {editingStateIndex === stateIndex && editingDistrictName === district.name && removedItems.length > 0 && (
                      <>
                        <Typography variant="h6">Removed Items</Typography>
                        <List>
                          {removedItems.map((item, idx) => (
                            <ListItem key={idx}>
                              <ListItemText primary={item} />
                              <IconButton edge="end" aria-label="add" onClick={() => handleAddItem(item)}>
                                <AddIcon />
                              </IconButton>
                            </ListItem>
                          ))}
                        </List>
                      </>
                    )}
                    <div style={{ display: "flex", justifyContent: "end" }}>
                      {editingStateIndex === stateIndex && editingDistrictName === district.name ? (
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                          <Button sx={{ borderRadius: "7px", width: "70px", right: "0px" }} variant="contained" color="primary" onClick={handleSaveChanges} fullWidth>
                            Save
                          </Button>
                        </div>
                      ) : (
                        <Button sx={{ borderRadius: "7px", width: "70px", right: "0px" }} variant="contained" color="primary" onClick={() => handleEditClick(stateIndex, district.name)} fullWidth>
                          Edit
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default MySubscriptions;
