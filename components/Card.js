import React, { Component} from 'react';
import { View, StyleSheet, Text, Alert } from 'react-native';
import { Container, Header, Content, Card, CardItem, Button, Footer, Left, Body, Title, Right,ListItem,CheckBox} from 'native-base';
import { Ionicons } from '@expo/vector-icons';
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

import TestCar from './testCar';

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
      year: '',
      car: '',
      otherStations :false,

    }
  };
  handleSubmit = (shell, seveneleven, seventysix, arco, chevron, costco, mobil, speedway, united, usa, payment, year, car, otherStations) => {

    var data = {shell: shell, seveneleven: seveneleven, seventysix: seventysix, arco: arco,
      chevron: chevron, costco: costco, mobil: mobil, speedway: speedway, united: united, usa: usa,
      payment: payment, year: year, car: car, otherStations: otherStations};
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
      alert("Settings saved successfully!");
    })

    //AlertIOS.alert(this.state.name);
}

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
myCallbackYear = (dataFromChild) => {
  this.setState({year: dataFromChild})
}
myCallbackCar = (dataFromChild) => {
  this.setState({car: dataFromChild})
}

  render() {
    return (
      <Container style={styles.container}>
        <Header style={styles.header}>
          <Left>
            <Button
              transparent
              onPress={() => {
                this.props.navigation.openDrawer();
              }}
            >
              <Ionicons name="ios-menu" color="#DE601B" size={32}/>
            </Button>
          </Left>
          <Body>
            <Title style={styles.textStyle}>Settings</Title>
          </Body>
          <Right />
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
            <Speedway callbackFromParent= {this.myCallbackSpeedway}/>
            </CardItem>
            <CardItem>
            <United callbackFromParent= {this.myCallbackUnited}/>
            <Chevron callbackFromParent= {this.myCallbackChevron}/>
            <Costco callbackFromParent= {this.myCallbackCostco}/>
            <Mobile callbackFromParent= {this.myCallbackMobil}/>
            </CardItem>
            <CardItem>
            <Arco callbackFromParent= {this.myCallbackArco}/>
            <Usa callbackFromParent= {this.myCallbackUSA}/>
            </CardItem>
            <CardItem style={{ paddingTop: 0}}>
              <ListItem onPress={() => this.setState({ otherStations: !this.state.otherStations })}
                        style={{alignSelf:'center'}}
              >
                <CheckBox checked={this.state.otherStations}
                          onPress={() => this.setState({ otherStations: !this.state.otherStations })}
                          color="#DE601B"
                />
                  <Text style={{fontWeight: "bold",fontSize:14}}> Other Stations</Text>
              </ListItem>
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
            <CardItem style={{alignItems:'stretch',marginBottom:'5%'}}>
              <TestCar callbackFromParent= {this.myCallbackCar}/>
            </CardItem>
            <CardItem style={{alignItems:'stretch'}}>
              <CarSetting callbackFromParent= {this.myCallbackYear}/>
            </CardItem>
          </Card>
        </Content>
        <Footer>
        <Button onPress={() => this.handleSubmit(this.state.shell, this.state.seveneleven,
          this.state.seventysix, this.state.arco, this.state.chevron, this.state.costco, this.state.mobil, this.state.speedway,
          this.state.united, this.state.usa, this.state.payment, this.state.year, this.state.car, this.state.otherStations)} style={styles.backButton}>
          <Text style={{color: '#fff'}}>Save my settings</Text>
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
  textStyle: {
    color: '#000',
  },
  header: {
    backgroundColor: '#fff'
  }
});
