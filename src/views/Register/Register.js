import React, { Component } from "react";

import PanelHeader from '../../components/PanelHeader/PanelHeader';
import RegisterForm from "../../components/Register/RegisterForm";
import { createBrowserHistory } from 'history';
const history = createBrowserHistory();

class Register extends Component {

 constructor(props) {
     super(props);
     this.state = {
         IsLoggedUser: false
     };
 }
 handleConnect = (dataFromChild) => {
     this.props.IsConnected = dataFromChild;
 };

    render() {
      if (localStorage.getItem("email") === null) {
             return (<div>
                         <PanelHeader size="sm"/>
                         <RegisterForm></RegisterForm>
                     </div>)
        } else {
           alert("You are already registerd. Sign out to create a new accout")
           history.push('/servers')
           window.location.reload()
         }
    }
}

export default Register;
