import React, { Component } from 'react';
import {Button} from 'reactstrap';

import { Map, TileLayer, Marker, Popup }  from 'react-leaflet';
import { withAuthorization } from '../Session';
import L from 'leaflet';

// import daulphin from '../../images/icons/daulphin.png'
import medusa from '../../images/icons/meduse.png';
import warning from '../../images/icons/warnaingBlanc.png'

function CloseOverlay() {
  document.getElementById("overlay").style.display = "none";
}
function OpenOverlay() {
  document.getElementById("overlay").style.display = "block";
}

var array = [];
navigator.geolocation.getCurrentPosition(function(position, err) {
  var lat = position.coords.latitude;
  var lng = position.coords.longitude;
  if (lat === ''|| lng === '' || err) {
    lat = 0;
    lng = 0;
    array.push(lat,  lng);
    alert('Geolocation doesn\'t work!');
  }
  array.push(lat,  lng);
});

export const alertmedusa = new L.Icon({
  iconUrl: medusa,
  iconAnchor: [20, 40],
  popupAnchor: [0, -35],
  iconSize: [40, 40],
  shadowSize: [29, 40],
  shadowAnchor: [7, 40],
})

class CustomMap extends Component {
  
  constructor() {
    super();
    this.state = {
      markers: [array],
      zoom: 12,
      draggable: true,
    };
  }

  addMarker = (e) => {
    const {markers} = this.state
    markers.push(e.latlng)
    this.setState({markers})
  }

  setWarning = (e) => {
    this.setState({icon : warning});
  }

  setMedusa = (e) => {
    this.setState({icon: medusa});
  }

  render() {
      var pos = array;
      return (
        <div>
            <div id="overlay" className="overlay" style={{display: 'none'}}>
            <Button className="cross" onClick={CloseOverlay} style={{color: 'yellow'}}>X</Button>
            <div className="overlay-content row">
              <div className="container-fluid">
                <div className="row">
                    <Button onClick={this.setWarning}>Home</Button>
                    <Button onClick={this.setMedusa}>About</Button>
                </div>
              </div>
            </div>
          </div>
          <Button id="opener" onClick={OpenOverlay} style={{postion: 'absolute', top:'170pc', left:'30px', zIndex: '200'}}>dehaze</Button>
          <Map style={{height: 'calc(100vh - 65px)'}} onClick={this.addMarker} center={pos} zoom={this.state.zoom}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
              {this.state.markers.map((position, idx) =>
                <Marker
                  key={`marker-${idx}`}
                  position={position}
                  
                >
                  <Popup>
                    <Button >Kill</Button>
                  </Popup>
                </Marker>
              )}
              
          </Map>
        </div>
    )
  }
}

const HomePage = () => (
  <div>
    <CustomMap/>
  </div>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(HomePage);
