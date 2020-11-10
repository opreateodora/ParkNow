import {REGISTER_SUCCESS, REGISTER_FAILD} from './types';
const INITAL_STATE = {id: '', error: false, data: null};

export default (state = INITAL_STATE, action) => {
  switch (action.type) {
    case REGISTER_SUCCESS: {
      return {
        ...state,
        ...INITAL_STATE,
        id: action.payload.id,
        data: action.payload,
      };
    }
    case REGISTER_FAILD:
      return {
        ...state,
        ...INITAL_STATE,
        error: action.payload.error,
      };
    default:
      return state;
  }
};
