import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { reject } from "lodash";



export const fetchProperties = createAsyncThunk(
  'property/fetchProperty',
  async (property_id, { rejectWithValue }) => {
    console.log('fetch Property ', property_id)
    try {
      const url = `https://bac7a5b1-026f-4c31-bb25-b6456ef4b56d-00-1doj8z5pfhdie.sisko.replit.dev/property_ind?prop_id=${property_id}`;

      const response = await fetch(url, {
        method: 'get',
      });

      if (!response.ok) {
        throw new Error('Property data not received');
      }

      const propertyDetails = await response.json();

      // Open the API response in a new tab
      // const responseString = JSON.stringify(propertyDetails);
      // const newWindow = window.open('', '_blank');
      // if (newWindow) {
      //   newWindow.document.write(`<pre>${responseString}</pre>`);
      // } else {
      //   throw new Error('Popup blocked. Please allow popups for this site.');
      // }

      return propertyDetails;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchRecentTransactions = createAsyncThunk(
  'property/fetchRecentTransactions',
  async () => {
    try {
      const response = await axios.get("https://bac7a5b1-026f-4c31-bb25-b6456ef4b56d-00-1doj8z5pfhdie.sisko.replit.dev/home")
      console.log("response", response)
      return response.data; // Return response data instead of the whole response object
    } catch (error) {
      return rejectWithValue(error.message); // Use rejectWithValue for returning error
    }
  }
);


const initialState = {
  properties: {},
  recenttransactions:{},
  
  
};

const propertySlice = createSlice({
  name: 'property',
  initialState,
  reducers: {
   
    setProperties(state, action) {
      state.properties[action.payload?.data?.property?.property_id] = action.payload;
     
      
    },
    
    setError(state, action) {
      state.status = 'failed';
      state.error = action.payload;
    },
    // Reducer logic to reset status and error
    resetStatus(state) {
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProperties.fulfilled, (state, action) => {
        state.properties = action.payload;
      })
      .addCase(fetchRecentTransactions.fulfilled, (state, action) => {
        // Assuming action.payload contains the relevant data from the response
        state.recenttransactions = action.payload;
      })
  },
  
});


export const { setProperties} = propertySlice.actions;
export const selectProperties = (state) => state.properties.properties;
export const selectrecenttransactions =(state)=> state.properties.recenttransactions;

export default propertySlice.reducer;
