import React from 'react';
import { ScrollView, StyleSheet,Text,Image, TouchableHighlight} from 'react-native';
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
                name: '',
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
          <Label>Name</Label>
          <Input style={{color: '#fff'}}
      returnKeyType={"done"}
            autoCapitalize="words"
            autoCorrect={false}
            onChangeText={name => this.setState({ name })}
            //onChangeText={(text) => this.validate(text)}
            //value={this.state.email}
          />
        </Item>
          <Item floatingLabel style={styles.label}>
            <Label>Email Address</Label>
            <Input style={{color: '#fff'}}
	      returnKeyType={"done"}
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
	      returnKeyType={"done"}
              secureTextEntry={true}
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={password => this.setState({ password })}
            />
          </Item>
          <Item floatingLabel style={styles.label}>
            <Label>Confirm Password</Label>
            <Input style={{color: '#fff'}}
	      returnKeyType={"done"}
              secureTextEntry={true}
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={re_password => this.setState({ re_password })}
            />
          </Item>
          <Button success style = {styles.sigupButton} onPress={() => this.signup(this.state.email, this.state.password)}>
            <Text>Create Account!</Text>
          </Button>
          <TouchableHighlight style = {styles.forgot} onPress={this.goBack}>
            <Text style={{color: '#fff'}}>
              Go Back
            </Text>
          </TouchableHighlight>
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
goBack = () => {
  this.props.navigation.navigate('SignIn');
}
  signup = (email, password) =>{
    if(this.state.password == this.state.re_password){
      try{
        firebase.auth().createUserWithEmailAndPassword(email,password)
          .then(() => {
            firebase.auth().signInWithEmailAndPassword(email,password);
            this.props.navigation.navigate('Settings');
            firebase.auth().currentUser.updateProfile({
              displayName: this.state.name
            })})
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
    /*firebase.auth().currentUser.updateProfile({
      displayName: this.state.name
    }).then(function() {
  alert("hi");
}).catch(function(error) {
  alert("rip");
});*/
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'flex-start',
  },
  backButton:{
    marginTop: 10,
    padding: '10%',
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
    marginTop: '7%',
    alignSelf: 'center',
    height: 200,
    width: 200,
    borderWidth: 1,
    borderRadius: 75
  },
  forgot:{
    marginTop: 15,
    alignSelf: 'center',
  }
});
