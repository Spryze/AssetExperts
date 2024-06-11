import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';




export const fetchDataWithPut = createAsyncThunk('manageSearch/fetchDataWithPut', async (formData, { fulfillWithValue, rejectWithValue }) => {
  try {
    
    console.log("Dispatching Data From with Form Data:", formData);
    
   
    const jsonData = JSON.stringify(formData);
    
    const response = await axios.put('https://bac7a5b1-026f-4c31-bb25-b6456ef4b56d-00-1doj8z5pfhdie.sisko.replit.dev/search', jsonData, {
      headers: {
        'Content-Type': 'application/json' 
      }
    });
    
    console.log("Response Data:", response.data);
    
    return fulfillWithValue(response.data.users);
  } catch (error) {
    return rejectWithValue(error.response ? error.response.data : error.message);
  }
});

const initialState = {
  users: [],
  status: 'idle',
  error: null,
};



  
  

const manageSearchSlice = createSlice({
  name: 'manageSearch',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDataWithPut.pending, (state) => {
        state.status = 'loading';
      })
     
      .addCase(fetchDataWithPut.fulfilled, (state, action) => {
        // state.status = 'succeeded';
        state.users = action.payload;
        // state.total_length = action.payload.total_length;
      })
      .addCase(fetchDataWithPut.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});


export const selectManageSearch = (state) => state.manageSearch.users;
  


export default manageSearchSlice.reducer;
