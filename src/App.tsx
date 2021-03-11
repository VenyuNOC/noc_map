import React from 'react';
import Conditions from './components/conditions/Conditions.component';
import MapView from './components/mapview/MapView.component';

export default class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Conditions station={"btr"} longName={"Baton Rouge"} top={"600px"} left={"0px"} />
        <Conditions station={"shv"} longName={"Shreveport"} top={"0px"} left={"1440px"} />
        <MapView appId={`${process.env.REACT_APP_OWM_API_KEY}`} />
      </div>
    )
  }
}