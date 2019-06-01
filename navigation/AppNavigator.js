import React from 'react';
import { createAppContainer, createSwitchNavigator, createDrawerNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import Signinscreen from '../screens/Signinscreen';
import Signupscreen from '../screens/Signupscreen';
import SettingsScreen from '../screens/SettingsScreen';
import MainScreen from '../screens/MainScreen';

const AppDrawerNavigator = createDrawerNavigator ({
  Home: {
    screen: MainScreen
  },
  Settings: {
    screen : SettingsScreen
  }
});

export default createAppContainer(createSwitchNavigator(
  {
    Drawer: AppDrawerNavigator,
    SignIn: Signinscreen,
    SignUp: Signupscreen,
    Settings: SettingsScreen,
    Main: MainScreen,
  },
  {
    initialRouteName: 'SignIn',
  }
));
