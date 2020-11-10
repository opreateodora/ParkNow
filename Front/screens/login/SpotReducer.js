import {GET_SUCCESS} from './types';
const INITAL_STATE = {data: null};

export default (state = INITAL_STATE, action) => {
  switch (action.type) {
    case GET_SUCCESS: {
      return {
        ...state,
        ...INITAL_STATE,
        data: action.payload,
      };
    }
    default:
      return state;
  }
};
