import { connect } from "react-redux";
import Axios from 'axios';
import _ from "lodash";
import React, { PureComponent, Fragment } from "react";
import { ScrollView, TextInput, View, Alert,  Keyboard, TouchableOpacity, Text } from "react-native";
import styled from "styled-components/native";
import { Actions } from "react-native-router-flux";
import { AddNewSpot  } from "./index";
import PlaceInputSpot from './PlaceInputSpot';
import styles from './styleSpot'
import { GetSpot } from "./index";
import Geocoder from 'react-native-geocoding'

const ORANGE = "#d35400";
const LIGHT_GRAY = "black";



class AddSpot extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      spotLatitude:"",
      spotLongitude:"",
      address:"",
      fullName:"",
      strada: "",
      localitate: "",
      oras:"",
      predictions: [],
      destinationInput: ""
    };
    this.getPlaces = this.getPlaces.bind(this);
        this.getPlacesDebounced = _.debounce(this.getPlaces, 1000);
        this.setDestination = this.setDestination.bind(this);
  }
  async getPlaces(input){
    const {userLatitude, userLongitude} = this.props;
    
    const result = await Axios.get(
        `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&key=AIzaSyCPGprQ3b1CTpBQUxtOckThjtLm3AYEQrQ&location=${userLatitude},${userLongitude}&radius=2000`
    );
    console.log(result.data);
    this.setState({ predictions: result.data.predictions});

}
async getLangLng(input){
  const result = await Axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${input}&key=AIzaSyCPGprQ3b1CTpBQUxtOckThjtLm3AYEQrQ`);
  console.log(result[0]);
  this.setState({spotLatitude: result[0].geometry.location.lat})
}
async setDestination(main_text, place_id){
  Keyboard.dismiss();
  this.setState({destinationInput: main_text, predictions: [] });
  this.setState({address: main_text});
  Geocoder.init("AIzaSyCPGprQ3b1CTpBQUxtOckThjtLm3AYEQrQ");
  Geocoder.from(main_text)
		.then(json => {
      var location = json.results[0].geometry.location;
      this.setState({spotLatitude:location.lat, spotLongitude:location.lng});
			console.log(location);
		})
    .catch(error => console.warn(error));  
  }
 

  onPressBack = () => {
    Actions.MapComponent();
  };


  onPressValidateAndFinish = () => {
    const {
      spotLatitude,
      spotLongitude,
      fullName,
      address,
      noPhone
      } = this.state;
      this.props.AddNewSpot (
        spotLatitude,
        spotLongitude,
        fullName,
        address,
        noPhone
      );
      Alert.alert("success!", `New Spot!`);
      this.props.GetSpot();
     // Actions.MapComponent();
     Actions.SpotList();

  }
  state = {
    isFocused: false,
  };
  handleFocus = (event) => {
    this.setState({ isFocused: true });
    if (this.props.onFocus) {
      this.props.onFocus(event);
    }
  };
  handleBlur = (event) => {
    this.setState({ isFocused: false });
    if (this.props.onBlur) {
      this.props.onBlur(event);
    }
  };

  render() {
    const {suggestionStyle, main_textStyle, secondary_textStyle, placeInputStyle}= styles;

      const predictions = this.state.predictions.map(prediction => {
          const {id, structured_formatting, place_id}= prediction;
          return(
              <TouchableOpacity 
                  key={id}
                  onPress ={() => this.setDestination(structured_formatting.main_text, place_id)
                                 
                                    
                  }
              >
              <View  style= {suggestionStyle}>
              <Text style= {main_textStyle}>
                  {structured_formatting.main_text}
              </Text>
              <Text  style={secondary_textStyle}>
                  {structured_formatting.secondary_text}
              </Text>
              </View>
              </TouchableOpacity>
              
          );
          
      });
    const {
        spotLatitude,
        fullName,
        strada,
        localitate,
        oras,
        noPhone,
       // address,
      isFocused,
    } = this.state;
    const { onFocus, onBlur, ...otherProps } = this.props;
    return (
      <View style={styles.container}>
        <ScrollView>
          <View>
            <Wrapper>
              <Title>Add new spot</Title>
             
              <TextInput 
                value={this.state.destinationInput}
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={input => {
                    this.setState({ destinationInput: input, spotLatitude:input});
                    this.getPlacesDebounced(input)
                }}
                style={placeInputStyle} 
                placeholder= "Where to?"
                
            />
            {predictions}
            
            
              
              <TextInput
                placeholder="Full name"
                selectionColor={ORANGE}
                placeholderTextColor="#666"
                underlineColorAndroid={isFocused ? ORANGE : LIGHT_GRAY}
                onFocus={this.handleFocus}
                onBlur={this.handleBlur}
                onChangeText={(value) => this.setState({ fullName: value })}
                style={styles.textInput}
                {...otherProps}
              />
              
              <TextInput
                placeholder="Oras"
                selectionColor={ORANGE}
                placeholderTextColor="#666"
                underlineColorAndroid={isFocused ? ORANGE : LIGHT_GRAY}
                onFocus={this.handleFocus}
                onBlur={this.handleBlur}
                onChangeText={(value) => this.setState({ oras: value })}
                style={styles.textInput}
                {...otherProps}
              />
              <TextInput
                placeholder="Phone number"
                selectionColor={ORANGE}
                placeholderTextColor="#666"
                underlineColorAndroid={isFocused ? ORANGE : LIGHT_GRAY}
                onFocus={this.handleFocus}
                onBlur={this.handleBlur}
                onChangeText={(value) => this.setState({ noPhone: value })}
                style={styles.textInput}
                {...otherProps}
              />
              <View
                style={{
                  flex: 1,
                  flexDirection: "column",
                  justifyContent: "center",
                  width: 260,
                }}
              >
              </View>
              <ButtonWrapper>
                <Fragment>
                  <StyledButton onPress={this.onPressValidateAndFinish}>
                    <StyledTitle>{"Finish"}</StyledTitle>
                  </StyledButton>
                  <StyledButton transparent onPress={this.onPressBack}>
                    <StyledTitle>{"Back"}</StyledTitle>
                  </StyledButton>
                </Fragment>
              </ButtonWrapper>
            </Wrapper>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = ({ reg }) => {
  const { id, error } = reg;
  return { id, error };
};
export default connect(mapStateToProps, { AddNewSpot, GetSpot })(AddSpot);

export const Title = styled.Text`
  color: #666;
  margin: 20% 0px 20px;
  font-size: 30;
  text-align: center;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 3;
`;

export const ButtonWrapper = styled.View`
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

export const Wrapper = styled.View`
  justify-content: space-between;
  padding: 0px;
  align-items: center;
  flex-direction: column;
`;

const StyledButton = styled.TouchableHighlight`
 width:250px;
 background-color:${(props) => (props.transparent ? "transparent" : "#3498DB")};
 padding:15px;
 border:${(props) => (props.transparent ? "1px solid #3498DB  " : 0)}
 justify-content:center;
 margin-bottom:20px;
 border-radius:24px
`;

const StyledTitle = styled.Text`
  text-transform: uppercase;
  text-align: center;
  font-weight: bold;
  letter-spacing: 3;
  color: ${(props) => (props.transparent ? "#eccc68 " : "#666")};
`;
