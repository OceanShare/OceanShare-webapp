import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { SignUpLink } from '../SignUp';
import { PasswordForgetLink } from '../PasswordForget';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

import {
  Alert,
  Button,
  Card,
  CardHeader,
  Col,
  Form,
  FormGroup,
  InputGroup,
  Input,
  Row,
} from 'reactstrap';

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

const ERROR_CODE_ACCOUNT_EXISTS =
  'auth/account-exists-with-different-credential';

const ERROR_MSG_ACCOUNT_EXISTS = `
  An account with an E-Mail address to
  this social account already exists. Try to login from
  this account instead and associate your social accounts on
  your personal account page.
`;

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

    return (
      <div className="login-form">
        <Card
          className="bg-secondary shadow border-0"
          style={{ width: '500px' }}
        >
          <CardHeader className="px-lg-5 py-lg-4">
            <Form role="form" onSubmit={this.onSubmit}>
              <h1 className="text-center">login</h1>
              <hr />
              {error && (
                <Alert color={'danger'} isOpen={true}>
                  {error.message}
                </Alert>
              )}
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <Input
                    className="form-controle-alternative"
                    name="email"
                    value={email}
                    onChange={this.onChange}
                    type="text"
                    placeholder="Email Address"
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <Input
                    className="form-controle-alternative"
                    name="password"
                    value={password}
                    onChange={this.onChange}
                    type="password"
                    placeholder="Password"
                  />
                </InputGroup>
              </FormGroup>
              <div className="text-right my-2">
                <PasswordForgetLink />
                <Button
                  className="btn-block"
                  color="primary"
                  type="submit"
                >
                  <b>login</b>
                </Button>
              </div>
            </Form>
            <hr></hr>
            <Row>
              <Col xs={12}>
                <SignInGoogle />
              </Col>
              <Col xs={12}>
                <SignInFacebook />
              </Col>
            </Row>
            <br />
            <SignUpLink />
          </CardHeader>
        </Card>
      </div>
    );
  }
}

class SignInGoogleBase extends Component {
  constructor(props) {
    super(props);

    this.state = { error: null };
  }

  onSubmit = event => {
    this.props.firebase
      .doSignInWithGoogle()
      .then(socialAuthUser => {
        // Create a user in your Firebase Realtime Database too
        return this.props.firebase.user(socialAuthUser.user.uid).set({
          username: socialAuthUser.user.displayName,
          email: socialAuthUser.user.email,
          roles: {},
        });
      })
      .then(() => {
        this.setState({ error: null });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
          error.message = ERROR_MSG_ACCOUNT_EXISTS;
        }

        this.setState({ error });
      });

    event.preventDefault();
  };

  render() {
    const { error } = this.state;

    return (
      <form onSubmit={this.onSubmit} className="my-1">
        {error && (
          <Alert color="danger" isOpen={error} fade={true}>
            {error.message}
          </Alert>
        )}
        <Button
          type="submit"
          className="btn-neutral btn-icon btn-block"
          color="default"
        >
          <span className="btn-inner--icon">
            <img
              alt="..."
              src={require('../../assets/img/common/google.svg')}
            />
          </span>
          <span className="btn-inner--text">Google</span>
        </Button>
      </form>
    );
  }
}

class SignInFacebookBase extends Component {
  constructor(props) {
    super(props);

    this.state = { error: null };
  }

  onSubmit = event => {
    this.props.firebase
      .doSignInWithFacebook()
      .then(socialAuthUser => {
        // Create a user in your Firebase Realtime Database too
        return this.props.firebase.user(socialAuthUser.user.uid).set({
          username: socialAuthUser.additionalUserInfo.profile.name,
          email: socialAuthUser.additionalUserInfo.profile.email,
          roles: {},
        });
      })
      .then(() => {
        this.setState({ error: null });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
          error.message = ERROR_MSG_ACCOUNT_EXISTS;
        }

        this.setState({ error });
      });

    event.preventDefault();
  };

  render() {
    const { error } = this.state;

    return (
      <form onSubmit={this.onSubmit} className="my-1">
        <Button
          type="submit"
          className="btn-neutral btn-icon btn-block"
          color="default"
        >
          <span className="btn-inner--icon">
            <img
              alt="..."
              src={require('../../assets/img/common/facebook.png')}
            />
          </span>
          <span className="btn-inner--text">Facebook</span>
        </Button>
        {error && (
          <Alert color="danger" isOpen={error} fade={true}>
            {error.message}
          </Alert>
        )}
      </form>
    );
  }
}
const SignInForm = compose(withRouter, withFirebase)(SignInFormBase);

const SignInGoogle = compose(
  withRouter,
  withFirebase,
)(SignInGoogleBase);

const SignInFacebook = compose(
  withRouter,
  withFirebase,
)(SignInFacebookBase);

export default SignInPage;

export { SignInForm, SignInGoogle, SignInFacebook };
