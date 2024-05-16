import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useParams } from "react-router-dom";


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


const initialState = {
  properties: {},
  
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
      
  },
});


export const { setProperties} = propertySlice.actions;

// Exporting a selector function to access properties data from the Redux state
export const selectProperties = (state) => state.properties.properties;

export default propertySlice.reducer;
