import React from "react";
import PropTypes from "prop-types";
import {Platform, StatusBar} from "react-native";
import {
  Header,
  Left,
  Right,
  Item,
  Input,
  Icon,
  Body,
  Title,
  Button,
  Segment,
  View,
  Container,
  Content
} from "native-base";


const PickerHeader = props => (
  <View>
    <Header hasSegment style={{
        backgroundColor: "#DE601B"
      }}>
      {Platform.OS === "ios" ? (
        <StatusBar backgroundColor="transparent" barStyle="light-content" />
      ) : null}

      <Left >
        <Button transparent light onPress={props.backAction}>
          <Icon name="arrow-back" style={{color: "white", fontSize: 25}} />
        </Button>
      </Left>

      <Body >
        <Title textStyle={{ color: "white"}}>Select your car
        </Title>
      </Body>

      <Right />
    </Header>
    <Segment
      style={{
        backgroundColor: "rgba(216, 216, 216, 0.21)",
        marginBottom: 10,
        marginTop:'1%'
      }}
    >
      <Left>
        <Item style={{
          backgroundColor: "rgba(216,216,216,0.21)"
        }}>
        <Icon name="search" style={{ color: "#000" }}/>
        <Input
          placeholder="Search"
          placeholderTextColor="#000"
          onChangeText={props.handleSearchInput}
        />
      </Item>
      </Left>
    </Segment>
  </View>
);

PickerHeader.propTypes = {
  handleSearchInput: PropTypes.func.isRequired,
  backAction: PropTypes.func.isRequired,
};

export default PickerHeader;
