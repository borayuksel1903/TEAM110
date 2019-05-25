import React, { Component } from "react";
import { Container, Header, Content, Icon, Picker, Form, Text} from "native-base";

export default class Payment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: "key2"
    };
  }
  onValueChange(value) {
    this.setState({
      selected: value
    });
  }
  render() {
    return (
          <Form>
            <Picker
              mode="dropdown"
              iosIcon={<Icon name="arrow-down" />}
              headerStyle={{ backgroundColor: "#DE601B" }}
              headerBackButtonTextStyle={{ color: "#000" }}
              headerTitleStyle={{ color: "#000" }}
              selectedValue={this.state.selected}
              onValueChange={this.onValueChange.bind(this)}
            >
              <Picker.Item label="Cash" value="key0" style={{color: '#fff'}}/>
              <Picker.Item label="Debit Card" value="key1" />
              <Picker.Item label="Credit Card" value="key2" />
              <Picker.Item label="Apple Pay" value="key4" />
            </Picker>
          </Form>
    );
  }
}
