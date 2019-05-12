import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Container, Item, Form, Input, Button, Label, } from "native-base"
import GeneralStatusBarColor from '../components/GeneralStatusBarColor';


export default class SigninScreens extends React.Component {
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
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={email => this.setState({ email })}
            />
          </Item>
          <Item floatingLabel style={styles.label}>
            <Label>Password</Label>
            <Input style={{color: '#fff'}}
              secureTextEntry={true}
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={password => this.setState({ password })}
            />
          </Item>
          <Button primary style = {styles.siginButton} onPress={this._signInAsync}> 
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
          <Button transparent style = {styles.forgot}>
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


