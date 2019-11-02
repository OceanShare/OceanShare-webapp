/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved */
/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
import Admin from '../../components/Admin/Admin';
import PanelHeader from '../../components/PanelHeader/PanelHeader';

class AdminS extends Component {
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
        <Admin></Admin>
      </div>
    );
  }
}

export default AdminS;
