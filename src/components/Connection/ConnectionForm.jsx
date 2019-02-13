import React from 'react';
import UserService from '../../services/user-service';
import { Button, Card, CardBody,  Row, Col,} from 'reactstrap';
import Background from '../../assets/img/background.jpg';
import { createBrowserHistory } from 'history';
const history = createBrowserHistory();

function showError(id, txt) {
    document.getElementById("loginSuccess").style.display = "none";
    document.getElementById(id).style.display = "block";
    document.getElementById(id).innerHTML=txt;
  }
  
  function showSuccess(id, txt) {
    document.getElementById("loginError").style.display = "none";
    document.getElementById(id).style.display = "block";
    document.getElementById(id).innerHTML=txt;
}
  
class ConnectionForm extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        Email: '',
        Password: '',
        redirect: false
      }
    }

    setRedirect = () => {
       
    }

    onChange = (e) => {
      this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit = (e) => {
      e.preventDefault();
      const { Email, Password } = this.state;
      UserService.login(Email, Password).then((res) => {
          if (res.status === false) {
              showError("loginError", res.message)
          }
          else if (res.status === true) {
            showSuccess("loginSuccess", res.message)
            history.push('/servers') 
        }
      })
    }

    render(){
        return (
            <div style={{backgroundImage: 'url('+Background+')'}} className="content" >
                <Row>
                    <Col xs={0} sm={2} md={4}></Col>
                    <Col xs={12} sm={8} md={4}  style={{marginTop: "25vh"}}>
                        <Card className="card-user" >
                          <center>
                          <Col xs={12} md={8}>
                            <CardBody>
                                <h1 className="text-center" style={{fontWeight: 'bold', color: '#172029'}}>
                                    Login
                                </h1>

                                <div style={{display: "none"}} id="loginError" className="alert alert-danger" role="alert" value={'error'}></div>
                                <div style={{display: "none"}} id="loginSuccess" className="alert alert-success" role="alert" value={'error'}></div>

                                <form onSubmit={this.onSubmit}>
                                <input
                                    className='form-control'
                                    type="text"
                                    name="Email"
                                    placeholder="Email"
                                    value={this.state.Email}
                                    onChange={this.onChange}
                               />
                               <br></br>
                                <input
                                className='form-control'
                                type="password"
                                name="Password"
                                placeholder="Password"
                                value={this.state.Password}
                                    onChange={this.onChange}
                                />
                                <div style={{display: 'flex', justifyContent: 'center', marginTop: '2em'}}>
                                <br/>
                                <Col sm={6}>
                                    <Button className=" btn-block" color="success" type="submit">Login</Button>
                                </Col>
                                <Col sm={6}>
                                    <Button className=" btn-block" color="light" href="/register">Register</Button>
                                </Col>
                                </div>
                            </form>

                            </CardBody>
                            </Col>
                            </center>
                        </Card>
                    </Col>
                    <Col md={2}></Col>
                </Row>
            </div>
        );//                <Button color="success" onClick={this.handleSubmit.bind()}>Submit</Button>
    }
}

export default ConnectionForm;
