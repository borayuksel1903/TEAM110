import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Text
} from 'react-native';
 
import Size from '../Common/Size';
import Images from '../Common/Images';
import Color from '../Common/Color';
 
class FAQHeader extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      tag_selected: 0,
    };
  }
 
  renderCenterBtn(index, value) {
    
      return (
          <TouchableOpacity style = {Styles.btn_center} key = {index}>
                <Text style = {Styles.font_btn_center}>
                    {value} 
                </Text>
          </TouchableOpacity>
        )
     
  }
  render() {
    return (
        <View style = {[Styles.main]} >
            <TouchableOpacity style = {Styles.btn_left_arrow}>
                <Image style = {Styles.image}
                source = {Images.arrow_left}
                >
                </Image>
            </TouchableOpacity>
            <View style = {Styles.view_center}>
                {this.props.centerBtnData.map((value, index) => this.renderCenterBtn(index, value))}
            </View>
            <TouchableOpacity style = {Styles.btn_right_arrow}>
                  <Image style = {Styles.image} 
                   source = {Images.arrow_right}
                  >
                </Image>
            </TouchableOpacity>
        </View>
      )
  }
}
 
const Styles = StyleSheet.create({
  main: {
    alignSelf: 'stretch',
    height: 40,
    marginTop: 15,
    marginLeft: 15,
    marginRight: 15,
    flexDirection: 'row',
  },
  image: {
    height: 20,
    width: 20,
    resizeMode: 'cover',
  },
  btn_left_arrow: {
    width: 40,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
  },
  view_center: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'stretch',
  },
  btn_right_arrow: {
    width: 40,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn_center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Color.clearColor,
  },
  font_btn_center: {
    fontSize: 18,
    color: 'rgb(167, 157, 157)',
  },
});
FAQHeader.defaultProps = {
  centerBtnData: [],
};
 
FAQHeader.propTypes = {
  centerBtnData: PropTypes.array,
};