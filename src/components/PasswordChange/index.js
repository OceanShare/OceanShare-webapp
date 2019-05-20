import React, { Component } from 'react';
import { Button, Input, Alert, Label } from 'reactstrap';
import { withFirebase } from '../Firebase';
import { AuthUserContext } from '../Session';

const INITIAL_STATE = {
  passwordOne: '',
  passwordTwo: '',
  message: '',
  display: false,
};

class PasswordChangeForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { passwordOne } = this.state;

    this.props.firebase
      .doPasswordUpdate(passwordOne)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
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
    const { passwordOne, passwordTwo } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo || passwordOne === '';

    return (
      <div className="container" style={{paddingTop: '150px'}}>
      <div className="row">
        <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
          <div className="card card-signin my-5">
            <div className="card-body">
            <AuthUserContext.Consumer>
              {authUser => (
                <div>
                  <h3 className="card-title text-center">Account: {authUser.email}</h3>
                </div>
              )}
              </AuthUserContext.Consumer>
              <form className="form-signin" onSubmit={this.onSubmit}>
                <Alert isOpen={this.state.display} color="danger">{this.state.message}</Alert>}
                <div className="form-group">
                  <Label>Password</Label>
                    <Input name="passwordOne" value={passwordOne} onChange={this.onChange} type="password" placeholder="New Password"/>
                  </div>
                  <div className="form-group">
                    <Label>Confirm new Password</Label>
                    <Input name="passwordTwo" value={passwordTwo} onChange={this.onChange} type="password" placeholder="Confirm New Password"/>
                  </div>
                  <Button className="btn btn-lg btn-primary btn-block text-uppercase" style={{backgroundColor: '#ff5a61'}} disabled={isInvalid} type="submit">
                    Reset My Password
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

    );
  }
}

export default withFirebase(PasswordChangeForm);
