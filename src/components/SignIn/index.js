import React, { Component } from 'react';
import { Button, Input, Alert, Label } from 'reactstrap';

import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { SignUpLink } from '../SignUp';
import { PasswordForgetLink } from '../PasswordForget';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

const SignInPage = () => (
  <div>
    <SignInForm />
  </div>
);

const INITIAL_STATE = {
  email: '',
  password: '',
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

class SignInFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email, password } = this.state;

    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
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
    const { email, password, error } = this.state;

    const isInvalid = password === '' || email === '' || validate(email) === false;

    return (
      <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}>
        <h3 style={{ marginBottom: '-2.7rem', color: '#009ee3' }}>Login</h3>
        <div className="card card-signin my-5">
          <div className="card-body">
            {error && <Alert color="danger"><p>{error.message}</p></Alert>}
            <form className="form-signin" onSubmit={this.onSubmit}>
              <div className="form-group">
                <Label>Email address</Label>
                <Input type="email" id="inputEmail" className="form-control" placeholder="Email address" name="email" value={email} onChange={this.onChange} />
              </div>
              <div className="form-group">
                <Label>Password</Label>
                <Input type="password" id="inputPassword" className="form-control" placeholder="Password" name="password" value={password} onChange={this.onChange} />
              </div>
              <br />
              <Button className="btn btn-lg btn-primary btn-block text-uppercase push-right" disabled={isInvalid} type="submit">Sign in</Button>
              <br className="my-4" />
              <SignUpLink />
              <PasswordForgetLink />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const SignInForm = compose(
  withRouter,
  withFirebase,
)(SignInFormBase);

export default SignInPage;

export { SignInForm };
