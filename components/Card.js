import React, { Component} from 'react';
import { View, StyleSheet, Text, Alert } from 'react-native';
import { Container, Header, Content, Card, CardItem, Button, Footer, Left, Body, Title, Right } from 'native-base';
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

export default class CardComp extends Component {
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
              <Shell/>
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
        <Button onPress={this._saveAsync} style={styles.backButton}>
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
  textStyle: {
    color: '#000',
  },
  header: {
    backgroundColor: '#fff'
  }
});
