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
    center: {
      lat: 51.505,
      lng: -0.09,
    },
    marker: {
      lat: 51.505,
      lng: -0.09,
    },
    zoom: 13,
    draggable: true,
  }

  render() {
      var pos = array;

      return (
        <div>
          <Map center={pos} zoom={this.state.zoom} style={{height: '93vh', width: '100vw'}}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
            <Marker
              draggable={this.state.draggable}
              onDragend={this.updatePosition}
              position={pos}
              ref={this.refmarker}>
              <Popup minWidth={90}>
                <span onClick={this.toggleDraggable}>
                  {this.state.draggable ? 'DRAG MARKER' : 'MARKER FIXED'}
                </span>
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
