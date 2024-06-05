import i18next from 'i18next';

import en from 'src/app/configs/navigation-i18n/en.js';
import tr from 'src/app/configs/navigation-i18n/tr.js';
import ar from 'src/app/configs/navigation-i18n/ar.js';
import Profile from './Profile';
import Users from './Users';
import MyProperties from '../Properties/Pages/MyProperties';
import { authRoles } from 'src/app/auth';

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
      path: '/manage',
      element: <Profile />,
    },
    {
      path: '/manage/users',
      element: <Users />,
    },
    {
      path: '/manage/properties',
      element: <MyProperties />,
    },
    
  ],
};

export default userConfig;
