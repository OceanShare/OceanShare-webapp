import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';
import {
  Alert,
  Button,
  Card,
  CardHeader,
  Form,
  FormGroup,
  InputGroup,
  Input,
} from 'reactstrap';
import i18next from 'i18next';

const SignUpPage = () => (
  <div>
    <SignUpForm />
  </div>
);

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

const ERROR_CODE_ACCOUNT_EXISTS = 'auth/email-already-in-use';

const ERROR_MSG_ACCOUNT_EXISTS = i18next.t(`An account with an E-Mail address to this account already exists.`);

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { username, email, passwordOne, isAdmin } = this.state;
    const roles = {};

    if (isAdmin) {
      roles[ROLES.ADMIN] = ROLES.ADMIN;
    }

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        // Create a user in your Firebase realtime database
        return this.props.firebase.user(authUser.user.uid).set({
          username,
          email,
          roles,
        });
      })
      .then(() => {
        return this.props.firebase.doSendEmailVerification();
      })
      .then(() => {
        this.setState({ ...INITIAL_STATE });
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

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onChangeCheckbox = event => {
    this.setState({ [event.target.name]: event.target.checked });
  };

  render() {
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      error,
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '';

    return (
      <div className="login-form">
        <Card
          className="bg-secondary shadow border-0"
          style={{ width: '500px' }}
        >
          <CardHeader className="px-lg-5 py-lg-5">
            <Form role="form" onSubmit={this.onSubmit}>
              <h1 className="text-center">{i18next.t('Register')}</h1>
              <hr />
              {error && (
                <Alert color={'danger'} isOpen={true}>
                  {error.message}
                </Alert>
              )}
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <Input
                    name="username"
                    value={username}
                    onChange={this.onChange}
                    type="text"
                    placeholder={i18next.t('Full Name')}
                  />
                </InputGroup>
              </FormGroup>

              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <Input
                    name="email"
                    value={email}
                    onChange={this.onChange}
                    type="text"
                    placeholder={i18next.t("Email Address")}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <Input
                    name="passwordOne"
                    value={passwordOne}
                    onChange={this.onChange}
                    type="password"
                    placeholder={i18next.t("Password")}
                  />
                </InputGroup>
              </FormGroup>

              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <Input
                    name="passwordTwo"
                    value={passwordTwo}
                    onChange={this.onChange}
                    type="password"
                    placeholder={i18next.t("Confirm Password")}
                  />
                </InputGroup>
              </FormGroup>
              <div className="text-center my-2">
                <Button
                  className="btn-block"
                  color="primary"
                  type="submit"
                  disabled={isInvalid}
                >
                  <b>{i18next.t('Sign Up')}</b>
                </Button>
              </div>
            </Form>
            <hr></hr>
            <SignInLink />
          </CardHeader>
        </Card>
      </div>
    );
  }
}

const SignUpLink = () => (
  <p>
    {i18next.t(`Don't have an account?`)}{" "}<Link to={ROUTES.SIGN_UP}>{i18next.t('Sign Up')}</Link>
  </p>
);

const SignInLink = () => (
  <p>
    {i18next.t('Have an account?')} <Link to={ROUTES.SIGN_IN}>{i18next.t('Sign In')}</Link>
  </p>
);

const SignUpForm = compose(withRouter, withFirebase)(SignUpFormBase);

export default SignUpPage;

export { SignUpForm, SignUpLink, SignInLink };
