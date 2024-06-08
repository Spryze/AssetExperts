// /* eslint import/no-extraneous-dependencies: off */
// import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import history from '@history';
// import _ from '@lodash';
// import { Navigate } from 'react-router-dom';
// import { setInitialSettings } from 'app/store/rabit/settingsSlice';
// import { showMessage } from 'app/store/rabit/messageSlice';
// import settingsConfig from 'app/configs/settingsConfig';
// import jwtService from '../auth/services/jwtService';
// import { getAuth,onAuthStateChanged,signInWithEmailAndPassword,createUserWithEmailAndPassword } from 'firebase/auth';
// import axios from 'axios';
// import { action } from 'mobx';


// export const setUser = createAsyncThunk('user/setUser', async () => {
//   return new Promise((resolve, reject) => {
//     const auth = getAuth();
//     onAuthStateChanged(auth, async (userAuth) => {
//       // console.log("userAuth",userAuth)
//       try {
//         if (userAuth) {
          
//           const response = await axios.get(`https://bac7a5b1-026f-4c31-bb25-b6456ef4b56d-00-1doj8z5pfhdie.sisko.replit.dev/user?user_id=${userAuth.uid}&req_user_id=${userAuth.uid}`);
//           const userData = response.data;
        
          
//           let user = {
//             uid: userAuth.uid,
//             role: userData.profile.role,
//             data: {
//               accessToken: userAuth.accessToken,
//               displayName: userData.profile.name,
//               address:userData.profile.address,
//               comments:userData.profile.comments,
//               email:userData.profile.email,
//               phone_num_1:userData.profile.phone_num_1,
//               phone_num_2:userData.profile.phone_num_2,
//               profession:userData.profile.profession,
//               myProperties :userData.profile.properties
              
//             }
//           };
//           resolve(user); // Resolve with the user object
//         } else {
//           reject(new Error('User not authenticated')); 
//         }
//       } catch (error) {
//         reject(error);
//       }
//     });
//   });
// });



// export const UpdateUser = createAsyncThunk(
//   'user/UpdateUser',
//   async (formData, { rejectWithValue }) => {
//     try {
//       const user = JSON.parse(localStorage.getItem("user"));
//       const cont_user_id = user.uid;
//       console.log("cont_user_id",cont_user_id)
//       console.log("formData",formData)
//       formData.user_id = cont_user_id;
//       formData.req_user_id = cont_user_id;

//       const response = await axios.put('https://bac7a5b1-026f-4c31-bb25-b6456ef4b56d-00-1doj8z5pfhdie.sisko.replit.dev/user', formData);

//       return response.data;
//     } catch (error) {
//       console.error("Error in updating user", error);
//       return rejectWithValue(error.response ? error.response.data : error.message);
//     }
//   }
// );



// export const signUpWithEmailAndPassword = createAsyncThunk(
//   'user/SignupWithEmailPassword',
//   async (data , { rejectWithValue }) => {
//     console.log("userSlice", data);
//     try {
//       const auth = getAuth();
//       const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
//       const user = userCredential.user;
//       console.log("user", user);
//       if (user && user.uid) { 
//         const userData = {
//           name: data.displayName,
//           email: data.email,
//           id: user.uid,
//           role:data.role,
//           ph_num_1:data.ph_num_1
//         };
//         console.log("userdata", userData);
//         try {
//         const response = await axios.post("https://bac7a5b1-026f-4c31-bb25-b6456ef4b56d-00-1doj8z5pfhdie.sisko.replit.dev/user", userData);
//         console.log('response ', response);
//         }
//         catch{
          
//         }
//         if (!response.ok) {
//           console.log('Failed to send user data to server');
//         }

  

//       } else {
//         console.error('Failed to create user');
//         return rejectWithValue('Failed to create user');
//       }
//     } catch (error) {
//       console.error('Error:', error.message);
//       return rejectWithValue(error.message);
//     }
//   }
// );

// export const UserProfile = createAsyncThunk(
//   'user/UserProfile',
//   async (_, { rejectWithValue }) => {
    
//     try {
//       const user = JSON.parse(localStorage.getItem("user"));
//       const cont_user_id = user.uid;
      
//       const userdata = await axios.get(`https://bac7a5b1-026f-4c31-bb25-b6456ef4b56d-00-1doj8z5pfhdie.sisko.replit.dev/user?user_id=${cont_user_id}&req_user_id=${cont_user_id}`)
//       console.log("userdata", userdata.data); 
//       return userdata.data;
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );




