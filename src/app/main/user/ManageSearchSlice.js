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
  async ({ user_id, req_user_id, updatedData }, { fulfillWithValue, rejectWithValue }) => {
    try {
      let response;
      if (updatedData) {
        response = await axios.put(
          "https://bac7a5b1-026f-4c31-bb25-b6456ef4b56d-00-1doj8z5pfhdie.sisko.replit.dev/user",
          updatedData,
          {
            headers: {
              'Content-Type': 'application/json',
            },
            params: {req_user_id}
          }
        );
      } else {
        response = await axios.get(
          "https://bac7a5b1-026f-4c31-bb25-b6456ef4b56d-00-1doj8z5pfhdie.sisko.replit.dev/user",
          {
            headers: {
              'Content-Type': 'application/json',
            },
            params: { user_id, req_user_id }
          }
        );
      }

      // const response = await axios.get(
      //   "https://bac7a5b1-026f-4c31-bb25-b6456ef4b56d-00-1doj8z5pfhdie.sisko.replit.dev/user",
      //   {
      //     headers: {
      //       'Content-Type': 'application/json',
      //     },
      //     params: { user_id, req_user_id }
        
      //   }

      // );
      // console.log("Paramas",params)
      console.log("Backend response data:", response.data);
      const returnData = response.data;
      if (returnData.status === "success")
        {
      const userData = response.data.profile;
     
    return fulfillWithValue(response);
    
      
      



    }
    } catch (error) {
      return rejectWithValue(error.message);
      
    }
  }
);




export const updateUserProfile = createAsyncThunk(
  'user/updateUserProfile',
  async (updatedData, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await axios.put(
        "https://your-api-url/user/update",
        updatedData,
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );
      console.log("Backend response data:", response.data);
      if (response.data.status === "success") {
        return fulfillWithValue(response.data);
      } else {
        return rejectWithValue(response.data.message);
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
        state.user = action.payload.data;
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
