import React from 'react';
import { createAppContainer, createSwitchNavigator, createDrawerNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import Signinscreen from '../screens/Signinscreen';
import Signupscreen from '../screens/Signupscreen';
import SettingsScreen from '../screens/SettingsScreen';
import MainScreen from '../screens/MainScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ForgotPassword from '../screens/ForgotPassword';

const AppDrawerNavigator = createDrawerNavigator ({
  Home: {
    screen: MainScreen
  },
  Settings: {
    screen : SettingsScreen
  },
  Profile: {
    screen: ProfileScreen,
  },
});

export default createAppContainer(createSwitchNavigator(
  {
    Drawer: AppDrawerNavigator,
    SignIn: Signinscreen,
    SignUp: Signupscreen,
    Settings: SettingsScreen,
    Main: MainScreen,
    Profile: ProfileScreen,
    ForgotPassword: ForgotPassword
  },
  {
    initialRouteName: 'SignIn',
  }
));
