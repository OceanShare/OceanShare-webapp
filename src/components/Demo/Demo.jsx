import React from "react";
import { geolocated } from "react-geolocated";
import { Alert, Button, Card, CardBody, Container } from "reactstrap";
import { Map, TileLayer, ZoomControl } from 'react-leaflet';

class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          center: [51.3, 0.7]
        }
    
      }
    
    render() {
        return !this.props.isGeolocationAvailable ? (
            <div>Your browser does not support Geolocation</div>
        ) : !this.props.isGeolocationEnabled ? (
            <div>Geolocation is not enabled</div>
        ) : this.props.coords ? (
            <Container fluid>
            <Card>
              <CardBody>
                <table>
                <tbody>
                    <tr>
                        <td>latitude</td>
                        <td>{this.props.coords.latitude}</td>
                    </tr>
                    <tr>
                        <td>longitude</td>
                        <td>{this.props.coords.longitude}</td>
                    </tr>
                    <tr>
                        <td>altitude</td>
                        <td>{this.props.coords.altitude}</td>
                    </tr>
                    <tr>
                        <td>heading</td>
                        <td>{this.props.coords.heading}</td>
                    </tr>
                    <tr>
                        <td>speed</td>
                        <td>{this.props.coords.speed}</td>
                    </tr>
                </tbody>
            </table>
            <Map
                        center={[this.props.coords.latitude, this.props.coords.longitude]}
                        zoom={10}
                      >
                        <ZoomControl position="topright" />
                        <TileLayer
                          url='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                          attribution='© <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                          maxZoom={18}
                        />
                      </Map>
            </CardBody>
        </Card>
      </Container>
        ) : (
            <div>Getting the location data&hellip; </div>
        );
    }
}

export default geolocated({
    positionOptions: {
        enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
})(Demo);