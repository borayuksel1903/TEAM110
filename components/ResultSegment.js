import React from "react";
import PropTypes from "prop-types";
import {
  Left,
  Right,
  Icon,
  Button,
  Form,
  Picker,
  Segment,
  View,
  Text,
  Content,
} from "native-base";

// module deps
import PickerHeader from "./PickerHeader";

const ResultSegment = props => {
  const {selected, onValueChange, cities, searchCity, onGoingSearch} = props;

  return (
    <Segment style={{ backgroundColor: "transparent", height: 20, paddingBottom: 0,}}>
      <Left>
        <Picker
          renderHeader={backAction => (
            <PickerHeader
              handleSearchInput={searchCity}
              backAction={backAction}
            />
          )}
          style={{
            backgroundColor: "rgba(216, 216, 216, 0.21)",
            borderRadius: 15,
          }}
          mode="dropdown"
          placeholder="Select your car"
          iosIcon={
            <Right>
              <Icon
                name="ios-arrow-down-outline"
                style={{ color: "white" }}
              />
            </Right>
          }
          selectedValue={selected}
          onValueChange={onValueChange}
        >
          {onGoingSearch && cities.length === 0 ? (
            <View>
              <Text>No car matching your serach.</Text>
            </View>
          ) : (
            cities.map(city => (
              <Picker.Item label={city.name} value={city.id} key={city.id} />
            ))
          )}
        </Picker>
      </Left>
    </Segment>
  );
};

ResultSegment.propTypes = {
  cities: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ),
  searchCity: PropTypes.func.isRequired,
  selected: PropTypes.string.isRequired,
  onValueChange: PropTypes.func.isRequired,
  onGoingSearch: PropTypes.bool.isRequired,
};

export default ResultSegment;
