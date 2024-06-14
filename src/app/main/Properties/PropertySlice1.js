// code for backup before adding Conditional storing of state

// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";
// import { getAuth } from "firebase/auth";

// export const fetchProperties = createAsyncThunk(
//   'property/fetchProperty',
//   async (property_id, { rejectWithValue }) => {
//     try {
//       const url = `https://bac7a5b1-026f-4c31-bb25-b6456ef4b56d-00-1doj8z5pfhdie.sisko.replit.dev/property_ind?prop_id=${property_id}`;

//       const response = await axios.get(url);

//       if (response.status !== 200) {
//         throw new Error('Property data not received');
//       }

//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// export const fetchRecentTransactions = createAsyncThunk(
//   'property/fetchRecentTransactions',
//   async () => {
//     try {
//       const response = await axios.get("https://bac7a5b1-026f-4c31-bb25-b6456ef4b56d-00-1doj8z5pfhdie.sisko.replit.dev/home");
//       const transactions = response.data.property.buy_properties.concat(response.data.property.sell_properties);
//       return transactions;

//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// export const SearchResults = createAsyncThunk(
//   'property/SearchResults',
//   async ({ formData, offset, isAdminSearch,PropertyState }, { rejectWithValue, fulfillWithValue, }) => {
//     console.log("formData, offset,isAdminSearch",formData, offset,isAdminSearch)
//     try {
//       const user = JSON.parse(localStorage.getItem('user'));
//       const req_by = user.uid;

//       console.log('formData', formData);

//       const Data = {
//         req_by: req_by,
//         offset: offset,
//         body: formData,
//       };
//       console.log("formdata going to backend",Data)
//       const response = await axios.post(
//         'https://bac7a5b1-026f-4c31-bb25-b6456ef4b56d-00-1doj8z5pfhdie.sisko.replit.dev/search',
//         Data,
//         {
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         }
//       );

//       if (response.status !== 200) {
//         throw new Error('Failed to fetch search results');
//       }

//       // console.log('response', response.data);
//       // return fulfillWithValue({
//       //   properties: response.data.property,
//       //   totalProperties: response.data.total_properties
//       // });
//       const payload = {
//         properties: response.data.property,
//         totalProperties: response.data.total_properties
//       };

//       if (isAdminSearch) {
//         return fulfillWithValue(payload);
//       } else {
//         return fulfillWithValue(payload);
//       }
//     } catch (error) {
//       console.error('Error in SearchResults Thunk:', error.response?.data || error.message);
//       // Use rejectWithValue to indicate a failed response
//       return rejectWithValue(error.response?.data || error.message);
//     }
//   }
// );

// export const addProperty = createAsyncThunk(
//   'property/addProperty',
//   async (formData, { rejectWithValue }) => {
//     try {
//       const user = JSON.parse(localStorage.getItem("user"));
//       if (!user) throw new Error("User not found in local storage");

//       const cont_user_id = user.uid;
//       console.log("user.uid",user.uid)
//       const data = { ...formData, cont_user_id };

//       console.log(data);

//       const response = await axios.post("https://bac7a5b1-026f-4c31-bb25-b6456ef4b56d-00-1doj8z5pfhdie.sisko.replit.dev/property", data);
//       console.log("response", response);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );
// export const updateProperty = createAsyncThunk(
//   'property/updateProperty',
//   async ({ formData, p_id }, { rejectWithValue }) => {

//     try {
//       console.log("hii")
//       const user = JSON.parse(localStorage.getItem("user"));
//       if (!user) throw new Error("User not found in local storage");

//       // const user_id = user.uid;
//       const req_user_id = user.uid;
//       const data = { ...formData,req_user_id, p_id };

//       console.log(data);

//       const response = await axios.put(
//         "https://bac7a5b1-026f-4c31-bb25-b6456ef4b56d-00-1doj8z5pfhdie.sisko.replit.dev/property",
//         data,
//         // {
//         //   headers: {
//         //     'Content-Type': 'multipart/form-data'
//         //   }
//         // }
//       );
//       console.log("response", response);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   });

// export const AddImage = createAsyncThunk(
//   'property/AddImage',
//   async (formData) => {
//     const response = await axios.post('https://bac7a5b1-026f-4c31-bb25-b6456ef4b56d-00-1doj8z5pfhdie.sisko.replit.dev/image', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data'
//         }
//       });

//       // Handle response
//       console.log('Response:', response);

//       if (response.status === 201) {

//         window.alert('Upload successful');
//       } else {
//         throw new Error('Image Upload failed');
//       }
//   }
// );

// const initialState = {
//   properties: [],
//   recentTransactions:[],
//   normalSearchResults: [],
//   adminSearchResults: [],

// };

// const propertySlice = createSlice({
//   name: 'property',
//   initialState,
//   reducers: {

//     setProperties(state, action) {
//       state.properties[action.payload?.data?.property?.property_id] = action.payload;
//       console.log

//     },
//     // propertySearch(state,action){
//     //   state.searchResults = action.payload
//     // },

//     setError(state, action) {
//       state.status = 'failed';
//       state.error = action.payload;
//     },

//     resetStatus(state) {
//       state.status = 'idle';
//       state.error = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder

