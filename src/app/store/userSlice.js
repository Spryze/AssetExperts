/* eslint import/no-extraneous-dependencies: off */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import history from "@history";
import BaseUrl from "app/configs/BaseUrl";
import _ from "@lodash";
import { Navigate } from "react-router-dom";
import { setInitialSettings } from "app/store/rabit/settingsSlice";
import { showMessage } from "app/store/rabit/messageSlice";
import settingsConfig from "app/configs/settingsConfig";
import jwtService from "../auth/services/jwtService";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import axios from "axios";

export const setUser = createAsyncThunk(
  "user/setUser",
  async (_, { rejectWithValue }) => {
    try {
      const auth = getAuth();
      const userAuth = await new Promise((resolve, reject) => {
        onAuthStateChanged(auth, (user) => {
          if (user) {
            resolve(user);
          } else {
            reject(new Error("User not authenticated"));
          }
        });
      });

      if (userAuth) {
        try {
          const response = await axios.get(
            `${BaseUrl}/user?user_id=${userAuth.uid}&req_user_id=${userAuth.uid}`
          );

          const userData = response.data;
          console.log("userData",)
          let user = {
            uid: userAuth.uid,
            role: userData.profile.role,
            data: {
              displayName: userData.profile.name,
              address: userData.profile.address,
              comments: userData.profile.comments,
              email: userData.profile.email,
              phone_num_1: userData.profile.phone_num_1,
              phone_num_2: userData.profile.phone_num_2,
              profession: userData.profile.profession,
              requirements: userData.profile.requirements,
            },
          };

          return user;
        
        } catch (error) {
          console.log("error", error);
          if ((error.statusText === "Unauthorized")) {
            const userData = {
              name: userAuth.displayName,
              email: userAuth.email,
              id: userAuth.uid,
            };
            const response = await axios.post(
              `${BaseUrl}/user`,userData
            );
          
            let user = {
              uid: userAuth.uid,
              role:response.data.data.role,
              data: {
                accessToken: userAuth.accessToken,
                displayName:response.data.data.name,
                address: userData.profile.address,
                email: response.data.data.email,
                phone_num_1: userData.profile.ph_num_1,
                
              },
            };
            console.log('user',user)
            return user;
          }
          setUser();
        }
      } else {
        throw new Error("User not authenticated");
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const UpdateUser = createAsyncThunk(
  "user/UpdateUser",
  async (formData, { rejectWithValue }) => {
    try {
        const response = await axios.put(
        `${BaseUrl}/user`,
        formData
      );
      console.log("response",response)
      let user = {
       
        data: {
        
          displayName:response.data.data.name,
          address: response.data.data.address,
          profession:response.data.data.profession,
          email: response.data.data.email,
          phone_num_1: response.data.data.phone_num_1,
          phone_num_2: response.data.data.phone_num_2,
          requirements:response.data.data.requirements,
          
        },
      };
      return user;
    } catch (error) {
      console.error("Error in updating user", error);
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

export const signInWithPopupThunk = createAsyncThunk(
  "user/signInWithPopup",
  async ({ auth, provider }, thunkAPI) => {
    try {
      const result = await signInWithPopup(auth, provider);
      return result.user;
    } catch (error) {
      thunkAPI.dispatch(showMessage({ message: error.message }));
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const signUpWithEmailAndPassword = createAsyncThunk(
  "user/SignupWithEmailPassword",
  async (data, { rejectWithValue }) => {
    console.log("userSlice", data);
    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      const user = userCredential.user;
      console.log("user", user);
      if (user && user.uid) {
        const userData = {
          name: data.displayName,
          email: data.email,
          id: user.uid,
          role: data.role,
          ph_num_1: data.ph_num_1,
        };
        console.log("userdata", userData);

        const response = await axios.post(
          `${BaseUrl}/user`,
          userData
        );
        console.log("response ", response);

        if (!response.ok) {
          console.log("Failed to send user data to server");
        }
      } else {
        console.error("Failed to create user");
        return rejectWithValue("Failed to create user");
      }
    } catch (error) {
      console.error("Error:", error.message);
      return rejectWithValue(error.message);
    }
  }
);

export const UserProfile = createAsyncThunk(
  "user/UserProfile",
  async (_, { rejectWithValue }) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const cont_user_id = user.uid;

      const userdata = await axios.get(
        `${BaseUrl}/user?user_id=${cont_user_id}&req_user_id=${cont_user_id}`
      );
      console.log("userdata", userdata.data);
      return userdata.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const signInWithEmailPassword = createAsyncThunk(
  "user/signInWithEmailAndPassword",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("userCredential", userCredential);
      const user = userCredential.user;

      if (user) {
        const userdata = await axios.get(
          `${BaseUrl}/user?user_id=${user.uid}&req_user_id=${user.uid}`
        );
        console.log("userdata", userdata);
        let User = {
          uid: user.uid,
          role: "admin",
          data: {
            accessToken: user.accessToken,
            displayName: user.displayName,
          },
        };

        localStorage.setItem("user", JSON.stringify(User));

        return User;
      } else {
        throw new Error("User not found");
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateUserSettings = createAsyncThunk(
  "user/updateSettings",
  async (settings, { dispatch, getState }) => {
    const { user } = getState();
    const newUser = _.merge({}, user, { data: { settings } });

    dispatch(updateUserData(newUser));

    return newUser;
  }
);

export const updateUserShortcuts = createAsyncThunk(
  "user/updateShortucts",
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

  // history.push({
  //   pathname: '/',
  // });

  // if (!user.role || user.role.length === 0) {
  //   // is guest
  //   return null;
  // }

  // history.push({
  //   pathname: '/',
  // });
  dispatch(setInitialSettings());

  return dispatch(userLoggedOut());
};

export const updateUserData = (user) => async (dispatch, getState) => {
  if (!user.role || user.role.length === 0) {
    return;
  }

  jwtService
    .updateUserData(user)
    .then(() => {
      dispatch(showMessage({ message: "User data saved with api" }));
    })
    .catch((error) => {
      dispatch(showMessage({ message: error.message }));
    });
};

const initialState = {
  role: "guest", // guest
  data: {
  },
};

const userSlice = createSlice({
  name: "user",
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

  extraReducers: (builder) => {
    builder
      .addCase(updateUserSettings.fulfilled, (state, action) => action.payload)
      .addCase(updateUserShortcuts.fulfilled, (state, action) => action.payload)
      .addCase(setUser.fulfilled, (state, action) => action.payload)
      .addCase(signInWithEmailPassword.fulfilled, (state, action) => action.payload)
      .addCase(UpdateUser.fulfilled, (state, action) => {
        console.log("action", action.payload);
        return {
          ...state,
          ...action.payload,
        };
      })
    
       
  },
});

export const { userLoggedOut } = userSlice.actions;

export const selectUser = ({ user }) => user;

export const selectUserShortcuts = ({ user }) => user.data.shortcuts;

export default userSlice.reducer;

