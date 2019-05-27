import React, { Component} from 'react';
import{StyleSheet, AlertIOS} from 'react-native';
import { Container, Header, Content, Card, CardItem, Text, Button, Footer } from 'native-base';
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
import * as firebase from "firebase";
var config = {
  apiKey: "AIzaSyCFqMS1BaTBWSQNAehmmb1sYvQt4wsbTyY",
  authDomain: "ricoauth.firebaseapp.com",
  databaseURL: "https://ricoauth.firebaseio.com",
  projectId:"ricoauth",
  storageBucket: "ricoauth.appspot.com",
   messagingSenderId: "748133694175"
};
let app = firebase.initializeApp(config);
const db = app.database();
let itemsRef = db.ref('/settings');
let addItem = item => {
  itemsRef.push({
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
export default class CardComp extends Component {
  constructor(props){
    super(props);
    this.state = {
      shell: true,
      seveneleven: true,
      seventysix: true,
      arco: true,
      chevron: true,
      costco: true,
      mobil: true,
      speedway: true,
      united: true,
      usa: true,
      payment: "Credit Card",
      carSetting:{
        make: '',
        model: '',
        year: ''
      }
    }
  }

  handleSubmit = () => {
    addItem(this.state);
    AlertIOS.alert("Settings saved successfully!");
  }

  handleChange = () => {
    this.setState({
      shell: !(this.state.shell)
    });
    AlertIOS.alert(this.state.shell);
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
              <Shell onClick={this.handleChange}/>
              <SevenEleven/>
              <SeventySix/>
            </CardItem>
            <CardItem>
              <Arco/>
              <Chevron/>
              <Costco/>
              <Mobile/>
            </CardItem>
            <CardItem>
              <Speedway/>
              <United/>
              <Usa/>
            </CardItem>
         </Card>
         <Card>
           <CardItem header>
            <Text>Payment Type</Text>
              <Payment/>
            </CardItem>
          </Card>
          <Card>
            <CardItem header>
              <Text>Car Setting</Text>
            </CardItem>
            <CardItem style={{alignItems:'stretch'}}>
              <CarSetting/>
            </CardItem>
          </Card>
        </Content>
        <Footer>
        <Button onPress={this.handleSubmit} style={styles.backButton}>
          <Text>Save my settings</Text>
        </Button>
        </Footer>
      </Container>
    );
  }
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
