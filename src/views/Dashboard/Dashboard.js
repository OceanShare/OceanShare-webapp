import React, { Component } from 'react';
import Dashboard from '../../components/Dashboard/Dashboard';
import PanelHeader from '../../components/PanelHeader/PanelHeader';

class Dashboards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      IsLoggedUser: false,
    };
  }

  render() {
    return (
      <div>
        <PanelHeader size='sm' />
        <Dashboard />
      </div>
    );
  }
}

export default Dashboards;
