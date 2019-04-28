import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as firebase from "firebase";
import { Container, Item, Form, Input, Button, Label } from "native-base";

var config = {
  apiKey: "AIzaSyCFqMS1BaTBWSQNAehmmb1sYvQt4wsbTyY",
  authDomain: "ricoauth.firebaseapp.com",
  databaseURL: "https://ricoauth.firebaseio.com",
  projectId:"ricoauth",
  storageBucket: "ricoauth.appspot.com",
   messagingSenderId: "748133694175"
};
firebase.initializeApp(config)


export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }
  SignUp = (email, password) => {
    try {
      firebase.auth().createUserWithEmailAndPassword(email, password);
    } catch (error) {
      console.log(error.toString(error));
    }
  };
  
SignIn = (email, password) => {
    try {
      firebase.auth().signInWithEmailAndPassword(email, password);
      firebase.auth().onAuthStateChanged(user => {
         alert(user.email);

      })
} catch (error) {
      console.log(error.toString(error));
    }
  };
  
  

  render() {
    return (
      <Container style={styles.container}>
        <Form>
          <Item floatingLabel>
            <Label>Email</Label>
            <Input
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={email => this.setState({ email })}
            />
          </Item>
          <Item floatingLabel>
            <Label>Password</Label>
            <Input
              secureTextEntry={true}
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={password => this.setState({ password })}
            />
          </Item>
          <Button full rounded onPress={() => this.SignIn(this.state.email, this.state.password)} >
            <Text>SignIn</Text>
          </Button>
          <Button full rounded success style={{ marginTop: 20 }} onPress={() => this.SignUp(this.state.email, this.state.password)}> 
            <Text>Signup</Text>
          </Button>
        </Form>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    //alignItems: 'center',
    justifyContent: 'center',
  },
});


