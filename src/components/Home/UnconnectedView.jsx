import React from 'react';
import { Card, CardBody, Row, Col} from 'reactstrap';

class UnconnectedView extends React.Component{

    render(){
        return (
            <div className="content">
                <Row>
                    <Col md={2}></Col>
                    <Col md={8}>
                        <Card className="card-user">

                            <CardBody>

                                <hr/>
                                <div className="typography-line">
                                    <p><span>You are :</span>not connected</p>
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col md={2}></Col>
                </Row>
            </div>
        );
    }
}

export default UnconnectedView;