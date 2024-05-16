/* eslint import/no-extraneous-dependencies: off */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import history from '@history';
import _ from '@lodash';
import { Navigate } from 'react-router-dom';
import { setInitialSettings } from 'app/store/rabit/settingsSlice';
import { showMessage } from 'app/store/rabit/messageSlice';
import settingsConfig from 'app/configs/settingsConfig';
import jwtService from '../auth/services/jwtService';
import { getAuth,onAuthStateChanged,signInWithEmailAndPassword } from 'firebase/auth';
import { action } from 'mobx';


export const setUser = createAsyncThunk('user/setUser', async () => {
  return new Promise((resolve, reject) => {
    const auth = getAuth();
    onAuthStateChanged(auth, (userAuth) => {
      if (userAuth) {
        let user = {
          uid: userAuth.uid,
          role: "admin",
          data: {
            accessToken: userAuth.accessToken,
            displayName: "Ramu",
          }
        };

        localStorage.setItem('user', JSON.stringify(user));
        resolve(user); // Resolve with the user object
      } else {
        reject(new Error('User not authenticated')); 
      }
    });
  });
});

export const signInWithEmailPassword = createAsyncThunk(
  'user/signInWithEmailAndPassword',
  async ({ email, password }, { rejectWithValue }) => { 
    try {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      if (user) {
        let User = {
          uid: user.uid,
          role: "admin",
          data: {
            accessToken: user.accessToken,
            displayName: user.displayName,
          }
        };
        
        localStorage.setItem('user', JSON.stringify(User));
        
        return User;
      } else {
        throw new Error("User not found");
      }
    } catch (error) {
      // You can handle specific Firebase errors here
      return rejectWithValue(error.message); // Dispatches a rejected action with the error message
    }
  }
);


export const updateUserSettings = createAsyncThunk(
  'user/updateSettings',
  async (settings, { dispatch, getState }) => {
    const { user } = getState();
    const newUser = _.merge({}, user, { data: { settings } });

    dispatch(updateUserData(newUser));

    return newUser;
  }
);

export const updateUserShortcuts = createAsyncThunk(
  'user/updateShortucts',
  async (shortcuts, { dispatch, getState }) => {
    const { user } = getState();
    const newUser = {
      ...user,
      data: {
        ...user.data,
        shortcuts,
      },
    };

    dispatch(updateUserData(newUser));

    return newUser;
  }
);

export const logoutUser = () => async (dispatch, getState) => {
  const { user } = getState();

  history.push({
    pathname: '/',
  });
  
  if (!user.role || user.role.length === 0) {
    // is guest
    return null;
  }

  history.push({
    pathname: '/',
  });
  console.log('push to home page');
  dispatch(setInitialSettings());

  return dispatch(userLoggedOut());
};

export const updateUserData = (user) => async (dispatch, getState) => {
  if (!user.role || user.role.length === 0) {
    // is guest
    return;
  }

  jwtService
    .updateUserData(user)
    .then(() => {
      dispatch(showMessage({ message: 'User data saved with api' }));
    })
    .catch((error) => {
      dispatch(showMessage({ message: error.message }));
    });
};

const initialState = {
  role: [], // guest
  data: {
    displayName: 'John Doe',
    photoURL: 'assets/images/avatars/brian-hughes.jpg',
    email: 'johndoe@withinpixels.com',
    shortcuts: ['apps.calendar', 'apps.mailbox', 'apps.contacts', 'apps.tasks'],
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userLoggedOut: (state, action) => initialState,
  },
  setUser: (state, action) => {
    return {
      ...state,
      ...action.payload,
    };
  },

  extraReducers: {
    [updateUserSettings.fulfilled]: (state, action) => action.payload,
    [updateUserShortcuts.fulfilled]: (state, action) => action.payload,
    [setUser.fulfilled]: (state, action) => action.payload,
    [signInWithEmailPassword.fulfilled]:(state,action)=>action.payload,
  },
});

export const { userLoggedOut } = userSlice.actions;


export const selectUser = ({ user }) => user;

export const selectUserShortcuts = ({ user }) => user.data.shortcuts;

export default userSlice.reducer;
