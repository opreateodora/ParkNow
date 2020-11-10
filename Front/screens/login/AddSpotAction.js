import {REGISTER_SUCCESS, REGISTER_FAILD} from './types';
import {Actions} from 'react-native-router-flux';
import Axios from 'axios';
import { Alert } from 'react-native';

export const AddNewSpot = (
    spotLatitude,
    spotLongitude,
    fullName,
    address,
    noPhone
) => {
  return dispatch => {
    Axios({
      method: 'POST',
      url: 'http://192.168.100.22:8080/AddSpot',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      data: {
    spotLatitude: spotLatitude,
    spotLongitude: spotLongitude,
    fullName: fullName,
    address:address,
    noPhone:noPhone
      },
    }).then(response => {
      console.log(response.data);
      registerSuccess(dispatch, response.data);
      //      })
      //      .catch(() => {
      //        registerFaild(dispatch, true);
    });
  };
};

export const registerSuccess = (dispatch, response) => {
  dispatch({
    type: REGISTER_SUCCESS,
    payload: response,
  });
  Alert.alert('Am ajuns la register Success');
  Actions.MapComponent();
};
