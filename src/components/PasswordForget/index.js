import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Input, Alert, Label } from 'reactstrap';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

import Background from '../../images/background-forget.jpeg'

const PasswordForgetPage = () => (
  <div style={{height: 'calc(100vh - 64px)', backgroundImage: 'url('+ Background +')'}}>
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
        this.setState({success: true});
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
      <div className="container" style={{paddingTop: '180px'}}>
      <div className="row">
        <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
          <div className="card card-signin my-5">
            <div className="card-body">
              <h5 className="card-title text-center">Forget Password</h5>
                {error && <Alert  color="danger"><p>{error.message}</p></Alert>}
                
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
                  <hr className="my-4"/>
                  <Button className="btn btn-lg btn-primary btn-block text-uppercase" style={{backgroundColor: '#ff5a61'}} disabled={isInvalid} type="submit">
                    Reset My Password
                  </Button>

                  <br/>
                  <p>You have an account? <Link to={ROUTES.SIGN_IN}>Sign In</Link></p>
                  </form>
              </div>
            </div>
          </div>
        </div>
      </div>

    );
  }
}

const PasswordForgetLink = () => (
  <p>
    <Link to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link>
  </p>
);

export default PasswordForgetPage;

const PasswordForgetForm = withFirebase(PasswordForgetFormBase);

export { PasswordForgetForm, PasswordForgetLink };
