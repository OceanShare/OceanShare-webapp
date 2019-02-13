import React, { Component } from "react";
import ServersList from '../../components/Servers/ServersList';
import PanelHeader from '../../components/PanelHeader/PanelHeader';
import { createBrowserHistory } from 'history';
const history = createBrowserHistory();

class Servers extends Component {
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
           history.push('/login')
           window.location.reload()
         }else {
            return (
                <div>
                    <PanelHeader size="sm"/>
                    <ServersList></ServersList>
                </div>
            )
        }
    }
}

export default Servers;
