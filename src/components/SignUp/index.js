import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Input, Label } from 'reactstrap';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import Logo from '../../images/logo.svg';
import SignInPage from '../SignIn';

const SignUpPage = () => (
  <div>
    <SignUpForm />
  </div>
);

const INITIAL_STATE = {
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

function showSuccess(message) {
  document.getElementById('success').style.display = "block";
  document.getElementById('success').innerHTML = message;
}

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

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email, passwordOne } = this.state;

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        // Create a user in your Firebase realtime database

        this.props.firebase
          .user(authUser.user.uid)
          .then(() => {
            this.setState({ ...INITIAL_STATE });
            showSuccess('Account successfuly created')
            this.props.history.push(ROUTES.HOME);
          })
          .catch(error => {
            this.setState({ error });
          });
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
    const {
      email,
      passwordOne,
      passwordTwo,
      error,
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      validate(email) === false;

    return (
      <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', maxWidth: '350px' }}>
        <img className="form-signin-img" src={Logo} />
        <div className="card card-signin">
          <div className="card-body">
            {error && <div className="alert alert-danger">{error.message}</div>}
            <div style={{ display: 'none' }} id="success" className="alert alert-success"></div>
            <form className="form-signin" onSubmit={this.onSubmit}>
              <div className="form-group">
                <Label>Email address</Label>
                <Input
                  name="email"
                  value={email}
                  onChange={this.onChange}
                  type="email"
                  placeholder="Email Address"
                />
              </div>
              <div className="form-group">
                <Label>Password</Label>
                <Input
                  name="passwordOne"
                  value={passwordOne}
                  onChange={this.onChange}
                  type="password"
                  placeholder="Password"
                />
              </div>
              <div className="form-group">
                <Label>Confirm Password</Label>
                <Input
                  name="passwordTwo"
                  value={passwordTwo}
                  onChange={this.onChange}
                  type="password"
                  placeholder="Confirm Password"
                />
              </div>
              <Button className="btn btn-lg btn-primary btn-block text-uppercase" style={{ backgroundColor: '#ff5a61' }} disabled={isInvalid} type="submit">
                Sign Up
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
        <br />
        <p className="text-center link-after"> Already have an account ? <SignInLink/></p>
      </div>
    );
  }
}

const SignUpLink = () => (
  <p>
    <Link to={ROUTES.SIGN_UP} style={{fontSize: '1rem'}}>Sign Up</Link>
  </p>
);

const SignInLink = () => (
  <p>
    <Link to={ROUTES.SIGN_IN} style={{fontSize: '1rem'}}>Login</Link>
  </p>
);

const SignUpForm = withRouter(withFirebase(SignUpFormBase));

export default SignUpPage;

export { SignUpForm, SignUpLink };
