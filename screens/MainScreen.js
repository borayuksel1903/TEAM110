import React from 'react';
import {
  View, ScrollView, StyleSheet, Text, Image, Alert, KeyboardAvoidingView,
  TouchableOpacity, Animated , TextInput, Linking, Dimensions
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import GeneralStatusBarColor from '../components/GeneralStatusBarColor';
import { Ionicons } from '@expo/vector-icons';
import {
  Container, Icon, Item, Form, Input, Button, Label, Header, Left,
  Body, Title, Right,Content, List, ListItem, Thumbnail
} from "native-base";
import {ART} from 'react-native'
import { AnimatedGaugeProgress, GaugeProgress } from 'react-native-simple-gauge';
import MapView from 'react-native-maps';
import Modal from "react-native-modal";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Constants, Location, Permissions } from 'expo';

import seventySix from '../assets/gaslogo/76color.png'
import sevenEleven from '../assets/gaslogo/711color.png'
import arco from '../assets/gaslogo/Arco-Logo.png'
import chevron from '../assets/gaslogo/chevroncolor.png'
import costco from '../assets/gaslogo/costcocolor.png'
import mobil from '../assets/gaslogo/mobilecolor.png'
import shell from '../assets/gaslogo/shellcolor.png'
import speedway from '../assets/gaslogo/speedwaycolor.png'
import united from '../assets/gaslogo/unitedcolor.png'
import usa from '../assets/gaslogo/usacolor.png'
import other from '../assets/gaslogo/OtherStation.png'

