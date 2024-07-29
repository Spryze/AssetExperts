import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import BaseUrl from 'app/configs/BaseUrl';

export const fetchDataWithPut = createAsyncThunk(
  'manageSearch/fetchDataWithPut',
  async (formData, { fulfillWithValue, rejectWithValue }) => {
    try {
      console.log('Dispatching Data From with Form Data:', formData);

      const jsonData = JSON.stringify(formData);

      const response = await axios.post(`${BaseUrl}/search_users`, jsonData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Response Data:', response.data);

      return fulfillWithValue(response.data.users);
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);

export const updateManageUserProfile = createAsyncThunk(
  'user/getUserProfileOnSearch',
  async ({ user_id, req_user_id, updatedData }, { fulfillWithValue, rejectWithValue }) => {
    try {
      console.log('hii2');
      let response;

      response = await axios.put(`${BaseUrl}/user`, updatedData, {
        headers: {
          'Content-Type': 'application/json',
        },
        params: { req_user_id },
      });

      console.log('Backend response data:', response.data);
      const returnData = response.data;
      if (returnData.status === 'success') {
        const userData = response.data.profile;

        return fulfillWithValue(response);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getUserProfileOnSearch = createAsyncThunk(
  'user/getUserProfileOnSearch',
  async ({ user_id, req_user_id, updatedData }, { fulfillWithValue, rejectWithValue }) => {
    try {
      console.log('hii2');
      let response;
      if (updatedData) {
        response = await axios.put(`${BaseUrl}/user`, updatedData, {
          headers: {
            'Content-Type': 'application/json',
          },
          params: { req_user_id },
        });
      } else {
        response = await axios.get(`${BaseUrl}/user`, {
          headers: {
            'Content-Type': 'application/json',
          },
          params: { user_id, req_user_id },
        });
      }

      console.log('Backend response data:', response.data);
      const returnData = response.data;
      if (returnData.status === 'success') {
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
      const response = await axios.put(`${BaseUrl}/update`, updatedData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('Backend response data:', response.data);
      if (response.data.status === 'success') {
        return fulfillWithValue(response.data);
      } else {
        return rejectWithValue(response.data.message);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const postPaymentDetailsAdd = createAsyncThunk(
  'plan/postPaymentDetailsAdd',
  async (AddData, { fulfillWithValue, rejectWithValue }) => {

    console.log(
      'AddData postPaymentDetailsAdd:',
      AddData
    );
    try {
      const response = await axios.post(`${BaseUrl}/plan`, {
        ...AddData,
      });
      console.log('payment add returns ', response);
      if (response.data.status === 'success') {
        return fulfillWithValue(response.data.payments);
      }
      return fulfillWithValue({});
      // console.log("post payment details Add:", response);
    } catch (error) {
      console.error('Error in postPaymentDetailsAdd:', error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const putPaymentDetailsUpdate = createAsyncThunk(
  'plan/putPaymentDetailsUpdate',
  async (UpdatePaymentDetailsData, { fulfillWithValue, rejectWithValue }) => {
    console.log(
      'AddData postPaymentDetailsAdd:', UpdatePaymentDetailsData

    );
    try {
      const response = await axios.put(`${BaseUrl}/plan`, {
        ...UpdatePaymentDetailsData,
      });
      // console.log("post payment details Add:", response);
      if (response.data.status === 'success') {
        return fulfillWithValue(response.data.payments);
      }
      return fulfillWithValue({});
    } catch (error) {
      console.error('Error in postPaymentDetailsAdd:', error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const initialState = {
  users: [],
  user: {},
  searchUser: { profile: {}, properties: [], interested_areas: [], payments: [] },
  UsersIntrests: [],
  status: 'idle',
  TotalCount: 0,
  error: null,
};

const manageSearchSlice = createSlice({
  name: 'manageSearch',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchDataWithPut.pending]: (state) => {
      state.status = 'loading';
    },
    // [getUserProfileOnSearch.fulfilled]: (state, action) => {
    //   // state.status = 'succeeded';
    //   state.searchUser = action.payload.data;
    //   // state.total_length = action.payload.total_length;
    // },
    [getUserProfileOnSearch.fulfilled]: (state, action) => {
      const updatedUserProfile = action.payload.data;
      const userId = updatedUserProfile.profile.user_id;
      console.log(userId) // assuming user profile has an id field
    
      // Update the searchUser state
      state.searchUser = updatedUserProfile;
    
      // Find the index of the user in managesearch.user
      const userIndex = state.managesearch.users.findIndex(user => user.id === userId);
    
      if (userIndex !== -1) {
        // Update the specific user profile in managesearch.user
        state.managesearch.user[userIndex] = updatedUserProfile;
      }
      // Optionally, you can also update other states like total_length if needed
      // state.total_length = action.payload.total_length;
    },
    
    [updateManageUserProfile.fulfilled]: (state, action) => {
      // state.status = 'succeeded';
      state.searchUser = action.payload.data;
      // state.total_length = action.payload.total_length;
    },

    //[fetchDataWithPut.fulfilled]: (state, action) => {
      // state.status = 'succeeded';
     // state.users = action.payload;
      // state.total_length = action.payload.total_length;
   // },
    [fetchDataWithPut.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      if (state.users && state.users.length > 0) {
        state.users = [...state.users, ...action.payload];
      } else {
        state.users = action.payload;
      }
    },
    // [fetchDataWithPut.fulfilled]:(state, action) => {
    //   state.status = 'succeeded';
    //   if (action.payload.users) {
    //     state.users = [...state.users, ...action.payload.users];
    //     state.totalCount = action.payload.totalCount || state.totalCount;
    //   }
    // },
    [fetchDataWithPut.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    },
    [postPaymentDetailsAdd.fulfilled]: (state, action) => {
      state.searchUser?.payments?.push(action.payload);
    },
    

    [putPaymentDetailsUpdate.fulfilled]: (state, action) => {
      if (action.payload) {
        const index = state.searchUser.payments.findIndex(
          (payment) => payment.order_id === action.payload.order_id
        );
        if (index !== -1) {
          state.searchUser.payments[index] = action.payload;
        }
      }
    },
    [fetchDataWithPut.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    },
    
  },
});

export const selectSearchUserResults = (state) => state.manageSearch.users;
export const selectSearchUserProfile = (state) => state.manageSearch.searchUser;
export const selectTotalCount = (state) => state.manageSearch.TotalCount;
// export const selectSearchUser = (state) => state.manageSearch.searchUser;

export default manageSearchSlice.reducer;
