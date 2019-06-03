import React from 'react';
import { StyleSheet, Text, View, Image, Alert, Modal, TouchableHighlight } from 'react-native';
import { Container, Item, Form, Input, Button, Label, Header, Right, Left, Body, Title, Content, Card, CardItem } from "native-base"
import GeneralStatusBarColor from '../components/GeneralStatusBarColor';
import * as firebase from "firebase";
import { Ionicons } from '@expo/vector-icons';


var config = {
  apiKey: "AIzaSyCFqMS1BaTBWSQNAehmmb1sYvQt4wsbTyY",
  authDomain: "ricoauth.firebaseapp.com",
  databaseURL: "https://ricoauth.firebaseio.com",
  projectId:"ricoauth",
  storageBucket: "ricoauth.appspot.com",
   messagingSenderId: "748133694175"
};



export default class Profile extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      name: '',
      newPassword: '',
      modalVisible: false
    }
    this.props.navigation.navigate('Drawer');
    this.updateUser();
  }


  updateUser = () => {
    var user = firebase.auth().currentUser;
    this.state = {
      name: user.displayName,
    }
  }

  handleChangePassword = () => {
    this.setState({modalVisible: !this.state.modalVisible});
  }
  handleLogOut = () => {
    Alert.alert(
      'Log Out',
      'Confirm Log Out',
      [
        {text: 'Confirm', onPress: () => firebase.auth().signOut().then(() => {
            this.props.navigation.navigate('SignIn');
    }).catch(function(error) {
      alert(error.toString());})},
        {text: 'Cancel', onPress: () => {}, style: 'cancel'}
      ],
    {cancelable: true}
  );
}

  render(){
    return(

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
          <Title style={styles.textStyle}>Profile</Title>
        </Body>
        <Right />
      </Header>
      <Content>
          <Title style={styles.greeting} > Hi, {this.state.name}!</Title>

          <ChangePasswordModal modalVisible={this.state.modalVisible}/>
          <Button style={styles.backButton} onPress={this.handleLogOut}><Text>Log Out</Text></Button>
      </Content>
      </Container>
    );
  }
}

class ChangePasswordModal extends React.Component {
  state = {
    modalVisible: false,
    oldPassword: '',
    newPassword: '',
    reenterPassword: ''
  };

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  changePassword = () => {
    var user = firebase.auth().currentUser;
    firebase.auth().signInWithEmailAndPassword(user.email, this.state.oldPassword)
    .catch(error => {alert("Wrong password")})
    .then(() => {
        if(this.state.oldPassword == this.state.newPassword){
          Alert.alert(
            "Change Password",
            "Your new password cannot be the same as your old password."
          );
        }
        else if(this.state.newPassword == this.state.reenterPassword){
          user.updatePassword(this.state.newPassword).then(function() {
            Alert.alert(
              "Change Password",
              "Password updated successfully!"
            );
          }).catch(function(error) {
            Alert.alert(
              "Change Password",
              "Password update failed. Please try again."
            );
          }).then(this.setModalVisible(false));
        }
        else{
          Alert.alert(
            "Change Password",
            "Please re-enter the same password."
          );
        }
    })
  }

  render() {
    return (
      <View style={{marginTop: 22}}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            alert("Modal has been closed.");
          }}>
          <View style={{marginTop: 22}}>
            <View>
              <Form>
                <Item floatingLabel style={styles.label}>
                  <Label>Enter Old Password</Label>
                  <Input  style={{color: '#000'}}
      	      returnKeyType={"done"}
              secureTextEntry={true}
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={oldPassword => this.setState({oldPassword: oldPassword })}
                  />
                </Item>
                <Item floatingLabel style={styles.label}>
                  <Label>Enter New Password</Label>
                  <Input  style={{color: '#000'}}
      	      returnKeyType={"done"}
              secureTextEntry={true}
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={newPassword => this.setState({newPassword: newPassword })}
                  />
                </Item>
                <Item floatingLabel style={styles.label}>
                  <Label>Re-Enter New Password</Label>
                  <Input  style={{color: '#000'}}
      	      returnKeyType={"done"}
              secureTextEntry={true}
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={reenterPassword => this.setState({reenterPassword: reenterPassword })}
                  />
                </Item>
              </Form>

              <Button style={styles.backButton}
                onPress={this.changePassword}>
                <Text>Change Password</Text>
              </Button>
              <Button style={styles.backButton}
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}>
                <Text>Cancel</Text>
              </Button>
            </View>
          </View>
        </Modal>
        <Button style={styles.backButton} onPress={() => this.setState({modalVisible: true})}><Text>Change Password</Text></Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
  },
  backButton:{
    padding:'20%',
    marginTop: 20,
    backgroundColor:'#DE601B',
    alignSelf: 'center'
  },
  forgot:{
    marginTop: 5,
    padding: '20%',
    alignSelf: 'center',
  },
  greeting:{
    paddingTop: "10%",
    paddingBottom: "10%",
    alignSelf: 'center',
    width: 300,
    fontSize: 30
  },
  label:{
    paddingTop: "5%",
    alignSelf: 'center',
    width: 300,
    fontSize: 30
  }

});
