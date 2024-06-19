

// import { configureStore } from '@reduxjs/toolkit';
// import userReducer from './userSlice';

// const store = configureStore({
//   reducer: {
//     user: userReducer,
//   },
// });

// export default store;
// src/store/store.js

import { configureStore } from '@reduxjs/toolkit';
import manageSearchReducer from './ManageSearchSlice';
import userReducer from 'app/store/userSlice';

const store = configureStore({
  reducer: {
    manageSearch: manageSearchReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
