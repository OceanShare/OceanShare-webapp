import React, { Component } from "react";
import PanelHeader from '../../components/PanelHeader/PanelHeader';
import ProfilInfo from '../../components/Profil/ProfilInfo';
import { createBrowserHistory } from 'history';
const history = createBrowserHistory();

class Profile extends Component {
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
        if (localStorage.getItem('email') !== null) {
                return (<div>
                            <PanelHeader size="sm"/>
                            <ProfilInfo></ProfilInfo>
                        </div>)
        }
        else {
            alert("You are needed to be logged in to be able to acces this page. Redirecting")
            history.push('/login')
            window.location.reload()
        }
       }
}
 
export default Profile;