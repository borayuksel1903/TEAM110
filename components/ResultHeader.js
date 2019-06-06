import React, {Component} from "react";
import PropTypes from "prop-types";
import {Platform, StatusBar, Image} from "react-native";
import {Header, Left, Right, Body, Title, Container} from "native-base";

// module deps
import ResultSegment from "./ResultSegment";

class ResultHeader extends Component {
  constructor(props) {
    super(props);

    this.onGoingSearch = false;
    this.state = {
      searchResult: [],
    };

    this._searchCity = this._searchCity.bind(this);
  }

  _searchCity(text) {
    this.onGoingSearch = true;
    const searchResult = this.props.cities.filter(city =>
      city.name.toLowerCase().startsWith(text.toLowerCase()),
    );

    this.setState({
      searchResult,
    });
  }

  render() {
    const {selected, onValueChange} = this.props;
    const {searchResult} = this.state;
    const cities =
      this.onGoingSearch && searchResult.length >= 0
        ? searchResult
        : this.props.cities;

    return (

        <ResultSegment
          onGoingSearch
          cities={cities}
          selected={selected}
          searchCity={this._searchCity}
          onValueChange={value => {
            this.onGoingSearch = false;
            onValueChange(value);
          }}
        />
    );
  }
}

ResultHeader.propTypes = {
  cities: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ),
  selected: PropTypes.string.isRequired,
  onValueChange: PropTypes.func.isRequired,
};

export default ResultHeader;
