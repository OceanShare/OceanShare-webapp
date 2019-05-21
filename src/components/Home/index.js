import React, { Component } from 'react';
import { Alert, Button, Col, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import { withAuthorization } from '../Session';
import * as firebase from 'firebase/app';

let array = [];
navigator.geolocation.getCurrentPosition((position, err) => {
  let lat = position.coords.latitude + ' ';
  let lng = position.coords.longitude;
  if (err) {
    alert("An error occured, please reload");
  }
  setTimeout(function(){ array.push(lat, lng); }, 3000);
  array.push(lat, lng);
});

let datas = [];
class CustomMap extends Component {

  constructor(props) {
    super(props);
    this.state = {
      markers: [array],
      listMarker: null,
      zoom: 12,
      draggable: true,
      response: null,
      display: false,
      modal: false,
    };
  }

  
  componentDidMount() {
    this.listener = firebase.database().ref('Tag').once('value').then((snapshot) => {
      let description = snapshot.val();
      // description.forEach((line) => {
        datas.push(description);
      // });
    });
    let posxy = [];
    datas.map((item) => {
      console.log(item)
      console.log("item", item)
      posxy.push(item.x, item.y)
    })
    console.log(datas.x)
  }
  componentWillUnmount() {
    this.listener();
  }

  doReload = () => {
    window.location.reload();
  }

  addMarker = (e) => {
    const { markers } = this.state
    markers.push(e.latlng)
    this.setState({ markers })
  }

  render() {

    let lists= datas;
    let posx=[];
    let listItem = lists.map((list) => {
      posx.push(list.x, list.y);
      console.log("lsit ) ", list.y);
      // <Marker key={list.id} position={posx}> </Marker>
    });
    console.log(posx)

    let pos = array;
    if (pos.length < 2) {
      return (
        <div className="container">
          <Col xs={12}>
                <Alert color="info" align="middle" style={{marginTop: '40vh'}}>We were unable to recover your positions, <button onClick={this.doReload} className="as-button"> please reload the page </button></Alert>
          </Col>
        </div>
      );
    } else {
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
            {/* {listItem} */}
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
}

const HomePage = () => (
  <div>
    <CustomMap />
  </div>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(HomePage);
