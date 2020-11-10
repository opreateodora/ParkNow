import React, { PureComponent } from "react";
import Expo from "expo"
import styles from "./style";
import {Keyboard, Platform,StyleSheet,Image,Text, View, TextInput, TouchableWithoutFeedback, Alert, KeyboardAvoidingView} from 'react-native';
import { Button, SocialIcon } from 'react-native-elements';

import * as Facebook from 'expo-facebook';
import { connect } from "react-redux";
import Axios from 'axios';
import _ from "lodash";
import {AddNewUser} from './index';
import {GetSpot} from './index';
import {Actions} from 'react-native-router-flux';

import * as Google from 'expo-google-app-auth';

const appId = "2471423723169634"

 class LoginScreen extends PureComponent {
  constructor(props){
    super(props)
    this.state={
      email:'',
      name:''
    };

  }
  componentWillMount(){
    this.props.GetSpot();
  }
  render() {
    return (
      <KeyboardAvoidingView style={styles.containerView} behavior="padding">

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.loginScreenContainer}>
          <View style={styles.loginFormView}>
        
          <Image source={require('./images/logoPK6.png')}
                 style={styles.logo1} />
          <Image source={require('./images/masina4.png')}
                 style={styles.logo2} />
            
            <SocialIcon
              buttonStyle={styles.fbLoginButton}
              button type='facebook'
              onPress={() => this.logIn()}
              title="Continue with Facebook"
            />
            <SocialIcon
             button type='google'
              onPress={() => this.GooglelogIn()}
              title="Continue with Google"
            />
           
           
          </View>
        </View>
      </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }


  
   async GooglelogIn ()  {
      try {
        const result = await Google.logInAsync({
          androidClientId:
            "1030053179746-u8uib2g2is4un71bhr2id6v3s6cgfht7.apps.googleusercontent.com",
          scopes: ["profile", "email"]
        })
  
        if (result.type === "success") {
          Alert.alert('Logged in!', `Hi ${(result.user.name)}!`);
          
          this.setState({
            signedIn: true,
            email:result.user.email,
            name: result.user.name,
            photoUrl: result.user.photoUrl
          })
         
          const{email,name}=this.state;
          this.props.AddNewUser(
            email,
            name
          );
          console.log(this.state.name);
          console.log(this.state.email);
          
          this.props.GetSpot();
         Actions.MapComponent();
          
        } else {
          console.log("cancelled")
        }
      } catch (e) {
        console.log("error", e)
      }
    }
 async  logIn() {
    try {
      await Facebook.initializeAsync(appId);
      const {
        type,
        token,
        expires,
        permissions,
        declinedPermissions,
      } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ['public_profile', 'email'],
      });
      if (type === 'success') {
        const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
        Alert.alert('Logged in!', `Hi ${(await response.json()).name}!`);
        this.setState({
          email:(response.json()).email,
          name: (response.json()).name,
        })
        console.log(this.state.name);
        console.log(this.state.email);
        this.props.GetSpot();
        Actions.MapComponent();
        //Actions.MapComponent();
     //  Actions.AddSpot();
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  }

}/*
const mapStateToProps = ({ add }) => {
  const { id, error } = add;
  return { id, error };
};*/
const mapStateToProps = ({ get }) => {
  const { data } = get;
  return { data };
};


export const loginSuccess = (dispatch, response) => {
  dispatch({
    type: LOGIN_SUCCESS,
    payload: response,
  });
  console.log('Am ajuns la login Success');
  Actions.Home();
};
export const loginFaild = (dispatch, value) => {
  dispatch({
    type: LOGIN_FAILD,
    payload: value,
  });
  console.log('Am ajuns la login Faild');
};

export default connect(mapStateToProps, {AddNewUser, GetSpot})(LoginScreen);
