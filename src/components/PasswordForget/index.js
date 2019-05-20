import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Input, Alert, Label } from 'reactstrap';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import Logo from '../../images/logo.png';

const PasswordForgetPage = () => (
  <div>
    <PasswordForgetForm />
  </div>
);

const INITIAL_STATE = {
  email: '',
  error: null,
  message: '',
  display: false,
  color: '',
};

function validateEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

function validate(email) {
  if (validateEmail(email)) {
    return true
  } else {
    return false;
  }
}

class PasswordForgetFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email } = this.state;

    this.props.firebase
      .doPasswordReset(email)
      .then(() => {
        this.setState({ message: "Check your mailbox to reset your password ", display: true, color: "success" });
      })
      .catch(error => {
        this.setState({ message: error.message, display: true, color:"danger" });
      });

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, error } = this.state;

    const isInvalid = email === '' || validate(email) === false;

    return (
          <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', maxWidth: '350px' }}>
        <img alt="OceanShare Logo" className="form-signin-img" src={Logo}/>
            <div className="card card-signin my-5">
              <div className="card-body">
                <Alert isOpen={this.state.display} color={this.state.color}>{this.state.message}</Alert>

                <form className="form-signin" onSubmit={this.onSubmit}>
                  <div className="form-group">
                    <Label>Email address</Label>
                    <Input
                      name="email"
                      value={this.state.email}
                      onChange={this.onChange}
                      type="email"
                      placeholder="Email Address"
                      required
                    />
                  </div>
                  <Button className="btn btn-lg btn-primary btn-block text-uppercase" style={{ backgroundColor: '#ff5a61', borderRadius: '2.5rem' }} disabled={isInvalid} type="submit">
                    Reset My Password
                  </Button>
                </form>
              </div>
            </div>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <p className="text-center link-after"><Link to={ROUTES.SIGN_IN} style={{fontSize: '14pt'}}>Go back </Link></p>
          </div>
    );
  }
}

const PasswordForgetLink = () => (
  <div className="text-right">
    <Link className="forget-button push-right" to={ROUTES.PASSWORD_FORGET} style={{textDecoration: 'none'}}>Forgot Password?</Link>
  </div>
);

export default PasswordForgetPage;

const PasswordForgetForm = withFirebase(PasswordForgetFormBase);

export { PasswordForgetForm, PasswordForgetLink };
