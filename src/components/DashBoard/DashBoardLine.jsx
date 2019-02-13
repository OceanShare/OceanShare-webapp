import React from 'react';
import {
    Container, Row, Col
} from 'reactstrap';

// First way to import
import { ClipLoader } from 'react-spinners';
// Another way to import
// import ClipLoader from 'react-spinners/ClipLoader';


export default class DashBoardLine extends React.Component {

state = {
  loading: true
};

componentDidMount() {
  setTimeout(() => this.setState({ loading: false }), 2500);
}

  render() {
    const { loading } = this.state;

    if(loading) {
      return (
        <div className='bar-loading'>
               <ClipLoader type="BarLoader"
                 sizeUnit={"px"}
                 size={30}
                 color={'#ffb136'}
                 loading={this.state.loading}
               />
             </div>
      );
    }

    if (this.props.name === "") {
      return (
        <p style={{display: 'none'}}></p>
      )
    }
    return (
          <Container>
            <Row>
              <Col className="text-left" style={{ borderRight : "solid 1px #BBBBBB"}}><span>{this.props.name}</span></Col>
              <Col style={{ borderRight : "solid 1px #BBBBBB"}}><span>{this.props.product}</span></Col>
              <Col style={{ borderRight : "solid 1px #BBBBBB"}}><span>{this.props.ip}</span></Col>
              <Col style={{ borderRight : "solid 1px #BBBBBB"}}><span>{this.props.paid}</span></Col>
              <Col style={{ borderRight : "solid 1px #BBBBBB"}}><span>{this.props.status}</span></Col>
            </Row>
          </Container>

    )
  }
}
