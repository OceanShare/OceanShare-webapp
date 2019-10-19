import React, { Component } from "react";
import PanelHeader from "../../components/PanelHeader/PanelHeader";
import ProfilInfo from "../../components/Profil/ProfilInfo";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      IsLoggedUser: false
    };
  }
  handleConnect = dataFromChild => {
    this.props.IsConnected = dataFromChild;
  };

  render() {
    return (
      <div>
        <PanelHeader size="sm" />
        <ProfilInfo></ProfilInfo>
      </div>
    );
  }
}

export default Profile;
