import * as React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import RabitSplashScreen from '@rabit/core/RabitSplashScreen';
import { showMessage } from 'app/store/rabit/messageSlice';
import { logoutUser, setUser } from 'app/store/userSlice';
import jwtService from './services/jwtService';
import { useNavigate } from 'react-router-dom';

const AuthContext = React.createContext();

function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(undefined);
  const [waitAuthCheck, setWaitAuthCheck] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    jwtService.on('onAutoLogin', (user) => {
      // dispatch(showMessage({ message: 'Signing in with JWT' }));
      success(user, 'Signed in');

      /**
       * Sign in and retrieve user data with stored token
       */
      // jwtService
      //   .signInWithToken()
      //   .then((user) => {
      //     success(user, 'Signed in with JWT');
      //   })
      //   .catch((error) => {
      //     pass(error.message);
      //   });
    });

    jwtService.on('onLogin', (user) => {
      success(user, 'Signed in');
    });

    jwtService.on('onLogout', () => {
      pass('Signed out');

      dispatch(logoutUser());
    });

    jwtService.on('onAutoLogout', (message) => {
      pass(message);

      dispatch(logoutUser());
    });

    jwtService.on('onNoAccessToken', () => {
      pass();
    });

    jwtService.init();

    function success(user, message) {
      if (message) {
        // dispatch(showMessage({ message }));
      }

      Promise.all([
        dispatch(setUser(user)),
        
      ]).then((values) => {
        setWaitAuthCheck(false);
        setIsAuthenticated(true);
      });
    }

    function pass(message) {
      if (message) {
        dispatch(showMessage({ message }));
      }

      setWaitAuthCheck(false);
      setIsAuthenticated(false);
    }
  }, [dispatch]);

  return waitAuthCheck ? (
    <RabitSplashScreen />
  ) : (
    <AuthContext.Provider value={{ isAuthenticated }}>{children}</AuthContext.Provider>
  );
}

function useAuth() {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  return context;
}

export { AuthProvider, useAuth };
