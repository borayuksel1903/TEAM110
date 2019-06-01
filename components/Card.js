import React, { Component} from 'react';
import { View, StyleSheet, Text, Alert } from 'react-native';
import { Container, Header, Content, Card, CardItem, Button, Footer, Left, Body, Title, ListItem, CheckBox, Right } from 'native-base';
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
  constructor(props){
    super(props);
    this.state = {
                otherStatations :false,
                 }
  };
  
  render() {
    return (
      <Container>
        <Header style={{marginTop: 0}}>
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
              <Speedway/>
            </CardItem>
            <CardItem>
            <United/>
              <Chevron/>
              <Costco/>
              <Mobile/>
            </CardItem>
            <CardItem>
              <Arco/>
              <Usa/>
            </CardItem>
            <CardItem style={{ paddingTop: 0}}>
              <ListItem onPress={() => this.setState({ otherStatations: !this.state.otherStatations })}
                        style={{alignSelf:'center'}}
              >
                <CheckBox checked={this.state.otherStatations} 
                          onPress={() => this.setState({ otherStatations: !this.state.otherStatations })} 
                          color="#DE601B"
                /> 
                  <Text style={{fontWeight: "bold",fontSize:14}}> Other Stations</Text>
              </ListItem>
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
});
