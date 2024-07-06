import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  Checkbox,
  IconButton,
  Container,
  Grid
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import SubmitIntrests from "../property-components/SubmitIntrests";
import { useSelector, useDispatch } from "react-redux";
import {
  AddIntrests,
  GetMyIntrests,
  selectmySubscription,
} from "../PropertySlice1";
import AreaJson from "../../../../assets/Default/area/result.json";
import { Code } from "@mui/icons-material";

const MySubscriptions = () => {
  const [stateData, setStateData] = useState([]);
  const Subscription = useSelector(selectmySubscription);
  const [editingStateIndex, setEditingStateIndex] = useState(null);
  const [editingDistrictName, setEditingDistrictName] = useState(null);
  const [editingDistrictData, setEditingDistrictData] = useState(null);
  const [removedItems, setRemovedItems] = useState([]);
  const [addedItems, setAddedItems] = useState([]);
  const [previousAreas, setPreviousAreas] = useState([]);
  const [seeMore, setSeeMore] = useState({});
  const dispatch = useDispatch();

  const processInterests = (interestedAreas) => {
    const districtAreasMap = {};
    interestedAreas?.forEach((item) => {
      if (!districtAreasMap[item.district]) {
        districtAreasMap[item.district] = [];
      }
      districtAreasMap[item.district].push(item.area);
    });

    const stateDistrictMap = {};
    Object.entries(AreaJson.district_status).forEach(
      ([stateName, districts]) => {
        const stateDistricts = [];
        Object.keys(districts).forEach((districtName) => {
          if (districtAreasMap[districtName]) {
            const areas = districtAreasMap[districtName];
            if (areas.includes("All Areas")) {
              const allAreas = AreaJson.areas[districtName].map(
                (area) => area.area
              );
              stateDistricts.push({
                name: districtName,
                areas: allAreas,
              });
            } else {
              stateDistricts.push({
                name: districtName,
                areas,
              });
            }
          }
        });
        if (stateDistricts.length > 0) {
          stateDistrictMap[stateName] = stateDistricts;
        }
      }
    );

    setStateData(
      Object.entries(stateDistrictMap).map(([stateName, districts]) => ({
        stateName,
        districts,
      }))
    );
  };

  useEffect(() => {
    dispatch(GetMyIntrests()).then((response) => {
      if (response.payload) {
        const interestedAreas = response.payload?.data?.interested_areas;
        console.log(interestedAreas);
        processInterests(interestedAreas);
      }
    });
  }, [dispatch]);

  useEffect(() => {
    if (Subscription) {
      console.log(Subscription);
      processInterests(Subscription);
    }
  }, [Subscription]);

  const handleEditClick = (stateIndex, districtName) => {
    setEditingStateIndex(stateIndex);
    setEditingDistrictName(districtName);
    const districtData = stateData[stateIndex].districts.find(
      (district) => district.name === districtName
    );
    setEditingDistrictData({ ...districtData });
    setRemovedItems([]);
    setAddedItems([]);
    setPreviousAreas([...districtData.areas]);
  };

  const handleAddItem = (item) => {
    if (item === "All Areas") {
      setEditingDistrictData({
        ...editingDistrictData,
        areas: ["All Areas"],
      });
      setRemovedItems(
        editingDistrictData.areas.filter((i) => i !== "All Areas")
      );
      setAddedItems(["All Areas"]);
    } else {
      const updatedItems = [...editingDistrictData.areas, item];
      setEditingDistrictData({
        ...editingDistrictData,
        areas: updatedItems,
      });
      setRemovedItems(removedItems.filter((i) => i !== item));
      setAddedItems([...addedItems, item]);
    }
  };

  const handleRemoveItem = (item) => {
    if (item === "All Areas") {
      setEditingDistrictData({
        ...editingDistrictData,
        areas: [],
      });
      setRemovedItems(["All Areas"]);
      setAddedItems([]);
    } else {
      const updatedItems = editingDistrictData.areas.filter((i) => i !== item);
      setEditingDistrictData({
        ...editingDistrictData,
        areas: updatedItems,
      });
      setRemovedItems([...removedItems, item]);
      setAddedItems(addedItems.filter((i) => i !== item));
    }
  };

  const handleItemClick = (item) => {
    if (item === "All Areas") {
      if (editingDistrictData.areas.includes(item)) {
        handleRemoveItem(item);
      } else {
        handleAddItem(item);
      }
    } else {
      if (editingDistrictData.areas.includes(item)) {
        handleRemoveItem(item);
      } else {
        handleAddItem(item);
      }
    }
  };

  const mapAreasToIds = (areas, districtName) => {
    const areaMap = AreaJson.areas[districtName];
    return areas
      .map((areaName) => {
        const area = areaMap.find((area) => area.area === areaName);
        return area ? area.id : null;
      })
      .filter((id) => id !== null);
  };

  const handleSaveChanges = () => {
    const updatedStateData = [...stateData];
    const districtIndex = updatedStateData[
      editingStateIndex
    ].districts.findIndex((district) => district.name === editingDistrictName);
    updatedStateData[editingStateIndex].districts[districtIndex] =
      editingDistrictData;
    setStateData(updatedStateData);
    setEditingStateIndex(null);
    setEditingDistrictName(null);
    setEditingDistrictData(null);
    setRemovedItems([]);
    setAddedItems([]);
    setPreviousAreas([]);

    const removedAreaIds = mapAreasToIds(removedItems, editingDistrictName);
    const addedAreaIds = mapAreasToIds(addedItems, editingDistrictName);

    if (removedAreaIds.length > 0 || addedAreaIds.length > 0) {
      const body = [
        {
          areas: removedAreaIds,
          status: "delete",
        },
        {
          areas: addedAreaIds,
          status: "add",
          district: editingDistrictName,
        },
      ];

      dispatch(AddIntrests(body)).then((response) => {
        console.log(response);
      });
    }
  };

  const handleCancelEdit = () => {
    setEditingStateIndex(null);
    setEditingDistrictName(null);
    setEditingDistrictData(null);
    setRemovedItems([]);
    setAddedItems([]);
    setPreviousAreas([]);
  };

  const getAllAreasForDistrict = (districtName) => {
    return AreaJson.areas[districtName].map((area) => area.area);
  };

  const sortItemsAlphabetically = (items) => {
    return [...items].sort((a, b) => a.localeCompare(b));
  };

  const handleToggleSeeMore = (districtIndex) => {
    setSeeMore((prev) => ({
      ...prev,
      [districtIndex]: !prev[districtIndex],
    }));
  };

  return (
    <Container>
      <h1 style={{ margin: "10px" }}>My Subscriptions</h1>
      <hr />
      {/* <div style={{ display: "flex", justifyContent: "space-between" }}>

      </div> */}
      <Grid container spacing={1}>
      <Grid item md={4} sm = {12} sx={{marginTop:"30px"}} >
        <SubmitIntrests  />
        </Grid>
        <Grid item md={8} sm = {12}>
        {stateData.map((stateObj, stateIndex) => (
          <div key={stateIndex} style={{ margin: "20px", width: "100%" }}>
            <hr />
            <div style={{ display: "flex",flexWrap:"wrap" }}>
              {stateObj.districts.map((districtObj, districtIndex) => {
                const isEditing =
                  editingStateIndex === stateIndex &&
                  editingDistrictName === districtObj.name;
                const items = isEditing
                  ? getAllAreasForDistrict(districtObj.name)
                  : districtObj.areas;
                const selectedItems = items.filter((item) =>
                  editingDistrictData?.areas.includes(item)
                );
                const unselectedItems = items.filter(
                  (item) => !editingDistrictData?.areas.includes(item)
                );
                const sortedSelectedItems =
                  sortItemsAlphabetically(selectedItems);
                const sortedUnselectedItems =
                  sortItemsAlphabetically(unselectedItems);
                const allItems = [
                  ...sortedSelectedItems,
                  ...sortedUnselectedItems,
                ];
                const itemsToShow = seeMore[districtIndex] || isEditing
                  ? allItems
                  : allItems.slice(0, 5);

                return (
                  <Card
                    key={districtIndex}
                    style={{
                      margin: "10px",
                      minWidth: "300px",
                      position: "relative",
                    }}
                  >
                    <CardContent>
                      <Typography
                        variant="h6"
                        component="div"
                        // style={{ marginBottom: "10px" }}
                      >
                        {stateObj.stateName}
                      </Typography>
                      <div style={{ display: "flex" }}>
                        <Typography
                          sx={{ fontSize: "20px", fontWeight: "600" }}
                          component="div"
                        >
                          {districtObj.name}
                        </Typography>
                        {isEditing ? (
                          <IconButton
                            sx={{ position: "absolute", top: 0, right: 0 }}
                            aria-label="cancel"
                            onClick={handleCancelEdit}
                          >
                            <CloseIcon />
                          </IconButton>
                        ) : (
                          <IconButton
                            sx={{ position: "absolute", top: 40, right: 0 }}
                            aria-label="edit"
                            onClick={() =>
                              handleEditClick(stateIndex, districtObj.name)
                            }
                          >
                            <EditIcon />
                          </IconButton>
                        )}
                      </div>
                      <hr />
                      <List>
                        {itemsToShow.map((item, idx) => (
                          <ListItem key={idx} sx={{padding:"0px"}}>
                            <ListItemText primary={item} />
                            {isEditing && (
                              <Checkbox
                                edge="end"
                                checked={editingDistrictData.areas.includes(
                                  item
                                )}
                                onChange={() => handleItemClick(item)}
                                disabled={
                                  editingDistrictData.areas.includes(
                                    "All Areas"
                                  ) && item !== "All Areas"
                                }
                              />
                            )}
                          </ListItem>
                        ))}
                      </List>
                      {!isEditing && allItems.length > 10 && (
                        <Button
                          onClick={() => handleToggleSeeMore(districtIndex)}
                        >
                          {seeMore[districtIndex] ? "See Less" : "See More"}
                        </Button>
                      )}
                      {isEditing && (
                        <div style={{ display: "flex", justifyContent: "end" }}>
                          <Button
                            sx={{
                              borderRadius: "7px",
                              width: "70px",
                              left: "0px",
                            }}
                            variant="contained"
                            // color="primary"
                            onClick={handleSaveChanges}
                            fullWidth
                          >
                            Save
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        ))}
         </Grid>
        </Grid>
      
    </Container>
  );
};

export default MySubscriptions;



//Jagadeesh Code

// import React, { useState, useEffect} from "react";
// import {
//   Card,
//   CardContent,
//   Typography,
//   Button,
//   List,
//   ListItem,
//   ListItemText,
//   Checkbox,
//   IconButton,
//   Divider
// } from "@mui/material";
// import CloseIcon from "@mui/icons-material/Close";
// import EditIcon from "@mui/icons-material/Edit";
// import SubmitIntrests from "../property-components/SubmitIntrests";
// import { useSelector, useDispatch } from "react-redux";
// import { AddIntrests, GetMyIntrests, selectmySubscription } from "../PropertySlice1";
// import AreaJson from "../../../../assets/Default/area/result.json";

// const MySubscriptions = (params) => {
//   const {userid,showContent } = params;
//   console.log("user id",userid)
  
//   const [stateData, setStateData] = useState([]);
//   const Subscription = useSelector(selectmySubscription);
//   const [editingStateIndex, setEditingStateIndex] = useState(null);
//   const [editingDistrictName, setEditingDistrictName] = useState(null);
//   const [editingDistrictData, setEditingDistrictData] = useState(null);
//   const [removedItems, setRemovedItems] = useState([]);
//   const [addedItems, setAddedItems] = useState([]);
//   const [previousAreas, setPreviousAreas] = useState([]);
//   const [seeMore, setSeeMore] = useState({});
//   const dispatch = useDispatch();
//   const isadmin = true;

//   const processInterests = (interestedAreas) => {
//     const districtAreasMap = {};
//     interestedAreas?.forEach((item) => {
//       if (!districtAreasMap[item.district]) {
//         districtAreasMap[item.district] = [];
//       }
//       districtAreasMap[item.district].push(item.area);
//     });

//     const stateDistrictMap = {};
//     Object.entries(AreaJson.district_status).forEach(([stateName, districts]) => {
//       const stateDistricts = [];
//       Object.keys(districts).forEach((districtName) => {
//         if (districtAreasMap[districtName]) {
//           const areas = districtAreasMap[districtName];
//           if (areas.includes("All Areas")) {
//             const allAreas = AreaJson.areas[districtName].map(area => area.area);
//             stateDistricts.push({
//               name: districtName,
//               areas: allAreas,
//             });
//           } else {
//             stateDistricts.push({
//               name: districtName,
//               areas,
//             });
//           }
//         }
//       });
//       if (stateDistricts.length > 0) {
//         stateDistrictMap[stateName] = stateDistricts;
//       }
//     });

//     setStateData(Object.entries(stateDistrictMap).map(([stateName, districts]) => ({
//       stateName,
//       districts,
//     })));
//   };

//   useEffect(() => {
//     console.log("userid")
    
//     dispatch(GetMyIntrests({userid,isadmin})).then((response) => {
//       if (response.payload) {
//         const interestedAreas = response.payload?.data?.interested_areas;
//         console.log(interestedAreas);
//         processInterests(interestedAreas);
//       }
//     });
  
//   }, [dispatch, userid]);

//   useEffect(() => {
//     if (Subscription) {
//       console.log(Subscription)
//       processInterests(Subscription);
//     }
//   }, [Subscription]);

//   const handleEditClick = (stateIndex, districtName) => {
//     setEditingStateIndex(stateIndex);
//     setEditingDistrictName(districtName);
//     const districtData = stateData[stateIndex].districts.find(
//       (district) => district.name === districtName
//     );
//     setEditingDistrictData({ ...districtData });
//     setRemovedItems([]);
//     setAddedItems([]);
//     setPreviousAreas([...districtData.areas]); 
//   };

//   const handleAddItem = (item) => {
//     if (item === "All Areas") {
//       setEditingDistrictData({
//         ...editingDistrictData,
//         areas: ["All Areas"],
//       });
//       setRemovedItems(editingDistrictData.areas.filter((i) => i !== "All Areas"));
//       setAddedItems(["All Areas"]);
//     } else {
//       const updatedItems = [...editingDistrictData.areas, item];
//       setEditingDistrictData({
//         ...editingDistrictData,
//         areas: updatedItems,
//       });
//       setRemovedItems(removedItems.filter((i) => i !== item));
//       setAddedItems([...addedItems, item]);
//     }
//   };

//   const handleRemoveItem = (item) => {
//     if (item === "All Areas") {
//       setEditingDistrictData({
//         ...editingDistrictData,
//         areas: [],
//       });
//       setRemovedItems(["All Areas"]);
//       setAddedItems([]);
//     } else {
//       const updatedItems = editingDistrictData.areas.filter((i) => i !== item);
//       setEditingDistrictData({
//         ...editingDistrictData,
//         areas: updatedItems,
//       });
//       setRemovedItems([...removedItems, item]);
//       setAddedItems(addedItems.filter((i) => i !== item));
//     }
//   };

//   const handleItemClick = (item) => {
//     if (item === "All Areas") {
//       if (editingDistrictData.areas.includes(item)) {
//         handleRemoveItem(item);
//       } else {
//         handleAddItem(item);
//       }
//     } else {
//       if (editingDistrictData.areas.includes(item)) {
//         handleRemoveItem(item);
//       } else {
//         handleAddItem(item);
//       }
//     }
//   };

//   const mapAreasToIds = (areas, districtName) => {
//     const areaMap = AreaJson.areas[districtName];
//     return areas.map(areaName => {
//       const area = areaMap.find(area => area.area === areaName);
//       return area ? area.id : null;
//     }).filter(id => id !== null);
//   };

//   const handleSaveChanges = () => {
//     const updatedStateData = [...stateData];
//     const districtIndex = updatedStateData[editingStateIndex].districts.findIndex(
//       (district) => district.name === editingDistrictName
//     );
//     updatedStateData[editingStateIndex].districts[districtIndex] = editingDistrictData;
//     setStateData(updatedStateData);
//     setEditingStateIndex(null);
//     setEditingDistrictName(null);
//     setEditingDistrictData(null);
//     setRemovedItems([]);
//     setAddedItems([]);
//     setPreviousAreas([]);

//     const removedAreaIds = mapAreasToIds(removedItems, editingDistrictName);
//     const addedAreaIds = mapAreasToIds(addedItems, editingDistrictName);

//     if (removedAreaIds.length > 0 || addedAreaIds.length > 0) {
//       const body = [
//         {
//           areas: removedAreaIds,
//           status: "delete",
//         },
//         {
//           areas: addedAreaIds,
//           status: "add",
//           district: editingDistrictName,
//         },
//       ];
//       console.log("userId was in the My Subscripction",userId);
//       const uid = userId;
//       dispatch(AddIntrests({ uid, isadmin, body })).then((response) => {
//         console.log(response);
        
//         console.log(isadmin);
//       });
//     }
//   };

//   const handleCancelEdit = () => {
//     setEditingStateIndex(null);
//     setEditingDistrictName(null);
//     setEditingDistrictData(null);
//     setRemovedItems([]);
//     setAddedItems([]);
//     setPreviousAreas([]);
//   };

//   const getAllAreasForDistrict = (districtName) => {
//     return AreaJson.areas[districtName].map((area) => area.area);
//   };

//   const sortItemsAlphabetically = (items) => {
//     return [...items].sort((a, b) => a.localeCompare(b));
//   };

//   const handleToggleSeeMore = (districtIndex) => {
//     setSeeMore((prev) => ({
//       ...prev,
//       [districtIndex]: !prev[districtIndex],
//     }));
//   };

//   return (
    
//     <>
//     {showContent && (
//       <>
//       <h1 style={{ margin: "10px" }}>My Subscriptions</h1>
//       <hr />
//       </>
//     )}
//       <div style={{ display: "flex", justifyContent: "space-between" }}>
//         <SubmitIntrests user_id={userid}/>
//       </div>
//       <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
//         {stateData.map((stateObj, stateIndex) => (
//           <div key={stateIndex} style={{ margin: "20px", width: "100%" }}>
//             <Typography variant="h6" component="div" style={{ marginBottom: "10px" }}>
//               {stateObj.stateName}
//             </Typography>
//             <hr />
//             <div style={{ display: "flex" }}>
//               {stateObj.districts.map((districtObj, districtIndex) => (
//                 <Card
//                   key={districtIndex}
//                   style={{ margin: "10px", minWidth: "300px", position: "relative" }}
//                 >
//                   <CardContent>
//                     <div style={{ display: "flex" }}>
//                       <Typography sx={{ fontSize: "20px", fontWeight: "600" }} component="div">
//                         {districtObj.name}
//                       </Typography>
//                       {editingStateIndex === stateIndex &&
//                         editingDistrictName === districtObj.name && (
//                           <IconButton
//                             sx={{ position: "absolute", top: 0, right: 0 }}
//                             aria-label="cancel"
//                             onClick={handleCancelEdit}
//                           >
//                             <CloseIcon />
//                           </IconButton>
//                         )}
//                       {!(editingStateIndex === stateIndex && editingDistrictName === districtObj.name) && (
//                         <IconButton
//                           sx={{ position: "absolute", top: 0, right: 0 }}
//                           aria-label="edit"
//                           onClick={() => handleEditClick(stateIndex, districtObj.name)}
//                         >
//                           <EditIcon />
//                         </IconButton>
//                       )}
//                     </div>
//                     <hr />
//                     <List>
//                       {(() => {
//                         const items = editingStateIndex === stateIndex &&
//                           editingDistrictName === districtObj.name
//                           ? getAllAreasForDistrict(districtObj.name)
//                           : districtObj.areas;
//                         const selectedItems = items.filter(item =>
//                           editingDistrictData?.areas.includes(item)
//                         );
//                         const unselectedItems = items.filter(item =>
//                           !editingDistrictData?.areas.includes(item)
//                         );
//                         const sortedSelectedItems = sortItemsAlphabetically(selectedItems);
//                         const sortedUnselectedItems = sortItemsAlphabetically(unselectedItems);
//                         return (
//                           <>
//                             {sortedSelectedItems.map((item, idx) => (
//                               <ListItem key={idx}>
//                                 <ListItemText primary={item} />
//                                 {editingStateIndex === stateIndex &&
//                                   editingDistrictName === districtObj.name && (
//                                     <Checkbox
//                                       edge="end"
//                                       checked={editingDistrictData.areas.includes(item)}
//                                       onChange={() => handleItemClick(item)}
//                                       disabled={editingDistrictData.areas.includes("All Areas") && item !== "All Areas"}
//                                     />
//                                   )}
//                               </ListItem>
//                             ))}
//                             {sortedSelectedItems.length > 0 && sortedUnselectedItems.length > 0 && (
//                               <Divider />
//                             )}
//                             {sortedUnselectedItems.map((item, idx) => (
//                               <ListItem key={idx}>
//                                 <ListItemText primary={item} />
//                                 {editingStateIndex === stateIndex &&
//                                   editingDistrictName === districtObj.name && (
//                                     <Checkbox
//                                       edge="end"
//                                       checked={editingDistrictData.areas.includes(item)}
//                                       onChange={() => handleItemClick(item)}
//                                       disabled={editingDistrictData.areas.includes("All Areas") && item !== "All Areas"}
//                                     />
//                                   )}
//                               </ListItem>
//                             ))}
//                           </>
//                         );
//                       })()}
//                     </List>
//                     {editingStateIndex === stateIndex &&
//                       editingDistrictName === districtObj.name && (
//                         <div style={{ display: "flex", justifyContent: "end" }}>
//                           <Button
//                             sx={{ borderRadius: "7px", width: "70px", right: "0px" }}
//                             variant="contained"
//                             // color="primary"
//                             onClick={handleSaveChanges}
//                             fullWidth
//                           >
//                             Save
//                         </Button>
//                       </div>
//                     )}
//                   </CardContent>
//                 </Card>
//               ))}
//             </div>
//           </div>
//         ))}
//       </div>
//     </>
//   );
// };
                            

// export default MySubscriptions;