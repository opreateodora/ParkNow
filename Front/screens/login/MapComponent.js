import React, { Component, Fragment } from 'react'
import { Text, StyleSheet, Keyboard, View, TextInput, Platform, PermissionsAndroid, TouchableWithoutFeedback, Button, Linking } from 'react-native'
import MapScreen from './MapScreen.js';
import { connect } from "react-redux";
import styled from "styled-components/native";
import { Actions } from "react-native-router-flux";
import { GetSpot } from "./index";
import { FlatList } from "react-native-gesture-handler";
import axios from 'axios';
import PlaceInput from './PlaceInput.js' ;
import PolyLine from '@mapbox/polyline';
import MapView, {Polyline, Marker} from 'react-native-maps';

const markerImage= require('./images/greencar.png')
const ORANGE = "#d35400";
const LIGHT_GRAY = "black";

class MapComponent extends Component {
    constructor(props){
        super(props);
        this.state={
          hasMapPermission: false, 
          userLatitude: 0,
          userLongitude:0,
          destinationCoords: [],
          isFocused: false, 
          latitudeSpot: 0,
          longitudeSpot:0,
        };
        this.props.GetSpot();
        this.locationWatchId = null;
        this.showDirectionsOnMap = this.showDirectionsOnMap.bind(this);
        this.map = React.createRef();
    }
    componentWillMount() {
      this.props.GetSpot();
  }

  handleRowPress = (item) => {
    this.props.navigation.navigate(item);
  };
 

    componentDidMount(){
        this.requestFineLocation();
      
    }
        
    componentWillUnmount(){
        navigator.geolocation.clearWatch(this.locationWatchId);
    }
    goAddSpot(){
      Actions.AddSpot();
    }
    async showDirectionsOnMap(placeId){
        const { userLatitude, userLongitude}= this.state;
        try{
            const result = await axios.get(
                `https://maps.googleapis.com/maps/api/directions/json?origin=${userLatitude},${userLongitude}&destination=place_id:${placeId}&key=AIzaSyCPGprQ3b1CTpBQUxtOckThjtLm3AYEQrQ`
            );
            const points = PolyLine.decode(
                result.data.routes[0].overview_polyline.points
            );
            const latLng = points.map(point => ({
                latitude: point[0], 
                longitude: point[1]
            }));
            this.setState({ destinationCoords: latLng});
            this.map.current.fitToCoordinates(latLng, { 
                edgePadding: { top:40, bottom:40, left: 40, right: 40}
            });
            console.log(points);
        } catch (err){
            console.error(err);
        }
    }

    hideKeyboard(){
        Keyboard.dismiss();
    }

    getUserPosition(){
        this.setState({hasMapPermission: true});
        this.locationWatchId = navigator.geolocation.watchPosition(
            pos => {
              this.setState({
                userLatitude: pos.coords.latitude,
                userLongitude: pos.coords.longitude
              });
            },
            err => console.warn(err),
            {
              enableHighAccuracy: true
            }
          );
    }
          async requestFineLocation(){
            try{
              if (Platform.OS ==='android'){
                const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
                if (granted === PermissionsAndroid.RESULTS.GRANTED){
                  this.getUserPosition();
                }
              } else {
                this.getUserPosition();
              }
            } catch(err){
              console.warn(err);
            }
          }

          putMarker(lat, long){
            return(
              <Marker
                        coordinate={{latitude: lat,
                        longitude: long}}
                        title={"title"}
                        description={"description"}
                     />
            )
            }
render(){
const {destinationCoords, userLatitude, userLongitude}= this.state;


const { data, onFocus, onBlur, ...otherProps} = this.props; 
const { isFocused, id_user} = this.state;

let polyline = null;
let marker = null;



if (destinationCoords.length > 0){
    polyline =(
    <Polyline 
    coordinates={this.state.destinationCoords}
    strokeWidth={6}
    strokeColor="red"
    />
    );
    marker = (
        <Marker coordinate ={destinationCoords[destinationCoords.length-1]}/>
    );
}    

if (this.state.hasMapPermission){
  return (
   <TouchableWithoutFeedback onPress={this.hideKeyboard}>
        <View style={styles.container}>
            <MapView
                ref={this.map}
                showsUserLocation
                followsUserLocation
                style={styles.map}
                region={{
                    latitude: this.state.userLatitude,
                    longitude: this.state.userLongitude,
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121
                }}
            >

             {this.props.data.map(
                  (val,index)=>{
                  console.log('val', val);
                  return(<Marker
                        coordinate={{latitude:val.spotLatitude,
                                      longitude:val.spotLongitude}}
                        key={index}
                        title={`Owner ${val.fullName}`}
                       description={ `NumberPhone ${val.noPhone}`}
                        image ={markerImage}
                      
                        />
                        /*
                        <Button 
                        //title={`Owner ${val.fullName}`}
                        title={ `NumberPhone ${val.noPhone}`}
                        image ={markerImage}
                       // title="call"
                        onPress={Linking.openURL(`noPhone:${val.noPhone}`)}/>
                        </Marker>*/
                        );
                })}
              

                {polyline}
                {marker}
               
            </MapView>
            
          
            <PlaceInput
            showDirectionsOnMap={this.showDirectionsOnMap}
            userLatitude={this.state.userLatitude}
            userLongitude={this.state.userLongitude}
            />
            <Button 
            buttonStyle={styles.loginButton}
            title="Add new spot"
            onPress={() => this.goAddSpot()}/>
            
        </View>
    </TouchableWithoutFeedback>
  );
}
return null;
}
}

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
  padding: 100px;
  align-items: center;
  flex-direction: column;
`;

const StyledButton = styled.TouchableHighlight`
 width:250px;
 background-color:${(props) => (props.transparent ? "transparent" : "#F79F1F")};
 padding:15px;
 border:${(props) => (props.transparent ? "1px solid #F79F1F " : 0)}
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

const mapStateToProps = ({ get }) => {
  const { data } = get;
  return { data };
};
export default connect(mapStateToProps, {GetSpot} )(MapComponent);
const styles = StyleSheet.create({
  container: {

    flex:1,
    
  },
  map: {
    ...StyleSheet.absoluteFillObject
  },
  loginButton: {
    backgroundColor: '#3897f1',
    borderRadius: 5,
    height: 45,
    marginTop: 10,
  },
});