import i18next from 'i18next';
import ar from './navigation-i18n/ar';
import en from './navigation-i18n/en';
import tr from './navigation-i18n/tr';
import { authRoles } from '../auth';


i18next.addResourceBundle('en', 'navigation', en);
i18next.addResourceBundle('tr', 'navigation', tr);
i18next.addResourceBundle('ar', 'navigation', ar);

const navigationConfig = [
  {
    id: 'example-component',
    title: 'Home',
    translate: 'Home',
    type: 'item',
    icon: 'heroicons-outline:home',
    url: '/',
  },
  {
    id: 'add-properties',
    title: 'Add Properties',
    translate: 'Add-Properties',
    type: 'item',
    icon: 'heroicons-outline:plus',
    url: 'Addproperty',
  },
  {
    id: 'my-properties',
    title: 'My Properties',
    translate: 'My-Properties',
    auth: authRoles.staff ||authRoles.user ||authRoles.admin,
    type: 'item',
    icon: 'heroicons-outline:office-building',
    url: 'MyProperties',
  },
  {
    id: 'my-subscriptions',
    title: 'My Subscriptions',
    translate: 'My-Subscriptions',
    auth: authRoles.staff ||authRoles.user ||authRoles.admin,
    type: 'item',
    icon: 'heroicons-outline:rss',
    url: 'mySubscriptions',
  },
  {
    id: 'manage',
    title: 'Manage',
    translate: 'Manage',
    auth: authRoles.staff,
    type: 'collapse',
    icon: 'heroicons-outline:support',
    children: [
      {
        id: 'manage.users',
        title: 'Users',
        type: 'item',
        url: '/manage/users',
        end: true,
      },
      {
        id: 'manage.properties',
        title: 'Properties',
        type: 'item',
        url: '/manage/properties',
      },
      {
        id: 'manage.Areas',
        title: 'Areas',
        type: 'item',
        url: '/manage/Areas',
      }
    ],
  },
  
];

export default navigationConfig;
