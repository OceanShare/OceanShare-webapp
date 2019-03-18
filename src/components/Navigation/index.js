import React from 'react';
import { Link } from 'react-router-dom';
import {  Navbar, NavbarBrand, Nav, UncontrolledDropdown, DropdownItem, DropdownMenu, DropdownToggle} from 'reactstrap';
import MaterialIcon from 'material-icons-react';

import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';

import { AuthUserContext } from '../Session';
import Logo from '../../images/logo.svg';


class NavigationBar extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <div className="border-nav">
      <Navbar className="container " style={{backgroundColor: '#fefefe',  zIndex: '3000'}} light expand="lg">
          <NavbarBrand href="/maps" className="mr-auto">
            <img  alt="OceanShare logo" className="img-responsive img-logo" src={Logo}/>
          </NavbarBrand>
              <Nav className="ml-auto" navbar>
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret style={{color: '#009fe3'}}>
                    <MaterialIcon icon="account_circle" color='#009fe3' size="medium" />
                  </DropdownToggle>
                  <DropdownMenu right>

                      <AuthUserContext.Consumer>
                        {
                          authUser =>
                            authUser ? <NavigationAuth /> : <NavigationNonAuth />
                        }
                      </AuthUserContext.Consumer>

                  </DropdownMenu>
                </UncontrolledDropdown>
              </Nav>
        </Navbar>
      </div>
    );
  }
}

const NavigationAuth = () => (
  <div>
    <DropdownItem>
      <Link to={ROUTES.HOME}>Home</Link>
    </DropdownItem>

    <DropdownItem>
      <Link to={ROUTES.ACCOUNT}>Account</Link>
    </DropdownItem>
    <DropdownItem>
      <Link to={ROUTES.WEATHER}>Weather</Link>
    </DropdownItem>

    <hr/>
    <DropdownItem>
      <SignOutButton />
    </DropdownItem>
  </div>
);

const NavigationNonAuth = () => (
  <div>
  <DropdownItem>
    <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </DropdownItem>
  <DropdownItem>
    <Link to={ROUTES.SIGN_IN}>Sign In</Link>
  </DropdownItem>
  </div>
);

export default NavigationBar;
