import React from 'react';
import { Link } from 'react-router-dom';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, UncontrolledDropdown, DropdownItem, DropdownMenu, DropdownToggle} from 'reactstrap';
import MaterialIcon from 'material-icons-react';

import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';

import { AuthUserContext } from '../Session';
import Logo from '../../images/logo.png';


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
      <div>
      <Navbar style={{backgroundColor: '#172029', borderBottomColor: '#ff5a61', borderBottomStyle:'solid', borderBottomWidth: '1px', height: '64px'}} light expand="lg">
        <div className="container">
          <NavbarBrand href="/" className="mr-auto"><img className="img-responsive" src={Logo} style={{width: '90%', marginTop: '-11 px'}} alt="OceanShare"></img></NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret style={{color: '#FEFEFE'}}>
                    <MaterialIcon icon="account_circle" color='#FEFEFE' size="medium" />
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
            </Collapse>
         </div>
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
      <Link to={ROUTES.LANDING}>Landing</Link>
    </DropdownItem>
    <DropdownItem>
      <Link to={ROUTES.ACCOUNT}>Account</Link>
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
