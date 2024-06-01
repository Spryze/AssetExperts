import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { reject } from "lodash";



export const fetchProperties = createAsyncThunk(
  'property/fetchProperty',
  async (property_id, { rejectWithValue }) => {
    try {
      const url = `https://bac7a5b1-026f-4c31-bb25-b6456ef4b56d-00-1doj8z5pfhdie.sisko.replit.dev/property_ind?prop_id=${property_id}`;

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
  async () => {
    try {
      const response = await axios.get("https://bac7a5b1-026f-4c31-bb25-b6456ef4b56d-00-1doj8z5pfhdie.sisko.replit.dev/home")
      return response.data; 
    } catch (error) {
      return rejectWithValue(error.message); 
    }
  }
);



export const SearchResults = createAsyncThunk(
  'property/SearchResults',
  async (formData, { rejectWithValue }) => {
    try {
      console.log("FormData Sent to Backend:", JSON.stringify(formData, null, 2));
      const response = await axios.post("https://bac7a5b1-026f-4c31-bb25-b6456ef4b56d-00-1doj8z5pfhdie.sisko.replit.dev/search", { body: formData }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log("Response from Backend:", response.data);
      if (response.status !== 200) {
        throw new Error('Failed to fetch search results');
      }
      return response.data;
    } catch (error) {
      console.error('Error in SearchResults Thunk:', error.response?.data || error.message);
      return rejectWithValue(error.response?.data || error.message);
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

      console.log(data);

      const response = await axios.post("https://bac7a5b1-026f-4c31-bb25-b6456ef4b56d-00-1doj8z5pfhdie.sisko.replit.dev/property", data);
      console.log("response", response);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const AddImage = createAsyncThunk(
  'property/AddImage',
  async (formData) => {
    const response = await axios.put('https://bac7a5b1-026f-4c31-bb25-b6456ef4b56d-00-1doj8z5pfhdie.sisko.replit.dev/property', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      // Handle response
      console.log('Response:', response);

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
      [ ],
  status: 'idle',
  error: null,
  
  
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
    // Reducer logic to reset status and error
    resetStatus(state) {
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(SearchResults.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(SearchResults.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.searchResults = action.payload;
      })
      .addCase(SearchResults.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(fetchProperties.fulfilled, (state, action) => {
        state.properties = action.payload,
        console.log("state.properties",state.properties)
      })
      
      .addCase(fetchRecentTransactions.fulfilled, (state, action) => {
        
        state.recentTransactions = action.payload;
      })
  },
  
});


// export const { setProperties} = propertySlice.actions;
export const { setProperties, propertySearch, setError, resetStatus } = propertySlice.actions;
export const selectProperties = (state) => state.properties.properties;
export const selectRecentTransactions =(state)=> state.properties.recentTransactions;
export const selectSearchResults = (state)=>state.properties.searchResults;
export const selectPropertyStatus = (state) => state.property.status;
export const selectPropertyError = (state) => state.property.error;
export default propertySlice.reducer;

