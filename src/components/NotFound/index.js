import React, { Component } from 'react';
import {Container, Row} from 'reactstrap';

const NotFoundPage = () => (
    <PageNotFound/>
);

class PageNotFound extends Component {
    
    
    render() {
        return (
            <div className="background-skewed">
                <Container >
                    <Row>
                        <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)'}}>
                            <h1 className="text-center">404</h1> 
                            <hr />
                            <h3 className="text-center">Page Not Found</h3>
                        </div>
                    </Row>
                </Container>
            </div>
        );
    }

}

export default NotFoundPage;
export { PageNotFound };