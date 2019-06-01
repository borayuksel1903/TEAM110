import React from 'react';
import { View, ScrollView, StyleSheet, Text, Image, Alert, KeyboardAvoidingView, TouchableOpacity, Animated } from 'react-native';
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
import Modal from "react-native-modal";

// TESTING TO MAKE SURE MAP SHOWS FOR MIHAI

export default class MainScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = { 
      gasTankPercent: 10, 
      animation: true, 
      isModalVisible: false,
      recommendedAdd: "Address 1    Price    5mi",
      cheapeastAdd: "Address 2    Price    6mi",
      shortestDistAdd: "Address 3    Price    7mi",
      fastestDurationAdd: "Address 4    Price    8mi"
    } 
    this.props.navigation.navigate('Drawer');
    this.cycle = 0;
    this.increment = 5;
    this.intervalID = 0; 
    this.maxCycles = 1;
  }

  // function to toggle the appearance of pop-up screen
  toggleModal = () => {
      this.setState({ isModalVisible: !this.state.isModalVisible });
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
        <Animated.View>
	        <View style={styles.gauge}>
	          <Button transparent onPress={() =>{this.toggleModal}}>
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

        {/*popup for gas up*/}
        <Modal isVisible={this.state.isModalVisible} onBackdropPress={() => this.toggleModal}>
                    <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between', marginTop: '40%', marginLeft: '5%' }}>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                            <Text style={{ color: 'white', fontSize: 25}}>
                                {this.state.recommendedAdd}  
                            </Text>
                        <Button title="->"
                            onPress={() => { Linking.openURL('https://www.google.com/maps/dir/?api=1&origin=32.8801,-117.2340&destination=100.5816,121.4944') }} color="#FFFFFF" />
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ color: 'white', fontSize: 25 }}>
                                {this.state.cheapeastAdd}
                            </Text>
                            <Button title="->"
                                onPress={() => { Linking.openURL('https://www.google.com/maps/dir/?api=1&origin=32.8801,-117.2340&destination=138.5816,-21.4944') }} color="#FFFFFF" />
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ color: 'white', fontSize: 25 }}>
                                {this.state.shortestDistAdd}
                            </Text>
                            <Button title="->"
                                onPress={() => { Linking.openURL('https://www.google.com/maps/dir/?api=1&origin=32.8801,-117.2340&destination=38.5816,-121.4944') }} color="#FFFFFF" />
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ color: 'white', fontSize: 25 }}>
                                {this.state.fastestDurationAdd}
                            </Text>
                            <Button title="->"
                                onPress={() => { Linking.openURL('https://www.google.com/maps/dir/?api=1&origin=32.8801,-117.2340&destination=38.5816,-121.4944') }} color="#FFFFFF" />
                        </View>
                    </View>
                    <Button title="Close" onPress={this.toggleModal} color="#FFFFFF" />
                </Modal>
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
    backgroundColor: '#FFF'
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
