/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
import React from 'react';

// reactstrap components
import { Container, Row, Col } from 'reactstrap';

class Footer extends React.Component {
  render() {
    const currentDate = new Date().getFullYear();
    return (
      <footer className='footer fixed-bottom'>
        <Container fluid>
          <Row className='align-items-center justify-content-xl-between'>
            <Col xl='6'>
              <div className='copyright text-center text-xl-left text-muted'>
                © {`${currentDate} `}
                <a
                  className='font-weight-bold ml-1'
                  href='https://guillaume.sagot.io/'
                  rel='noopener noreferrer'
                  target='_blank'>
                  Guillaume SAGOT
                </a>
              </div>
            </Col>
          </Row>
        </Container>
      </footer>
    );
  }
}

export default Footer;
