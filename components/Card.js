import React, { Component} from 'react';
import{StyleSheet, AlertIOS} from 'react-native';

import { Container, Header, Content, Card, CardItem, Text, Button, Footer, Form, Item, Label, Input } from 'native-base';
import Shell from './Shell';
import SeventySix from './76';
import SevenEleven from './711';
import Arco from './Arco';
import Chevron from './Chevron';
import Costco from './Costco';
import Mobile from './Mobile';
import Speedway from './Speedway';
import United from './United';
import Usa from './Usa';
import Payment from './Payment';
import CarSetting from './CarSetting';
//import * as firebase from "firebase";
import { app } from '../screens/Signinscreen'
/*var config = {
  apiKey: "AIzaSyCFqMS1BaTBWSQNAehmmb1sYvQt4wsbTyY",
  authDomain: "ricoauth.firebaseapp.com",
  databaseURL: "https://ricoauth.firebaseio.com",
  projectId:"ricoauth",
  storageBucket: "ricoauth.appspot.com",
   messagingSenderId: "748133694175"
};
let app = firebase.initializeApp(config);*/
/*
const db = app.database();
let itemsRef = db.ref('/users');
let uid = firebase.auth().currentUser;

let addItem = item => {
  itemsRef.child(uid).update({
    shell: item.shell,
    seveneleven: item.seveneleven,
    seventysix: item.seventysix,
    arco: item.arco,
    chevron: item.chevron,
    costco: item.costco,
    mobil: item.mobil,
    speedway: item.speedway,
    united: item.united,
    usa: item.usa,
    payment: item.payment,
    carSetting: item.carSetting
  });
};
*/
export default class CardComp extends Component {
  constructor(props){
    super(props);
    this.state = {
      shell: false,
      seveneleven: false,
      seventysix: false,
      arco: false,
      chevron: false,
      costco: false,
      mobil: false,
      speedway: false,
      united: false,
      usa: false,
      payment: "Credit Card",
      carSetting:{
        make: '',
        model: '',
        year: ''
      }
    }
    //this.handleChange = this.handleChange.bind(this);
  }

/*
  handleSubmit = () => {
    addItem(this.state);
    AlertIOS.alert("Settings saved successfully!");
  }
*/



  handleSubmit = (shell, seveneleven, seventysix, arco, chevron, costco, mobil, speedway, united, usa, payment, carSetting) => {

    var data = {shell: shell, seveneleven: seveneleven, seventysix: seventysix, arco: arco,
      chevron: chevron, costco: costco, mobil: mobil, speedway: speedway, united: united, usa: usa,
      payment: payment, carSetting: carSetting};
    //var data2 = {seveneleven: seveneleven};
    //var data11 = {payment: payment};
    //var data12 = {carSetting: carSetting};
    fetch('http://127.0.0.1:5000/result', {
      method: 'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then((response) =>{
      alert("Settings saved successfully!")
    })

    //AlertIOS.alert(this.state.name);
}
    //action = "http://localhost:5000/result";
    //method = "get";
    //name = "place";
    //type="submit";
    //value="Submit";
    //AlertIOS.alert("Settings saved successfully!");
myCallbackShell = (dataFromChild) => {
  this.setState({shell: dataFromChild})
}
myCallbackSeven = (dataFromChild) => {
  this.setState({seveneleven: dataFromChild})
}
myCallbackSeventySix = (dataFromChild) => {
  this.setState({seventysix: dataFromChild})
}
myCallbackArco = (dataFromChild) => {
  this.setState({arco: dataFromChild})
}
myCallbackChevron = (dataFromChild) => {
  this.setState({chevron: dataFromChild})
}
myCallbackCostco = (dataFromChild) => {
  this.setState({costco: dataFromChild})
}
myCallbackMobil = (dataFromChild) => {
  this.setState({mobil: dataFromChild})
}
myCallbackSpeedway = (dataFromChild) => {
  this.setState({speedway: dataFromChild})
}
myCallbackUnited = (dataFromChild) => {
  this.setState({united: dataFromChild})
}
myCallbackUSA = (dataFromChild) => {
  this.setState({usa: dataFromChild})
}
myCallbackPayment = (dataFromChild) => {
  this.setState({payment: dataFromChild})
}
myCallbackCarSetting = (dataFromChild1, dataFromChild2, dataFromChild3) => {
  this.setState({carSetting: {
    make: dataFromChild1,
    model: dataFromChild2,
    year: dataFromChild3
  }})
}

  render() {
    return (



      <Container>
        <Header>
          <Text style={{fontWeight: "bold",fontSize:20}}>
            Settings
          </Text>
          </Header>
        <Content>
          <Card>
            <CardItem header>
            <Text>Gas station preference</Text>
            </CardItem>
            <CardItem>
              <Shell callbackFromParent= {this.myCallbackShell}/>
              <SevenEleven callbackFromParent= {this.myCallbackSeven}/>
              <SeventySix callbackFromParent= {this.myCallbackSeventySix}/>
            </CardItem>
            <CardItem>
              <Arco callbackFromParent= {this.myCallbackArco}/>
              <Chevron callbackFromParent= {this.myCallbackChevron}/>
              <Costco callbackFromParent= {this.myCallbackCostco}/>
              <Mobile callbackFromParent= {this.myCallbackMobil}/>
            </CardItem>
            <CardItem>
              <Speedway callbackFromParent= {this.myCallbackSpeedway}/>
              <United callbackFromParent= {this.myCallbackUnited}/>
              <Usa callbackFromParent= {this.myCallbackUSA}/>
            </CardItem>
         </Card>
         <Card>
           <CardItem header>
            <Text>Payment Type</Text>
              <Payment callbackFromParent= {this.myCallbackPayment}/>
            </CardItem>
          </Card>
          <Card>
            <CardItem header>
              <Text>Car Setting</Text>
            </CardItem>
            <CardItem style={{alignItems:'stretch'}}>
              <CarSetting callbackFromParent= {this.myCallbackCarSetting}/>
            </CardItem>
          </Card>
        </Content>

        <Footer>


        <Button onPress={() => this.handleSubmit(this.state.shell, this.state.seveneleven,
          this.state.seventysix, this.state.arco, this.state.chevron, this.state.costco, this.state.mobil, this.state.speedway,
          this.state.united, this.state.usa, this.state.payment, this.state.carSetting)} style={styles.backButton}>
          <Text>Save my settings</Text>
        </Button>
        </Footer>

      </Container>


        /*
        <Form action="http://localhost:5000/result" method="get">
          <Item inlineLabel>
            <Label>Username</Label>
            <Text>Place</Text><Input type="text" onChangeText={this.handleChange} name="place"/>
            <Input type="submit" value="Submit"/>

          </Item>
          <Item inlineLabel last>
            <Label>Password</Label>
            <Input />
          </Item>

        </Form>
        <Button onClick={this.handleSubmit}>
        <Text>Push</Text>
        </Button>



        }<Form onSubmit="http://localhost:5000/result" method="get">
          Place: <input type="text" name="place"/>
          <input type="submit" value="Submit"/>
        </Form>

        <Form onSubmit={this.handleChange} >

          <Input type="text" name="place" />
          <Input type="submit" value="Submit"/>
          <Button onPress={this.handleChange} >
            <Text>Save my settings</Text>
          </Button>
      </Form>*/




    );
  }
  _saveAsync = async () => {
    this.props.navigation.navigate('Main');
  };
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backButton:{
    padding:'20%',
    marginTop: 20,
    backgroundColor:'#DE601B',
    alignSelf: 'center'
  },
});
