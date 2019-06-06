import React from 'react';
import { StyleSheet, Text, View, Image, Alert, TouchableHighlight } from 'react-native';
import { Container, Item, Form, Input, Button, Label } from "native-base"
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
firebase.initializeApp(config)

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
          <Button primary style = {styles.siginButton} onPress={() => this.signin(this.state.email, this.state.password)}>
            <Text>Sign In</Text>
          </Button>
          <Button success style = {styles.sigupButton} onPress={this._signUpAsync}>
            <Text>Sign Up</Text>
          </Button>
          <TouchableHighlight style = {styles.forgot} onPress={this.forgotPassword}>
            <Text style={{color: '#fff'}}>
              Forgot Password
            </Text>
          </TouchableHighlight>
          <TouchableHighlight style = {styles.forgot} onPress={()=>this._AsGuestAsync()}>
            <Text style={{color: '#fff'}}>
              Continue as Guest
            </Text>
          </TouchableHighlight>
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

  forgotPassword = async () => {
      this.props.navigation.navigate('ForgotPassword');
  };

  signin = (email, password) =>{

    var data = {email: email, password: password};
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    .then(() => {
    firebase.auth().signInWithEmailAndPassword(email,password)
    .then(() => this.props.navigation.navigate('Main'))
    .catch(error => {alert(error.toString())});
  })

  fetch(('http://127.0.0.1:5000/signin'),{
    method: 'POST',
    headers:{
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
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
    marginTop: '5%',
    alignSelf: 'center',
  },
  logo:{
    marginTop: '7%',
    alignSelf: 'center',
    height: 275,
    width: 275,
    borderWidth: 1,
    borderRadius: 150
  },
  label:{
    alignSelf: 'center',
    width: 300,
  }

});
