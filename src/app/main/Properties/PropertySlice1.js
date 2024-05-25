import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { reject } from "lodash";
import { action } from "mobx";





export const addProperty = (propertyData) => {
  
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
        Navigate('/');
      } else {
        throw new Error('Image Upload failed');
      }
  }
);





const initialState = {
 
  properties: {},
  recentTransactions:[],
  searchResults:
      [
        {
            "landmark": "near araku road",
            "district": "visakhapatnam",
            "listing_type": "buy",
            "unit": "sqyd",
            "area": 1000,
            "unit_price": 0,
            "prop_type": "commercial",
            "prop_images": [
                "https://firebasestorage.googleapis.com/v0/b/premassets.appspot.com/o/8dfkFj9tBnde811nrHmQDBJKVZC3-commercial%20site.jpeg-aefe7295-f2c3-4e50-9d6d-afdeeeae3603?alt=media&token=8621d90b-1381-47ab-a3b4-25bb0738374a"
            ],
            "property_id": 1336
        },
        {
            "landmark": "murali nagar",
            "district": "visakhapatnam",
            "listing_type": "buy",
            "unit": "sqyd",
            "area": 400,
            "unit_price": 0,
            "prop_type": "plot",
            "prop_images": [
                "https://firebasestorage.googleapis.com/v0/b/premassets.appspot.com/o/8dfkFj9tBnde811nrHmQDBJKVZC3-plot%2022.jpeg-edc998c7-8630-4872-812d-e6cd14355cc8?alt=media&token=7b0d48f2-3c3c-458f-9381-1b533f293080"
            ],
            "property_id": 570
        },
        {
            "landmark": "vizianagaram",
            "district": "vizianagaram",
            "listing_type": "buy",
            "unit": "sqyd",
            "area": 90,
            "unit_price": 0,
            "prop_type": "plot",
            "prop_images": [
                "https://firebasestorage.googleapis.com/v0/b/premassets.appspot.com/o/8dfkFj9tBnde811nrHmQDBJKVZC3-plot%203.jpeg-8eb1bdd9-4e56-476e-aa5d-c32ef2ba1228?alt=media&token=d3d94c57-2185-47db-b53c-364310b81467"
            ],
            "property_id": 672
        },
        {
            "landmark": "vizianagaram",
            "district": "vizianagaram",
            "listing_type": "buy",
            "unit": "acre",
            "area": 5,
            "unit_price": 3500000,
            "prop_type": "land",
            "prop_images": [
                "https://firebasestorage.googleapis.com/v0/b/premassets.appspot.com/o/8dfkFj9tBnde811nrHmQDBJKVZC3-land.jpg-91992c41-f11f-4a42-b1f7-52597ed0133c?alt=media&token=3a99bd4d-c5f8-4dfc-8798-cd4716b8d73c"
            ],
            "property_id": 254
        },
        {
            "landmark": "pendurthi",
            "district": "visakhapatnam",
            "listing_type": "buy",
            "unit": "cent",
            "area": 20,
            "unit_price": -1,
            "prop_type": "land",
            "prop_images": [
                "https://firebasestorage.googleapis.com/v0/b/premassets.appspot.com/o/Lq9jRnQdzuTsPD8esNBtL5v6g352-land.jpg-ada2a3e4-1967-41ee-9dfd-ed210baf40d9?alt=media&token=8040469b-d803-4320-b3a5-9b92edbe2bad"
            ],
            "property_id": 850
        },
        {
            "landmark": "rushikonda",
            "district": "visakhapatnam",
            "listing_type": "buy",
            "unit": "sqyd",
            "area": 360,
            "unit_price": 0,
            "prop_type": "plot",
            "prop_images": [
                "https://firebasestorage.googleapis.com/v0/b/premassets.appspot.com/o/Lq9jRnQdzuTsPD8esNBtL5v6g352-am.jpeg-aa99469c-383c-40c9-9f3d-58dc29a5a460?alt=media&token=26945995-2161-43d5-9202-7b54030a7b00"
            ],
            "property_id": 1936
        },
        {
            "landmark": "seethamadhara",
            "district": "visakhapatnam",
            "listing_type": "buy",
            "unit": "sqyd",
            "area": 1000,
            "unit_price": 0,
            "prop_type": "plot",
            "prop_images": [
                "https://firebasestorage.googleapis.com/v0/b/premassets.appspot.com/o/Lq9jRnQdzuTsPD8esNBtL5v6g352-ch.jpg-c20eb578-51c6-44b9-9a71-ac55d6134e7d?alt=media&token=27ddadfe-9822-410c-8d75-25c43873d5b8"
            ],
            "property_id": 140
        },
        {
            "landmark": "chelluru",
            "district": "vizianagaram",
            "listing_type": "buy",
            "unit": "acre",
            "area": 10,
            "unit_price": 0,
            "prop_type": "land",
            "prop_images": [
                "https://firebasestorage.googleapis.com/v0/b/premassets.appspot.com/o/Lq9jRnQdzuTsPD8esNBtL5v6g352-ga.jpg-ca09c1e9-ae00-494b-9807-c66517267308?alt=media&token=a7bf6e01-d290-4621-9a53-2ed6ec35eedb"
            ],
            "property_id": 1109
        },
        {
            "landmark": "ramabhadrapuram",
            "district": "vizianagaram",
            "listing_type": "buy",
            "unit": "acre",
            "area": 2,
            "unit_price": 0,
            "prop_type": "land",
            "prop_images": [
                "https://firebasestorage.googleapis.com/v0/b/premassets.appspot.com/o/Lq9jRnQdzuTsPD8esNBtL5v6g352-ap.jpg-078cc49d-b4de-479f-9e41-3b6f78c2da04?alt=media&token=68e7f47b-e67f-4f6f-98c6-b4cfded8ee55"
            ],
            "property_id": 1807
        },
        {
            "landmark": "pm palem",
            "district": "visakhapatnam",
            "listing_type": "buy",
            "unit": "sqft",
            "area": 1000,
            "unit_price": 0,
            "prop_type": "flat",
            "prop_images": [
                "https://firebasestorage.googleapis.com/v0/b/premassets.appspot.com/o/Lq9jRnQdzuTsPD8esNBtL5v6g352-akp.jpg-2ef768f5-9db1-4e67-803c-b129e0e18d03?alt=media&token=37979705-2227-4cd3-b8f6-39a811cc30ae"
            ],
            "property_id": 377
        }
    ]
  
  
  
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
        state.properties = action.payload.data,action.payload.recent_properties;
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