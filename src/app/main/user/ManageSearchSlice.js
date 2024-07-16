import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import BaseUrl from 'app/configs/BaseUrl';

// Fetch data with PUT request
export const fetchDataWithPut = createAsyncThunk('manageSearch/fetchDataWithPut', async (formData, { fulfillWithValue, rejectWithValue }) => {
  try {
    console.log("Dispatching Data From with Form Data:", formData);

    const jsonData = JSON.stringify(formData);

    const response = await axios.put(`${BaseUrl}/search`, jsonData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    console.log("Response Data:", response.data);

    return fulfillWithValue({
      users: response.data.users,
      responseData: response.data
    });
  } catch (error) {
    return rejectWithValue(error.response ? error.response.data : error.message);
  }
});

// Get user profile on search
export const getUserProfileOnSearch = createAsyncThunk(
  'user/getUserProfile',
  async ({ user_id, req_user_id, updatedData }, { fulfillWithValue, rejectWithValue }) => {
    try {
      let response;
      if (updatedData) {
        response = await axios.put(
          `${BaseUrl}/user`,
          updatedData,
          {
            headers: {
              'Content-Type': 'application/json',
            },
            params: { req_user_id }
          }
        );
      } else {
        response = await axios.get(
          `${BaseUrl}/user`,
          {
            headers: {
              'Content-Type': 'application/json',
            },
            params: { user_id, req_user_id }
          }
        );
      }

      console.log("Backend response data:", response.data);
      const returnData = response.data;
      if (returnData.status === "success") {
        return fulfillWithValue({
          profile: returnData.profile,
          responseData: returnData
        });
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Update user profile
export const updateUserProfile = createAsyncThunk(
  'user/updateUserProfile',
  async (updatedData, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${BaseUrl}/update`,
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
  UsersIntrests: [],
  status: 'idle',
  TotalCount: 0,
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
        state.users = [...state.users, ...action.payload.users];
        state.TotalCount = action.payload.responseData.total_length;
        state.status = 'succeeded';
      })
      .addCase(fetchDataWithPut.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(getUserProfileOnSearch.fulfilled, (state, action) => {
        state.user = action.payload.profile;
        state.status = 'succeeded';
      })
      .addCase(getUserProfileOnSearch.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = 'succeeded';
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const selectSearchUserResults = (state) => state.manageSearch.users;
export const selectUserProfile = (state) => state.manageSearch.user;
export const selectTotalCount = (state) => state.manageSearch.TotalCount;

export default manageSearchSlice.reducer;
