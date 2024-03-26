// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './screens/non-admin-panel/Splash';
import LoginScreen from './screens/non-admin-panel/Login';
import SignupScreen from './screens/non-admin-panel/Signup';
import { ErrorProvider } from './screens/non-admin-panel/ErrorContext';
import ForgotPasswordScreen from './screens/non-admin-panel/ForgotPassword';
import OTPCheckerScreen from './screens/non-admin-panel/CheckOtp';
import ResetPasswordScreen from './screens/non-admin-panel/ResetPassword';
import HomeScreen from './screens/non-admin-panel/Home';
import Emergency from './screens/non-admin-panel/Emergency';
import ProfileScreen from './screens/non-admin-panel/Profile';
import Settings from './screens/non-admin-panel/Settings';
import { ColorSchemeProvider } from './screens/non-admin-panel/ColorSchemeContext';
import Details from './screens/non-admin-panel/Details';
import Partners from './screens/non-admin-panel/Partners';
import AboutUs from './screens/non-admin-panel/AboutUs';
import ContactUs from './screens/non-admin-panel/ContactUs';
import Condition from './screens/non-admin-panel/Conditions';
import Privacy from './screens/non-admin-panel/Privacy';
import FAQ from './screens/non-admin-panel/FAQ';
import Chatbot from './screens/non-admin-panel/Chatbot';
import HealthEducationScreen from './screens/non-admin-panel/Resource'
import MedicationTrackerScreen from './screens/non-admin-panel/MedicationTrackerScreen';
import AddMedicationScreen from './screens/non-admin-panel/AddMedicationScreen';
import UpdateMedicationScreen from './screens/non-admin-panel/UpdateMedicationScreen';
import HospitalSelection from './screens/non-admin-panel/Echannelling';
import TalkToDoctorNow from './screens/non-admin-panel/TalkToDoctorNow';
import MedicationReminder from './screens/non-admin-panel/MedicationReminder';
import AdminPanel from './screens/admin-panel/AdminPanel';
import UserManagementScreen from './screens/admin-panel/UserManagementScreen';
import AdminLoginScreen from './screens/admin-panel/AdminLoginScreen';
import EmailCheckScreen from './screens/non-admin-panel/EmailCheck';
import AdminCheckOtpScreen from './screens/admin-panel/AdminCheckOtp';
import AdminForgotPasswordScreen from './screens/admin-panel/AdminForgotPassword';
import AdminResetPasswordScreen from './screens/admin-panel/AdminResetPassword';

export default function App() {
  const Stack = createStackNavigator();
  return (
    <ErrorProvider>
      <ColorSchemeProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="Splash" component={SplashScreen} />
            <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
            <Stack.Screen name="CheckOtp" component={OTPCheckerScreen} />
            <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Emergency" component={Emergency} />
            <Stack.Screen name="Chatbot" component={Chatbot} />
            <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
            <Stack.Screen name="Settings" component={Settings} />
            <Stack.Screen name="Details" component={Details} />
            <Stack.Screen name="Partners" component={Partners} />
            <Stack.Screen name="ContactUs" component={ContactUs} />
            <Stack.Screen name="AboutUs" component={AboutUs} />
            <Stack.Screen name="Conditions" component={Condition} />
            <Stack.Screen name="Privacy" component={Privacy} />
            <Stack.Screen name="FAQ" component={FAQ} />
            <Stack.Screen name="Resource" component={HealthEducationScreen} />
            <Stack.Screen name="AddMedication" component={AddMedicationScreen} />
            <Stack.Screen name="MedicationTracker" component={MedicationTrackerScreen} />
            <Stack.Screen name="UpdateMedication" component={UpdateMedicationScreen} />
            <Stack.Screen name="Echannelling" component={HospitalSelection} />
            <Stack.Screen name="TDN" component={TalkToDoctorNow} />
            <Stack.Screen name="Reminder" component={MedicationReminder} />
            <Stack.Screen name="AdminPanel" component={AdminPanel} />
            <Stack.Screen name="UserManagement" component={UserManagementScreen} />
            <Stack.Screen name="AdminLogin" component={AdminLoginScreen} />
            <Stack.Screen name="EmailCheck" component={EmailCheckScreen} />
            <Stack.Screen name="AdminForgotPassword" component={AdminForgotPasswordScreen} />
            <Stack.Screen name="AdminCheckOtp" component={AdminCheckOtpScreen} />
            <Stack.Screen name="AdminResetPassword" component={AdminResetPasswordScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </ColorSchemeProvider>
    </ErrorProvider>
  );
}
