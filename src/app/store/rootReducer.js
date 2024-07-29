import { combineReducers } from '@reduxjs/toolkit';
import rabit from './rabit';
import i18n from './i18nSlice';
import user from './userSlice';
import properties from '../main/Properties/PropertySlice1';
import manageSearch from '../main/user/ManageSearchSlice';




const createReducer = (asyncReducers) => (state, action) => {
  const combinedReducer = combineReducers({
    rabit,
    i18n,
    user,
    properties,
    manageSearch,
   
    
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
