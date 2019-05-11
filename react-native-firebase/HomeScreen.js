import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as firebase from "firebase";
import { Container, Item, Form, Input, Button, Label } from "native-base";




class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Welcome',
  };
  render() {
    const {navigate} = this.props.navigation;
    return (
      <Button
        title="Go to Jane's profile"
        onPress={() => navigate('Profile', {name: 'Jane'})}
      />
    );
  }
}
