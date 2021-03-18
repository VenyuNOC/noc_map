import React from 'react';
import Alerts from './components/alerts/Alerts.component';
import Conditions from './components/conditions/Conditions.component';
import MapView from './components/mapview/MapView.component';

export default class App extends React.Component {
  pos: "absolute" = "absolute";
  btrStyle = {
    position: this.pos,
    left: "0px",
    bottom: "0px",
    zIndex: 100,
    width: "480px",
    height: "480px"
  }

  shvStyle = {
    position: this.pos,
    top: "0px",
    right: "0px",
    zIndex: 100,
    width: "480px",
    height: "480px"
  }
  render() {
    return (
      <div className="App">
        <div style={this.btrStyle}>
          <Conditions station={"btr"} longName={"Baton Rouge"} />
        </div>
        <div style={this.shvStyle}>
          <Conditions station={"shv"} longName={"Shreveport"} />
        </div>
        <MapView appId={`${process.env.REACT_APP_OWM_API_KEY}`} />
        <Alerts />
      </div>
    )
  }
}