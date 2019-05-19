import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    View,
    Animated,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
} from 'react-native';
import Icon from '../../images/homelogo.png';

export default class Settings extends Component {
    render() {
        state = {
            animation: new Animated.Value(0),
        }
        return (
            <View>
                <TouchableWithoutFeedback onPress={this.toggleOpen}>
                    <View style = {[styles.button, styles.pay]}>

                    </View>
                </TouchableWithoutFeedback>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    button: {
        width: 60,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#333',
        shadowOpacity: .1,
        shadowOffset: {x:2, y:0},
        shadowRadius: 2,
        borderRadius: 30,
        position: 'absolute',
        bottom: 20,
        right: 20,
    },
    pay: {
        backgroundColor: "#00B15E"
    }
})