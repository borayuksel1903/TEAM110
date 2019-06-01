import React from 'react';
import { ScrollView, StyleSheet,Text} from 'react-native';
import { Container, Item, Form, Input, Button, Label, } from "native-base"
import GeneralStatusBarColor from '../components/GeneralStatusBarColor';

export default class MainScreen extends React.Component {
  render() {
    return (
      <Container style={styles.container}>
        <GeneralStatusBarColor backgroundColor="#000"barStyle="light-content"/>
        <Text style={styles.textStyle}>This is the Main screen of the page</Text>
      </Container>
    );
  }
  /*_saveAsync = async () => {
    this.props.navigation.navigate('Main');
  };*/
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#000',
    justifyContent: 'center',
  },
  textStyle: {
    color: '#fff'
  }
});
