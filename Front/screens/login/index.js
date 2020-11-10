import {combineReducers} from 'redux';
import AddReducer from './AddReducer'
import SpotReducer from './SpotReducer'
import UserReducer from './UserReducer'
export * from './AddSpotAction';
export * from './GetSpot';
export * from './AddUserAction'
export default combineReducers({
    reg: AddReducer,
    get: SpotReducer,
    add: AddReducer,
  });