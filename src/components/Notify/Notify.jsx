import React, { Component } from "react";
import NotificationAlert from 'react-notification-alert';

class Notify extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color: "",
      message: ""
    };
  }

  notify() {
    let options = {
      place: "tc",
      message: this.state.message,
      type: this.state.color,
      icon: "",
      autoDismiss: 4
    };
    setTimeout(() => {
      this.refs.notify.notificationAlert(options);
    }, 300);
  }

  render() {
    return <NotificationAlert ref="notify" />;
  }
}

export default Notify;
