import React from 'react';
import { View, ScrollView, StyleSheet, Text, Image, Alert, KeyboardAvoidingView, TouchableOpacity, Animated , TextInput } from 'react-native';
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
import MapView from 'react-native-maps';

export default class MainScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = { gasTankPercent: 10, animation: true, text:"Enter your current location" } 
    this.props.navigation.navigate('Drawer');
    this.cycle = 0;
    this.increment = 5;
    this.intervalID = 0; 
    this.maxCycles = 1;
  }

  addGas = () => {
    this.setState({ gasTankPercent: Math.min(this.state.gasTankPercent + 5, 100), animation: false });
    console.log( this.state.gasTankPercent );
  }
  
  removeGas = () => {
    this.setState({ gasTankPercent: Math.max(this.state.gasTankPercent - 5, 1), animation: false });
    console.log( this.state.gasTankPercent );
  }

  componentDidMount() {
    this.intervalID = setInterval(() => {
      this.initAnimation();
    }, 25);
    /* 
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log("wokeeey");
        console.log(position);
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 },
    );
    */
  }

  componentWillUnmount() {
    clearInterval(this.intervalID); 
  }

  initAnimation = () => {
    if( this.state.animation === false ) {
      clearInterval(this.intervalID);
    }

    if( this.state.gasTankPercent % 100 === 0 ) {
       this.increment = this.increment * -1;
       this.cycle = this.cycle + 1;
    }
    else if( this.cycle === this.maxCycles && this.state.gasTankPercent === 70 ) {
      this.setState({ animation: false }); 
      return 
    }

    this.setState({ gasTankPercent: this.state.gasTankPercent + this.increment });

  }

  render() {
  let { init } = this.state;
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
  
        <MapView style={{flex: 1}} showsUserLocation={true} /> 
	<View style={styles.gasUpComp}>
          <Animated.View>
	    <View style={styles.gauge}>
	      <Button transparent onPress={() =>{Alert.alert("Gas Up")}}>
	        <Gauge percent={this.state.gasTankPercent} />
	      </Button>
	    </View>
	    <View style={styles.gasFillButtons}>
              <TouchableOpacity transparent style={styles.removeButton} onPress={this.removeGas}>
                <Ionicons name="ios-remove-circle" color="#DE601B" size={64}/>
	      </TouchableOpacity>
              <TouchableOpacity transparent style={styles.addButton} onPress={this.addGas}>
                <Ionicons name="ios-add-circle" color="#DE601B" size={64} />
	      </TouchableOpacity>
	    </View>
          </Animated.View>
        </View>
        {/*<TextInput
        style={{height: 40, borderColor: 'gray', borderWidth: 1 , marginBottom: '40%'}}
        onChangeText={(text) => this.setState({text})}
        value={this.state.text}
        />
        <Animated.View>
	  <View style={styles.gauge}>
	    <Button transparent onPress={() =>{Alert.alert("Gas Up")}}>
	      <Gauge percent={this.state.gasTankPercent} />
	    </Button>
	  </View>
	  <View style={styles.gasFillButtons}>
            <TouchableOpacity transparent style={styles.removeButton} onPress={this.removeGas}>
              <Ionicons name="ios-remove-circle" color="#DE601B" size={64}/>
	    </TouchableOpacity>
            <TouchableOpacity transparent style={styles.addButton} onPress={this.addGas}>
              <Ionicons name="ios-add-circle" color="#DE601B" size={64} />
	    </TouchableOpacity>
	  </View>
        </Animated.View>*/}
      </Container>
    );
  }
  _saveAsync = async () => {
    this.props.navigation.navigate('Main');
  };
}

class Gauge extends React.Component {

  render() {
    var tintColor = "#DE601B";

    if( this.props.percent <= 20 ) {
      tintColor = "#773b00";
    }

    return(
      <GaugeProgress
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
        </GaugeProgress>
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
  gasUpComp: {
    position: 'absolute', 
    alignSelf: 'center', 
    top: '70%'
  },
  gauge: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  gasFillButtons: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    top: 60,
    marginBottom: '30%'
  },
  addButton: {
    marginHorizontal: 50 
  },
  removeButton: {
    marginHorizontal: 50
  },
  label: {
    alignSelf: 'center',
    width: 300,
    top: 100,
  }
});
