import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  Image,
} from 'react-native';
import select from '../assets/gaslogo/shellcolor.png';
import unselect from '../assets/gaslogo/shellbw.png';

export default class Shell extends Component {
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
            //onPress={ () => this.setState({ showImg: !this.state.showImg })}
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
    width: 60,

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
