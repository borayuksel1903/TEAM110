import React, { Component} from 'react';
import{StyleSheet} from 'react-native';
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
export default class CardComp extends Component {
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
});
