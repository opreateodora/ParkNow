import React from 'react';
import {Scene, Router} from 'react-native-router-flux';
import Login from './login';
import MapComponent from './MapComponent';
import AddSpot from './AddSpot';
import SpotList from './SpotList';

const RouterComponent = () => {
  return (
    <Router>
      <Scene key="root">
        <Scene key="Login" component={Login} hideNavBar initial />
        <Scene key="MapComponent" component={MapComponent} hideNavBar />
        <Scene key="AddSpot" component={AddSpot} hideNavBar />
        <Scene key="SpotList" component={SpotList} hideNavBar />
      </Scene>
    </Router>
  );
};
export default RouterComponent;