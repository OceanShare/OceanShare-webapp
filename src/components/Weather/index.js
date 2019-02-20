import React, {Component} from 'react';
import { withAuthorization } from '../Session';

class LocalWeather extends Component{

  render() {
    return (
      <div>
      <div data-reactroot="" id="wrapper" className="localweather localweather--night">
          </div>
      </div>
    );
  }
}

const Weather = () => (
    <div>
      <LocalWeather/>
    </div>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(Weather);
