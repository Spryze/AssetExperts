import i18next from 'i18next';

import en from 'src/app/configs/navigation-i18n/en.js';
import tr from 'src/app/configs/navigation-i18n/tr.js';
import ar from 'src/app/configs/navigation-i18n/ar.js';
import Property from './Property';
import Addproperty from './Addproperty';
import SearchProperty from './SearchProperty';

i18next.addResourceBundle('en', 'propertyPage', en);
i18next.addResourceBundle('tr', 'propertyPage', tr);
i18next.addResourceBundle('ar', 'propertyPage', ar);

const PropertyConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: 'properties',
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
  ],
};

export default PropertyConfig;
