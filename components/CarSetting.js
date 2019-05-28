import React, { Component } from "react";
import{StyleSheet} from 'react-native';
import { Container, Header, Content, Icon, Picker, Form, Text} from "native-base";

export default class CarSetting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      make: "make",
      model:"model",
      year: "year"
    };
  }
  onValueChangeMake(value) {
    this.setState({
      make: value
    });
  }
  onValueChangeModel(value) {
    this.setState({
      model: value
    });
  }
  onValueChangeYear(value) {
    this.setState({
      year: value
    });
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
              selectedValue={this.state.make}
              onValueChange={this.onValueChangeMake.bind(this)}
            >
              <Picker.Item label="Make" value="make"/>
              <Picker.Item label="Acura" value="Acura"/>
              <Picker.Item label="Alfa Romeo" value="Alfa Romeo"/>
              <Picker.Item label="AMC" value="AMC"/>
              <Picker.Item label="Aston Martin" value="Aston Martin"/>
              <Picker.Item label="Audi" value="Audi"/>
              <Picker.Item label="Avanti" value="Avanti"/>
              <Picker.Item label="Bentley" value="Bentley"/>
              <Picker.Item label="BMW" value="BMW"/>
              <Picker.Item label="Buick" value="Buick"/>
              <Picker.Item label="Cadillac" value="Cadillac"/>
              <Picker.Item label="Chevrolet" value="Chevrolet"/>
              <Picker.Item label="Chrysler" value="Chrysler"/>
              <Picker.Item label="Daewoo" value="Daewoo"/>
              <Picker.Item label="Daihatsu" value="Daihatsu"/>
              <Picker.Item label="Datsun" value="Datsun"/>
              <Picker.Item label="DeLorean" value="DeLorean"/>
              <Picker.Item label="Dodge" value="Dodge"/>
              <Picker.Item label="Eagle" value="Eagle"/>
              <Picker.Item label="Ferrari" value="Ferrari"/>
              <Picker.Item label="Fisker" value="Fisker"/>
              <Picker.Item label="Ford" value="Ford"/>
              <Picker.Item label="Freightliner" value="Freightliner"/>
              <Picker.Item label="Geo" value="Geo"/>
              <Picker.Item label="GMC" value="GMC"/>
              <Picker.Item label="Honda" value="Honda"/>
              <Picker.Item label="HUMMER" value="HUMMER"/>
              <Picker.Item label="Hyundai" value="Hyundai"/>
              <Picker.Item label="Infiniti" value="Infiniti"/>
              <Picker.Item label="Isuzu" value="Isuzu"/>
              <Picker.Item label="Jaguar" value="Jaguar"/>
              <Picker.Item label="Jeep" value="Jeep"/>
              <Picker.Item label="Kia" value="Kia"/>
              <Picker.Item label="Lamborghini" value="Lamborghini"/>
              <Picker.Item label="Lancia" value="Lancia"/>
              <Picker.Item label="Land Rover" value="Land Rover"/>
              <Picker.Item label="Lincoln" value="Lincoln"/>
              <Picker.Item label="Lotus" value="Lotus"/>
              <Picker.Item label="Maserati" value="Maserati"/>
              <Picker.Item label="Maybach" value="Maybach"/>
              <Picker.Item label="Mazda" value="Mazda"/>
              <Picker.Item label="McLaren" value="McLaren"/>
              <Picker.Item label="Mercedes-Benz" value="Mercedes-Benz"/>
              <Picker.Item label="Mercury" value="Mercury"/>
              <Picker.Item label="Merkur" value="Merkur"/>
              <Picker.Item label="MINI" value="MINI"/>
              <Picker.Item label="Mitsubishi" value="Mitsubishi"/>
              <Picker.Item label="Nissan" value="Nissan"/>
              <Picker.Item label="Oldsmobile" value="Oldsmobile"/>
              <Picker.Item label="Peugeot" value="Peugeot"/>
              <Picker.Item label="Plymouth" value="Plymouth"/>
              <Picker.Item label="Pontiac" value="Pontiac"/>
              <Picker.Item label="Porsche" value="Porsche"/>
              <Picker.Item label="RAM" value="RAM"/>
              <Picker.Item label="Renault" value="Renault"/>
              <Picker.Item label="Rolls-Royce" value="Rolls-Royce"/>
              <Picker.Item label="Saab" value="Saab"/>
              <Picker.Item label="Saturn" value="Saturn"/>
              <Picker.Item label="Scion" value="Scion"/>
              <Picker.Item label="smart" value="smart"/>
              <Picker.Item label="SRT" value="SRT"/>
              <Picker.Item label="Sterling" value="Sterling"/>
              <Picker.Item label="Subaru" value="Subaru"/>
              <Picker.Item label="Suzuki" value="Suzuki"/>
              <Picker.Item label="Tesla" value="Tesla"/>
              <Picker.Item label="Toyota" value="Toyota"/>
              <Picker.Item label="Triumph" value="Triumph"/>
              <Picker.Item label="Volkswagen" value="Volkswagen"/>
              <Picker.Item label="Volvo" value="Volvo"/>
              <Picker.Item label="Yugo" value="Yugo"/>
            </Picker>
            <Picker
              mode="dropdown"
              iosIcon={<Icon name="arrow-down" />}
              headerStyle={{ backgroundColor: "#DE601B" }}
              headerBackButtonTextStyle={{ color: "#000" }}
              headerTitleStyle={{ color: "#000" }}
              selectedValue={this.state.model}
              onValueChange={this.onValueChangeModel.bind(this)}
            >
              <Picker.Item label="Model" value="model"/>
            </Picker>
            <Picker
              mode="dropdown"
              iosIcon={<Icon name="arrow-down" />}
              headerStyle={{ backgroundColor: "#DE601B" }}
              headerBackButtonTextStyle={{ color: "#000" }}
              headerTitleStyle={{ color: "#000" }}
              selectedValue={this.state.year}
              onValueChange={this.onValueChangeYear.bind(this)}
            >
              <Picker.Item label="Year" value="year"/>
            </Picker>
          </Form>
    );
  }
}