import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import PropertyData from '../../Properties.json';

// Mock asynchronous fetch for property details
export const fetchPropertyDetails = createAsyncThunk(
  'properties/fetchPropertyDetails',
  async (property_id, { rejectWithValue }) => {
    try {
      console.log(property_id)
      const url = `https://db93a4e7-afba-4acc-8fb6-24c6904c08a7-00-wzqnnh54dv12.sisko.replit.dev/property?property_id=${property_id}`;
      const response = await fetch(url, {
        method: 'get',
      });
      
      if (!response.ok) {
        throw new Error('Property data not received');
      }
      
      const propertyDetails = await response.json();
      console.log("propertyDetails",propertyDetails)
      return propertyDetails?.properties;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updatePropertyDetails = createAsyncThunk(
  'properties/updatePropertyDetails',
  async (property_id, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const selectedProperty = state.properties.selectedProperty;
      // Example URL for updating property details
      const url = `https://example.com/updateProperty/${property_id}`;
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(selectedProperty), // Send updated data to the server
      });

      if (!response.ok) {
        throw new Error('Failed to update property data');
      }

      // Fetch updated property data after successful update
      const updatedData = await response.json();
      return updatedData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  properties: []
  // PropertyData.properties
  ,
 
};

const propertySlice = createSlice({
  name: 'properties',
  initialState,
  reducers: {
    setSelectedProperty(state, action) {
      state.selectedProperty = action.payload;
    },
    updateSelectedProperty(state, action) {
     
      state.selectedProperty = { ...state.selectedProperty, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPropertyDetails.fulfilled, (state, action) => {
      state.selectedProperty = action.payload;
    });
  },
});

export const { setSelectedProperty,updateSelectedProperty } = propertySlice.actions;

export const selectProperties = (state) => state.properties;
export const selectSelectedProperty = (state) => state.properties.selectedProperty;

export default propertySlice.reducer;
