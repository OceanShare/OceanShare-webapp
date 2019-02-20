import React, {Component} from 'react';

import { Map, TileLayer, Marker, Popup }  from 'react-leaflet';
import { withAuthorization } from '../Session';

var array = [];
navigator.geolocation.getCurrentPosition(function(position) {
   var lat = position.coords.latitude;
   var lng = position.coords.longitude;
   array.push( lat,  lng);
});

class CustomMap extends Component {
  state = {
      zoom: 13,
    }

  render() {
      var pos = array;
      return (
        <div>
          <Map center={pos} zoom={this.state.zoom} style={{height: '93vh', width: '100vw'}}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
            <Marker position={pos}>
              <Popup>
                Current Position
              </Popup>
            </Marker>
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
