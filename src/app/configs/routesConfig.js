import RabitUtils from '@rabit/utils';
import RabitLoading from '@rabit/core/RabitLoading';
import { Navigate } from 'react-router-dom';
import settingsConfig from 'app/configs/settingsConfig';
import SignInConfig from '../main/sign-in/SignInConfig';
import SignUpConfig from '../main/sign-up/SignUpConfig';
import SignOutConfig from '../main/sign-out/SignOutConfig';
import Error404Page from '../main/404/Error404Page';
import ExampleConfig from '../main/example/ExampleConfig';
import PropertyConfig from '../main/Properties/PropertyConfig';
import userConfig from '../main/user/UserConfi';
import { useParams } from 'react-router-dom';


const routeConfigs = [ExampleConfig, SignOutConfig, SignInConfig, SignUpConfig,PropertyConfig,userConfig];

const routes = [
  ...RabitUtils.generateRoutesFromConfigs(routeConfigs, settingsConfig.defaultAuth),
  // {
  //   path: '/',
  //   element: <Navigate to="/example" />,
  //   auth: settingsConfig.defaultAuth,
  // },
  {
    path: 'loading',
    element: <RabitLoading />,
  },
  {
    path: '404',
    element: <Error404Page />,
  },
  {
    path: '*',
    element: <Navigate to="404" />,
  },
  // {
  //   path: 'properties/:propertyId',
  //   element: <Navigate to="/Properties" />,
  // },
  // {
  //   path: 'Addproperty',
  //   element: <Navigate to="/Addproperty" />,
  // },
];

export default routes;
