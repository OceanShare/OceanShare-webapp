import React, { Component } from 'react';
import { compose } from 'recompose';

import { withAuthorization, withEmailVerification } from '../Session';
import { geolocated } from 'react-geolocated';
import { Alert } from 'reactstrap';
import ReactMapGL, {
  GeolocateControl,
  FlyToInterpolator,
} from 'react-map-gl';
import Header from '../Header/Header';
import Loader from '../Loader/Loader';
import 'mapbox-gl/dist/mapbox-gl.css';

const MAP_BOX_API = process.env.REACT_APP_MAPBOX_API;

const INITIAL_STATE = {
  go: 0,
  center: [51.3, 0.7],
  viewport: {
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 13,
  },
};

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...INITIAL_STATE,
    };
  }

  componentDidMount() {
    console.log(MAP_BOX_API)
  }

  componentWillUnmount() {
    this.setState(INITIAL_STATE);
  }

  _onViewportChange = viewport =>
    this.setState({
      viewport: { ...this.state.viewport, ...viewport },
    });

  _goToViewport = ({ longitude, latitude }) => {
    this._onViewportChange({
      longitude,
      latitude,
      zoom: 11,
      transitionInterpolator: new FlyToInterpolator({ speed: 2 }),
      transitionDuration: 'auto',
    });
  };

  render() {
    return (
      <div>
        <Header {...this.props} />
        {!this.props.isGeolocationAvailable ? (
          <Alert color="danger">
            {' Whoops! Your browser does not support Geolocation'}
          </Alert>
        ) : !this.props.isGeolocationEnabled ? (
          <Alert color="warning">
            {'Geolocation is not enabled'}
          </Alert>
        ) : this.props.coords ? (
          <>
            <ReactMapGL
              {...this.state.viewport}
              width="100vw"
              height="92vh"
              mapboxApiAccessToken={MAP_BOX_API}
              onViewportChange={viewport =>
                this.setState({ viewport })
              }
            >
              <GeolocateControl
                rightButton={true}
                positionOptions={{ enableHighAccuracy: true }}
                trackUserLocation={true}
                transitionInterpolator={{ speed: 2 }}
              />
            </ReactMapGL>
          </>
        ) : (
          <div>
            <Loader {...this.props} />
          </div>
        )}
      </div>
    );
  }
}

const condition = authUser => !!authUser;

export default compose(
  withEmailVerification,
  withAuthorization(condition),
  geolocated({
    positionOptions: {
      enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
  }),
)(HomePage);
