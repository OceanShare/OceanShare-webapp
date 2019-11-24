import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
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

const PasswordForgetPage = () => (
  <div>
    <h1>PasswordForget</h1>
    <PasswordForgetForm />
  </div>
);

const INITIAL_STATE = {
  email: '',
  error: null,
};

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

    const isInvalid = email === '';

    return (
      <div className="login-form">
        <Card
          className="bg-secondary shadow border-0"
          style={{ width: '500px' }}
        >
          <CardHeader className="px-lg-5 py-lg-5">
            <Form role="form" onSubmit={this.onSubmit}>
              <h1 className="text-center">Reset my Password</h1>
              <hr />
              {error && (
                <Alert color={'danger'} isOpen={true}>
                  {error.message}
                </Alert>
              )}
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <Input
                    name="email"
                    value={this.state.email}
                    onChange={this.onChange}
                    type="text"
                    placeholder="Email Address"
                  />
                </InputGroup>
              </FormGroup>
              <Button
                disabled={isInvalid}
                color="primary"
                type="submit"
              >
                Reset My Password
              </Button>
            </Form>
          </CardHeader>
        </Card>
      </div>
    );
  }
}

const PasswordForgetLink = () => (
  <p>
    <Link to={ROUTES.PASSWORD_FORGET}>{i18next.t('Forgot Password?')}</Link>
  </p>
);

export default PasswordForgetPage;

const PasswordForgetForm = withFirebase(PasswordForgetFormBase);

export { PasswordForgetForm, PasswordForgetLink };
