import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Input, Alert, Label } from 'reactstrap';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import Logo from '../../images/logo.svg';

const PasswordForgetPage = () => (
  <div>
    <PasswordForgetForm />
  </div>
);

const INITIAL_STATE = {
  email: '',
  error: null,
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
        this.setState({ success: true });
        this.setState({ ...INITIAL_STATE });
      })
      .catch(error => {
        this.setState({ error });
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
        <img className="form-signin-img" src={Logo}/>
            <div className="card card-signin my-5">
              <div className="card-body">
                {error && <Alert color="danger"><p>{error.message}</p></Alert>}

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

          </div>
    );
  }
}

const PasswordForgetLink = () => (
    <Link className="forget-button push-right" to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link>
);

export default PasswordForgetPage;

const PasswordForgetForm = withFirebase(PasswordForgetFormBase);

export { PasswordForgetForm, PasswordForgetLink };
