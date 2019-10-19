import React from 'react';
import { Redirect } from 'react-router-dom';
import {
  Alert, Button, Card, CardHeader, FormGroup, Form, Input, InputGroup,
} from 'reactstrap';
import UserService from '../../services/user-service';
import { useTranslation, withTranslation, Trans } from 'react-i18next';

class ConnectionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      color: '',
      display: false,
      message: '',
      error: {
        email: false,
        password: false,
        retypePassword: false,
      },
      redirect: false,
    };
  }

	onChange = (e) => {
	  this.setState({ [e.target.name]: e.target.value });
	  const { password } = this.state;
	  if (password.length < 7) {
	    this.setState({ error: { password: true } });
	  } else {
	    this.setState({ error: { password: false } });
	  }
	};

	onSubmit = (e) => {
	  e.preventDefault();
	  const { email, password } = this.state;
	  UserService.login(email, password).then((res) => {
	    if (res.status) {
	      if (res.message === 'Please, valide your email.') {
	        this.setState({
	          color: 'warning',
	          display: true,
	          message: res.message,
	        });
	      } else {
	        this.setState({
	          color: 'success',
	          display: true,
	          message: res.message,
	        });
	      }
	    } else {
	      this.setState({ color: 'danger', display: true, message: res.message });
	    }
	  });
	};

	setRedirect = () => {
	  this.setState({ redirect: true });
	};

	redirectRegister = (e) => {
	  if (this.state.redirect) {
	    return <Redirect to="/chose" />;
	  }
	};

	render() {
	  const { error } = this.state;
	  return (
  <div className="login-form">
    <Card className="bg-secondary shadow border-0" style={{ width: '400px' }}>
      <CardHeader className="px-lg-5 py-lg-5">
        <Form role="form" onSubmit={this.onSubmit}>
          <h1 className="text-center"><Trans i18nKey="login"/></h1>

          <hr />
          <Alert color={this.state.color} isOpen={this.state.display}>
            {this.state.message}
          </Alert>
          <FormGroup className="mb-3">
            <InputGroup className="input-group-alternative">
              <Input
                className="form-control"
                type="email"
                name="email"
                placeholder="Email"
                value={this.state.email}
                onChange={this.onChange}
                autoComplete="email"
              />
            </InputGroup>
          </FormGroup>
          <FormGroup
            className={

										error.password === true ? 'has-danger'
										  : ''
								}
          >
            <Input
              className={

											error.password === true ? 'form-control-alternative is-invalid'
											  : 'form-control-alternative '
									}
              type="password"
              name="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.onChange}
              autoComplete="current-password"
            />
          </FormGroup>
          <div className="text-center my-2">
            <Button className="btn-block" color="primary" type="submit">
              <b><Trans i18nKey="login"/></b>
            </Button>
          </div>
          <div>
            {this.redirectRegister()}
            <Button className="btn-block" color="secondary" onClick={this.setRedirect}>
              <b><Trans i18nKey="register"/></b>
            </Button>
          </div>
        </Form>
      </CardHeader>
    </Card>
  </div>
	  );
	}
}

export default ConnectionForm;
