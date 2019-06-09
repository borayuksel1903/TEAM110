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

export default class ForgotPassword extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      email: ''
    }
  }
  render(){
    return(
      <Container style={styles.container}>
      <GeneralStatusBarColor backgroundColor="#000"barStyle="light-content"/>
      <Image style = {styles.logo}
        source={require('../assets/images/signUp.png')}
      />
      <Form>
        <Item floatingLabel style={styles.label}>
          <Label>Account Email</Label>
          <Input style={{color: '#fff'}}
      returnKeyType={"done"}
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={email => this.setState({email: email })}
          />
        </Item>
        <Button primary style = {styles.resetPasswordButton} onPress={this.forgotPassword}>
          <Text>Reset Password</Text>
        </Button>
        <TouchableHighlight style = {styles.back} onPress={this.goBack}>
          <Text style={{color: '#fff'}}>
            Go Back
          </Text>
        </TouchableHighlight>
      </Form>
      </Container>
    )
  }

  goBack = () => {
    this.props.navigation.navigate('SignIn');
  }
  forgotPassword = () => {
      var auth = firebase.auth();
      var emailAddress = this.state.email;
      var data = {email: emailAddress};

      fetch('http://127.0.0.1:5000/resetpassword', {
        method: 'POST',
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      .then(() => {
        Alert.alert(
          "Forgot Password",
          "Password reset email sent to your email address."
        );
        this.props.navigation.navigate('SignIn');
      }).catch(function(error) {
        Alert.alert(
          "Forgot Password",
          "Password reset failed, please try again."
        )
      });
    }

      /*auth.sendPasswordResetEmail(emailAddress).then(() => {
        Alert.alert(
          "Forgot Password",
          "Password reset email sent to your email address."
        );
        this.props.navigation.navigate('SignIn');
      }).catch(function(error) {
        Alert.alert(
          "Forgot Password",
          "Password reset failed, please try again."
        )
      });
  };*/
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'flex-start',
  },
  logo:{
    marginTop: '7%',
    alignSelf: 'center',
    height: 200,
    width: 200,
    borderWidth: 1,
    borderRadius: 75
  },
  back:{
    marginTop: 15,
    alignSelf: 'center',
  },
  resetPasswordButton:{
      marginTop: 25,
      padding: '20%',
      backgroundColor:'#DE601B',
      alignSelf: 'center'
  },
  label:{
    alignSelf: 'center',
    width: 300,
  }
});
