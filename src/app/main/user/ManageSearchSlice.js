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


export const getUserProfileOnSearch = createAsyncThunk(
  'user/getUserProfile',
  async ({ user_id, req_user_id }, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await axios.get(
        "https://bac7a5b1-026f-4c31-bb25-b6456ef4b56d-00-1doj8z5pfhdie.sisko.replit.dev/user",
        {
          headers: {
            'Content-Type': 'application/json',
          },
          params: { user_id, req_user_id }
        
        }

      );
      // console.log("Paramas",params)
      console.log("Backend response data:", response.data);
      const returnData = response.data;
      if (returnData.status === "success")
        {
      const userData = response.data.profile;
      // Transform the response data to match the expected structure
      const transformedData = {
        id: userData.id || '',
        name: userData.name || '',
        email: userData.email || '',
        address: userData.address || '',
        ph_num_1: userData.ph_num_1 || '',
        ph_num_2: userData.ph_num_2 || '',
        comments: userData.comments || '',
        requirements: userData.requirements || '',
        role: userData.role || '',
        profession: userData.profession || '',
        active_notifications: userData.active_notifications !== undefined ? userData.active_notifications.toString() : '',
        updated_on: userData.updated_on ? new Date(userData.updated_on).toLocaleString() : '',
        created_on: userData.created_on ? new Date(userData.created_on).toLocaleString() : '',
      };

      return fulfillWithValue(transformedData);
    }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


const initialState = {
  users: [],
  user: {},
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
      .addCase(getUserProfileOnSearch.fulfilled, (state, action) => {
        // state.status = 'succeeded';
        state.user = action.payload;
        // state.total_length = action.payload.total_length;
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


export const selectSearchUserResults = (state) => state.manageSearch.users;
export const selectUserProfile = (state) => state.manageSearch.user;  


export default manageSearchSlice.reducer;
