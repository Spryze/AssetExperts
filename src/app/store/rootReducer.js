import { combineReducers } from '@reduxjs/toolkit';
import rabit from './rabit';
import i18n from './i18nSlice';
import user from './userSlice';
import properties from './propertySlice';

import propertySlice from './propertySlice';
const createReducer = (asyncReducers) => (state, action) => {
  const combinedReducer = combineReducers({
    rabit,
    i18n,
    user,
    properties,
    ...asyncReducers,
  });

  /*
	Reset the redux store when user logged out
	 */
  if (action.type === 'user/userLoggedOut') {
    // state = undefined;
  }

  return combinedReducer(state, action);
};

export default createReducer;
