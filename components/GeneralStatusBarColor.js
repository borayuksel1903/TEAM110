import React from 'react';
import { View, StatusBar } from 'react-native';
import styles from './styles/GeneralStatusBarColorStyles';
const GeneralStatusBarColor = ({ backgroundColor, ...props }) => (
  <View style={[styles.statusBar, { backgroundColor }]}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
);
export default GeneralStatusBarColor;