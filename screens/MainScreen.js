import React from 'react';
import { View, ScrollView, StyleSheet, Text, Image, Alert, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import GeneralStatusBarColor from '../components/GeneralStatusBarColor';
import { Ionicons } from '@expo/vector-icons';
import { 
  Container, Icon, Item, Form, Input, Button, Label, Header, Left,
  Body, Title, Right
} from "native-base";
import {ART} from 'react-native'
import { AnimatedGaugeProgress, GaugeProgress } from 'react-native-simple-gauge';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

export default class MainScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { gasTankPercent: 75 } 
    this.props.navigation.navigate('Drawer');
  }

  addGas = () => {
    this.setState({ gasTankPercent: Math.min(this.state.gasTankPercent + 5, 100) });
    console.log( this.state.gasTankPercent );
  }
  
  removeGas = () => {
    this.setState({ gasTankPercent: Math.max(this.state.gasTankPercent - 5, 1) });
    console.log( this.state.gasTankPercent );
  }

  render() {
    return (
      <Container style={styles.container}>
        <Header style={styles.container}>
          <Left>
            <Button
              transparent
              onPress={() => {
	        this.props.navigation.openDrawer();
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
	<KeyboardAvoidingView behavior="position">
	  <View style={styles.gauge}>
	    <Button transparent onPress={() =>{console.log(this.props.navigation)}}>
	      <Gauge percent={parseInt(this.state.gasTankPercent)} />
	    </Button>
	  </View>
	<View style={styles.gasFillButtons}>
        <Button transparent style={styles.removeButton} onPress={this.removeGas}>
          <Ionicons name="ios-remove-circle" color="#DE601B" size={32}/>
	</Button>
        <Button transparent style={styles.addButton} onPress={this.addGas}>
          <Ionicons name="ios-add-circle" color="#DE601B" size={32} />
	</Button>
	</View>
          <Item floatingLabel style={styles.label}>
            <Label>Gasonline (0-100)</Label>
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

  constructor(props) {
    super(props);
  }

  render() {

  var tintColor = "#DE601B";

  if( this.props.percent <= 15 ) {
    tintColor = "#773b00";
  }
  else if( this.props.percent <= 30 ) {
    tintColor = "#8e4600"
  }

  return(
    <AnimatedGaugeProgress
      style = {this.props.style}
      size={200}
      width={15}
      fill={this.props.percent}
      rotation={90}
      cropDegree={90}
      tintColor={tintColor}
      delay={100}
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

class GooglePlacesInput extends React.Component {

  render() {
    return(
    <GooglePlacesAutocomplete
    query={{
        // available options: https://developers.google.com/places/web-service/autocomplete
        key: 'AIzaSyDmH8hyjX9rAWQ1i1ZxxNoF-S-wbC3wnaQ',
        language: 'en', // language of the results
        types: '(cities)' // default: 'geocode'
      }}
  placeholder='Enter Location'
  minLength={2}
  autoFocus={false}
  returnKeyType={'default'}
  fetchDetails={true}
  styles={{
    textInputContainer: {
      backgroundColor: 'rgba(0,0,0,0)',
      borderTopWidth: 0,
      borderBottomWidth:0
    },
    textInput: {
      marginLeft: 0,
      marginRight: 0,
      height: 38,
      color: '#5d5d5d',
      fontSize: 16
    },
    predefinedPlacesDescription: {
      color: '#1faadb'
    },
  }}
  currentLocation={false}
/>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff'
  },
  textStyle: {
    color: '#000',
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
  textInput: {
    height: 40,
    width: 300,
    borderWidth: 1,
  },
  gauge: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: '60%'
  },
  gasFillButtons: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    top: 80
  },
  addButton: {
    marginHorizontal: 30 
  },
  removeButton: {
    marginHorizontal: 30
  },
  label: {
    alignSelf: 'center',
    width: 300,
    top: 100,
  }

});
