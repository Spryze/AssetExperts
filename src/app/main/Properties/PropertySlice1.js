import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { reject } from "lodash";
import { action } from "mobx";





export const addProperty = (propertyData) => {
  
};

export const AddImage = (image) => {
 
};
const propertySlice1 = createSlice({
  name: 'property',
  initialState: {
    
  },
  reducers: {
    addProperty: (state, action) => {
      
    },
    addImage: (state, action) => {
      
    },
  },
});

export const fetchProperties = createAsyncThunk(
  'property/fetchProperty',
  async (property_id, { rejectWithValue }) => {
    try {
      console.log('Fetching property with ID:', property_id);
      const url = `https://bac7a5b1-026f-4c31-bb25-b6456ef4b56d-00-1doj8z5pfhdie.sisko.replit.dev/property_ind?prop_id=${property_id}`;
      const response = await fetch(url, { method: 'get' });
      console.log("response",response)
      if (!response.ok) throw new Error('Property data not received');
      const propertyDetails = await response.json();
      console.log('Fetched property details:', propertyDetails);
      return propertyDetails;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);



export const fetchRecentTransactions = createAsyncThunk(
  'property/fetchRecentTransactions',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("https://bac7a5b1-026f-4c31-bb25-b6456ef4b56d-00-1doj8z5pfhdie.sisko.replit.dev/home");
      const data = response.data;
      if (!data || data.length === 0) {
        return rejectWithValue('No data found');
      }
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);









export const SearchResults = createAsyncThunk(
  'property/SearchResults',
  async (formData,{ rejectWithValue }) => {
    console.log("formData",formData)
    try {
      const response = await axios.post("https://bac7a5b1-026f-4c31-bb25-b6456ef4b56d-00-1doj8z5pfhdie.sisko.replit.dev/search", {
        
      body:formData
      });
      console.log("search response", response);

      const data = response;
      if (!data || data.length === 0) {
        return rejectWithValue('No data found')
      }
      return data;
     
    } 
    
    catch (error) {
      return rejectWithValue(error.message);
    }
  }
);





const initialState = {
 
  properties: {},
  recentTransactions:[],
  searchResults:
      [
        
    ],
    
  
  
  
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
        state.properties = action.payload;
        console.log("state.properties",state.properties)
      })
      .addCase(fetchRecentTransactions.fulfilled, (state, action) => {
        
        state.recentTransactions = action.payload;
      })
      .addCase(SearchResults.fulfilled,(state,action)=>{
        state.searchResults = action.payload.data.property
      })
  },
  
});


export const { setProperties} = propertySlice.actions;
export const selectProperties = (state) => state.properties.properties;
export const selectRecentTransactions =(state)=> state.properties.recentTransactions;
export const selectSearchResults = (state)=>state.properties.searchResults;

export default propertySlice.reducer;