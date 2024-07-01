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
import { AddIntrests, GetMyIntrests } from "../PropertySlice1";
import { useDispatch } from "react-redux";
import StateandDistrictList from "../../../../assets/Default/area/result.json";

export default function FormDialog() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const [formData, setFormData] = useState({
    // status: "add",
    // state: "",
    // district: "",
    // areas: [],
  });
  console.log('formData',formData )

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
  console.log("allAreasId",allAreasId);

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
    let selectedAreas = [];

    if (value.some(id => allAreasId.includes(id))) {
      console.log("hii");
      const lastSelectedId = value[value.length - 1];
      selectedAreas = [lastSelectedId];
      console.log("latest selectedAreas", selectedAreas);
    }
     else {
      console.log("hii2")
      selectedAreas = typeof value === "string" ? value.split(",") : value;
      selectedAreas = selectedAreas.filter((id) => id !== "All Areas");
    }
    console.log("selectedAreas", selectedAreas);
    setFormData({
      ...formData,
      areas: selectedAreas,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newAreas = formData.areas.filter(
      (area) => !previouslySelectedAreas.includes(area)
    );
    const deletedAreas = previouslySelectedAreas.filter(
      (area) => !formData.areas.includes(area)
    );

    const dataToSend = [
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
    ];
    dispatch(AddIntrests(dataToSend));
    console.log("dataToSend",dataToSend);
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
