import React, { Component } from "react";
import { geolocated } from "react-geolocated";
import { Alert, Button, Card, CardBody, Container } from "reactstrap";
import i18next from "i18next";
import { Map, TileLayer } from 'react-leaflet';

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