// export const signInWithEmailPassword = createAsyncThunk(
//   'user/signInWithEmailAndPassword',
//   async ({ email, password }, { rejectWithValue }) => { 
//     try {
//       const auth = getAuth();
//       const userCredential = await signInWithEmailAndPassword(auth, email, password);
//       console.log("userCredential",userCredential)
//       const user = userCredential.user;
      
//       if (user) {
//         const userdata = await axios.get(`https://bac7a5b1-026f-4c31-bb25-b6456ef4b56d-00-1doj8z5pfhdie.sisko.replit.dev/user?user_id=${user.uid}&req_user_id=${user.uid}`)
//         console.log("userdata",userdata)
//         let User = {
//           uid: user.uid,
//           role: "admin",
//           data: {
//             accessToken: user.accessToken,
//             displayName: user.displayName,
//           }
//         };
        
//         localStorage.setItem('user', JSON.stringify(User));
      
        
//         return User;
//       } else {
//         throw new Error("User not found");
//       }
//     } catch (error) {

//       return rejectWithValue(error.message);
//     }
//   }
// );


// export const updateUserSettings = createAsyncThunk(
//   'user/updateSettings',
//   async (settings, { dispatch, getState }) => {
//     const { user } = getState();
//     const newUser = _.merge({}, user, { data: { settings } });

//     dispatch(updateUserData(newUser));

//     return newUser;
//   }
// );

// export const updateUserShortcuts = createAsyncThunk(
//   'user/updateShortucts',
//   async (shortcuts, { dispatch, getState }) => {
//     const { user } = getState();
//     const newUser = {
//       ...user,
//       data: {
//         ...user.data,
//         shortcuts,
//       },
//     };

//     dispatch(updateUserData(newUser));

//     return newUser;
//   }
// );

// export const logoutUser = () => async (dispatch, getState) => {
//   const { user } = getState();

//   // history.push({
//   //   pathname: '/',
//   // });
  
//   // if (!user.role || user.role.length === 0) {
//   //   // is guest
//   //   return null;
//   // }

//   // history.push({
//   //   pathname: '/',
//   // });
//   dispatch(setInitialSettings());

//   return dispatch(userLoggedOut());
// };

// export const updateUserData = (user) => async (dispatch, getState) => {
//   if (!user.role || user.role.length === 0) {
//     return;
//   }

//   jwtService
//     .updateUserData(user)
//     .then(() => {
//       dispatch(showMessage({ message: 'User data saved with api' }));
//     })
//     .catch((error) => {
//       dispatch(showMessage({ message: error.message }));
//     });
// };

// const initialState = {
//   role: 'guest', // guest
//   data: {
//     // displayName: 'John Doe',
//     // photoURL: 'assets/images/avatars/brian-hughes.jpg',
//     // email: 'johndoe@withinpixels.com',
//     // shortcuts: ['apps.calendar', 'apps.mailbox', 'apps.contacts', 'apps.tasks'],
//   },
// };

// const userSlice = createSlice({
//   name: 'user',
//   initialState,
//   reducers: {
//     userLoggedOut: (state, action) => initialState,
//   },
//   setUser: (state, action) => {
//     return {
//       ...state,
//       ...action.payload,
//     };
//   },

//   extraReducers: {
//     [updateUserSettings.fulfilled]: (state, action) => action.payload,
//     [updateUserShortcuts.fulfilled]: (state, action) => action.payload,
//     [setUser.fulfilled]: (state, action) => action.payload,
//     [signInWithEmailPassword.fulfilled]:(state,action)=>action.payload,
//     [UpdateUser.fulfilled]:(state,action) => action.payload,
//   },
// });

// export const { userLoggedOut } = userSlice.actions;


// export const selectUser = ({ user }) => user;

// export const selectUserShortcuts = ({ user }) => user.data.shortcuts;

// export default userSlice.reducer;





/* eslint import/no-extraneous-dependencies: off */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import history from '@history';
import _ from '@lodash';
import { Navigate } from 'react-router-dom';
import { setInitialSettings } from 'app/store/rabit/settingsSlice';
import { showMessage } from 'app/store/rabit/messageSlice';
import settingsConfig from 'app/configs/settingsConfig';
import jwtService from '../auth/services/jwtService';
import { getAuth,onAuthStateChanged,signInWithEmailAndPassword,createUserWithEmailAndPassword } from 'firebase/auth';
import axios from 'axios';


