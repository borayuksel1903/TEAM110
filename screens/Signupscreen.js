import React from 'react';
import { ScrollView, StyleSheet,Text,Image} from 'react-native';
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
//firebase.initializeApp(config)

export default class LinksScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
                email :'',
                password:'',
                re_password:'',
                validated: true ,
                 }
  };

  validate = (text) => {
    console.log(text);
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
    if(reg.test(text) === false){
      console.log("Email is Not Correct");
      this.setState({email:text})
      return false;
    }
    else {
      this.setState({email:text})
      console.log("Email is Correct");
    }
  }
  render() {
    return (
      <Container style={styles.container}>
        <GeneralStatusBarColor backgroundColor="#000"barStyle="light-content"/>
        <Image style = {styles.logo}
          source={require('../assets/images/signUp.png')}
        />
        <Form>
          <Item floatingLabel style={styles.label}>
            <Label>Email Address</Label>
            <Input style={{color: '#fff'}}
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={email => this.setState({ email })}
              //onChangeText={(text) => this.validate(text)}
              //value={this.state.email}
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
          <Item floatingLabel style={styles.label}>
            <Label>Confirm Password</Label>
            <Input style={{color: '#fff'}}
              secureTextEntry={true}
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={re_password => this.setState({ re_password })}
            />
          </Item>
          <Button success style = {styles.sigupButton} onPress={() => this.signup(this.state.email, this.state.password)}>
            <Text>Create Account!</Text>
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
  _RegisterAsync = async () => {
      this.props.navigation.navigate('Settings');
  };
  _AsGuestAsync = async () => {
    this.props.navigation.navigate('Main');
};

  signup = (email, password) =>{
    if(this.state.password == this.state.re_password){
      try{
        firebase.auth().createUserWithEmailAndPassword(email,password)
      .then(() => this.props.navigation.navigate('Settings'))
      .catch(error => {
        alert(error.toString());
     })
      }
        catch (error) {
      }
    }
    else{
      alert('Please re-enter the same password');
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#000',
    justifyContent: 'flex-start',
  },
  backButton:{
    marginTop: 50,
    padding: '20%',
    backgroundColor:'#DE601B',
    alignSelf: 'center'
  },
  sigupButton:{
    marginTop: 50,
    padding: '20%',
    backgroundColor:'#DE601B',
    alignSelf: 'center',
  },
  label:{
    alignSelf: 'center',
    width: 300
  },
  logo:{
    marginTop: '20%',
    alignSelf: 'center',
    height: 150,
    width: 150,
    borderWidth: 1,
    borderRadius: 75
  },
  forgot:{
    marginTop: 30,
    padding: '20%',
    alignSelf: 'center',
  }
});
