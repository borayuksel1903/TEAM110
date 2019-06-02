import React from 'react';
import { View, ScrollView, StyleSheet, Text, Image, Alert, KeyboardAvoidingView, TouchableOpacity, Animated , TextInput, Linking } from 'react-native';
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

let { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 0;
const LONGITUDE = 0;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const Mobil = { 
  coordinate: {latitude: 32.8710589032578, longitude: -117.233255945994},
  regular: 4.36, 
  midgrade: 4.46,
  premium: 4.56,
  name: "Mobil"
}

const Shell = {
  coordinate: {latitude: 32.8785606, longitude: -117.2115184},
  regular: 4.07,
  midgrade: 4.20,
  premium: 4.31,
  name: "Shell"
}

const Chevron = {
  coordinate: {latitude: 32.880543494186675, longitude: -117.23468732639935},
  regular: 4.02,
  midgrade: 4.16,
  premium: 4.26,
  name: "Chevron"
}

const Arco = {
  coordinate: {latitude: 32.8785606, longitude: -117.20916169999998},
  regular: 3.70,
  midgrade: 3.90,
  premium: 4.00,
  name: "Arco"
}
// TESTING TO MAKE SURE MAP SHOWS FOR MIHAI

export default class MainScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = { gasTankPercent: 10,
       animation: true, 
       text:"Enter your current location" ,
       latitude: null,
       longitude:null ,
       myrecsName: [],
       myrecsCoordLat:[],
       myrecsCoordLong:[]
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
  }
  
  removeGas = () => {
    this.setState({ gasTankPercent: Math.max(this.state.gasTankPercent - 5, 0), animation: false });
  }

  componentDidMount() {
    this.intervalID = setInterval(() => {
      this.initAnimation();
    }, 25);

    this.watchID = navigator.geolocation.watchPosition(
      position => {
        this.setState({
          region: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }
        });
      }
    );
  }

  componentWillUnmount() {
    clearInterval(this.intervalID); 
    navigator.geolocation.clearWatch(this.watchID);
  }

  initAnimation = () => {
    if( this.state.animation === false ) {
      clearInterval(this.intervalID);
    }

    if( this.state.gasTankPercent % 100 === 0 ) {
       this.increment = this.increment * -1;
       this.cycle = this.cycle + 1;
    }
    else if( this.cycle === this.maxCycles && this.state.gasTankPercent === 50 ) {
      this.setState({ animation: false }); 
      return 
    }

    this.setState({ gasTankPercent: this.state.gasTankPercent + this.increment });

  }

  gasUP = (latitude, longitude ) => {

    var data = {lat: latitude, lng:longitude};

    fetch(('http://127.0.0.1:5000/test'),{
      method: 'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => response.text())
    .then(response => {

      recomandationsJSON = response;
      
      var obj = JSON.parse(recomandationsJSON)
    
      mylen =obj.length

      mystring = ""

      for( i = 0; i<mylen; ++i){

        result = obj[i];
        this.state.myrecsName.push( result.name );
        var str = result.coordinates;
        str = str.replace(',','')
        str = str.replace('(','')
        str = str.replace(')','')

        var separateArray = str.split(" ")

        var myLat = separateArray[0]
        var myLong = separateArray[1] 

        this.state.myrecsCoordLat.push(myLat) 
        this.state.myrecsCoordLong.push(myLong)
        
      }
      this.setState({ isModalVisible: !this.state.isModalVisible });
      //alert(this.state.myrecsName)
    })

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
  
        <MapView 
          style={{flex: 1}} 
          showsUserLocation={true} 
          region={ this.state.region }
        >
          <GasPoint 
            show={this.state.button}
            coordinate={Mobil.coordinate}
            title={Mobil.name}
            regular={Mobil.regular}
            midgrade={Mobil.midgrade}
            premium={Mobil.premium}
            diesel={Mobil.diesel}
          />
          <GasPoint
            show={this.state.button}
            coordinate={Shell.coordinate}
            title={Shell.name}
            regular={Shell.regular}
            midgrade={Shell.midgrade}
            premium={Shell.premium}
            diesel={Shell.diesel}
          />
          <GasPoint
            show={this.state.button}
            coordinate={Chevron.coordinate}
            title={Chevron.name}
            regular={Chevron.regular}
            midgrade={Chevron.midgrade}
            premium={Chevron.premium}
            diesel={Chevron.diesel}
          />
	        <GasPoint
            show={this.state.button}
            coordinate={Arco.coordinate}
            title={Arco.name}
            regular={Arco.regular}
            midgrade={Arco.midgrade}
            premium={Arco.premium}
            diesel={Arco.diesel}
          />
	      </MapView>
        <View style={styles.gasUpComp}>
          <Animated.View>
            {/* ---------------------------Main Gauge Component---------------------------- */}
            <View style={styles.gauge}>
              <Button transparent onPress={()=>this.gasUP(this.state.latitude, this.state.longitude)}>
                <Gauge percent={this.state.gasTankPercent} />
              </Button>
            </View>

            {/* -------------------------------Gauge Add/Sub------------------------------- */}
            <View style={styles.gasFillButtons}>
              <TouchableOpacity transparent style={styles.removeButton} onPress={this.removeGas}>
                <Ionicons name="ios-remove-circle" color="#DE601B" size={64}/>
              </TouchableOpacity>
              <Text style = {styles.gasPercentText}>{this.state.gasTankPercent}%</Text>
              <TouchableOpacity transparent style={styles.addButton} onPress={this.addGas}>
                <Ionicons name="ios-add-circle" color="#DE601B" size={64} />
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>

        {/* ------------------------------------GasUp Results------------------------------------ */}
        <Modal isVisible={this.state.isModalVisible} onBackdropPress={() => this.toggleModal}>
            <View style={styles.modalColumn}>
                {/* ----------------------------ROW 1---------------------------- */}
                <View style={styles.modalRow}>
                  <Text style={{ color: 'white', fontSize: 25}}>
                      {(this.state.myrecsName)[0]}  
                  </Text>
                  <Button bordered light onPress={() => { Linking.openURL('https://www.google.com/maps/dir/?api=1&origin='+ this.state.latitude+','+ this.state.longitude+ '&destination='+ (this.state.myrecsCoordLat)[0]+','+(this.state.myrecsCoordLong)[0]) }} color="#FFFFFF" >
                    <Text style={{color: '#FFF'}}>  Go  </Text>
                  </Button>
                </View>
                {/* ----------------------------ROW 2---------------------------- */}
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={{ color: 'white', fontSize: 25 }}>
                      {(this.state.myrecsName)[1]}  
                  </Text>
                  <Button bordered light onPress={() => { Linking.openURL('https://www.google.com/maps/dir/?api=1&origin='+ this.state.latitude+','+ this.state.longitude+ '&destination='+ (this.state.myrecsCoordLat)[1]+','+(this.state.myrecsCoordLong)[1]) }} color="#FFFFFF" >
                    <Text style={{color: '#FFF'}}>  Go  </Text>
                  </Button>
                </View>
                {/* ----------------------------ROW 3---------------------------- */}
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={{ color: 'white', fontSize: 25 }}>
                    {(this.state.myrecsName[2])}                              </Text>
                  <Button bordered light onPress={() => { Linking.openURL('https://www.google.com/maps/dir/?api=1&origin='+ this.state.latitude+','+ this.state.longitude+ '&destination='+ (this.state.myrecsCoordLat)[2]+','+(this.state.myrecsCoordLong)[2]) }} color="#FFFFFF" >
                    <Text style={{color: '#FFF'}}>  Go  </Text>
                  </Button>
                </View>
                {/* ----------------------------ROW 4---------------------------- */}
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={{ color: 'white', fontSize: 25 }}>
                    {(this.state.myrecsName[3])}  
                  </Text>
                  <Button bordered light onPress={() => { Linking.openURL('https://www.google.com/maps/dir/?api=1&origin='+ this.state.latitude+','+ this.state.longitude+ '&destination='+ (this.state.myrecsCoordLat)[3]+','+(this.state.myrecsCoordLong)[3]) }} color="#FFFFFF" >
                    <Text style={{color: '#FFF'}}>  Go  </Text>
                  </Button>
                </View>
            </View>            
            <Button large onPress={this.toggleModal} style={styles.backButton}>
              <Text>Back</Text> 
            </Button>
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

class GasPoint extends React.Component {
  render() {
    if( !this.props.show || this.props.show === false ) return (null);

    let priceDescription = "";

    if( this.props.regular ) {
      priceDescription += "\nRegular: $" + this.props.regular;
    }

    if( this.props.midgrade ) {
      priceDescription += "\nMidgrade: $" + this.props.midgrade;
    }

    if( this.props.premium ) {
      priceDescription += "\nPremium: $" + this.props.premium;
    }

    if( this.props.diesel ) {
      priceDescription += "\nDiesel: $" + this.props.diesel;
    }

    return(
      <MapView.Marker
        coordinate={this.props.coordinate}
      >
      <MapView.Callout>
        <View>
          <Text>
            <Text style={{fontWeight: 'bold'}}>{this.props.title}{"\n"}</Text>
	    {priceDescription}
          </Text>
          </View>
        </MapView.Callout>
      </MapView.Marker>
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
  modalColumn: {
    flex: 1, 
    flexDirection: 'column', 
    justifyContent: 'space-between', 
    marginTop: '40%', 
    marginLeft: '5%'
  },
  modalRow: {
    flex: 1, 
    flexDirection: 'row', 
    justifyContent: 'space-between'
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
  gasPercentText: {
    fontSize: 24,
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
  gasUpComp: {
    position: 'absolute', 
    alignSelf: 'center', 
    top: '70%'
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
  },
  backButton:{
    padding:'20%',
    backgroundColor:'#DE601B',
    alignSelf: 'center',
    bottom: '18%'
  },
});
