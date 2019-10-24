import React, { Component } from "react";
import { geolocated } from "react-geolocated";
import { Alert, Button, Card, CardBody, Container } from "reactstrap";
import i18next from "i18next";
import L from "leaflet"
import { Map, TileLayer, Marker, ZoomControl } from 'react-leaflet';
import icon from "leaflet/dist/images/marker-icon.png"
import "leaflet/dist/images/marker-shadow.png"


export const pointerIcon = new L.Icon({
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  iconRetinaUrl: require("leaflet/dist/images/marker-icon.png"),
  iconAnchor: [5, 55],
  popupAnchor: [10, -44],
  iconSize: [25, 55],
  shadowUrl: "leaflet/dist/images/marker-shadow.png",
  shadowSize: [68, 95],
  shadowAnchor: [20, 92],
})

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      center: [51.3, 0.7]
    }
  }

  componentDidMount() { }

  render() {
    return (
      <Container fluid>
        <Card>
          <CardBody>
            {!this.props.isGeolocationAvailable ? (
              <Alert color="danger">
                Whoops! Your browser does not support Geolocation
              </Alert>
            ) : !this.props.isGeolocationEnabled ? (
              <Alert color="warning">Geolocation is not enabled</Alert>
            ) : this.props.coords ?
                  (
                    <>
                      <Map
                        center={[this.props.coords.latitude, this.props.coords.longitude]}
                        zoom={14}
                      >
                        <Marker position={[this.props.coords.latitude, this.props.coords.longitude]} icon={pointerIcon}/>
                        <TileLayer
                          url='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                          attribution='© <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                          maxZoom={18}
                        />
                      </Map>
                    </>) : (<div>Getting the location data&hellip; </div>)}
          </CardBody>
        </Card>
      </Container>
    )
  }
}

export default geolocated({
  positionOptions: {
      enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(Dashboard);
