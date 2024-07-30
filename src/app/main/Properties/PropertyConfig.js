import i18next from 'i18next';

import en from 'src/app/configs/navigation-i18n/en.js';
import tr from 'src/app/configs/navigation-i18n/tr.js';
import ar from 'src/app/configs/navigation-i18n/ar.js';
import Property from './Property';
import Form from './MultiStepForm/Form';
import Addproperty from './Addproperty';
import SearchProperty from './SearchProperty';
import PropertyHome from './Pages/PropertyHome';
import MyProperties from './Pages/MyProperties';
import MySubscriptions from './Pages/MySubscriptions';
import AboutUs from './AboutUs';
import ManageAreas from './Pages/ManageAreas';
import { auth } from '../sign-in/Config';
import { authRoles } from 'src/app/auth';
import Faq from './Faq';
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
    {
      path: 'manage/Areas',
      element: <ManageAreas />,
    },
    {
      path: 'Faq',
      element: <Faq />,
    },
    {
      path: 'AboutUs',
      element: <AboutUs />,
    },
    {
      path: 'UpdateProperty',
      element: <Form />,
    },
    {
      path: 'SupportCustomer',
      element: <SupportCustomer/>,
    },
  ],
};

export default PropertyConfig;
