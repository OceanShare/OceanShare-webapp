import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import { withAuthorization } from '../Session';
import { firebase } from '../Firebase';

import L from 'leaflet';
import medusa from '../../images/icons/meduse.png';

var array = [];
navigator.geolocation.getCurrentPosition(function (position, err) {
  var lat = position.coords.latitude + ' ';
  var lng = position.coords.longitude;
  if (lat === '' || lng === '' || err) {
    lat = 0;
    lng = 0;
    array.push(lat, lng);
    alert('Geolocation doesn\'t work!');
  }
  array.push(lat, lng);
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
      latlng: [],
      markers: [array],
      zoom: 12,
      draggable: true,
    };
    this.toggle = this.toggle.bind(this);
  }

  getData = () => {
    firebase.database().ref('user-posts/' + myUserId).orderByChild('starCount');
  }

  addMarker = (e) => {
    const { markers } = this.state
    markers.push(e.latlng)
    this.setState({ markers })
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  render() {
    var pos = array;
    return (
      <div>
        <Map style={{ height: 'calc(100vh - 65px)' }} onClick={this.addMarker} center={pos} zoom={this.state.zoom}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {this.state.markers.map((position, idx) =>
            <Marker
              key={`marker-${idx}`}
              position={position}
            >
              <Popup>
                <Button >{position}</Button>
              </Popup>
            </Marker>
          )}

        </Map>
        <div>
          <Button className="opener" onClick={this.toggle}><i class="material-icons">control_point</i></Button>
          <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
            <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
            <ModalBody>

            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '}
              <Button color="secondary" onClick={this.toggle}>Cancel</Button>
            </ModalFooter>
          </Modal>
        </div>
      </div>
    )
  }
}

const HomePage = () => (
  <div>
    <CustomMap />
  </div>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(HomePage);
