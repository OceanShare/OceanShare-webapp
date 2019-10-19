import React, { Component } from "react";
import SignInForm from "../../components/Connection/Signin";
import PanelHeader from "../../components/PanelHeader/PanelHeader";

class Connection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      IsLoggedUser: false
    };
  }

  render() {
    return (
      <div>
        <SignInForm />
      </div>
    );
  }
}

export default Connection;
