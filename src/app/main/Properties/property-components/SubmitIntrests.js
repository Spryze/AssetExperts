import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  Card,
  ListItemText,
  OutlinedInput,
  Divider,
} from "@mui/material";
import { AddAreaIntrests, GetMyIntrests } from "../PropertySlice1";
import { useDispatch } from "react-redux";
import StateandDistrictList from "../../../../assets/Default/area/result.json";
import { useSelector } from "react-redux";
import { selectUser } from "app/store/userSlice";

export default function FormDialog(userId) {
  console.log("this was the Submit formDialog",userId)
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const user = useSelector(selectUser);
  const [errorMessage, setErrorMessage] = useState('');
  console.log('user in submit inyrest',user)

  const [formData, setFormData] = useState({
    // status: "add",
    // state: "",
    // district: "",
    // areas: [],
  });


  const [districtAreasMap, setDistrictAreasMap] = useState({});
  const [previouslySelectedAreas, setPreviouslySelectedAreas] = useState([]);

  const getAllAreasIds = (data) => {
    const allAreasIds = [];

    for (const district in data.areas) {
      const areas = data.areas[district];
      for (const area of areas) {
        if (area.area === "All Areas") {
          allAreasIds.push(area.id);
        }
      }
    }

    return allAreasIds;
  };

  const allAreasId = getAllAreasIds(StateandDistrictList);
  console.log("allAreasId", allAreasId);

  useEffect(() => {
    dispatch(GetMyIntrests()).then((response) => {
      if (response.payload) {
        const interestedAreas = response.payload.data.interested_areas;
        const districtAreas = {};
        interestedAreas.forEach((item) => {
          if (!districtAreas[item.district]) {
            districtAreas[item.district] = [];
          }
          districtAreas[item.district].push(item.area);
        });
        setDistrictAreasMap(districtAreas);
      }
    });
  }, [dispatch]);

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
      [name]: value,
    });

    if (name === "district") {
      const userAreas = districtAreasMap[value] || [];
      const areaIds = getAreas(value)
        .filter((area) => userAreas.includes(area.area))
        .map((area) => area.id);
      setFormData((prevFormData) => ({
        ...prevFormData,
        areas: areaIds,
      }));
      setPreviouslySelectedAreas(areaIds);
    }
  };

  const handleAreasChange = (event) => {
    const { value } = event.target;
    console.log("value", value);
    
    let selectedAreas = []; // Assuming you might use this later
    
    console.log("All Area Ids", allAreasId);
    
    // Check if any element of allAreasId is present in value
    const anyInValue = allAreasId.some(id => value.includes(id));
    console.log("anyInValue", anyInValue);
    
    if (anyInValue && user?.data?.active_notifications === 0) {
      setErrorMessage('Please subscribe to select this option.');
      setTimeout(() => {
        setErrorMessage('');
      }, 3000);
      return;
    }
    

    if (user.data.active_notifications === 0 && value.length > 10) {
      setErrorMessage('Please subscribe to select more options.');
      setTimeout(() => {
        setErrorMessage('');
      }, 3000);
      return;
    }

    setErrorMessage('');

    if (value.some((id) => allAreasId.includes(id))) {
      console.log("hii");
      const lastSelectedId = value[value.length - 1];
      selectedAreas = [lastSelectedId];
      console.log("latest selectedAreas", selectedAreas);
    } else {
      console.log("hii2");
      selectedAreas = typeof value === "string" ? value.split(",") : value;
      selectedAreas = selectedAreas.filter((id) => id !== "All Areas");
    }
    console.log("selectedAreas", selectedAreas);
    setFormData({
      ...formData,
      areas: selectedAreas,
    });
  };

  const handleSubmit = async (event) => {
    console.log("hii")
    console.log("submit interest", userId);
    event.preventDefault();

    const newAreas = formData.areas.filter(
      (area) => !previouslySelectedAreas.includes(area)
    );
    const deletedAreas = previouslySelectedAreas.filter(
      (area) => !formData.areas.includes(area)
    );

    // const uid = userId.user_id;
    const user_id = userId.user_id;
    // console.log("uid was the submit file",uid);
    // console.log("userId was the submit file",userId);
    // console.log("user_id was the submit file",user_id);
    console.log(userId)
    const dataToSend = {
      // user_id,
      // isadmin: true,
      body: [
        {
          district: formData.district,
          status: "add",
          areas: newAreas,
        },
        {
          district: formData.district,
          status: "delete",
          areas: deletedAreas,
        },
      ],
    };
    console.log("dataToSend", dataToSend);
    console.log("User ID being passed:", userId);

    // await dispatch(AddIntrests({body:dataToSend} ));
    // dispatch(AddIntrests({ userId, isadmin: true, body: dataToSend }));
    dispatch(AddAreaIntrests(dataToSend));
    console.log("dataToSend", dataToSend);
    console.log("user is was pass or not will be :", userId);

    handleClose();
  };

  const getFilteredStates = () => {
    return StateandDistrictList.state_status
      .filter((stateObj) => stateObj.status)
      .map((stateObj) => stateObj.state);
  };

  const getFilteredDistricts = (selectedState) => {
    const { district_status } = StateandDistrictList;
    return Object.keys(district_status[selectedState] || {}).filter(
      (district) => district_status[selectedState][district]
    );
  };

  const getAreas = (selectedDistrict) => {
    const { areas } = StateandDistrictList;
    return areas[selectedDistrict] || [];
  };
 
  const separateSelectedAndUnselected = (areas, selectedIds) => {

    const selected = areas.filter((area) => selectedIds.includes(area.id));
    const unselected = areas.filter((area) => !selectedIds.includes(area.id));
    return { selected, unselected };
  };

  const { selected, unselected } = separateSelectedAndUnselected(
    getAreas(formData.district),
    formData.areas
  );
  console.log(" selected, unselected", selected, unselected)

  return (
    <React.Fragment>
      <Card
        variant="outlined"
        onClick={handleClickOpen}
        sx={{
          minWidth: "300px",
          minHeight:"300px",
          display:"flex",
          justifyContent:"center",
          alignItems:"center",
          cursor:"pointer"
          }}
      >
        <AddIcon /> Add Your Interests
      </Card>

      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: handleSubmit,
        }}
      >
        <DialogTitle>Submit Interests</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ marginBottom: "10px" }}>
            Please select your State, District, and Areas (multiple selection
            allowed):
          </DialogContentText>
          {errorMessage && (<p style={{ color: 'red' }}>{errorMessage}</p>)}
          <FormControl fullWidth sx={{ margin: "5px 10px" }}>
            <InputLabel>State</InputLabel>
            <Select
              label="state"
              name="state"
              value={formData.state}
              onChange={handleChange}
              fullWidth
            >
              {getFilteredStates().map((state) => (
                <MenuItem key={state} value={state}>
                  {state}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {formData.state && (
            <FormControl fullWidth sx={{ margin: "5px 10px" }}>
              <InputLabel>District</InputLabel>
              <Select
                label="district"
                name="district"
                value={formData.district}
                onChange={handleChange}
                fullWidth
              >
                {getFilteredDistricts(formData.state).map((district) => (
                  <MenuItem key={district} value={district}>
                    {district}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
          {formData.district && (
            <FormControl fullWidth sx={{ margin: "5px 10px" }}>
              <InputLabel id="areas-label">Areas</InputLabel>
              <Select
                label="areas"
                id="areas"
                name="areas"
                multiple
                value={formData.areas}
                onChange={handleAreasChange}
                input={<OutlinedInput label="Areas" />}
                renderValue={(selected) =>
                  selected
                    .map((id) => {
                      const area = getAreas(formData.district).find(
                        (area) => area.id === id
                      );
                      return area ? area.area : "";
                    })
                    .join(", ")
                }
                disabled={formData.areas.includes(allAreasId)}
                MenuProps={{
                  anchorOrigin: {
                    vertical: "bottom",
                    horizontal: "left",
                  },
                  transformOrigin: {
                    vertical: "top",
                    horizontal: "left",
                  },
                  getContentAnchorEl: null,
                  PaperProps: {
                    style: {
                      maxHeight: 224,
                      width: 250,
                    },
                  },
                }}
              >
                {selected.map((area) => (
                  <MenuItem key={area.id} value={area.id}>
                    <Checkbox checked={formData.areas.indexOf(area.id) > -1} />
                    <ListItemText primary={area.area} />
                  </MenuItem>
                ))}
                {selected.length > 0 && unselected.length > 0 && <Divider />}
                {unselected.map((area) => (
                  <MenuItem key={area.id} value={area.id}>
                    <Checkbox checked={formData.areas.indexOf(area.id) > -1} />
                    <ListItemText primary={area.area} />
                  </MenuItem>
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
