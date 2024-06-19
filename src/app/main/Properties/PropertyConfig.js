import i18next from 'i18next';

import en from 'src/app/configs/navigation-i18n/en.js';
import tr from 'src/app/configs/navigation-i18n/tr.js';
import ar from 'src/app/configs/navigation-i18n/ar.js';
import Property from './Property';
import Addproperty from './Addproperty';
import SearchProperty from './SearchProperty';
import PropertyHome from './Pages/PropertyHome';
import MyProperties from './Pages/MyProperties';
import MySubscriptions from './Pages/MySubscriptions';
import { auth } from '../sign-in/Config';
import { authRoles } from 'src/app/auth';
i18next.addResourceBundle('en', 'propertyPage', en);
i18next.addResourceBundle('tr', 'propertyPage', tr);
i18next.addResourceBundle('ar', 'propertyPage', ar);

const PropertyConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.user,
  routes: [
    {
      path: 'properties',
      element: <Property />,
    },
    {
      path: '/',
      element: <PropertyHome />
    },
    {
      path: 'property/:propertyId',
      element: <Property />,
    },
    {
      path: 'Addproperty',
      element: <Addproperty />,
    },
    {
      path: 'SearchProperty',
      element: <SearchProperty />,
    },
    {
      path: 'MyProperties',
      element: <MyProperties />,
    },
    {
      path: 'mySubscriptions',
      element: <MySubscriptions />,
    },
  ],
};

export default PropertyConfig;
