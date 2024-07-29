// import '@mock-api';
import BrowserRouter from '@rabit/core/BrowserRouter';
import RabitLayout from '@rabit/core/RabitLayout';
import RabitTheme from '@rabit/core/RabitTheme';
import { SnackbarProvider } from 'notistack';
import { useDispatch, useSelector } from 'react-redux';
import rtlPlugin from 'stylis-plugin-rtl';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { selectCurrentLanguageDirection } from 'app/store/i18nSlice';
import { selectUser } from 'app/store/userSlice';
import themeLayouts from 'app/theme-layouts/themeLayouts';
import { selectMainTheme,selectMainThemeDark,selectMainThemeGreen,selectMainThemeLight } from 'app/store/rabit/settingsSlice';
import RabitAuthorization from '@rabit/core/RabitAuthorization';
import settingsConfig from 'app/configs/settingsConfig';
import withAppProviders from './withAppProviders';
import { AuthProvider } from './auth/AuthContext';
import { CircularProgress } from '@mui/material';
import { useState } from 'react';
import  'src/styles/style.css'



const emotionCacheOptions = {
  
  rtl: {
    key: 'muirtl',
    stylisPlugins: [rtlPlugin],
    insertionPoint: document.getElementById('emotion-insertion-point'),
  },
  ltr: {
    key: 'muiltr',
    stylisPlugins: [],
    insertionPoint: document.getElementById('emotion-insertion-point'),
  },
};

const App = () => {
  const [loading, setLoading] = useState(false);
  const user = useSelector(selectUser);
  const langDirection = useSelector(selectCurrentLanguageDirection);
  const mainTheme = useSelector(selectMainThemeGreen);


  return (
   
    
    <CacheProvider value={createCache(emotionCacheOptions[langDirection])}>
      {loading && <CircularProgress/>}
      <RabitTheme theme={mainTheme} direction={langDirection}>
        <AuthProvider>
          <BrowserRouter>
            <RabitAuthorization
              userRole={user.role}

              loginRedirectUrl={settingsConfig.loginRedirectUrl}
            >
              <SnackbarProvider
                maxSnack={5}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                classes={{
                  containerRoot: 'bottom-0 right-0 mb-52 md:mb-68 mr-8 lg:mr-80 z-99',
                }}
              >
                <RabitLayout layouts={themeLayouts} />
              </SnackbarProvider>
            </RabitAuthorization>
          </BrowserRouter>
        </AuthProvider>
      </RabitTheme>
    </CacheProvider>
  );
};

export default withAppProviders(App)();
