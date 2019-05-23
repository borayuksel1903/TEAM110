import React from 'react';
import { ScrollView, StyleSheet,Text, View} from 'react-native';
import { Container, Header, Body, Title, Button, Label} from "native-base";
import GeneralStatusBarColor from '../components/GeneralStatusBarColor';
import CardComp from '../components/Card';

export default class SettingsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.props.navigation.navigate('Drawer');
  }

  render() {
    return (
      <Container style={styles.container}>
        <GeneralStatusBarColor backgroundColor="#fff"barStyle="light-content"/>
        <CardComp navigation={this.props.navigation}/>
      </Container>
      
      
    );
  }
  _saveAsync = async () => {
    this.props.navigation.navigate('Main');
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backButton:{
    padding:'20%',
    backgroundColor:'#DE601B',
    alignSelf: 'center'
  },
  logo:{
    height: 60,
    width: 60,
  }
});
