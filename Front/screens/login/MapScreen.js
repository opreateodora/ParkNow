  
import React from "react";
import { View, StyleSheet, Platform, PermissionsAndroid } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps"; // remove PROVIDER_GOOGLE import if not using Google Maps
import Geolocation from 'react-native-geolocation-service';

class MapScreen extends React.Component{
  render() {
    return (
     
      <MapView
        innerRef={this.props.innerRef}
        showsUserLocation
        followsUserLocation
        style={styles.map}
        region={{
          latitude: this.props.userLatitude,
          longitude: this.props.userLongitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121
        }}
      >
        {this.props.children}
      </MapView>

    );
}
}
export default React.forwardRef((props, ref) => (
  <MapScreen innerRef= {ref} {...props}/>
));
const styles = StyleSheet.create({
 
  map: {
    ...StyleSheet.absoluteFillObject
  }
});
