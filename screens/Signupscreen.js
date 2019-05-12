import React from 'react';
import { ScrollView, StyleSheet,Text,Image} from 'react-native';
import { Container, Item, Form, Input, Button, Label, } from "native-base"
import GeneralStatusBarColor from '../components/GeneralStatusBarColor';

export default class LinksScreen extends React.Component {
  render() {
    return (
      <Container style={styles.container}>
        <GeneralStatusBarColor backgroundColor="#000"barStyle="light-content"/>
        <Image style = {styles.logo}
          source={require('../assets/images/signUp.png')}
        />
        <Form>
          <Item floatingLabel style={styles.label}>
            <Label>Email Address</Label>
            <Input style={{color: '#fff'}}
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={email => this.setState({ email })}
            />
          </Item>
          <Item floatingLabel style={styles.label}>
            <Label>Password</Label>
            <Input style={{color: '#fff'}}
              secureTextEntry={true}
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={password => this.setState({ password })}
            />
          </Item>
          <Item floatingLabel style={styles.label}>
            <Label>Confirm Password</Label>
            <Input style={{color: '#fff'}}
              secureTextEntry={true}
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={password => this.setState({ password })}
            />
          </Item>
          <Button success style = {styles.sigupButton} onPress={this._signUpAsync}> 
            <Text>Create Account!</Text>
          </Button>
          <Button transparent style = {styles.forgot}>
            <Text style={{color: '#fff'}}>
              Continue as guest
            </Text>
          </Button>
        </Form>
      </Container>
    );
  }
  _signUpAsync = async () => {
    this.props.navigation.navigate('Settings');
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#000',
    justifyContent: 'flex-start',
  },
  backButton:{
    marginTop: 50,
    padding: '20%',
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
    marginTop: '20%',
    alignSelf: 'center',
    height: 150,
    width: 150,
    borderWidth: 1,
    borderRadius: 75
  },
  forgot:{
    marginTop: 30,
    padding: '20%',
    alignSelf: 'center',
  }
});
