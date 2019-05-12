import React, { Component } from "react";
import{StyleSheet} from 'react-native';
import { Container, Header, Content, Icon, Picker, Form, Text} from "native-base";

export default class CarSetting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      make: "make0",
      model:"make0",
      year: "year"
    };
  }
  onValueChange(make,model,year) {
    this.setState({
      make: make,
      model: model,
      year:year
    });
  }
  modelPicker(){
    if(this.state.make === 'bmw'){
      return(
        <Picker.Item label="328" make="328"/>
      )
    }
  }
  render() {
    return (
          <Form>
            <Picker
              mode="dropdown"
              iosIcon={<Icon name="arrow-down"/>}
              headerStyle={{ backgroundColor: "#DE601B" }}
              headerBackButtonTextStyle={{ color: "#000" }}
              headerTitleStyle={{ color: "#000" }}
              selectedValue={this.state.selected}
              onValueChange={this.onValueChange.bind(this)}
            >
              <Picker.Item label="Make" make="make0"/>
              <Picker.Item label="bmw" make="bmw"/>
            </Picker>
            <Picker
              mode="dropdown"
              iosIcon={<Icon name="arrow-down" />}
              headerStyle={{ backgroundColor: "#DE601B" }}
              headerBackButtonTextStyle={{ color: "#000" }}
              headerTitleStyle={{ color: "#000" }}
              selectedValue={this.state.selected}
              onValueChange={this.onValueChange.bind(this)}
            >
              <Picker.Item label="Model" model="key0"/>
            </Picker>
            <Picker
              mode="dropdown"
              iosIcon={<Icon name="arrow-down" />}
              headerStyle={{ backgroundColor: "#DE601B" }}
              headerBackButtonTextStyle={{ color: "#000" }}
              headerTitleStyle={{ color: "#000" }}
              selectedValue={this.state.selected}
              onValueChange={this.onValueChange.bind(this)}
            >
              <Picker.Item label="Year" year="key0"/>
            </Picker>
          </Form>
    );
  }
}