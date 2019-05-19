import React from 'react';
import { 
    StyleSheet, 
    Text, 
    View, 
    Dimensions,
    AppRegistry,
    Animated,
    Image,
    TouchableOpacity,
    TouchableWithoutFeedback, 
    InputText,
} from 'react-native';
import { Slider } from 'react-native-elements';
import CircularSlider from 'rn-circular-slider';

import MainButton from './MainButton.js';


var { height } = Dimensions.get('window');
export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            animation: new Animated.Value(0),
            startAngle: Math.PI * 10/6,
            angleLength: Math.PI * 7/6,
        }
    }
    toggleOpen = () => {
        const toValue = this._open ? 0 : 1;
        Animated.timing(this.state.animation, {
            toValue,
            duration: 200
        }).start();
        this._open = !this._open;
    }
    render() {
        const bgStyle = {
            transform: [{
                scale: this.state.animation.interpolate({
                    inputRange: [0,1],
                    outputRange: [0, 30]
                })
            }]
        }

        const reloadStyle = {
            transform: [{
                scale: this.state.animation
            }, {
                translateY: this.state.animation.interpolate({
                    inputRange: [0,1],
                    outputRange: [0, 70],
                })
            }]
        }
        const orderStyle = {
            transform: [{
                scale: this.state.animation
            }, {
                translateY: this.state.animation.interpolate({
                    inputRange: [0,1],
                    outputRange: [0, -140],
                })
            }]
        }

        const labelPositionInterpolate = 
            this.state.animation.interpolate({
                inputRange: [0,1],
                outputRange: [30, 90]
            });
        const opacityInterpolate = 
            this.state.animation.interpolate({
                inputRange: [0, .8, 1],
                outputRange: [0,0,1]
            })
        const labelStyle = {
            opacity: opacityInterpolate,
            transform: [{
                translateX: labelPositionInterpolate
            }]
        }
        const { value } = this.state
        return (
            <View style = {styles.container}>
                <Animated.View style = {[styles.background, bgStyle]} />
                    <CircularSlider
                        step={1}
                        min={0}
                        max={100}
                        value={value}
                        onChange={value => this.setState({ value })}
                        contentContainerStyle={styles.contentContainerStyle}
                        strokeWidth={10}
                        buttonBorderColor="#3FE3EB"
                        buttonFillColor="#fff"
                        buttonStrokeWidth={10}
                        openingRadian={Math.PI / 4}
                        buttonRadius={10}
                        linearGradient={[{ stop: '0%', color: '#3FE3EB' }, { stop: '100%', color: '#7E84ED' }]}
                        style = {styles.slider}
                        >
                    </CircularSlider>

                    <Text style = {styles.text}>Value: {this.state.value}%</Text>

                    <MainButton style = {[marginTop = 1000]}/>

                    <TouchableWithoutFeedback>
                        <Animated.View style = {[styles.button, styles.other, reloadStyle]}>
                            <Animated.Text style = {[styles.label, labelStyle]}>Profile</Animated.Text>
                            <Image style = {styles.icon} source = {require('../../images/profile_icon.jpg')} />
                        </Animated.View>
                    </TouchableWithoutFeedback>

                    <TouchableWithoutFeedback onPress={this.toggleOpen}>
                        <View style = {[styles.button, styles.pay]}>
                            <Animated.Text style = {[styles.label, labelStyle]}>Settings</Animated.Text>
                            {/* <Image source = {require('../../images/homelogo.png')} style = {{width: 60, height:60}}/> */}
                            <Image style = {styles.icon} source = {require('../../images/settings.png')} />
                        </View>
                    </TouchableWithoutFeedback>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFF',
        flexDirection: 'column',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    background: {
        backgroundColor: 'rgba(0,0,0,.2)',
        position:'absolute',
        width: 60,
        height: 60,
        top: 45,
        left: 20,
        borderRadius: 30,
    },
    slider: {
        width: 200,
    },
    text: {
        color: '#000',
    },
    logo: {
        width: 150,
        height: 150,
    },
    icon: {
        width: 50,
        height: 50,
    },
    other: {
        backgroundColor: '#fff',
    },
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
        top: 45,
        left: 20,
    },
    pay: {
        backgroundColor: "#FFF"
    },
    label: {
        color: "#FFF",
        position: "absolute",
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 16,
        backgroundColor: 'transparent'
    }
  });