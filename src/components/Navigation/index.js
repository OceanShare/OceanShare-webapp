import React from 'react';
import { Navbar, NavbarBrand, Nav, UncontrolledDropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
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
        <Navbar className="container " style={{ backgroundColor: '#fefefe', zIndex: '1000' }} light expand="lg">
          <NavbarBrand href="/maps" className="mr-auto">
            <img alt="OceanShare logo" className="img-responsive img-logo" src={Logo} />
          </NavbarBrand>
          <Nav className="ml-auto" navbar>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret style={{ color: '#009fe3', marginBottom: '-10px' }}>
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
    <DropdownItem href={ROUTES.HOME}>
      Home
    </DropdownItem>
    <DropdownItem href={ROUTES.ACCOUNT}>
      Account
    </DropdownItem>
    {/* <DropdownItem href={ROUTES.WEATHER}>
      Weather
    </DropdownItem>
 */}
    <hr />
    <DropdownItem>
      <SignOutButton />
    </DropdownItem>
  </div>
);

const NavigationNonAuth = () => (
  <div>
    <DropdownItem href={ROUTES.SIGN_UP}>
      Sign Up
  </DropdownItem>
    <DropdownItem href={ROUTES.SIGN_IN}>
      Sign In
  </DropdownItem>
  </div>
);

export default NavigationBar;
