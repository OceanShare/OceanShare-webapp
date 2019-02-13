import React, { Component } from "react";
import PanelHeader from '../../components/PanelHeader/PanelHeader';
import ConnectionForm from '../../components/Connection/ConnectionForm';
import { createBrowserHistory } from 'history';
const history = createBrowserHistory();

class Login extends Component {


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
         if (localStorage.getItem('email') === null) {
             return (<div>
                         <PanelHeader size="sm"/>
                         <ConnectionForm></ConnectionForm>
                     </div>)
         } else {
            alert("You are already connected")
           history.push('/servers')
           window.location.reload()
         }
    }
}

export default Login;
