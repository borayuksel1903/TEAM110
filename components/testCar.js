import React, {PureComponent} from "react";
import PropTypes from "prop-types";
// import {View} from "react-native";
import {Container, Content, StyleProvider,View} from "native-base";

// module deps
import ResultHeader from "./ResultHeader";

export default class Result extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      selected: "",
    };

    this._onValueChange = this._onValueChange.bind(this);
  }

  _onValueChange(value) {
    this.setState({
      selected: value,
    });
  }

  render() {
    const cities = [
      {id: "1", name: "Acura ILX"},
      {id: "2", name: "Acura MDX"},
      {id: "3", name: "Acura NSX"},
      {id: "4", name: "Acura RDX"},
      {id: "5", name: "Acura RLX"},
      {id: "6", name: "Acura TLX"},
      {id: "7", name: "Alfa Romeo 4C"},
      {id: "8", name: "Alfa Romeo Giulia"},
      {id: "9", name: "Alfa Romeo Stelvio"},
      {id: "10", name: "Aston Martin DB11"},
      {id: "11", name: "Aston Martin DBS"},
      {id: "12", name: "Aston Martin Rapide"},
      {id: "13", name: "Aston Martin Vanquish"},
      {id: "14", name: "Aston Martin Vantage"},
      {id: "15", name: "Audi A3"},
      {id: "16", name: "Audi A4"},
      {id: "17", name: "Audi A5"},
      {id: "18", name: "Audi A6"},
      {id: "19", name: "Audi A7"},
      {id: "20", name: "Audi A8"},
      {id: "21", name: "Audi Q3"},
      {id: "22", name: "Audi Q5"},
      {id: "23", name: "Audi Q7"},
      {id: "24", name: "Audi Q8"},
      {id: "25", name: "Audi RS"},
      {id: "26", name: "Audi S3"},
      {id: "27", name: "Audi S4"},
      {id: "28", name: "Audi S5"},
      {id: "29", name: "Audi SQ5"},
      {id: "30", name: "Audi TT"},
      {id: "31", name: "Audi TT RS"},
      {id: "32", name: "Audi TTS Coupe"},
      {id: "33", name: "Audi e-tron"},
      {id: "34", name: "Audi R8"},
      {id: "35", name: "BMW 2 Series"},
      {id: "36", name: "BMW 3 Series"},
      {id: "37", name: "BMW 4 Series"},
      {id: "38", name: "BMW 5 Series"},
      {id: "39", name: "BMW 6 Series"},
      {id: "40", name: "BMW 7 Series"},
      {id: "41", name: "BMW 8 Series"},
      {id: "42", name: "BMW M"},
      {id: "43", name: "BMW X1"},
      {id: "44", name: "BMW X2"},
      {id: "45", name: "BMW X3"},
      {id: "46", name: "BMW X4"},
      {id: "47", name: "BMW X5"},
      {id: "48", name: "BMW X6"},
      {id: "49", name: "BMW X7"},
      {id: "50", name: "BMW Z4"},
      {id: "51", name: "BMW i3"},
      {id: "52", name: "BMW i8"},
      {id: "53", name: "BYD e6"},
      {id: "54", name: "Bentley Bentayga"},
      {id: "55", name: "Bentley Mulsanne"},
      {id: "56", name: "Bentley Chiron"},
      {id: "57", name: "Buick Cascada"},
      {id: "58", name: "Buick Enclave"},
      {id: "59", name: "Buick Encore"},
      {id: "60", name: "Buick Envision"},
      {id: "61", name: "Buick LaCrosse"},
      {id: "62", name: "Buick Regal"},
      {id: "63", name: "Cadillac ATS"},
      {id: "64", name: "Cadillac CT6"},
      {id: "65", name: "Cadillac CTS"},
      {id: "66", name: "Cadillac Escalade"},
      {id: "67", name: "Cadillac XT4"},
      {id: "68", name: "Cadillac XT5"},
      {id: "69", name: "Cadillac XTS"},
      {id: "70", name: "Cadillac XTS Hearse"},
      {id: "71", name: "Cadillac Limo"},
      {id: "72", name: "Cadillac XT6"},
      {id: "73", name: "Chevrolet Blazer"},
      {id: "74", name: "Chevrolet Bolt EV"},
      {id: "75", name: "Chevrolet Camaro"},
      {id: "76", name: "Chevrolet Colorado"},
      {id: "77", name: "Chevrolet Corvette"},
      {id: "78", name: "Chevrolet Cruze"},
      {id: "79", name: "Chevrolet Equinox"},
      {id: "80", name: "Chevrolet Impala"},
      {id: "81", name: "Chevrolet Malibu"},
      {id: "82", name: "Chevrolet Silverado"},
      {id: "83", name: "Chevrolet Sonic"},
      {id: "84", name: "Chevrolet Spark"},
      {id: "85", name: "Chevrolet Suburban"},
      {id: "86", name: "Chevrolet Tahoe"},
      {id: "87", name: "Chevrolet Traverse"},
      {id: "88", name: "Chevrolet Trax"},
      {id: "89", name: "Chevrolet Volt"},
      {id: "90", name: "Chrysler 300"},
      {id: "91", name: "Chrysler Pacifica"},
      {id: "92", name: "Dodge Challenger"},
      {id: "93", name: "Dodge Charger"},
      {id: "94", name: "Dodge Durango"},
      {id: "95", name: "Dodge Grand Caravan"},
      {id: "96", name: "Dodge Journey"},
      {id: "97", name: "Ferrari 488 GTB"},
      {id: "98", name: "Ferrari 488 Pista"},
      {id: "99", name: "Ferrari 488 Pista Spider"},
      {id: "100", name: "Ferrari 488 Spider"},
      {id: "101", name: "Ferrari 812 Superfast"},
      {id: "102", name: "Ferrari GTC4Lusso"},
      {id: "103", name: "Ferrari Portofino"},
      {id: "104", name: "Fiat 124 Spider"},
      {id: "105", name: "Fiat 500"},
      {id: "106", name: "Fiat 500e"},
      {id: "107", name: "Ford EcoSport"},
      {id: "108", name: "Ford Edge"},
      {id: "109", name: "Ford Escape"},
      {id: "110", name: "Ford Expedition"},
      {id: "111", name: "Ford Explorer"},
      {id: "112", name: "Ford F150"},
      {id: "113", name: "Ford Fiesta"},
      {id: "114", name: "Ford Flex"},
      {id: "115", name: "Ford Fusion"},
      {id: "116", name: "Ford GT"},
      {id: "117", name: "Ford Mustang"},
      {id: "118", name: "Ford Ranger"},
      {id: "119", name: "Ford Taurus"},
      {id: "120", name: "Ford Transit Connect"},
      {id: "121", name: "Ford Transit T150 Wagon"},
      {id: "122", name: "GMC Acadia"},
      {id: "123", name: "GMC Canyon"},
      {id: "124", name: "GMC Sierra"},
      {id: "125", name: "GMC Terrain"},
      {id: "126", name: "GMC Yukon"},
      {id: "127", name: "Genesis G70"},
      {id: "128", name: "Genesis G80"},
      {id: "129", name: "Genesis G90"},
      {id: "130", name: "Honda Accord"},
      {id: "131", name: "Honda CR-V"},
      {id: "132", name: "Honda Civic"},
      {id: "133", name: "Honda Clarity"},
      {id: "134", name: "Honda Fit"},
      {id: "135", name: "Honda HR-V"},
      {id: "136", name: "Honda Insight"},
      {id: "137", name: "Honda Odyssey"},
      {id: "138", name: "Honda Passport"},
      {id: "139", name: "Honda Pilot"},
      {id: "140", name: "Honda Ridgeline"},
      {id: "141", name: "Hyundai Accent"},
      {id: "142", name: "Hyundai Elantra"},
      {id: "143", name: "Hyundai Ioniq"},
      {id: "144", name: "Hyundai Kona"},
      {id: "145", name: "Hyundai Santa Fe"},
      {id: "146", name: "Hyundai Sonata"},
      {id: "147", name: "Hyundai Tucson"},
      {id: "148", name: "Hyundai Veloster"},
      {id: "149", name: "Infiniti Q50"},
      {id: "150", name: "Infiniti Q60"},
      {id: "151", name: "Infiniti Q70"},
      {id: "152", name: "Infiniti QX30"},
      {id: "153", name: "Infiniti QX50"},
      {id: "154", name: "Infiniti QX60"},
      {id: "155", name: "Infiniti QX80"},
      {id: "156", name: "Jaguar E-Pace"},
      {id: "157", name: "Jaguar F-Pace"},
      {id: "158", name: "Jaguar F-Type"},
      {id: "159", name: "Jaguar I-Pace"},
      {id: "160", name: "Jaguar XE"},
      {id: "161", name: "Jaguar XF"},
      {id: "162", name: "Jaguar XJ"},
      {id: "163", name: "Jeep Cherokee"},
      {id: "164", name: "Jeep Compass"},
      {id: "165", name: "Jeep Grand Cherokee"},
      {id: "167", name: "Jeep Renegade"},
      {id: "168", name: "Jeep Wrangler"},
      {id: "169", name: "Jeep Gladiator"},
      {id: "170", name: "Kia Cadenza"},
      {id: "171", name: "Kia Forte"},
      {id: "172", name: "Kia K900"},
      {id: "173", name: "Kia Niro"},
      {id: "174", name: "Kia Optima"},
      {id: "175", name: "Kia Rio"},
      {id: "176", name: "Kia Sedona"},
      {id: "177", name: "Kia Sorento"},
      {id: "178", name: "Kia Soul"},
      {id: "179", name: "Kia Sportage"},
      {id: "180", name: "Kia Stinger"},
      {id: "181", name: "Kia Sedona"},
      {id: "182", name: "Kia Telluride"},
      {id: "183", name: "Lamborghini Aventador"},
      {id: "184", name: "Lamborghini Huracan"},
      {id: "185", name: "Lamborghini Urus"},
      {id: "186", name: "Land Rover Discovery"},
      {id: "187", name: "Land Rover Rang Rover"},
      {id: "188", name: "Land Rover Evoque"},
      {id: "189", name: "Lexus ES"},
      {id: "190", name: "Lexus GS"},
      {id: "191", name: "Lexus GX"},
      {id: "192", name: "Lexus IS"},
      {id: "193", name: "Lexus LC"},
      {id: "194", name: "Lexus LS"},
      {id: "195", name: "Lexus LX"},
      {id: "196", name: "Lexus NX"},
      {id: "197", name: "Lexus RC"},
      {id: "198", name: "Lexus RX"},
      {id: "199", name: "Lexus UX"},
      {id: "200", name: "Lincoln Continental"},
      {id: "201", name: "Lincoln MKC"},
      {id: "202", name: "Lincoln MKT"},
      {id: "203", name: "Lincoln MKZ"},
      {id: "204", name: "Lincoln Nautilus"},
      {id: "205", name: "Lincoln Navigator"},
      {id: "206", name: "MINI Clubman"},
      {id: "207", name: "MINI Copper"},
      {id: "208", name: "MINI Countryman"},
      {id: "209", name: "MINI John Cooper Works"},
      {id: "210", name: "Maserati Ghibli"},
      {id: "211", name: "Maserati Eclipse Cross"},
      {id: "212", name: "Maserati Mirage"},
      {id: "213", name: "Maserati Outlander"},
      {id: "214", name: "Nissan 370Z"},
      {id: "215", name: "Nissan Altima"},
      {id: "216", name: "Nissan Armada"},
      {id: "217", name: "Subaru Ascent"},
      {id: "218", name: "Toyota Corolla"},
      {id: "219", name: "Toyota sienna"},
    {id: "220", name: "Toyota Supra"},
    ];
    
    const {selected} = this.state;

    return (
          <ResultHeader
            handleSearchInput={this._searchCity}
            cities={cities}
            selected={selected}
            onValueChange={this._onValueChange}
          />
    );
  }
}

Result.propTypes = {
  cities: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ),
};