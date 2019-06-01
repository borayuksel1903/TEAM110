import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Container, Item, Form, Input, Button, Label, } from "native-base"
import GeneralStatusBarColor from '../components/GeneralStatusBarColor';
import * as firebase from "firebase";

var config = {
  apiKey: "AIzaSyCFqMS1BaTBWSQNAehmmb1sYvQt4wsbTyY",
  authDomain: "ricoauth.firebaseapp.com",
  databaseURL: "https://ricoauth.firebaseio.com",
  projectId:"ricoauth",
  storageBucket: "ricoauth.appspot.com",
   messagingSenderId: "748133694175"
};
<<<<<<< HEAD
export let app = firebase.initializeApp(config)
=======
firebase.initializeApp(config)
>>>>>>> ac28cdeabfe529e33448409579d4730f3a5a4929

export default class SigninScreens extends React.Component {
  constructor(props){
    super(props);
    this.state = {
                email :'',
                password:'',
                validated: false ,
                 }
  };
  render() {
    return (

      <Container style={styles.container}>
        <GeneralStatusBarColor backgroundColor="#000"barStyle="light-content"/>
        <Image style = {styles.logo}
          source={require('../assets/images/logo.png')}
        />
        <Form>
          <Item floatingLabel style={styles.label}>
            <Label>Email</Label>
            <Input style={{color: '#fff'}}
	      returnKeyType={"done"}
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={email => this.setState({ email })}
            />
          </Item>
          <Item floatingLabel style={styles.label}>
            <Label>Password</Label>
            <Input style={{color: '#fff'}}
	      returnKeyType={"done"}
              secureTextEntry={true}
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={password => this.setState({ password })}
            />
          </Item>
<<<<<<< HEAD
          <Button primary style = {styles.siginButton} onPress={() => this.signin(this.state.email, this.state.password)}>
=======
          <Button primary style = {styles.siginButton} onPress={() => this.signin(this.state.email, this.state.password)}> 
>>>>>>> ac28cdeabfe529e33448409579d4730f3a5a4929
            <Text>Sign In</Text>
          </Button>
          <Button success style = {styles.sigupButton} onPress={this._signUpAsync}>
            <Text>Sign Up</Text>
          </Button>
          <Button transparent style = {styles.forgot}>
            <Text style={{color: '#fff'}}>
              Forgot Password
            </Text>
          </Button>
          <Button transparent style = {styles.forgot} onPress={()=>this._AsGuestAsync()}>
            <Text style={{color: '#fff'}}>
              Continue as guest
            </Text>
          </Button>
        </Form>
      </Container>
    );
  }
  _signUpAsync = async () => {
    this.props.navigation.navigate('SignUp');
  };

  _signInAsync = async () => {
    this.props.navigation.navigate('Main');
  };
  _AsGuestAsync = async () => {
    this.props.navigation.navigate('Main');
};
  signin = (email, password) =>{
  try{
    firebase.auth().signInWithEmailAndPassword(email,password)
<<<<<<< HEAD
    .then(firebase.auth().onAuthStateChanged( async () => {
      console.log(firebase.auth().currentUser.uid);
      this.props.navigation.navigate('Main');}
      ))
=======
    .then(firebase.auth().onAuthStateChanged(async () => this.props.navigation.navigate('Main')))
>>>>>>> ac28cdeabfe529e33448409579d4730f3a5a4929
    .catch(error => {alert(error.toString())});
  }
    catch (error) {
  }
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'flex-start',
  },
  siginButton:{
      marginTop: 25,
      padding: '20%',
      backgroundColor:'#DE601B',
      alignSelf: 'center'
  },
  sigupButton:{
    marginTop: 20,
    padding: '20%',
    backgroundColor:'#fff',
    alignSelf: 'center'
  },
  forgot:{
    marginTop: 5,
    padding: '20%',
    alignSelf: 'center',
  },
  logo:{
    marginTop: '7%',
    alignSelf: 'center',
    height: 300,
    width: 300,
    borderWidth: 1,
    borderRadius: 150
  },
  label:{
    alignSelf: 'center',
    width: 300,

  }

});
