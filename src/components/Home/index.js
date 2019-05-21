import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import { withAuthorization } from '../Session';
import * as firebase from 'firebase';
// import 'firebase/database';

let array = [];
navigator.geolocation.getCurrentPosition((position, err) => {
  let lat = position.coords.latitude + ' ';
  let lng = position.coords.longitude;
  if (lat === '' || lng === '' || err) {
    lat = 0;
    lng = 0;
    array.push(lat, lng);
    alert('Geolocation doesn\'t work!');
  }
  array.push(lat, lng);
});

class CustomMap extends Component {

  constructor(props) {
    super(props);
    this.state = {
      latlng: [array],
      markers: [array],
      zoom: 12,
      draggable: true,
      response : null,
      display: false,
      modal: false,
    };
  }


  componentDidMount() {
    this.listener = firebase.database().ref('Tag');
    console.log(this.listener);
  }
  componentWillUnmount() {
    this.listener();
  }

  addMarker = (e) => {
    const { markers } = this.state
    markers.push(e.latlng)
    this.setState({ markers })
  }

  render() {
    let pos = array;
    if (!pos) {
      this.setState({ display: true });
    }

    return (
      <div>
        <Map style={{ height: 'calc(100vh - 65px)' }} center={pos} zoom={this.state.zoom}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {this.state.markers.map((position, idx) =>
            <Marker
              key={`marker-${idx}`}
              position={position}>
              <Popup>
                <Button>
                </Button>
              </Popup>
            </Marker>
          )}
        </Map>
        <div>
          <Modal>
            <ModalBody>
              <Modal isOpen={this.state.display} toggle={this.toggle} className={this.props.className}>
                <ModalHeader toggle={this.toggle}>Error on get Positions</ModalHeader>
                <ModalBody>
                  <p>Please check your internet connection, or reload this page.</p>
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '}
                  <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                </ModalFooter>
              </Modal>
            </ModalBody>
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
