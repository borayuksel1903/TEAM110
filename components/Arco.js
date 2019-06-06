import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  Image,
} from 'react-native';
import select from '../assets/gaslogo/arcocolor.png';
import unselect from '../assets/gaslogo/arcobw.png';

export default class Arco extends Component {
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
    this.props.callbackFromParent(!this.state.showImg);
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
    //aspectRatio: 1,
    height: 55,
    width: 179,

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
