import React, { Component } from "react";
import{StyleSheet} from 'react-native';
import { Container, Header, Content, Icon, Picker, Form, Text,List, ListItem,} from "native-base";

export default class CarSetting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      make: "make",
      model:"model",
      year: "year",
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
  yearByCar(make,model){
    return(
      <Picker
              mode="dropdown"
              iosIcon={<Icon name="arrow-down" />}
              headerStyle={{ backgroundColor: "#DE601B" }}
              headerBackButtonTextStyle={{ color: "#000" }}
              headerTitleStyle={{ color: "#000" }}
              selectedValue={this.state.year}
              onValueChange={this.onValueChangeYear.bind(this)}
      >
        <Picker.Item label='Year' value ='year'/>
        <Picker.Item label='2019' value ='2019'/>
        <Picker.Item label='2018' value ='2018'/>
        <Picker.Item label='2017' value ='2017'/>
        <Picker.Item label='2016' value ='2016'/>
        <Picker.Item label='2015' value ='2015'/>
        <Picker.Item label='2014' value ='2014'/>
        <Picker.Item label='2013' value ='2013'/>
        <Picker.Item label='2012' value ='2012'/>
        <Picker.Item label='2011' value ='2011'/>
        <Picker.Item label='2010' value ='2010'/>
        <Picker.Item label='2009' value ='2009'/>
        <Picker.Item label='2008' value ='2008'/>
        <Picker.Item label='2007' value ='2007'/>
        <Picker.Item label='2006' value ='2006'/>
        <Picker.Item label='2005' value ='2005'/>
        <Picker.Item label='2004' value ='2004'/>
        <Picker.Item label='2003' value ='2003'/>
        <Picker.Item label='2002' value ='2002'/>
        <Picker.Item label='2001' value ='2001'/> 
        <Picker.Item label='2000' value ='2000'/>    
        <Picker.Item label='1999' value ='1999'/>  
        <Picker.Item label='1998' value ='1998'/>
        <Picker.Item label='1997' value ='1997'/>
        <Picker.Item label='1996' value ='1996'/>
        <Picker.Item label='1995' value ='1995'/>
      </Picker>
    )
  }
  render() {
    return (
          <Form>
            {/*<Picker
              mode="dropdown"
              iosIcon={<Icon name="arrow-down"/>}
              headerStyle={{ backgroundColor: "#DE601B" }}
              headerBackButtonTextStyle={{ color: "#000" }}
              headerTitleStyle={{ color: "#000" }}
              selectedValue={this.state.make}
              onValueChange={this.onValueChangeMake.bind(this)}
            >
              <Picker.Item label="Make" value="make" onValueChange={this.modelByMake.bind()}/>
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
              <Picker.Item label="Plymouth" value="Plymouth" />
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
            </Picker>*/}
            {this.yearByCar()}
          </Form>
    );
  }
}