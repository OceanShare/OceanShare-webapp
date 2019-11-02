/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved */
import React from 'react';
import {
  Alert,
  Button,
  Card,
  CardBody,
  Container,
  Input,
} from 'reactstrap';
import UserService from '../../services/user-service';

class ProfilInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      NewPassword: '',
      RetypePassword: '',
      message: '',
      color: '',
      display: false,
    };
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmitUpdatePassword = (e) => {
    e.preventDefault();

    const {
      CurrentPassword,
      NewPassword,
      RetypePassword,
    } = this.state;

    if (NewPassword !== RetypePassword) {
      this.setState({
        message:
          'New password does not correspond to confirm password data field.',
        display: true,
      });
    } else if (NewPassword === '' || RetypePassword === '') {
      this.setState({
        message: 'Password data field are empty',
        display: true,
      });
    } else {
      UserService.resetPassword(CurrentPassword, NewPassword)
        .then((value) => {
          if (value.status === false) {
            this.setState({
              message: value.message,
              display: true,
              displaySuccess: false,
            });
          } else if (value.status === true) {
            this.setState({
              message: value.message,
              displaySuccess: true,
              display: false,
            });
          }
        })
        .catch((err) => {
          this.setState({
            error: err,
            display: true,
            displaySuccess: false,
          });
          console.error(err);
        });
    }
  };

  closeAlert = () => {
    this.setState({
      message: '',
      display: false,
      displaySuccess: false,
    });
  };

  render() {
    return (
      <Container>
        <div className='col-xs-1 col-1'>
          <Button
            className='btn btn-circle btn-lg'
            color='light'
            title='Back'
            style={{ borderRadius: '25px', padding: '11px 12px' }}>
            <i
              style={{ transform: 'rotate(180deg)' }}
              className='material-icons'>
              arrow_right_alt
            </i>
            {/* <i className="glyphicon glyphicon-ok"></i> */}
          </Button>
        </div>
        <div className='content'>
          <div className='login-form'>
            <Card>
              <CardBody>
                <h3
                  className='text-center'
                  style={{ fontWeight: 'bold', color: '#172029' }}>
                  Reset Password
                </h3>
                <Alert
                  color='success'
                  isOpen={this.state.display}
                  toggle={this.closeAlert}>
                  {this.state.message}
                </Alert>
                <Alert
                  color='danger'
                  isOpen={this.state.display}
                  toggle={this.closeAlert}>
                  {this.state.message}
                </Alert>

                <form onSubmit={this.onSubmitUpdatePassword}>
                  <Input
                    className='form-control'
                    type='password'
                    name='new-password'
                    placeholder='New Password'
                    value={this.state.NewPassword}
                    onChange={this.onChange}
                    autoComplete='off'
                  />
                  <br />
                  <Input
                    className='form-control'
                    type='password'
                    name='confirm-password'
                    placeholder='Retype New Password'
                    value={this.state.RetypePassword}
                    onChange={this.onChange}
                    autoComplete='off'
                  />

                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                    }}
                    sm={12}>
                    <Button className='btn-block' color='success'>
                      Update Password
                    </Button>
                  </div>
                </form>
              </CardBody>
            </Card>
          </div>
        </div>
      </Container>
    );
  }
}

export default ProfilInfo;
