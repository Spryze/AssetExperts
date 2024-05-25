import i18next from 'i18next';
import ar from './navigation-i18n/ar';
import en from './navigation-i18n/en';
import tr from './navigation-i18n/tr';

i18next.addResourceBundle('en', 'navigation', en);
i18next.addResourceBundle('tr', 'navigation', tr);
i18next.addResourceBundle('ar', 'navigation', ar);

const navigationConfig = [
  // {
  //   id: 'example-component',
  //   title: 'Home',
  //   translate: 'EXAMPLE',
  //   type: 'item',
  //   icon: 'heroicons-outline:home',
  //   url: 'Home',
  // },
  {
    id: 'example-component',
    title: 'Home',
    translate: 'Home',
    type: 'item',
    icon: 'heroicons-outline:home',
    url: '/',
  },
  // {
  //   id: 'properties',
  //   title: 'Properties',
  //   translate: 'PROPERTIES',
  //   type: 'item',
  //   icon: 'heroicons-outline:home',
  //   url: 'property/:propertyId',
  // },
  {
    id: 'add-properties',
    title: 'AddProperties',
    translate: 'Add-Properties',
    type: 'item',
    icon: 'heroicons-outline:plus',
    url: 'Addproperty',
  },
];

export default navigationConfig;
