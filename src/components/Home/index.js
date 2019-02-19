import React, {Component} from 'react';

import L from "leaflet";
import { withAuthorization } from '../Session';


class CustomMap extends Component {
  state = {
    lat: 51.505,
    lng: -0.09,
    zoom: 13,
  }
  render() {

    navigator.geolocation.getCurrentPosition(function(location) {
      var latlng = new L.LatLng(location.coords.latitude, location.coords.longitude);
      
      var mymap = L.map('mapid').setView(latlng, 13)
      L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        maxZoom: 13,
        id: 'mapbox.streets',
        accessToken: 'pk.eyJ1IjoiYmJyb29rMTU0IiwiYSI6ImNpcXN3dnJrdDAwMGNmd250bjhvZXpnbWsifQ.Nf9Zkfchos577IanoKMoYQ'
      }).addTo(mymap);
      L.marker(latlng).addTo(mymap);
    });
      return (
        <div style={{width: '100vw', height: '92vh', overflow: 'hidden'}}>
          <div style={{width: '100vw', height: '92vh'}} id="mapid"></div>
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
