import React from "react";
import ServiceManager from "../../services/user-service";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col
} from "reactstrap";
import NotificationAlert from "react-notification-alert";

class ProfilInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      phone: "",
      email: "",
      bio: "",
      CurrentPassword: "",
      NewPassword: "",
      color: "",
      message: "",
      display: false
    };
  }

  componentDidMount() {
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmitUpdatePassword = e => {
    e.preventDefault();

    const { CurrentPassword, NewPassword } = this.state;

    ServiceManager.resetPassword(CurrentPassword, NewPassword)
      .then(value => {
        if (value.status === false) {
          this.setState({
            message: value.message,
            display: true
          });
        } else if (value.status === true) {
          this.setState({
            message: value.message,
            display: false
          });
        }
        this.notify();
      })
      .catch(err => {
        this.setState({ error: err, display: true, displaySuccess: false });
      });
  };

  submitUpdateInfo = e => {
    e.preventDefault();
    const { firstname, lastname, phone, email, bio } = this.state;
    ServiceManager.updateProfile(firstname, lastname, phone, email, bio)
      .then(response => {
        console.log("Update : ", response);
        this.setState({
          display: true,
          color: "success",
          message: response.data.user.message
        });
        this.getProfile();
        this.notify();
      })
      .catch(error => {
        return(error);
      });
  };

  closeAlert = () => {
    this.setState({ message: "", display: false, displaySuccess: false });
  };

  notify() {
    let options = {
      place: "tr",
      message: this.state.message,
      type: this.state.color,
      icon: "now-ui-icons ui-1_bell-53",
      autoDismiss: 4
    };
    this.refs.notify.notificationAlert(options);
  }

  render() {
    return (
      <>
        <NotificationAlert ref="notify" />
        <Container>
          <Col className="order-xl-1" xl="12">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">My account</h3>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form>
                  <h6 className="heading-small text-muted mb-4">
                    User information
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-first-name"
                          >
                            First name
                          </label>
                          <Input
                            className="form-control-alternative"
                            name="firstname"
                            value={this.state.firstname}
                            onChange={this.onChange}
                            id="input-first-name"
                            placeholder="First name"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-last-name"
                          >
                            Last name
                          </label>
                          <Input
                            name="lastname"
                            className="form-control-alternative"
                            value={this.state.lastname}
                            onChange={this.onChange}
                            id="input-last-name"
                            placeholder="Last name"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-email"
                          >
                            Email address
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-email"
                            name="email"
                            value={this.state.email}
                            onChange={this.onChange}
                            placeholder="Email address"
                            type="email"
                            disabled={true}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-phone"
                          >
                            Phone
                          </label>
                          <Input
                            className="form-control-alternative"
                            name="phone"
                            onChange={this.onChange}
                            id="input-phone"
                            placeholder="Phone"
                            value={this.state.phone}
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col xs={12}>
                        <FormGroup>
                          <label>About Me</label>
                          <Input
                            className="form-control-alternative"
                            placeholder="About you ..."
                            rows="3"
                            name="bio"
                            value={this.state.bio}
                            onChange={this.onChange}
                            type="textarea"
                          />
                        </FormGroup>
                      </Col>

                      <Col xs={8} />
                      <Col className="text-right" xs="4">
                        <Button
                          color="primary"
                          href="#pablo"
                          onClick={this.submitUpdateInfo.bind(this)}
                          size="sm"
                        >
                          Save
                        </Button>
                      </Col>
                    </Row>
                  </div>

                  <hr className="my-4" />
                  {/* Address */}
                  <h6 className="heading-small text-muted mb-4">Security</h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-first-name"
                          >
                            Current password
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue="Lucky"
                            id="input-first-password"
                            placeholder="Current password"
                            type="password"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-first-name"
                          >
                            New password
                          </label>
                          <Input
                            className={
                              this.state.NewPassword.length < 6 ||
                              this.state.NewPassword.length > 1
                                ? "form-control-alternative"
                                : "form-control-alternative is-valid"
                            }
                            value={this.state.NewPassword}
                            onChange={this.onChange}
                            id="input-second-password"
                            placeholder="New password"
                            type="password"
                          />
                        </FormGroup>
                      </Col>
                      <Col xs={8} />
                      <Col className="text-right" xs="4">
                        <Button
                          color="primary"
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                          size="sm"
                        >
                          Save
                        </Button>
                      </Col>
                    </Row>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Container>
      </>
    );
  }
}

export default ProfilInfo;