const imageMap = {
  "76" :       {source: seventySix,  dimension: {width: 55, height: 55}},
  "711" :      {source: sevenEleven, dimension: {width: 55, height: 53}},
  "arco" :     {source: arco,        dimension: {width: 55, height: 55}},
  "chevron" :  {source: chevron,     dimension: {width: 55, height: 61}},
  "costco" :   {source: costco,      dimension: {width: 55, height: 55}},
  "mobil" :    {source: mobil,       dimension: {width: 55, height: 69}},
  "shell" :    {source: shell,       dimension: {width: 55, height: 51}},
  "speedway" : {source: speedway,    dimension: {width: 55, height: 52}},
  "united" :   {source: united,      dimension: {width: 55, height: 58}},
  "usa" :      {source: usa,         dimension: {width: 55, height: 30}},
  "other" :    {source: other,       dimension: {width: 55, height: 55}},
}

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
       maxGasStations: 6,
       region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      prevRegion: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      threshold: 5,
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
    }, (error)=>{this.getLocationAsync();});
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
    navigator.geolocation.clearWatch(this.watchID);
  }

  getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({});

    const region = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
    }

    this.setState({ region: region });
  };

  initAnimation = () => {
    if( this.state.animation === false ) {
      clearInterval(this.intervalID);
    }

    if( this.state.gasTankPercent % 100 === 0 ) {
       this.increment = this.increment * -1;
       this.cycle = this.cycle + 1;
    }
    else if( this.cycle === this.maxCycles && this.state.gasTankPercent === 70 ) {
      if( this.state.animation === true ) {
        /* only call gas up once for init */
        //this.gasUP(this.state.region.latitude, this.state.region.longitude, this.state.gasTankPercent);
        //this.setState({ prevRegion: this.state.region })
        console.log( "gasUP" );
      }
      this.setState({ animation: false });
      return
    }

    this.setState({ gasTankPercent: this.state.gasTankPercent + this.increment });
  }

  gasUP = (latitude, longitude, gasTankPercent ) => {

    var data = {lat: latitude, lng:longitude, tank: gasTankPercent};

    fetch(('http://18.236.148.80:5000/test'),{
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
        this.state.myrecsPrice.push(result.price)
        this.state.myrecsCoordLat.push(result.lat)
        this.state.myrecsCoordLong.push(result.lng)
        this.state.myrecsDist.push(result.Distance)
      }
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
            <Title style={styles.textStyle}>Home</Title>
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
            myrecsPrice={this.state.myrecsPrice}
	    max={this.state.maxGasStations}
          />
        </MapView>


  <View style={styles.gasUpComp}>
        <Animated.View>
	       <View style={styles.gauge}>
	        <Button transparent onPress={()=> {
                  /*
		  let lat1 = this.state.prevRegion.latitude;
	    	  let lon1 = this.state.prevRegion.longitude;
		  let lat2 = this.state.region.latitude;
	       	  let lon2 = this.state.region.longitude;
	          if( distanceInMiBetweenEarthCoordinates(lat1, lon1, lat2, lon2) > this.state.threshold ) {
                    this.gasUP(this.state.region.latitude, this.state.region.longitude, this.state.gasTankPercent);
		    this.setState({prevRegion: this.state.region});
                    console.log( "gasUP" );
	          }
		  */
                  this.gasUP(this.state.region.latitude, this.state.region.longitude, this.state.gasTankPercent);
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

        {/*popup for gas up*/}
        <Modal isVisible={this.state.isModalVisible} onBackdropPress={() => this.toggleModal}>
          <Container style={{backgroundColor:'transparent',marginTop:'40%'}}>
	    <TopGasStationsOnModal
	      origin={{
                latitude: this.state.region.latitude,
                longitude: this.state.region.longitude
              }}
              myrecsName={this.state.myrecsName}
              myrecsCoordLat={this.state.myrecsCoordLat}
              myrecsCoordLong={this.state.myrecsCoordLong}
              myrecsPrice={this.state.myrecsPrice}
              myrecsDist={this.state.myrecsDist}
              max={this.state.maxGasStations}
	    />
          </Container>
          <Button title="Close" onPress={this.toggleModal} color="#FFFFFF" />
          <Button large onPress={this.toggleModal} style={styles.backButton}>
            <Text>GO BACK TO THE MAIN PAGE</Text>
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

// needed props: orgin(lat, lon), myrecs arrays
class TopGasStationsOnModal extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let gasStationList = [];
    let max = (this.props.myrecsName.length < this.props.max) ? this.props.myrecsName.length : this.props.max;

    for(let index = 0; index < max; index++) {
      let name = this.props.myrecsName[index];
      let latitude = this.props.myrecsCoordLat[index];
      let longitude = this.props.myrecsCoordLong[index];
      let price = this.props.myrecsPrice[index];
      let miles = this.props.myrecsDist[index];

      let station = new GasStation(name, latitude, longitude, price);

      gasStationList.push(
        <GasStationOnModal
          key={index}
	  station={{
	    name: station.name,
	    latitude: station.coordinate.latitude,
	    longitude: station.coordinate.longitude,
	    price: station.price,
	    miles: miles
	  }}
    origin={this.props.origin}
    index={index}
        />
      );

    }

    return(
      gasStationList
    );
  }
}


class GasStationOnModal extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let logo = imageMap[this.props.station.name.toLowerCase()];

    if( logo === undefined ) {
      logo = imageMap['other'];
    }
    let tag = "";
    switch(this.props.index) {
      case 0:
        tag = "GA$UP Station!"
        break;
      case 1:
        tag = "Lowest Price"
        break;
      case 2:
        tag = "Good Choice!"
        break;
      case 3:
        tag = "Closest Station"
        break;
      default:

    }

    return(
      <ListItem thumbnail>
        <Left>
          <Thumbnail square source={logo.source}
	    style={{ height: logo.dimension.height, width: logo.dimension.width }}
          />
        </Left>
        <Body>
          <Text style={{color: '#FFF',fontSize: 25}} > ${this.props.station.price}     {this.props.station.miles} mi </Text>
          <Text style={{color: '#FFC300', fontSize: 11,fontWeight: 'bold',}}> {tag} </Text>
        </Body>

        <Right>
          <Button bordered light onPress={() => { Linking.openURL('https://www.google.com/maps/dir/?api=1&origin=' + this.props.origin.latitude + ',' + this.props.origin.longitude + '&destination=' + this.props.station.latitude + ',' + this.props.station.longitude)}} color="#FFFFFF" >
            <Text style={{color: '#FFF'}}>  Go  </Text>
          </Button>
        </Right>

      </ListItem>
    );
  }
}

// origin={5, 3}
//oogle.com/maps/dir/?api=1&origin=' + this.state.region.latitude + ',' + this.state.region.longitude + '&destination=' + Mobil.coordinate.latitude + ',' + Mobil.coordinate.longitude

class TopGasPoints extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let max = this.props.max;
    if( max < 1 ) {
      max = 1;
    }

    let gasPointList = [];
    max = (this.props.myrecsName.length < max) ? this.props.myrecsName.length : max;

    for(let index = 0; index < max; index++) {
      let name = this.props.myrecsName[index];
      let latitude = this.props.myrecsCoordLat[index];
      let longitude = this.props.myrecsCoordLong[index];
      let price = this.props.myrecsPrice[index];
     
      let station = new GasStation(name, latitude, longitude, price);

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

function degreesToRadians(degrees) {
  return degrees * Math.PI / 180;
}

function distanceInMiBetweenEarthCoordinates(lat1, lon1, lat2, lon2) {
  var earthRadiusKm = 6371;

  var dLat = degreesToRadians(lat2-lat1);
  var dLon = degreesToRadians(lon2-lon1);

  lat1 = degreesToRadians(lat1);
  lat2 = degreesToRadians(lat2);

  var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
          Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return earthRadiusKm * c * 0.621371;
}
