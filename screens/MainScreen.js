import React from 'react';
import { View, ScrollView, StyleSheet, Text, Image, Alert, KeyboardAvoidingView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import GeneralStatusBarColor from '../components/GeneralStatusBarColor';
import { Ionicons } from '@expo/vector-icons';
import { 
  Container, Icon, Item, Form, Input, Button, Label, Header, Left,
  Body, Title, Right
} from "native-base";
import {ART} from 'react-native'
import { AnimatedGaugeProgress, GaugeProgress } from 'react-native-simple-gauge';

export default class MainScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { gasTankPercent: 75 } 
  }
  render() {
    return (
      <Container style={styles.container}>
	<KeyboardAvoidingView behavior="position">
        <Header style={styles.container}>
          <Left>
            <Button
              transparent
              onPress={() => {
                Alert.alert( "Drawer navigation side bar" );
	      }}
            >
              <Ionicons name="ios-menu" color="#DE601B" size={32}/>
            </Button>
          </Left>
          <Body>
            <Title style={styles.textStyle}>HomeScreen</Title>
          </Body>
          <Right />
        </Header>
	<Gauge percent={parseInt(this.state.gasTankPercent)}/>
        <Item floatingLabel style={styles.label}>
          <Label style={styles.label}>Gasonline (0-100)</Label>
          <Input 
	    style={styles.textStyle} 
	    keyboardType={'number-pad'}
	    returnKeyType={"done"}
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={gasTankPercent => {
	      if( gasTankPercent !== "" )
	        this.setState({ gasTankPercent })
	      }}
          />
        </Item>
        </KeyboardAvoidingView >
      </Container>
    );
  }
  _saveAsync = async () => {
    this.props.navigation.navigate('Main');
  };
}

class Gauge extends React.Component {
  render() {
  return(
    <AnimatedGaugeProgress
      style = {styles.gauge}
      size={200}
      width={15}
      fill={this.props.percent}
      rotation={90}
      cropDegree={90}
      tintColor="#4682b4"
      tintColor="#DE601B"
      delay={0}
      backgroundColor="#b0c4de"
      backgroundColor="#ddd"
      stroke={[2, 2]} //For a equaly dashed line
      strokeCap="circle">
      <Image style = {styles.logo}
        source={require('../assets/images/logo.png')}
      />
      </AnimatedGaugeProgress>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff'
  },
  textStyle: {
    color: '#000'
  },
  logo: {
    width: 170.8,
    height: 173.8,
    position: 'absolute',
    top: 15,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  gauge: {
    alignSelf: 'center',
    marginTop: '60%'
  },
  label: {
    alignSelf: 'center',
    width: 300,
    top: 5
  }

});
