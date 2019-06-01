import React from 'react';
import { createAppContainer, createSwitchNavigator, createDrawerNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import Signinscreen from '../screens/Signinscreen';
import Signupscreen from '../screens/Signupscreen';
import SettingsScreen from '../screens/SettingsScreen';
import MainScreen from '../screens/MainScreen';
<<<<<<< HEAD
import CardComp from '../components/Card';
=======

const AppDrawerNavigator = createDrawerNavigator ({
  Home: {
    screen: MainScreen
  },
  Settings: {
    screen : SettingsScreen
  }
});
>>>>>>> ac28cdeabfe529e33448409579d4730f3a5a4929

export default createAppContainer(createSwitchNavigator(
  {
    Drawer: AppDrawerNavigator,
    SignIn: Signinscreen,
    SignUp: Signupscreen,
    Settings: SettingsScreen,
    Main: CardComp,
  },
  {
    initialRouteName: 'SignIn',
  }
));
<<<<<<< HEAD
=======

>>>>>>> ac28cdeabfe529e33448409579d4730f3a5a4929
