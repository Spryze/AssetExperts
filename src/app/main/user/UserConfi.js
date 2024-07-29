import i18next from 'i18next';

import en from 'src/app/configs/navigation-i18n/en.js';
import tr from 'src/app/configs/navigation-i18n/tr.js';
import ar from 'src/app/configs/navigation-i18n/ar.js';
import Profile from './Profile';
import Users from './Users';
// import UserProfile from './UserProfileDetails';
import ManageProperties from '../Properties/Pages/ManageProperties';
import { authRoles } from 'src/app/auth';
import ManageUserProfile from './ManageUserProfile';

i18next.addResourceBundle('en', 'propertyPage', en);
i18next.addResourceBundle('tr', 'propertyPage', tr);
i18next.addResourceBundle('ar', 'propertyPage', ar);

const userConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.user,
  routes: [
    {
      path: '/user/profile',
      element: <Profile />,
    },
    
  ],
  auth: authRoles.admin,
  routes: [
  
    {
      path: '/manage/users',
      element: <Users />,
    },
    {
      path: '/manage/properties',
      element: <ManageProperties />,
    },
    {
      path: '/user/profile',
      element: <Profile />,
    },
    {
      path: '/user/:userId',
      element: <ManageUserProfile />,
    },
    // {
    //   path: '/user/:userId',
    //   element: <EditUseProfile />,
    // },
    
  ],
};

export default userConfig;
