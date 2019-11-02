import React, { Component } from 'react';
import {
  Button,
  Card,
  CardTitle,
  CardBody,
  Col,
  Container,
  Row,
  Table,
  UncontrolledTooltip,
} from 'reactstrap';

import NotificationAlert from 'react-notification-alert';

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      message: '',
      color: '',
      updated: false,
      modal: false,
      modalAddUser: false,
      modalRights: false,
      alert: false,
      loading: true,
      users: [],
      excel: [],
    };
    this.toggle = this.toggle.bind(this);
  }

  notify() {
    let options = {
      place: 'tr',
      message: this.state.message,
      type: this.state.color,
      icon: 'now-ui-icons ui-1_bell-53',
      autoDismiss: 4,
    };
    this.refs.notify.notificationAlert(options);
  }
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  toggle = (email, e) => {
    this.setState({
      modal: true,
      email: email,
    });
    localStorage.setItem('toDelete', email);
  };

  toggleAddUser = () => {
    this.setState((prevState) => ({ modalAddUser: !prevState.modalAddUser }));
  };

  toggleRights = (email, e) => {
    this.setState((prevState) => ({ modalRights: !prevState.modalRights }));
    this.setState({ email: email });
    localStorage.setItem('toAdmin', email);
  };

  closeAlert = () => {
    this.setState({
      modalAddUser: false,
      modal: false,
      modalRights: false,
      message: '',
      updated: false,
    });
  };

  render() {
    let listUsers = [{ email: 'toto@test.fr', ID: 1, Role: 'member' }];
    const listUser = listUsers.map((list) => (
      <tr key={list.ID}>
        <td>{list.email}</td>
        <td>{list.Role}</td>
        <td align='center' style={{ width: '160px' }}>
          <Button
            title='edit'
            color='secondary'
            className='btn-icon btn-round btn-sm btn-link'
            value={list.email}
            onClick={this.toggleRights.bind(this, list.email)}>
            {' '}
            <i className='tim-icons icon-pencil' />
          </Button>
          <Button
            outline
            title='Delete'
            color='danger'
            className='btn-icon btn-round btn-sm'
            value={list.email}
            onClick={this.toggle.bind(this, list.email)}>
            <i className='tim-icons icon-simple-remove' />{' '}
          </Button>
        </td>
      </tr>
    ));

    return (
      <>
        <Container fluid>
          <NotificationAlert ref='notify' />
          <Card>
            <CardBody>
              <CardTitle>
                <Container fluid>
                  <Row>
                    <Col xs={12} sm={6}>
                      <h1 style={{ fontWeight: 'bold', color: '#1720298a' }}>
                        Users
                      </h1>
                    </Col>
                    <Col xs={12} sm={6}>
                      <div align='right'>
                        <Button
                          id='refreshButton'
                          color='secondary'
                          data-placement='top'
                          className='btn btn-round btn-icon tim-icons icon-refresh-01'
                        />
                        <UncontrolledTooltip
                          delay={0}
                          placement='top'
                          target='refreshButton'>
                          Refresh
                        </UncontrolledTooltip>
                        <Button
                          size='md'
                          color='primary'
                          className='btn btn-primary btn-round '
                          type='button'>
                          <i className='tim-icons icon-simple-add' />
                          {'\t'}Add user
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </Container>
              </CardTitle>

              <Table responsive hover size='sm' className='align-items-center'>
                <thead className='thead-light'>
                  <tr>
                    <th scope='row'>Email</th>
                    <th align='center' scope='row'>
                      Status
                    </th>
                    <th scope='row'>Options</th>
                  </tr>
                </thead>
                <tbody>{listUser}</tbody>
              </Table>
            </CardBody>
          </Card>
        </Container>
      </>
    );
  }
}

export default Admin;
