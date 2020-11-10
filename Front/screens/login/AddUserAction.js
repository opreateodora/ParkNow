import {REGISTER_SUCCESS, REGISTER_FAILD} from './types';
import {Actions} from 'react-native-router-flux';
import Axios from 'axios';
import { Alert } from 'react-native';

export const AddNewUser = (
    email,
    name,
) => {
  return dispatch => {
    Axios({
      method: 'POST',
      url: 'http://192.168.100.22:8080/AddUser',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      data: {
    email:email,
    name:name
      },
    }).then(response => {
      console.log(response.data);
      registerSuccess(dispatch, response.data);
    });
  };
};
export const registerUserSuccess = (dispatch, response) => {
  dispatch({
    type: REGISTER_SUCCESS,
    payload: response,
  });
};
