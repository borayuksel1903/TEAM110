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
       valueSearch: ""
      }
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

    navigator.geolocation.getCurrentPosition(
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
    navigator.geolocation.getCurrentPosition(

      (position) => {
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
        <GooglePlacesAutocomplete
                placeholder='Search'
                minLength={2} // minimum length of text to search
                autoFocus={true}
                listViewDisplayed='auto'    // true/false/undefined
                fetchDetails={true}
                renderDescription={(row) => row.description} // custom description render
                onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
                    console.log(data);
                    console.log(details);
                }}
                getDefaultValue={() => {
                    return ''; // text input default value
                }}
                query={{
                    // available options: https://developers.google.com/places/web-service/autocomplete
                    key: 'AIzaSyDmH8hyjX9rAWQ1i1ZxxNoF-S-wbC3wnaQ',
                    language: 'en', // language of the results
                }}
                styles={{
                    description: {
                        fontWeight: 'bold',
                    },
                    predefinedPlacesDescription: {
                        color: '#1faadb',
                    },
                    container:{
                      height:50
                    }
                }}

                currentLocation={false} // Will add a 'Current location' button at the top of the predefined places list
                currentLocationLabel="Current location"
                nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
                GoogleReverseGeocodingQuery={{
                    // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
                }}
                GooglePlacesSearchQuery={{
                    // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
                    rankby: 'distance',
                    types: ''
                }}


                filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities


                debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
            />
        <MapView style={{flex: 1, marginBottom:80}} showsUserLocation={true} />
        <Animated.View>
	  <View style={styles.gauge}>
	    <Button transparent onPress={()=>this.gasUP(this.state.latitude, this.state.longitude)}>
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
    <Modal isVisible={this.state.isModalVisible} onBackdropPress={() => this.toggleModal}>
                    <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between', marginTop: '40%', marginLeft: '5%' }}>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                            <Text style={{ color: 'white', fontSize: 25}}>
                                {(this.state.myrecsName)[0]}
                            </Text>
                            <Button bordered light onPress={() => { Linking.openURL('https://www.google.com/maps/dir/?api=1&origin='+ this.state.latitude+','+ this.state.longitude+ '&destination='+ (this.state.myrecsCoordLat)[0]+','+(this.state.myrecsCoordLong)[0]) }} color="#FFFFFF" >
                              <Text style={{color: '#FFF'}}>  Go  </Text>
                            </Button>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ color: 'white', fontSize: 25 }}>
                                {(this.state.myrecsName)[1]}
                            </Text>
                            <Button bordered light onPress={() => { Linking.openURL('https://www.google.com/maps/dir/?api=1&origin='+ this.state.latitude+','+ this.state.longitude+ '&destination='+ (this.state.myrecsCoordLat)[1]+','+(this.state.myrecsCoordLong)[1]) }} color="#FFFFFF" >
                              <Text style={{color: '#FFF'}}>  Go  </Text>
                            </Button>
                            </View>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ color: 'white', fontSize: 25 }}>
                              {(this.state.myrecsName[2])}                              </Text>
                            <Button bordered light onPress={() => { Linking.openURL('https://www.google.com/maps/dir/?api=1&origin='+ this.state.latitude+','+ this.state.longitude+ '&destination='+ (this.state.myrecsCoordLat)[2]+','+(this.state.myrecsCoordLong)[2]) }} color="#FFFFFF" >
                              <Text style={{color: '#FFF'}}>  Go  </Text>
                            </Button>
                            </View>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ color: 'white', fontSize: 25 }}>
                              {(this.state.myrecsName[3])}
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
