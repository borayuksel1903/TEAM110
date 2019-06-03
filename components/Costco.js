import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  Image,
} from 'react-native';
import select from '../assets/gaslogo/costcocolor.png';
import unselect from '../assets/gaslogo/costcobw.png';

export default class Costco extends Component {
  constructor() {
    super();
    this.state = { showImg: true };
  }
  static navigationOptions = {
    header: null,
  };
  renderImage = () => {
    var imgSource = this.state.showImg? select : unselect;
    return (
      <Image
        style={ styles.img }
        source={ imgSource }
      />
    );
  }

  callBackFunction = () => {
    this.setState({ showImg: !this.state.showImg });
    this.props.callbackFromParent(this.state.showImg);
  }
  render(){
    return (
      <View style={ styles.container }>
        <View style={ styles.footer }>
          <TouchableOpacity
            style={ styles.button }
            onPress={() => this.callBackFunction()}
          >
            {this.renderImage()}
            <Text style={styles.textStyle}>Shell</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  footer: {
    flex: 1,
  },
  img: {
    alignItems: 'center',
    height: 55,
    width: 55,

  },
  textStyle:{
    marginTop: 5,
    color: '#fff',
    alignSelf: 'center',
  },
  button:{
    alignSelf:'center'
  }
})
