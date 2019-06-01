import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import Signinscreen from '../screens/Signinscreen';
import Signupscreen from '../screens/Signupscreen';
import SettingsScreen from '../screens/SettingsScreen';
import MainScreen from '../screens/MainScreen';
import CardComp from '../components/Card';

export default createAppContainer(createSwitchNavigator(
  {
    SignIn: Signinscreen,
    SignUp: Signupscreen,
    Settings: SettingsScreen,
    Main: CardComp,
  },
  {
    initialRouteName: 'SignIn',
  }
));
