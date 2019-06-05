import React, { Component} from 'react';
import { View, StyleSheet, Text, Alert } from 'react-native';
import { Container, Header, Content, Card, CardItem, Button, Footer, Icon, Left, Body, Title, Right,ListItem,CheckBox} from 'native-base';
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
      gasStations: {
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
      },
      otherStations :true,
      payment: "Credit Card",
      year: '',
      car: '',
    }
  };

  handleSubmit = (gasStations, otherStations, payment, year, car) => {
    var data = {gasStations: gasStations, otherStations: otherStations, payment: payment, year: year, car: car};
    var data2 = {year: year, car:car};

    //for gas preferences
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

    fetch('http://127.0.0.1:5000/getMPG', {
      method: 'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data2)
    })
    //AlertIOS.alert(this.state.name);
}


myCallbackShell = (dataFromChild) => {
  this.setState({ gasStations: {
      shell: dataFromChild,
      seveneleven: this.state.gasStations.seveneleven,
      seventysix: this.state.gasStations.seventysix,
      arco: this.state.gasStations.arco,
      chevron: this.state.gasStations.chevron,
      costco: this.state.gasStations.costco,
      mobil: this.state.gasStations.mobil,
      speedway: this.state.gasStations.speedway,
      united: this.state.gasStations.united,
      usa: this.state.gasStations.usa,
  }})
}
myCallbackSeven = (dataFromChild) => {
  this.setState({gasStations: {
    shell: this.state.gasStations.shell,
    seveneleven: dataFromChild,
    seventysix: this.state.gasStations.seventysix,
    arco: this.state.gasStations.arco,
    chevron: this.state.gasStations.chevron,
    costco: this.state.gasStations.costco,
    mobil: this.state.gasStations.mobil,
    speedway: this.state.gasStations.speedway,
    united: this.state.gasStations.united,
    usa: this.state.gasStations.usa,
  }})
}
myCallbackSeventySix = (dataFromChild) => {
  this.setState({gasStations: {
    shell: this.state.gasStations.shell,
    seveneleven: this.state.gasStations.seveneleven,
    seventysix: dataFromChild,
    arco: this.state.gasStations.arco,
    chevron: this.state.gasStations.chevron,
    costco: this.state.gasStations.costco,
    mobil: this.state.gasStations.mobil,
    speedway: this.state.gasStations.speedway,
    united: this.state.gasStations.united,
    usa: this.state.gasStations.usa,
  }})
}
myCallbackArco = (dataFromChild) => {
  this.setState({gasStations: {
    shell: this.state.gasStations.shell,
    seveneleven: this.state.gasStations.shell,
    seventysix: this.state.gasStations.seventysix,
    arco: dataFromChild,
    chevron: this.state.gasStations.chevron,
    costco: this.state.gasStations.costco,
    mobil: this.state.gasStations.mobil,
    speedway: this.state.gasStations.speedway,
    united: this.state.gasStations.united,
    usa: this.state.gasStations.usa,
  }})
}
myCallbackChevron = (dataFromChild) => {
  this.setState({gasStations: {
    shell: this.state.gasStations.shell,
    seveneleven: this.state.gasStations.shell,
    seventysix: this.state.gasStations.seventysix,
    arco: this.state.gasStations.arco,
    chevron: dataFromChild,
    costco: this.state.gasStations.costco,
    mobil: this.state.gasStations.mobil,
    speedway: this.state.gasStations.speedway,
    united: this.state.gasStations.united,
    usa: this.state.gasStations.usa,
  }})
}
myCallbackCostco = (dataFromChild) => {
  this.setState({gasStations: {
    shell: this.state.gasStations.shell,
    seveneleven: this.state.gasStations.shell,
    seventysix: this.state.gasStations.seventysix,
    arco: this.state.gasStations.arco,
    chevron: this.state.gasStations.chevron,
    costco: dataFromChild,
    mobil: this.state.gasStations.mobil,
    speedway: this.state.gasStations.speedway,
    united: this.state.gasStations.united,
    usa: this.state.gasStations.usa,
  }})
}
myCallbackMobil = (dataFromChild) => {
  this.setState({gasStations: {
    shell: this.state.gasStations.shell,
    seveneleven: this.state.gasStations.shell,
    seventysix: this.state.gasStations.seventysix,
    arco: this.state.gasStations.arco,
    chevron: this.state.gasStations.chevron,
    costco: this.state.gasStations.costco,
    mobil: dataFromChild,
    speedway: this.state.gasStations.speedway,
    united: this.state.gasStations.united,
    usa: this.state.gasStations.usa,
  }})
}
myCallbackSpeedway = (dataFromChild) => {
  this.setState({gasStations: {
    shell: this.state.gasStations.shell,
    seveneleven: this.state.gasStations.shell,
    seventysix: this.state.gasStations.seventysix,
    arco: this.state.gasStations.arco,
    chevron: this.state.gasStations.chevron,
    costco: this.state.gasStations.costco,
    mobil: this.state.gasStations.mobil,
    speedway: dataFromChild,
    united: this.state.gasStations.united,
    usa: this.state.gasStations.usa,
  }})
}
myCallbackUnited = (dataFromChild) => {
  this.setState({gasStations: {
    shell: this.state.gasStations.shell,
    seveneleven: this.state.gasStations.shell,
    seventysix: this.state.gasStations.seventysix,
    arco: this.state.gasStations.arco,
    chevron: this.state.gasStations.chevron,
    costco: this.state.gasStations.costco,
    mobil: this.state.gasStations.mobil,
    speedway: this.state.gasStations.speedway,
    united: dataFromChild,
    usa: this.state.gasStations.usa,
  }})
}
myCallbackUSA = (dataFromChild) => {
  this.setState({gasStations: {
    shell: this.state.gasStations.shell,
    seveneleven: this.state.gasStations.shell,
    seventysix: this.state.gasStations.seventysix,
    arco: this.state.gasStations.arco,
    chevron: this.state.gasStations.chevron,
    costco: this.state.gasStations.costco,
    mobil: this.state.gasStations.mobil,
    speedway: this.state.gasStations.speedway,
    united: this.state.gasStations.united,
    usa: dataFromChild,
  }})
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
      <Container>
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
              <ListItem onPress={() => this.setState({ otherStations: !(this.state.otherStations) })}
                        style={{alignSelf:'center'}}
              >
                <CheckBox checked={this.state.otherStations}
                          onPress={() => this.setState({ otherStations: !(this.state.otherStations) })}
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
        <Button  onPress={() => this.handleSubmit(this.state.gasStations, this.state.otherStations, this.state.payment, this.state.year, this.state.car)} style={styles.backButton}>
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
