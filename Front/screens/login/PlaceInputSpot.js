import React, { Component } from 'react'
import { Text, StyleSheet, View, Keyboard, TouchableOpacity, TextInput, Platform, PermissionsAndroid } from 'react-native'
import Axios from 'axios';
import _ from "lodash";
export default class PlaceInputSpot extends Component {
    constructor(props){
        super (props);
        this.state={
           // input: "",
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

    setDestination(main_text, place_id){
        Keyboard.dismiss();
        this.setState({destinationInput: main_text, predictions: [] });
      //  this.props.showDirectionsOnMap(place_id);
    }
    render() {
        const {suggestionStyle, main_textStyle, secondary_textStyle, placeInputStyle}= styles;

      //  console.log(this.state);
        const predictions = this.state.predictions.map(prediction => {
            const {id, structured_formatting, place_id}= prediction;
            return(
                <TouchableOpacity 
                    key={id}
                    onPress ={() => this.setDestination(structured_formatting.main_text, place_id)}
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
        
        return (
            <View>
            <TextInput 
                value={this.state.destinationInput}
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={input => {
                    this.setState({ destinationInput: input});
                    this.getPlacesDebounced(input)
                }}
                style={placeInputStyle} 
                placeholder= "Where to?"
                
            />
            {predictions}
            
            </View>
        );
    }
}

const styles = StyleSheet.create({
    placeInputStyle: {
        height: 40,
        marginTop: 50,
        padding: 5,
        backgroundColor: "white"
    },
    suggestionStyle: {
        borderTopWidth: 0.5,
        backgroundColor: "white",
        borderColor: "#777",
        padding: 5
    },
    secondary_textStyle:{
        color: '#777'
    },
    main_textStyle: {
        color: "#000"
    }
});
