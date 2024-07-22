import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import qs from 'qs';
import { showMessage } from "app/store/rabit/messageSlice";
import BaseUrl from "app/configs/BaseUrl";

const getUserIdFromLocalStorage = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user;
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
  async (dataToSend, { rejectWithValue }) => {
    console.log(dataToSend);
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const user_id = user.uid;
      const req_user_id = user.uid

      const Data = {
        user_id: user_id,
        body: dataToSend,
        req_user_id : req_user_id,
      };
      console.log("Data", Data);
      const response = await axios.put(`${BaseUrl}/register`, Data);
      console.log("responseo of add intresrs", response);
      return response;
    } catch (error) {
      console.log("error in Adding Intrests",error)
      return rejectWithValue(error.response.data);
    }
  }
);
export const AddAreaIntrests = createAsyncThunk(
  "property/AddIntrests",
  async (dataToSend, { rejectWithValue }) => {
    console.log(dataToSend);
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const user_id = user.uid;
      const req_user_id = user.uid

      const Data = {
        user_id: user_id,
        body: dataToSend.body,
        req_user_id : req_user_id,
      };
      console.log("Data", Data);
      const response = await axios.put(`${BaseUrl}/register`, Data);
      console.log("responseo of add intresrs", response);
      return response;
    } catch (error) {
      console.log("error in Adding Intrests",error)
      return rejectWithValue(error.response.data);
    }
  }
);
export const GetUpdatedJson = createAsyncThunk(
  "property/GetUpdatedJson",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BaseUrl}/getfile`, {
        responseType: "blob",
      });

      const url = URL.createObjectURL(response.data);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "data.json");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      console.log("response of download json", response);
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
export const GetMyIntrests = createAsyncThunk(
  "property/GetMyIntrests",
  async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const user_id = user.uid;
      const response = await axios.get(
        `${BaseUrl}/register?user_id=${user_id}`
      );
      console.log("response from getmyIntrest", response);
      return response;
    } catch (error) {}
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

//jagadeesh code

// export const AddIntrests = createAsyncThunk(
//   "property/AddIntrests",
//   async (params, { rejectWithValue }) => {
//     console.log("Body:", body);
//     console.log("userIds in the Add intrests:", userId);
//     const {  userId, isadmin, body } = params;

//     try {
//       let user_id;

//       // Prioritize userId if provided and isadmin is true
//       if (isadmin) {
//         user_id = userId;
//         console.log("what is the user Ids :",userId)
//         console.log("what is the user data :",user_id)

//       } else {
//         // Fall back to user_id from local storage
//         const user = JSON.parse(localStorage.getItem("user"));
//         if (!user || !user.uid) throw new Error("User ID not found in local storage");
//         user_id = user.uid;
//       }

//       // Construct the Data object
//       // const Data = { user_id, ...body };
//       const Data = {
//         user_id :user_id ,

//         body,
//       };

//       console.log("Data:", Data);
//       console.log("Data to be sent:", JSON.stringify(Data));
//       const response = await axios.put(`${BaseUrl}/register`, Data);
//       console.log("Response:", response);
//       return response;
//     } catch (error) {
//       console.error("Error in AddIntrests:", error);
//       return rejectWithValue(error.response?.data || error.message);
//     }
//   }
// // );
// export const AddIntrests = createAsyncThunk(
//   "property/AddIntrests",
//   async (params, { rejectWithValue }) => {
//     console.log('params ', params);
//     const { body, isadmin, user_id } = params;
// console.log("body, isadmin, user_id",body, isadmin)
// console.log("this is the uid log so keep:",user_id);
//     try {
//       let user_ids;

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

// export const GetUpdatedJson = createAsyncThunk(
//   "property/GetUpdatedJson",
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await axios.get(`${BaseUrl}/getfile`, { responseType: "blob" });

//       const url = URL.createObjectURL(response.data);
//       const link = document.createElement("a");
//       link.href = url;
//       link.setAttribute("download", "data.json");
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//       URL.revokeObjectURL(url);
//       console.log("response of download json",response)
//       return response.data;

//     } catch (error) {
//       const errorMessage = JSON.stringify(
//         error.response?.data || error.message,
//         null,
//         2
//       );
//       const blob = new Blob([errorMessage], { type: "application/json" });
//       const url = URL.createObjectURL(blob);
//       const link = document.createElement("a");
//       link.href = url;
//       link.setAttribute("download", "error.json");
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//       URL.revokeObjectURL(url);

//       return rejectWithValue(error.response?.data || error.message);
//     }
//   }
// );
// // export const GetUpdatedJson = createAsyncThunk(
// export const GetMyIntrests = createAsyncThunk(
//   "property/GetMyIntrests",
//   async ({ userId, isadmin }, { rejectWithValue }) => {
//     console.log("{userId, isadmin}", userId, isadmin);
//     try {
//       let user_id;
//       if (userId) {
//         console.log(isadmin)
//         user_id = userId;
//       } else {
//         console.log("hii")
//         const user = JSON.parse(localStorage.getItem("user"));
//         console.log("is the data:",user)
//         user_id = user.uid;
//         if (!user_id) throw new Error("User ID not found in local storage");
//       }

//       const response = await axios.get(
//         `${BaseUrl}/register?user_id=${user_id}`
//       );
//       console.log("response of get my interest", response);
//       return response;
//     } catch (error) {
//       console.error('Error in GetMyIntrests:', error);
//       return rejectWithValue(error.response?.data || error.message);
//     }
//   }
// );
// export const DeleteIntrests = createAsyncThunk(
//   "property/DeleteIntrests",
//   async (formData, { rejectWithValue }) => {
//     try {
//       const user = JSON.parse(localStorage.getItem("user"));
//       const user_id = user.uid;
//       console.log(formData);
//       const Data = {
//         user_id: user_id,
//         body: formData,
//       };
//       const response = await axios.post("", Data);
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
      console.log("formData", formData);
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

// export const fetchRecentTransactions = createAsyncThunk(
//   "property/fetchRecentTransactions",
//   async (arg, { rejectWithValue }) => {
//     try {
//       const response = await axios.get(`${BaseUrl}/home`);
//       console.log("response of recent transaction",response);
//       // const response = await axios.get(`${BaseUrl}/home`);
//       const stats = response.data.property_type_count;
//       const transactions = response.data.property.buy_properties.concat(
//         response.data.property.sell_properties
//       );
//       return {transactions, stats};
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

export const fetchRecentTransactions = createAsyncThunk(
  "property/fetchRecentTransactions",
  async (arg, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      console.log(state)
      const params = {};

      if (state.properties.Stats.length === 0) {
        params.status = 'True'; 
      }


      const queryString = qs.stringify(params, { encode: true });


      console.log(`${BaseUrl}/home?${queryString}`)
      const response = await axios.get(`${BaseUrl}/home?${queryString}`);
      console.log("response of recent transaction", response);

      // Extract transactions and stats from response data
      const stats = response.data.property_type_count;
      const transactions = response.data.property.buy_properties.concat(
        response.data.property.sell_properties
      );

      // Return the transactions and stats as the payload
      return { transactions, stats };
    } catch (error) {
      console.log(error)
      // Handle errors and return the error message as rejected value
      return rejectWithValue(error);
      
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
      console.log("hii");
      const userString = localStorage.getItem("user");
      const user = userString ? JSON.parse(userString) : {};
      const req_by = user.uid || '';
      console.log("hii");
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
      console.log("search response", response);

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
  async (payload, { rejectWithValue }) => {
    console.log(payload)
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) throw new Error("User not found in local storage");

      const cont_user_id = user.uid;

      // Construct data object without formData key
      const data = {
        cont_user_id,
        AboutDeveloper: payload.payload.AboutDeveloper || "",
        bhk: payload.payload.bhk || "",
        Flooring: payload.payload.Flooring || "",
        No_bed_rooms: payload.payload.No_bed_rooms || "",
        PowerBackup: payload.payload.PowerBackup || "",
        PropertyAge: payload.payload.PropertyAge || "",
        PropertyStatus: payload.payloadPropertyStatus || "",
        WaterSource: payload.payload.WaterSource || "",
        ad_info: payload.payload.ad_info || "",
        approved_by: payload.payload.approved_by || "",
        bound_wall: payload.payload.bound_wall || "",
        boundry_wall: payload.payload.boundry_wall || "",
        comments: payload.payload.comments || "",
        developments: payload.payload.developments || "",
        dimensions: payload.payload.dimensions || "",
        direction: payload.payload.direction || "",
        disputes: payload.payload.disputes || "",
        district: payload.payload.district || "",
        doc_num: payload.payload.doc_num || payload.payload.document_number || "",
        // docfile: formData.docfile || [],
        furnshied: payload.payload.furnshied || "",
        govt_price: payload.payload.govt_price || null,
        landmark: payload.payload.landmark || "",
        latitude: payload.payload.latitude || 0,
        lift: payload.payload.lift || "",
        listing_type: payload.payload.listing_type || "",
        loan_eligibile: payload.payload.loan_eligibile || false,
        longitude: payload.payload.longitude || 0,
        med_name: payload.payload.med_name || "",
        med_num1: payload.payload.med_num1 || "",
        med_num2: payload.payload.med_num2 || "",
        num_open_sides: payload.payload.num_open_sides || "",
        own_name: payload.payload.own_name || "",
        own_num1: payload.payload.own_num1 || "",
        own_num2: payload.payload.own_num2 || "",
        p_type: payload.payload.p_type || "",
        parking: payload.payload.parking || false,
        price: payload.payload.price || 0,
        prop_name: payload.payload.prop_name || "",
        rating: payload.payload.rating || "",
        reg_loc: payload.payload.reg_loc || "",
        rera: payload.payload.rera || "",
        size: payload.payload.size || 0,
        state: payload.payload.state || "",
        status: payload.payload.status || "",
        survey_number: payload.payload.survey_number || "",
        unit: payload.payload.unit || "",
        user_id: payload.payload.user_id || "",
        v_comments: payload.payload.v_comments || "",
        village: payload.payload.village || "",
      };
      console.log(data);
      const response = await axios.post(`${BaseUrl}/property`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateProperty = createAsyncThunk(
  "property/updateProperty",
  async ({ payload }, { rejectWithValue }) => {
    console.log("formData going during updateProperty",payload)
    try {
   
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) throw new Error("User not found in local storage");
   
      const req_user_id = user.uid;
      const data = { ...payload, req_user_id,  };
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

export const DeleteImage = createAsyncThunk(
  "property/DeleteImage",
  async (formData) => {
    try {
      const response = await axios.delete(`${BaseUrl}/image`, {
        headers: {
          "Content-Type": "application/json",
        },
        data: formData, // Directly pass formData here
      });

      console.log(response.data);

      return response.data;
    } catch (error) {
      console.error("Error deleting image:", error);
      throw error;
    }
  }
);

export const AddImage = createAsyncThunk(
  "property/AddImage",
  async (formData) => {
    console.log(formData);
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
  Stats: [],
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
      .addCase(GetMyIntrests.fulfilled, (state, action) => {
        state.mySubscription = action.payload.data.interested_areas;
      })
      .addCase(AddIntrests.fulfilled, (state, action) => {
        state.mySubscription = action.payload.data.interested_areas;
      })
      .addCase(fetchRecentTransactions.fulfilled, (state, action) => {
        state.recentTransactions = [
          ...state.recentTransactions,
          ...action.payload.transactions,
        ];
        if (action.payload.stats) {
          state.Stats = action.payload.stats; 
        }
      });
     
  },
});

// Actions and Selectors
export const { setProperties, setError, resetStatus } = propertySlice.actions;
export const selectProperties = (state) => state.properties.properties;
export const selectStats = (state)=> state.properties.Stats;
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
export default propertySlice.reducer;
