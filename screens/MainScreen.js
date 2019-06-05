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
import MapView from 'react-native-maps';
import Modal from "react-native-modal";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

// TESTING TO MAKE SURE MAP SHOWS FOR MIHAI

// const Mobil = {
//   coordinate: {latitude: 32.8710589032578, longitude: -117.233255945994},
//   regular: 4.36,
//   midgrade: 4.46,
//   premium: 4.56,
//   //name: "Mobil"
// }
//
// const Shell = {
//   coordinate: {latitude: 32.853534, longitude: -117.254081 },
//   regular: 4.07,
//   midgrade: 4.20,
//   premium: 4.31,
//   //name: "Shell"
// }
//
// const Chevron = {
//   coordinate: {latitude: 32.868502, longitude: -117.215751},
//   regular: 4.02,
//   midgrade: 4.16,
//   premium: 4.26,
//   //name: "Chevron"
// }
//
// const Costco = {
//   coordinate: {latitude: 32.824904, longitude: -117.226281},
//   regular: 3.60,
//   premium: 3.80,
//   //name: "Costco"
// }

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
       myrecsCoordLong:[],
       search: "",
       valueSearch: "",
       //showGasPins: false,
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

    this.watchID = navigator.geolocation.watchPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 },
    );
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
    // navigator.geolocation.getCurrentPosition(
    //
    //   (position) => {
    //     console.log(position);
    //     this.setState({
    //       latitude: position.coords.latitude,
    //       longitude: position.coords.longitude,
    //       error: null,
    //     });
    //   },
    //   (error) => this.setState({ error: error.message }),
    //   { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 },
    // );
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
    else if( this.cycle === this.maxCycles && this.state.gasTankPercent === 70 ) {
      this.setState({ animation: false });
      return
    }

    this.setState({ gasTankPercent: this.state.gasTankPercent + this.increment });

  }

  gasUP = (latitude, longitude, gasTankPercent ) => {

    var data = {lat: latitude, lng:longitude, tank: gasTankPercent};

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
      //this.setState({ isModalVisible: !this.state.isModalVisible });
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

        <MapView style={{flex: 1}} showsUserLocation={true} />


    <View style={styles.gasUpComp}>
        <Animated.View>
	       <View style={styles.gauge}>
	        <Button transparent onPress={()=> {
            this.gasUP(this.state.latitude, this.state.longitude, this.state.gasTankPercent);
            //this.setState({showGasPins: true});
            this.toggleModal();
          }}>
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
    <Modal isVisible={this.state.isModalVisible} onBackdropPress={() => this.toggleModal}>
                    <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between', marginTop: '40%', marginLeft: '5%' }}>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                            <Text style={{ color: 'white', fontSize: 25}}>
                                {(this.state.myrecsName)[0]}
                            </Text>
                            <Text style={{ color: 'white', fontSize: 25}}>
                                     0.5mi
                            </Text>
                            <Button bordered light onPress={() => { Linking.openURL('https://www.google.com/maps/dir/?api=1&origin='+ this.state.latitude+','+ this.state.longitude+ '&destination='+ (this.state.myrecsCoordLat)[0]+','+(this.state.myrecsCoordLong)[0]) }} color="#FFFFFF" >
                              <Text style={{color: '#FFF'}}>  Go  </Text>
                            </Button>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ color: 'white', fontSize: 25 }}>
                                {(this.state.myrecsName)[1]}
                            </Text>
                            <Text style={{ color: 'white', fontSize: 25}}>
                                    2mi
                            </Text>
                            <Button bordered light onPress={() => { Linking.openURL('https://www.google.com/maps/dir/?api=1&origin='+ this.state.latitude+','+ this.state.longitude+ '&destination='+ (this.state.myrecsCoordLat)[1]+','+(this.state.myrecsCoordLong)[1]) }} color="#FFFFFF" >
                              <Text style={{color: '#FFF'}}>  Go  </Text>
                            </Button>
                            </View>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ color: 'white', fontSize: 25 }}>
                              {(this.state.myrecsName[2])}
                            </Text>
                            <Text style={{ color: 'white', fontSize: 25}}>
                                    7mi
                            </Text>
                            <Button bordered light onPress={() => { Linking.openURL('https://www.google.com/maps/dir/?api=1&origin='+ this.state.latitude+','+ this.state.longitude+ '&destination='+ (this.state.myrecsCoordLat)[2]+','+(this.state.myrecsCoordLong)[2]) }} color="#FFFFFF" >
                              <Text style={{color: '#FFF'}}>  Go  </Text>

                            </Button>
                            </View>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ color: 'white', fontSize: 25 }}>
                              {(this.state.myrecsName[3])}
                            </Text>
                            <Text style={{ color: 'white', fontSize: 25}}>
                                    8mi
                            </Text>
                            <Button bordered light onPress={() => { Linking.openURL('https://www.google.com/maps/dir/?api=1&origin='+ this.state.latitude+','+ this.state.longitude+ '&destination='+ (this.state.myrecsCoordLat)[3]+','+(this.state.myrecsCoordLong)[3]) }} color="#FFFFFF" >
                              <Text style={{color: '#FFF'}}>  Go  </Text>
                            </Button>
                            </View>
                    </View>
                    <Button title="Close" onPress={this.toggleModal} color="#FFFFFF" />
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

// class GasPoint extends React.Component {
//   render() {
//     //
//     // if( this.props.show !== true ) return (null);
//     //
//     // let priceDescription = "";
//     //
//     // if( this.props.regular ) {
//     //   priceDescription += "\nRegular: $" + this.props.regular;
//     // }
//     //
//     // if( this.props.midgrade ) {
//     //   priceDescription += "\nMidgrade: $" + this.props.midgrade;
//     // }
//     //
//     // if( this.props.premium ) {
//     //   priceDescription += "\nPremium: $" + this.props.premium;
//     // }
//     //
//     // if( this.props.diesel ) {
//     //   priceDescription += "\nDiesel: $" + this.props.diesel;
//     // }
//
//     return(
//       <MapView.Marker
//         coordinate={this.props.coordinate}
//       >
//       <MapView.Callout>
//         <View>
//       //     <Text>
//       //       <Text style={{fontWeight: 'bold'}}>{this.props.title}{"\n"}</Text>
// 	    // {priceDescription}
//       //     </Text>
//           </View>
//         </MapView.Callout>
//       </MapView.Marker>
//     );
//   }
// }

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
  },
  gasUpComp: {
  position: 'absolute',
  alignSelf: 'center',
  top: '70%'
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
  },
  backButton:{
   padding:'20%',
   backgroundColor:'#DE601B',
   alignSelf: 'center',
   bottom: '18%'
 },
});
