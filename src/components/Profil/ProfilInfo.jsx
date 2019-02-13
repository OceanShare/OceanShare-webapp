import React from 'react';
import UserService from '../../services/user-service';
import { Button, Card, CardBody,  Row, Col,} from 'reactstrap';

function showError(id, txt) {
  document.getElementById(id).style.display = "block";
  document.getElementById(id).innerHTML=txt;
}

function showSuccess(id, txt) {
  document.getElementById(id).style.display = "block";
  document.getElementById(id).innerHTML=txt;
}

class ProfilInfo extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      CurrentPassword: '',
      NewPassword: '',
      RetypePassword: '',
      Email: '',
      NewEmail: '',
      ConfirmEmail:''
      }
    }

    onChange = (e) => {
      this.setState({ [e.target.name]: e.target.value });
    }

    onSubmitUpdatePassword = (e) => {
    e.preventDefault();

      const { CurrentPassword,  NewPassword, RetypePassword } = this.state;

      if (NewPassword !== RetypePassword) {
        showError("errorPassword", "New password does not correspond to confirm password data field.")
      }
      else if (NewPassword === "" || RetypePassword === "")
        showError("errorPassword", "Password data field are empty")
      else {
        const res = UserService.resetPassword(CurrentPassword, NewPassword);

        res.then(function(value) {
          if (value.data.status === false){
            showError("errorPassword", value.data.message);
          }
          else if(value.data.status === true) {
            showSuccess("successPassword", value.data.message);
          }
        })
      }
    }

    onSubmitUpdateEmail = (e) => {
      e.preventDefault();
        const { Email, NewEmail, ConfirmEmail} = this.state;
        if (NewEmail !== ConfirmEmail)
          showError("errorEmail", "New email does not correspond to confirm email.")
        else if (NewEmail === "" || ConfirmEmail === "")
          showError("errorEmail","Email data fiels are empty")
        else if (Email !== localStorage.getItem("email"))
          showError("errorEmail","The email address you are trying to change does not correspond to the profil you are connected to.")
        else {
          const res = UserService.changeEmail(Email, NewEmail)
          res.then(function(value){
            if (value.status === true) {
              showSuccess("successEmail", value.message)
            }
            else if (value.status === false) {
              showError("errorEmail", value.message)
            }
          })
        }

      }

    render(){
      return (

        <div className="content">
        <Row>

            <Col xs={12} sm={6}  style={{marginTop: "25vh"}}>
                <Card className="card-user">
                    <center>
                    <Col xs={12} md={9}>
                    <CardBody>
                        <h3 className="text-center" style={{fontWeight: 'bold', color: '#172029'}}>
                            Reset Password
                        </h3>
                        <div style={{display: "none"}} id="errorPassword" className="alert alert-danger" role="alert" value={'error'}></div>
                        <div style={{display: "none"}} id="successPassword" className="alert alert-success" role="alert" value={'error'}></div>
                      <form onSubmit={this.onSubmitUpdatePassword}>
                          <input
                           className='form-control'
                           type="password"
                           name="CurrentPassword"
                           placeholder="Current Password"
                           value={this.state.CurrentPassword}
                           onChange={this.onChange}
                         />
                           <br></br>
                          <input
                           className='form-control'
                           type="password"
                           name="NewPassword"
                           placeholder="New Password"
                           value={this.state.NewPassword}
                           onChange={this.onChange}
                         />
                           <br></br>
                           <input
                           className='form-control'
                           type="password"
                           name="RetypePassword"
                           placeholder="Retype New Password"
                           value={this.state.RetypePassword}
                           onChange={this.onChange}
                         />

                         <br></br>
                      <div style={{display: 'flex', justifyContent: 'center'}} sm={12}>
                        <Button className="btn-block" color="success">Update Password</Button>
                      </div>
                      </form>
                      </CardBody>
                      </Col>
                      </center>
                  </Card>
              </Col>

              <Col xs={12} sm={6}  style={{marginTop: "25vh"}}>
                  <Card className="card-user">
                      <center>
                      <Col xs={12} md={9}>
                      <CardBody>
                          <h3 className="text-center" style={{fontWeight: 'bold', color: '#172029'}}>
                              Update your Email
                          </h3>
                          <div style={{display: "none"}} id="errorEmail" className="alert alert-danger" role="alert" value={'error'}></div>
                          <div style={{display: "none"}} id="successEmail" className="alert alert-success" role="alert" value={'error'}></div>
                        <form onSubmit={this.onSubmitUpdateEmail}>
                            <input
                             className='form-control'
                             type="email"
                             name="Email"
                             placeholder="Current email"
                             value={this.state.Email}
                             onChange={this.onChange}
                           />
                             <br></br>
                            <input
                             className='form-control'
                             type="email"
                             name="NewEmail"
                             placeholder="New Email"
                             value={this.state.NewEmail}
                             onChange={this.onChange}
                           />
                             <br></br>
                             <input
                             className='form-control'
                             type="email"
                             name="ConfirmEmail"
                             placeholder="Retype New Email"
                             value={this.state.ConfirmEmail}
                             onChange={this.onChange}
                           />

                        <br></br>
                        <div style={{display: 'flex', justifyContent: 'center'}} sm={12}>
                          <Button className="btn-block" color="success" type="Submit">Update Email</Button>
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

      );
    }
  }

  export default ProfilInfo;
