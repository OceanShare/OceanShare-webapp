import React, { Component } from 'react';
import { Button, Input, Alert, Label } from 'reactstrap';

import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { SignUpLink } from '../SignUp';
import { PasswordForgetLink } from '../PasswordForget';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

import Background from '../../images/background-signup.jpeg'

const SignInPage = () => (
  <div style={{height: 'calc(100vh - 64px)', backgroundImage: 'url('+ Background+')'}}>
    <SignInForm />
  </div>
);

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

function validateEmail(email) {
  var re =  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
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
      <div className="container" style={{alignItem: 'middle'}}>
        <div className="row">
          <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
            <div className="card card-signin my-5">
              <div className="card-body">
                <h3 className="card-title text-center">Sign In</h3>
                {error && <Alert  color="danger"><p>{error.message}</p></Alert>}
                <form className="form-signin" onSubmit={this.onSubmit}>
                  <div className="form-group">
                    <Label>Email address</Label>
                    <Input type="email" id="inputEmail" className="form-control" placeholder="Email address" name="email" value={email} onChange={this.onChange}/>
                  </div>
                  <div className="form-group">
                    <Label>Password</Label>
                    <Input type="password" id="inputPassword" className="form-control" placeholder="Password" name="password" value={password} onChange={this.onChange} />
                  </div>
                  <Button className="btn btn-lg btn-primary btn-block text-uppercase" style={{backgroundColor: '#ff5a61'}} disabled={isInvalid} type="submit">Sign in</Button>
                  <hr className="my-4"/>
                  <SignUpLink />
                  <PasswordForgetLink />

                </form>
              </div>
            </div>
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
