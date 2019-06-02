import React, { Component } from "react";
import { Container, Header, Content, Icon, Picker, Form, Text} from "native-base";

export default class Payment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: "Credit Card"
    };
  }
  onValueChange(value) {
    this.state.selected=  value;
    this.props.callbackFromParent(this.state.selected);

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
              <Picker.Item label="Cash" value="Cash" style={{color: '#fff'}}/>
              <Picker.Item label="Debit Card" value="Debit Card" />
              <Picker.Item label="Credit Card" value="Credit Card" />
              <Picker.Item label="Apple Pay" value="Apple Pay" />
            </Picker>
          </Form>
    );
  }
}
