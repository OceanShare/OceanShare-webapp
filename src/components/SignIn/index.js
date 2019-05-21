import React, { Component } from 'react';
import { Button, Input, Alert, Label } from 'reactstrap';

import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { SignUpLink } from '../SignUp';
import { PasswordForgetLink } from '../PasswordForget';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import Logo from '../../images/logo.png';

const SignInPage = () => (
  <div>
    <SignInForm />
  </div>
);

const INITIAL_STATE = {
  email: '',
  password: '', 
  error: null,
  message: '', 
  display: false,
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
        this.setState({ message: error.message, display: true });
      });

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, password } = this.state;

    const isInvalid = password === '' || email === '' || validate(email) === false;

    return (
      <div className="signin-container">
      <img alt="OceanShare Logo" className="form-signin-img" src={Logo}/>
        <div className="card card-signin my-5">
          <div className="card-body">
            
            <Alert isOpen={this.state.display} color="danger">{this.state.message}</Alert>
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
              <Button className="btn btn-lg btn-primary btn-block text-uppercase push-right" disabled={isInvalid} type="submit">Login</Button>
            </form>
            <PasswordForgetLink />
          </div>
        </div>
        <br />
        <br />
        <br />
        <br />
        <p className="text-center link-after">Don't have an account <SignUpLink/></p>
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
