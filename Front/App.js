//import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Provider} from 'react-redux';
import React, {PureComponent} from 'react';
import {createStore, applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk';
import Router from './screens/login/RouterComponent'
import reducers from './screens/login/index'
export default class App extends PureComponent {

render(){
  return (
  
  <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
        <Router />
      </Provider>
  );
}
  
}
const styles = StyleSheet.create({
  container: {
   // ...StyleSheet.absoluteFillObject,
    flex:1,
    //justifyContent: "flex-end",
    //alignItems: "center"
  },
});