import {GET_SUCCESS} from './types';
import Axios from 'axios';

export const GetSpot = () => {
  return dispatch => {
    Axios({
      method: 'GET',
      url: `http://192.168.100.22:8080/getSpot`,
      headers: {
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
    }).then(response => {
      getSpotSuccess(dispatch, response.data);
    });
  };
};
export const getSpotSuccess = (dispatch, response) => {
  dispatch({
    type: GET_SUCCESS,
    payload: response,
  });
  console.log('Ai luat lista');
  console.log(response);
};
