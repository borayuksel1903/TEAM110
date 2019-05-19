import React from 'react';
import { 
    StyleSheet, 
    Text, 
    View, 
    Container, 
    Image,
    TouchableOpacity,
} from 'react-native';

export default class MainButton extends React.Component {
    render() {
        return (
            <View>
                <TouchableOpacity>
                    <Image 
                        style = {styles.logo} 
                        source = {require('../../images/logo.png')}
                    />
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    logo: {
        width: 150,
        height: 150,
    }
});