//     .addCase(SearchResults.fulfilled, (state, action) => {
//       if (action.meta.arg.isAdminSearch) {
//         state.adminSearchResults = [...state.adminSearchResults, ...action.payload.properties];
//       } else {
//         state.normalSearchResults = [...state.normalSearchResults, ...action.payload.properties];
//       }
//       state.totalProperties = action.payload.totalProperties;
//     })

//       .addCase(fetchProperties.fulfilled, (state, action) => {
//         state.properties = action.payload
//       })

//       .addCase(fetchRecentTransactions.fulfilled, (state, action) => {
//         state.recentTransactions = [...state.recentTransactions, ...action.payload];
//       })

//   },

// });

// // export const { setProperties} = propertySlice.actions;
// export const { setProperties, propertySearch, setError, resetStatus } = propertySlice.actions;
// export const selectProperties = (state) => state.properties.properties;
// export const selectRecentTransactions =(state)=> state.properties.recentTransactions;
// // export const selectSearchResults = (state)=>state.properties.searchResults;
// export const selectNormalSearchResults = (state) => state.properties.normalSearchResults;
// export const selectAdminSearchResults = (state) => state.properties.adminSearchResults;
// export const totalProperties = (state)=>state.properties.totalProperties;
// export const selectPropertyStatus = (state) => state.property.status;
// export const selectPropertyError = (state) => state.property.error;
// export default propertySlice.reducer;

// code after adding conditional state storing of new search property and existing property
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const selectPropertyById = (state, property_id) =>
  state.properties.properties.find(
    (property) => property.property_id === property_id
  );

// Thunks
// export const fetchProperties = createAsyncThunk(
//   "property/fetchProperty",
//   async (property_id, { getState, rejectWithValue }) => {
//     const state = getState();
//     console.log("PropertyState", state);
//     const existingProperty = selectPropertyById(state, property_id);

//     if (existingProperty) {
//       console.log("existingProperty", existingProperty);
//       return existingProperty;
//     }

//     try {
//       const url = `https://bac7a5b1-026f-4c31-bb25-b6456ef4b56d-00-1doj8z5pfhdie.sisko.replit.dev/property_ind?prop_id=${property_id}`;
//       const response = await axios.get(url);
//       console.log("response");
//       if (response.status !== 200) {
//         throw new Error("Property data not received");
//       }

//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );
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

      const url = `https://bac7a5b1-026f-4c31-bb25-b6456ef4b56d-00-1doj8z5pfhdie.sisko.replit.dev/property_ind?prop_id=${propertyId}`;
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
// export const fetchProperties = createAsyncThunk(
//   'property/fetchProperty',
//   async (propertyid, { rejectWithValue, getState }) => {
//     console.log(propertyid)
//     try {
//         const state = getState();
//         console.log("state.properties.adminSearchResults", state.properties.adminSearchResults);

//         const existingProperty = state.properties.adminSearchResults.find((property) => {
//           console.log(property.property_id);
//           return property.property_id == propertyid;
//       });

//         if (existingProperty) {
//             console.log("Property found:", existingProperty);
//             return existingProperty;
//         } else {
//             console.log("Property not found");
//             return rejectWithValue("Property not found");
//         }
//     } catch (error) {
//         console.error("Error occurred while searching for the property:", error);
//         return rejectWithValue(error.message);
//     }
// }

// );

export const fetchRecentTransactions = createAsyncThunk(
  "property/fetchRecentTransactions",
  async (arg, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "https://bac7a5b1-026f-4c31-bb25-b6456ef4b56d-00-1doj8z5pfhdie.sisko.replit.dev/home"
      );
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
      const user = JSON.parse(localStorage.getItem("user"));
      const req_by = user.uid;

      const Data = {
        req_by: req_by,
        offset: offset,
        body: formData,
      };

      const response = await axios.post(
        "https://bac7a5b1-026f-4c31-bb25-b6456ef4b56d-00-1doj8z5pfhdie.sisko.replit.dev/search",
        Data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status !== 200) {
        throw new Error("Failed to fetch search results");
      }

      const payload = {
        properties: response.data.property,
        totalProperties: response.data.total_properties,
        PropertyState: PropertyState,
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

      const response = await axios.post(
        "https://bac7a5b1-026f-4c31-bb25-b6456ef4b56d-00-1doj8z5pfhdie.sisko.replit.dev/search",
        Data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

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

      const response = await axios.post(
        "https://bac7a5b1-026f-4c31-bb25-b6456ef4b56d-00-1doj8z5pfhdie.sisko.replit.dev/property",
        data
      );
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

      const response = await axios.put(
        "https://bac7a5b1-026f-4c31-bb25-b6456ef4b56d-00-1doj8z5pfhdie.sisko.replit.dev/property",
        data
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const AddImage = createAsyncThunk(
  "property/AddImage",
  async (formData) => {
    const response = await axios.post(
      "https://bac7a5b1-026f-4c31-bb25-b6456ef4b56d-00-1doj8z5pfhdie.sisko.replit.dev/image",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

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
  extraReducers: (builder) => {
    builder
      .addCase(SearchResults.fulfilled, (state, action) => {
        const { properties, totalProperties, PropertyState } = action.payload;
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
export default propertySlice.reducer;
