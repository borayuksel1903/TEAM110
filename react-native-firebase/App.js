import React from 'react';
import { StyleSheet, Text, View, AlertIOS} from 'react-native';
import * as firebase from "firebase";
import { Container, Content, Header, Item, Form, Input, Button, Label } from "native-base";
import { AppRegistry, TextInput } from 'react-native';


var config = {
  apiKey: "AIzaSyCFqMS1BaTBWSQNAehmmb1sYvQt4wsbTyY",
  authDomain: "ricoauth.firebaseapp.com",
  databaseURL: "https://ricoauth.firebaseio.com",
  projectId:"ricoauth",
  storageBucket: "ricoauth.appspot.com",
   messagingSenderId: "748133694175"
};
let app = firebase.initializeApp(config)
export const db = app.database();
let itemsRef = db.ref('/items');

import {createStackNavigator, createAppContainer} from 'react-navigation';

let addItem = item => { 
	itemsRef.push({
		name: item
	});
};



class HomeScreen extends React.Component {
  state = {
    name: '',
	items: [] 
  };

  

  handleChange = e => {
    this.setState({
      name: e.nativeEvent.text
    });
  };

  handleSubmit = () => {
    addItem(this.state.name);
    AlertIOS.alert('Item saved successfully');
  };

  handleGet = () => {
  	itemsRef.on('value', snapshot => {
      let data = snapshot.val();
      let items = Object.values(data);
      this.setState({ items });
    }); 
  };

  static navigationOptions = {
    title: 'Welcome',
  };

  render() {
    const {navigate} = this.props.navigation;
    return (
	 // <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
     //   <Text>Home Screen</Text>
     // </View>
 	    <Container>
        <Header />
        <Content>
          <Item rounded>
            <Input placeholder ='Rounded Textbox' onChange={this.handleChange}/>

          </Item>
		  <View style={[{ width: "50%", height: "50%"}]}>
		  <Button rounded success onPress={this.handleSubmit}>
            <Text>Enter</Text>
          </Button>
		  
		  <Button rounded success onPress={this.handleGet}>
            <Text>Get</Text>
          </Button>
		  	<View>
		 	{this.state.items.length > 0 ? (
				this.state.items.map((item, index) => {
					return(
						<View key = {index}>
							<Text>{item.name}</Text>
						</View>
					);
					
				})) : 
				(<Text>No Items</Text>)}   
			{/*this.state.items.map((item, index) => {
				return(
					<View key={index}>
						<Text>{item.name}</Text>
					</View>
				);
			})*/}
		  	</View>
		  </View>
        </Content>
      </Container>     
	  //<Button 
      //  title="Go to Jane's profile"
      //  onPress={() => navigate('HomeScreen', {name: 'Jane'})} >
	  //</Button>
    );
  }
}


const MainNavigator = createStackNavigator({
  Home: {screen: HomeScreen},
  //Profile: {screen: ProfileScreen},
});

const App = createAppContainer(MainNavigator);

export default App;



/*
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

*/