export const setUser = createAsyncThunk('user/setUser', async () => {
  return new Promise((resolve, reject) => {
    const auth = getAuth();
    onAuthStateChanged(auth, async (userAuth) => {
      try {
        if (userAuth) {
          const response = await axios.get(`https://bac7a5b1-026f-4c31-bb25-b6456ef4b56d-00-1doj8z5pfhdie.sisko.replit.dev/user?user_id=${userAuth.uid}&req_user_id=${userAuth.uid}`);
          const userData = response.data;
          console.log("userdata", userData);
          
          let user = {
            uid: userAuth.uid,
            role: userData.profile.role,
            data: {
              accessToken: userAuth.accessToken,
              displayName: userData.profile.name,
              address:userData.profile.address,
              comments:userData.profile.comments,
              email:userData.profile.email,
              phone_num_1:userData.profile.phone_num_1,
              phone_num_2:userData.profile.phone_num_2,
              profession:userData.profile.profession,
              requirements:userData.profile.requirements,
              
            }
          };
          resolve(user);
        } else {
          reject(new Error('User not authenticated')); 
        }
      } catch (error) {
        reject(error);
      }
    });
  });
});



export const UpdateUser = createAsyncThunk(
  'user/UpdateUser',
  async (formData, { rejectWithValue }) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const cont_user_id = user.uid;
      console.log("cont_user_id",cont_user_id)
      console.log("formData",formData)
      formData.user_id = cont_user_id;
      formData.req_user_id = cont_user_id;

      const response = await axios.put('https://bac7a5b1-026f-4c31-bb25-b6456ef4b56d-00-1doj8z5pfhdie.sisko.replit.dev/user', formData);

      return response.data;
    } catch (error) {
      console.error("Error in updating user", error);
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);



export const signUpWithEmailAndPassword = createAsyncThunk(
  'user/SignupWithEmailPassword',
  async ({ email, password, displayName }, { rejectWithValue }) => {
    console.log("userSlice", email, password, displayName);
    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log("user", user);
      if (user && user.uid) { 
        const userData = {
          name: displayName,
          email: email,
          id: user.uid
        };
        console.log("userdata", userData);
        
        const response = await axios.post("https://bac7a5b1-026f-4c31-bb25-b6456ef4b56d-00-1doj8z5pfhdie.sisko.replit.dev/user", userData);
        console.log('response ', response);
        
        if (!response.ok) {
          console.log('Failed to send user data to server');
        }

  

      } else {
        console.error('Failed to create user');
        return rejectWithValue('Failed to create user');
      }
    } catch (error) {
      console.error('Error:', error.message);
      return rejectWithValue(error.message);
    }
  }
);

export const UserProfile = createAsyncThunk(
  'user/UserProfile',
  async (_, { rejectWithValue }) => {
    
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const cont_user_id = user.uid;
      
      const userdata = await axios.get(`https://bac7a5b1-026f-4c31-bb25-b6456ef4b56d-00-1doj8z5pfhdie.sisko.replit.dev/user?user_id=${cont_user_id}&req_user_id=${cont_user_id}`)
      console.log("userdata", userdata.data); 
      return userdata.data; 

    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);




export const signInWithEmailPassword = createAsyncThunk(
  'user/signInWithEmailAndPassword',
  async ({ email, password }, { rejectWithValue }) => { 
    try {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      if (user) {
        const userData = await axios.get(`https://bac7a5b1-026f-4c31-bb25-b6456ef4b56d-00-1doj8z5pfhdie.sisko.replit.dev/user?user_id=${user.uid}&req_user_id=${user.uid}`)
        // console.log("userdata",userdata)
        let User = {
          uid: user.uid,
          role: userData.data.profile.role,
          data: {
            accessToken: user.accessToken,
            displayName: userData.data.profile.name,
              address:userData.data.profile.address,
              comments:userData.data.profile.comments,
              email:userData.data.profile.email,
              phone_num_1:userData.data.profile.phone_num_1,
              phone_num_2:userData.data.profile.phone_num_2,
              profession:userData.data.profile.profession,
              requirements:userData.data.profile.requirements,
          }
        };
        
        localStorage.setItem('user', JSON.stringify(User));
        // Navigate("/")
        
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
      dispatch(showMessage({ message: 'User data saved with api' }));
    })
    .catch((error) => {
      dispatch(showMessage({ message: error.message }));
    });
};

const initialState = {
  role: 'guest', // guest
  data: {
    // displayName: 'John Doe',
    // photoURL: 'assets/images/avatars/brian-hughes.jpg',
    // email: 'johndoe@withinpixels.com',
    // shortcuts: ['apps.calendar', 'apps.mailbox', 'apps.contacts', 'apps.tasks'],
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