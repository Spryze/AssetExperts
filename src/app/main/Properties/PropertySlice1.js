import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Statesdata from "../../../assets/Default/area/result.json";
import { showMessage } from "app/store/rabit/messageSlice";
import BaseUrl from "app/configs/BaseUrl";


const getUserIdFromLocalStorage = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user
};
// plot flat thunk function
export const CardsClick = createAsyncThunk(
  "property/CardsClick",
  // async ({ formData, offset }, { rejectWithValue, fulfillWithValue }) => {
  async ({ formData, offset }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const req_by = user.uid;

      const Data = {
        req_by: req_by,
        offset: offset,
        body: formData,
      };
      console.log("Data", Data);
      const response = await axios.post(`${BaseUrl}/search`, Data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      // console.log("Data", Data);
      // const response = await axios.post(`${BaseUrl}/search`, Data, {
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // });

      if (response.status !== 200) {
        throw new Error("Failed to fetch search results");
      }
      if (response?.data.property.length === 0) {
        showMessage("No Results Found");
      }
      // if (response?.data.property.length === 0) {
      //   showMessage("No Results Found");
      // }

      const payload = {
        properties: response.data.property,
        // totalProperties: response.data.total_properties,
        // PropertyState: PropertyState,
        // isAdminSearch: isAdminSearch
      };

      // if (isAdminSearch === "local") {
      //   return payload;
      // }
      // if (isAdminSearch) {
      //   return fulfillWithValue(payload);
      // } else {
      //   return fulfillWithValue(payload);
      // }
      // return payload;
      return payload;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const selectPropertyById = (state, property_id) =>
  state.properties.properties.find(
    (property) => property.property_id === property_id
  );




  

//  my intrests thunk function
export const AddIntrests = createAsyncThunk(
  "property/AddIntrests",
  async (params, { rejectWithValue }) => {
    console.log("params:", params);

    const { user_id, req_user_id, isadmin, body } = params;
    console.log("this is the user id in addintrest:", user_id);
    console.log("this is the user id in req_user_id:", req_user_id);
    
    try {
      let userIdToUse = user_id;

      if (userIdToUse && isadmin) {
        userIdToUse = user_id;
        console.log("user_id being used:", userIdToUse);
      } else {
        userIdToUse = req_user_id;
      }

      const Data = {
        user_id: userIdToUse,
        req_user_id,
        body,
      };
     
      console.log("Data:", Data);
      console.log("Data to be sent:", JSON.stringify(Data));
      const response = await axios.put(`${BaseUrl}/register`, Data);
      console.log("Response:", response);
      const isDifferentUser = userIdToUse !== req_user_id;
      return { response: response.data, isDifferentUser};
      // return response;
    } catch (error) {
      console.error("Error in AddIntrests:", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// export const AddIntrests = createAsyncThunk(
//   "property/AddIntrests",
//   async (params, { rejectWithValue }) => {
//     console.log('params ', params);
//     const { body, isadmin, user_id } = params;
// console.log("body, isadmin, user_id",body, isadmin)
// console.log("this is the uid log so keep:",user_id);
//     try {
//       let user_id;

//       console.log("this was the user_id log :",user_id)
    
//       if (user_id) {
//         console.log("this was the  Uid in the condiction so check this:",user_id);
//          user_id = user_id;
     
//       } else {
//         // Fall back to user_id from local storage
//         const user = JSON.parse(localStorage.getItem("user"));
//         if (!user || !user.uid) throw new Error("User ID not found in local storage");
//         user_id = user.uid;
//       }
//       console.log('type of user id ', typeof(user_id));
//       // Construct the Data object
//       const Data = {
//         user_id,
//          body,
//       };

//       console.log("Data",Data)

//       const response = await axios.put(`${BaseUrl}/register`, Data, {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });
//       console.log("Response:", response);
//       return response.data;  // Return the actual data from the response
//     } catch (error) {
//       console.error("Error in AddIntrests:", error);
//       return rejectWithValue(error.response?.data || error.message);
//     }
//   }
// );



export const GetUpdatedJson = createAsyncThunk(
  "property/GetUpdatedJson",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BaseUrl}/getfile`, { responseType: "blob" });

      const url = URL.createObjectURL(response.data);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "data.json");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      console.log("response of download json",response)
      return response.data;
      
    } catch (error) {
      const errorMessage = JSON.stringify(
        error.response?.data || error.message,
        null,
        2
      );
      const blob = new Blob([errorMessage], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "error.json");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
// export const GetUpdatedJson = createAsyncThunk(
export const GetMyIntrests = createAsyncThunk(
  "property/GetMyIntrests",
  async ({ uid, isAdmin }, { rejectWithValue }) => {
    console.log("{uid, isadmin}", uid, isAdmin);
    try {
      // const user = JSON.parse(localStorage.getItem("user"));
      // if (!user || !user.uid) throw new Error("User ID not found in local storage");
      // const myuserId = user.uid;
      let user_id;
      if (uid && isAdmin) {
        console.log("isAdmin",isAdmin)
        
        user_id = uid;
        console.log("userid is set from uid")
      } else {
        console.log("hii")
        const user = JSON.parse(localStorage.getItem("user"));
        console.log("is the data:",user)
        user_id = user.uid;
        if (!user_id) throw new Error("User ID not found in local storage");
      }

      const response = await axios.get(
        `${BaseUrl}/register?user_id=${user_id}`
      );
      console.log("response of get my interest", response);
      // return response;
      const isDifferentUser = isAdmin;
      console.log("admin or not",isDifferentUser)
      return { response: response.data, isDifferentUser };
      // return (response);
    } catch (error) {
      console.error('Error in GetMyIntrests:', error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
export const DeleteIntrests = createAsyncThunk(
  "property/DeleteIntrests",
  async (formData, { rejectWithValue }) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const user_id = user.uid;
      console.log(formData);
      const Data = {
        user_id: user_id,
        body: formData,
      };
      const response = await axios.post("", Data);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// export const PostUserCallRequest = createAsyncThunk(
//   "property/PostUserCallRequest",
//   async (formData, { rejectWithValue }) => {
//     try {
//       // const user = JSON.parse(localStorage.getItem("user"));
//       // const user_id = user.uid;

//       // const Data = {
//       // user_id :  user_id ,
//       // userData,
//       // };
//       console.log("formData", formData);
//       const response = await axios.post(`${BaseUrl}/help`, formData);
//       console.log(response);
//       return response;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );
export const PostUserCallRequest = createAsyncThunk(
  "property/PostUserCallRequest",
  async (formData, { rejectWithValue }) => {
    try {
      // const user = JSON.parse(localStorage.getItem("user"));
      // const user_id = user.uid;

      // const Data = {
      // user_id :  user_id ,
      // userData,
      // };
      console.log("formData in PostUserCallRequest", formData);
      const response = await axios.post(`${BaseUrl}/help`, formData);
      console.log(response);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const AddAreas = createAsyncThunk(
  "property/AddAreas",
  async (formData, { rejectWithValue }) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const user_id = user.uid;

      const Data = {
        user_id: user_id,
        body: formData,
      };
      console.log(Data);
      const response = await axios.post(
        `${BaseUrl}/register?user_id=${user_id}`,
        Data
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchProperties = createAsyncThunk(
  "property/fetchProperty",
  async (propertyId, { rejectWithValue, getState }) => {
    console.log("property_id", propertyId);
    try {
      const state = getState();

      console.log(
        "state.properties.adminSearchResults",
        state.properties.adminSearchResults
      );

      const existingProperty = state.properties.adminSearchResults.find(
        (property) => property.property_id == propertyId
      );
      console.log("existingProperty", existingProperty);

      if (existingProperty) {
        const Data = {
          data: {
            images: existingProperty.prop_images,
            property: existingProperty,
          },

          // recent_properties: existingProperty.recent_properties,
          // recomended_prop: existingProperty.recomended_prop,
        };
        return Data;
      }

      const url = `${BaseUrl}/property_ind?prop_id=${propertyId}`;
      {
        console.log("server is getting called");
      }
      const response = await axios.get(url);

      if (response.status !== 200) {
        throw new Error("Property data not received");
      }
      console.log("response.data", response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);

export const fetchRecentTransactions = createAsyncThunk(
  "property/fetchRecentTransactions",
  async (arg, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BaseUrl}/home`);
      // const response = await axios.get(`${BaseUrl}/home`);
      const transactions = response.data.property.buy_properties.concat(
        response.data.property.sell_properties
      );
      return transactions;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const SearchResults = createAsyncThunk(
  "property/SearchResults",
  async (
    { formData, offset, isAdminSearch, PropertyState },
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      console.log("hii")
      const user = JSON.parse(localStorage.getItem("user"));
      const req_by = user.uid;
console.log("hii")
      const Data = {
        req_by: req_by,
        offset: offset,
        body: formData,
      };

      // const response = await axios.post(`${BaseUrl}/search`, Data, {
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // });
      const response = await axios.post(`${BaseUrl}/search`, Data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("search response",response)

      if (response.status !== 200) {
        throw new Error("Failed to fetch search results");
      }
      if (response?.data.property.length === 0) {
        showMessage("No Results Found");
      }
      if (response?.data.property.length === 0) {
        showMessage("No Results Found");
      }

      const payload = {
        properties: response.data.property,
        totalProperties: response.data.total_properties,
        PropertyState: PropertyState,
        isAdminSearch: isAdminSearch,
        isAdminSearch: isAdminSearch,
      };

      if (isAdminSearch === "local") {
        return payload;
      }
      if (isAdminSearch) {
        return fulfillWithValue(payload);
      } else {
        return fulfillWithValue(payload);
      }
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
export const LocalResults = createAsyncThunk(
  "property/LocalResults",
  async (
    { formData, offset, isAdminSearch, PropertyState },
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const req_by = user.uid;

      const Data = {
        req_by: req_by,
        offset: offset,
        body: formData,
      };

      const response = await axios.post(`${BaseUrl}/search`, Data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      // const response = await axios.post(`${BaseUrl}/search`, Data, {
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // });

      if (response.status !== 200) {
        throw new Error("Failed to fetch search results");
      }

      const payload = {
        properties: response.data.property,
        totalProperties: response.data.total_properties,
        PropertyState: PropertyState,
      };

      return fulfillWithValue(payload);
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const addProperty = createAsyncThunk(
  "property/addProperty",
  async (formData, { rejectWithValue }) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) throw new Error("User not found in local storage");

      const cont_user_id = user.uid;
      const data = { ...formData, cont_user_id };

      const response = await axios.post(`${BaseUrl}/property`, data);
      // const response = await axios.post(`${BaseUrl}/property`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateProperty = createAsyncThunk(
  "property/updateProperty",
  async ({ formData, p_id }, { rejectWithValue }) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) throw new Error("User not found in local storage");

      const req_user_id = user.uid;
      const data = { ...formData, req_user_id, p_id };
      console.log("update data", data);
      console.log("update data", data);

      const response = await axios.put(`${BaseUrl}/property`, data);
      // const response = await axios.put(`${BaseUrl}/property`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const AddImage = createAsyncThunk(
  "property/AddImage",
  async (formData) => {
    const response = await axios.post(`${BaseUrl}/image`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    // const response = await axios.post(`${BaseUrl}/image`, formData, {
    //   headers: {
    //     "Content-Type": "multipart/form-data",
    //   },
    // });

    if (response.status === 201) {
      window.alert("Upload successful");
    } else {
      throw new Error("Image Upload failed");
    }
  }
);

// Initial State
const initialState = {
  properties: [],
  localResults: [],
  recentTransactions: [],
  normalSearchResults: [],
  adminSearchResults: [],
  mySubscription: [],
  manageUserSubscription: [],
  paymentDetails: [],
  // UpdatepaymentDetails: [],
  admintotalProperties: "0",
  normaltotalResults: "0",
  status: "idle",
  error: null,
};

// Slice
const propertySlice = createSlice({
  name: "property",
  initialState,
  reducers: {
    setProperties(state, action) {
      const propertyIndex = state.properties.findIndex(
        (property) => property.property_id === action.payload.property_id
      );
      if (propertyIndex !== -1) {
        state.properties[propertyIndex] = action.payload;
      } else {
        state.properties.push(action.payload);
      }
    },
    setError(state, action) {
      state.status = "failed";
      state.error = action.payload;
    },
    resetStatus(state) {
      state.status = "idle";
      state.error = null;
    },
  },
  // extraReducers: (builder) => {
  extraReducers: (builder) => {
    builder
      .addCase(SearchResults.fulfilled, (state, action) => {
        // const { properties, totalProperties, PropertyState, isAdminSearch } =
        //   action.payload;
        const { properties, totalProperties, PropertyState, isAdminSearch } =
          action.payload;
        if (action.meta.arg.isAdminSearch) {
          if (PropertyState === "ExistingProperty") {
            state.adminSearchResults = [
              ...state.adminSearchResults,
              ...properties,
            ];
          } else {
            state.adminSearchResults = properties;
            state.admintotalProperties = totalProperties;
          }
        } else {
          if (PropertyState === "ExistingProperty") {
            state.normalSearchResults = [
              ...state.normalSearchResults,
              ...properties,
            ];
          } else {
            state.normalSearchResults = properties;
            state.normaltotalResults = totalProperties;
          }
        }
      })
      // .addCase(fetchProperties.fulfilled, (state, action) => {
      //   const propertyIndex = state.properties.findIndex(
      //     (property) => property.property_id === action.payload.property_id
      //   );
      //   if (propertyIndex !== -1) {
      //     state.properties[propertyIndex] = action.payload;
      //   } else {
      //     state.properties.push(action.payload);
      //   }
      // })
      .addCase(fetchProperties.fulfilled, (state, action) => {
        state.properties = action.payload;
      })
      // .addCase(postPaymentDetailsAdd.fulfilled, (state, action) => {
      //   state.status = 'succeeded';
      //   state.paymentDetails = action.payload;
      // })
      // .addCase(putPaymentDetailsUpdate.fulfilled, (state, action) => {
      //   state.status = 'succeeded';
      //   state.paymentDetails = action.payload;
      // })
      .addCase(AddIntrests.fulfilled, (state, action) => {
        const { response, isDifferentUser } = action.payload;
        if (isDifferentUser) {
          state.manageUserSubscription = response.interested_areas;
        } else {
          state.mySubscription = response.interested_areas;
        }
      })
      .addCase(GetMyIntrests.fulfilled, (state, action) => {
        const { response, isDifferentUser } = action.payload;
        if (isDifferentUser) {
          state.manageUserSubscription = response.interested_areas;
        } else {
          state.mySubscription = response.interested_areas;
        }
      })
      .addCase(fetchRecentTransactions.fulfilled, (state, action) => {
        state.recentTransactions = [
          ...state.recentTransactions,
          ...action.payload,
        ];
      });
  },
});

// Actions and Selectors
export const { setProperties, setError, resetStatus } = propertySlice.actions;
export const selectProperties = (state) => state.properties.properties;
export const selectRecentTransactions = (state) =>
  state.properties.recentTransactions;
export const selectNormalSearchResults = (state) =>
  state.properties.normalSearchResults;
export const selectAdminSearchResults = (state) =>
  state.properties.adminSearchResults;
export const selectadmintotalProperties = (state) =>
  state.properties.admintotalProperties;
export const selectnormaltotalResults = (state) =>
  state.properties.normaltotalResults;
export const selectPropertyStatus = (state) => state.properties.status;
export const selectPropertyError = (state) => state.properties.error;
export const selectmySubscription = (state) => state.properties.mySubscription;
export const selectManageUserSubscription = (state) => state.properties.manageUserSubscription;
export const selectManageUserpaymentDetails = (state) => state.properties.paymentDetails;

export default propertySlice.reducer;
