import React from 'react';
import { View, ScrollView, StyleSheet, Text, Image, Alert, KeyboardAvoidingView, TouchableOpacity, Animated , TextInput, Linking, Dimensions } from 'react-native';
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

let { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 0;
const LONGITUDE = 0;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default class MainScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = { gasTankPercent: 10,
       animation: true,
       text:"Enter your current location" ,
       myrecsName: [],
       myrecsCoordLat:[],
       myrecsCoordLong:[],
       myrecsPrice: [],
       myrecsDist: [],
       search: "",
       valueSearch: "",
       showGasPins: false,
       region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
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
      position => {
        this.setState({
          region: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
	          latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }
        });
      }, (error)=>console.log(error));
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
    else if( this.cycle === this.maxCycles && this.state.gasTankPercent === 70 ) {
      this.setState({ animation: false });
      this.gasUP(this.state.region.latitude, this.state.region.longitude, this.state.gasTankPercent);
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

        //var str = result.coordinates;
        //str = str.replace(',','')
        ///str = str.replace('(','')
        //str = str.replace(')','')

        //var separateArray = str.split(" ")

        //var myLat = separateArray[0]
        //var myLong = separateArray[1]
        this.state.myrecsPrice.push(result.price)
        this.state.myrecsCoordLat.push(result.lat)
        this.state.myrecsCoordLong.push(result.lng)
        this.state.myrecsDist.push(result.Distance)


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

        <MapView
	        style={{flex: 1}}
	        showsUserLocation={true}
	        region={ this.state.region }
	      >
          <TopGasPoints
            show={this.state.showGasPins}
            myrecsName={this.state.myrecsName}
            myrecsCoordLat={this.state.myrecsCoordLat}
            myrecsCoordLong={this.state.myrecsCoordLong}
          />
        </MapView>


  <View style={styles.gasUpComp}>
        <Animated.View>
	       <View style={styles.gauge}>
	        <Button transparent onPress={()=> {
            //this.gasUP(this.state.region.latitude, this.state.region.longitude, this.state.gasTankPercent);
            this.setState({showGasPins: true});
            this.toggleModal();
          }}>
	         <Gauge percent={this.state.gasTankPercent} />
	        </Button>
	       </View>
	       <View style={styles.gasFillButtons}>
            <TouchableOpacity transparent style={styles.removeButton} onPress={this.removeGas}>
              <Ionicons name="ios-remove-circle" color="#DE601B" size={64}/>
	          </TouchableOpacity>
            <Text style = {{fontSize: 24}}>
              {this.state.gasTankPercent}%
            </Text>
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
                                {(this.state.myrecsName)[0]} {/*sorted by preferences and price */}
                            </Text>
                            <Text style={{ color: 'white', fontSize: 25}}>
                                     {(this.state.myrecsDist)[0]}mi
                            </Text>
                            <Text style={{ color: 'white', fontSize: 25}}>
                                     ${(this.state.myrecsPrice)[0]}
                            </Text>
                            <Button bordered light onPress={() => { Linking.openURL('https://www.google.com/maps/dir/?api=1&origin='+ this.state.region.latitude+','+ this.state.region.longitude+ '&destination='+ (this.state.myrecsCoordLat)[0]+','+(this.state.myrecsCoordLong)[0]) }} color="#FFFFFF" >
                              <Text style={{color: '#FFF'}}>  Go  </Text>
                            </Button>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ color: 'white', fontSize: 25 }}>
                                {(this.state.myrecsName)[1]} {/*sorted by best price */}
                            </Text>
                            <Text style={{ color: 'white', fontSize: 25}}>
                                {(this.state.myrecsDist)[1]}mi
                            </Text>
                            <Text style={{ color: 'white', fontSize: 25}}>
                                     ${(this.state.myrecsPrice)[1]}mi
                            </Text>
                            <Button bordered light onPress={() => { Linking.openURL('https://www.google.com/maps/dir/?api=1&origin='+ this.state.region.latitude+','+ this.state.region.longitude+ '&destination='+ (this.state.myrecsCoordLat)[1]+','+(this.state.myrecsCoordLong)[1]) }} color="#FFFFFF" >
                              <Text style={{color: '#FFF'}}>  Go  </Text>
                            </Button>
                            </View>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ color: 'white', fontSize: 25 }}>
                              {(this.state.myrecsName[2])} {/*sorted by preferences and distance */}
                            </Text>
                            <Text style={{ color: 'white', fontSize: 25}}>
                                {(this.state.myrecsDist)[2]}mi
                            </Text>
                            <Text style={{ color: 'white', fontSize: 25}}>
                                     ${(this.state.myrecsPrice)[2]}
                            </Text>
                            <Button bordered light onPress={() => { Linking.openURL('https://www.google.com/maps/dir/?api=1&origin='+ this.state.region.latitude+','+ this.state.region.longitude+ '&destination='+ (this.state.myrecsCoordLat)[2]+','+(this.state.myrecsCoordLong)[2]) }} color="#FFFFFF" >
                              <Text style={{color: '#FFF'}}>  Go  </Text>

                            </Button>
                            </View>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ color: 'white', fontSize: 25 }}>
                              {(this.state.myrecsName[3])} {/*sorted by shortest distance */}
                            </Text>
                            <Text style={{ color: 'white', fontSize: 25}}>
                                {(this.state.myrecsDist)[3]}mi
                            </Text>
                            <Text style={{ color: 'white', fontSize: 25}}>
                                     ${(this.state.myrecsPrice)[3]}
                            </Text>
                            <Button bordered light onPress={() => { Linking.openURL('https://www.google.com/maps/dir/?api=1&origin='+ this.state.region.latitude+','+ this.state.region.longitude+ '&destination='+ (this.state.myrecsCoordLat)[3]+','+(this.state.myrecsCoordLong)[3]) }} color="#FFFFFF" >
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

class TopGasPoints extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    let gasPointList = [];

    for(let index = 0; index < this.props.myrecsName.length; index++) {
      let name = this.props.myrecsName[index];
      let latitude = this.props.myrecsCoordLat[index];
      let longitude = this.props.myrecsCoordLong[index];

      let station = new GasStation(name, latitude, longitude, 0);
      gasPointList.push(
        <GasPoint
          key={index}
          show={this.props.show}
          coordinate={station.coordinate}
          title={station.name}
          regular={station.price}
        />
      );
    }

    return (
      gasPointList
    );
  }
}

class GasStation {
  constructor(name, latitude, longitude, price) {
    this.name = name,
    this.price = price,
    this.coordinate = {
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude)
    }
  }
}

class GasPoint extends React.Component {
  render() {

    if( this.props.show !== true ) return (null);

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
