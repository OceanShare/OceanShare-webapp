import React from 'react';
import {
    Container, Row, Col
} from 'reactstrap';

export default class DashBoardHeader extends React.Component {

  render() {
    return (

        <Container>
          <Row>
            <Col style={{ borderRight : "solid 1px gray"}}><span>Server Name</span></Col>
            <Col style={{ borderRight : "solid 1px gray"}}><span>Machine model</span></Col>
            <Col style={{ borderRight : "solid 1px gray"}}><span>IP</span></Col>
            <Col style={{ borderRight : "solid 1px gray"}}><span>Paid until</span></Col>
            <Col><span>Action</span></Col>
          </Row>
        </Container>
    )
  }
}
