import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import BaseUrl from "app/configs/BaseUrl";



export const fetchProperties = createAsyncThunk(
  'property/fetchProperty',
  async (property_id, { rejectWithValue }) => {
    try {
      const url = `${BaseUrl}/property_ind?prop_id=${property_id}`;

      const response = await axios.get(url); 

      if (response.status !== 200) {
        throw new Error('Property data not received');
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


export const fetchRecentTransactions = createAsyncThunk(
  'property/fetchRecentTransactions',
  async (page) => {
    try {
      const response = await axios.get(`${BaseUrl}/home?page=${page}`)
      return response.data; 
    } catch (error) {
      return rejectWithValue(error.message); 
    }
  }
);
export const SearchResults = createAsyncThunk(
  'property/SearchResults',
  async () => {
    try {
      const response = await axios.get(`${BaseUrl}/home`)
      return response.data; 
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);





export const addProperty = createAsyncThunk(
  'property/addProperty',
  async (formData, { rejectWithValue }) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) throw new Error("User not found in local storage");

      const cont_user_id = user.uid;
      const data = { ...formData, cont_user_id };



      const response = await axios.post(`${BaseUrl}/property`, data);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const AddImage = createAsyncThunk(
  'property/AddImage',
  async (formData) => {
    const response = await axios.put(`${BaseUrl}/property`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      // Handle response
  

      if (response.status === 201) {
        
        window.alert('Upload successful');
      } else {
        throw new Error('Image Upload failed');
      }
  }
);





const initialState = {
  properties: [],
  recentTransactions:[],
  searchResults:
      [ ]
  
  
  
};

const propertySlice = createSlice({
  name: 'property',
  initialState,
  reducers: {
   
    setProperties(state, action) {
      state.properties[action.payload?.data?.property?.property_id] = action.payload;
     
      
    },
    propertySearch(state,action){
      state.searchResults = action.payload
    },
    
    setError(state, action) {
      state.status = 'failed';
      state.error = action.payload;
    },
   
    resetStatus(state) {
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProperties.fulfilled, (state, action) => {
        state.properties = action.payload
      
      })
      .addCase(fetchRecentTransactions.fulfilled, (state, action) => {
        state.recentTransactions = [
          ...state.recentTransactions,
          ...action.payload.property.buy_properties,
          ...action.payload.property.sell_properties
        ];
        state.status = 'succeeded';
      })
  },
  
});


export const { setProperties} = propertySlice.actions;
export const selectProperties = (state) => state.properties.properties;
export const selectRecentTransactions =(state)=> state.properties.recentTransactions;
export const selectSearchResults = (state)=>state.properties.searchResults;

export default propertySlice.reducer;
