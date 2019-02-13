import React from 'react';
import { NavLink } from 'react-router-dom';
import { Nav } from 'reactstrap';
import PerfectScrollbar from 'perfect-scrollbar';

var ps;

const logo = require('../../assets/logo.png')

// var token = localStorage.getItem('token')

class Sidebar extends React.Component {

    constructor(props){
        super(props);
        this.activeRoute.bind(this);
    }

    activeRoute(routeName) {
        return this.props.location.pathname.indexOf(routeName) > -1 ? 'active' : '';
    }

    componentDidMount(){
        if(navigator.platform.indexOf('Win') > -1){
            ps = new PerfectScrollbar(this.refs.sidebar,{suppressScrollX: true, suppressScrollY: false});
        }
    }

    componentWillUnmount(){
        if(navigator.platform.indexOf('Win') > -1){
            ps.destroy();
        }
    }

    
    render() {        
        
        const token = window.localStorage.getItem('token')
        if (!token) {
            return (
                <div className="sidebar" data-color="yellow" style={{zIndex: '0 '}}>
                </div>
            )
        }
        return (
            
            <div className="sidebar" data-color="blue" style={{backgroundColor: '#172029'}}>
                <div className="logo" style={{backgroundColor: '#172029'}}>
                	<a href="/">
                        <div className="logo-img" style={{display: 'flex', justifyContent: 'center', maxWidth: '250px', maxHeight: '250px'}}>
                            <img src={logo} alt="OceanShare" />
                        </div>
                	</a>
                </div>
                <div className="sidebar-wrapper" ref="sidebar" style={{backgroundColor: '#172029'}}>
                    <Nav>
                        {
                            this.props.routes.map((prop, key) => {
                                
                                const token = window.localStorage.getItem('token')
                                if(prop.redirect)
                                    return null;
                                if (token !== '' && (prop.name === 'Login' || prop.name === 'Register')) {
                                    return null
                                }
                                return (
                                    <li className={this.activeRoute(prop.path) + (prop.pro ? " active active-pro":"")} key={key}>
                                        <NavLink to={prop.path} className="nav-link" activeClassName="active">
                                            <i className={"now-ui-icons "+prop.icon}></i>
                                            <p>{prop.name}</p>
                                        </NavLink>
                                    </li>
                                );
                            })
                        }
                    </Nav>
                </div>
            </div>
        );
    }
}

export default Sidebar;