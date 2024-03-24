import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './screens/Splash';
import LoginScreen from './screens/Login';
import SignupScreen from './screens/Signup';
import HomeScreen from './screens/Home';
import AdminPanel from './screens/AdminPanel/AdminPanel';
import AdminLoginScreen from './screens/AdminPanel/AdminLogin';
import { ErrorProvider } from './screens/ErrorContext';
import { AsyncStorage } from 'react-native';

export default function App() {
  const Stack = createStackNavigator();
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Check if user is already authenticated
    const checkAuthentication = async () => {
      const token = await AsyncStorage.getItem('userToken');
      const adminToken = await AsyncStorage.getItem('adminToken');
      console.log('User Token:', token);
      console.log('Admin Token:', adminToken);
      if (token) {
        setUserToken(token);
        setIsAdmin(false);
      } else if (adminToken) {
        setUserToken(adminToken);
        setIsAdmin(true);
      }
      setIsLoading(false);
    };

    checkAuthentication();
  }, []);

  const authContext = {
    signIn: async (token, admin = false) => {
      setUserToken(token);
      if (admin) {
        setIsAdmin(true);
        await AsyncStorage.setItem('adminToken', token);
      } else {
        setIsAdmin(false);
        await AsyncStorage.setItem('userToken', token);
      }
    },
    signOut: async () => {
      setUserToken(null);
      setIsAdmin(false);
      await AsyncStorage.removeItem('userToken');
      await AsyncStorage.removeItem('adminToken');
    },
  };

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <ErrorProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {userToken === null ? (
            <>
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Signup" component={SignupScreen} />
            </>
          ) : isAdmin ? (
            <Stack.Screen name="AdminPanel" component={AdminPanel} />
          ) : (
            <Stack.Screen name="Home" component={HomeScreen} />
          )}
          <Stack.Screen name="AdminLogin" component={AdminLoginScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ErrorProvider>
  );
}
