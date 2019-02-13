import React from 'react';
import {
  CardBody
} from 'reactstrap';
import DashBoardLine from "./DashBoardLine"

export default class DashBoard extends React.Component {

  renderLine = () => {
    console.log(this.props.servers)
    if (this.props.servers)
    var ret = this.props.servers.map((data, index) => {
      // console.log(data.cancelled)
        return (<DashBoardLine key={index}
          name={data.servername || data.server_name}
          paid={data.paiduntil || data.paid_until}
          ip={data.serverip || data.server_ip}
          status={data.status}
          product={data.product}
          cancelled={data.cancelled}
          />)
    })
    return ret;
  }

  render() {
    return (

        <CardBody className="all-icons text-center">
          {this.renderLine()}
        </CardBody>
    )
  }
}
