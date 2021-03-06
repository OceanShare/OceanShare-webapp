import React from 'react';
import { PropTypes } from 'prop-types';
import { NavLink as NavLinkRRD, Link } from 'react-router-dom';
import {
  Container,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  Form,
  Media,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  UncontrolledDropdown,
} from 'reactstrap';
import i18next from 'i18next';
import { createBrowserHistory } from 'history';
import { withFirebase } from '../Firebase';
import SignOutButton from '../SignOut/index';

import FRflag from '../../assets/locales/fr/fr.svg';
import ENflag from '../../assets/locales/en/en.svg';
import logo from '../../assets/logo-light.png';

const history = createBrowserHistory();

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      logged: false,
      isOpen: false,
      dropdownOpen: false,
      collapseOpen: false,
      color: 'white',
      currentLng: '',
      changeLng: '',
      visible: false,
      placement: 'left',
    };
  }

  componentDidMount() {
    this.setState({ currentLng: localStorage.getItem('i18nextLng') });
    localStorage.getItem('i18nextLng') === 'fr'
      ? this.setState({ changeLng: 'English' })
      : this.setState({ changeLng: 'Français' });
  }

  changeLanguage = () => {
    if (localStorage.getItem('i18nextLng') === 'fr') {
      localStorage.setItem('i18nextLng', 'en');
      window.location.reload();
    } else {
      localStorage.setItem('i18nextLng', 'fr');
      window.location.reload();
    }
  };

  toggle = () => {
    this.setState(prevState => ({
      modal: !prevState.modal,
    }));
  };

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  onChange = e => {
    this.setState({
      placement: e.target.value,
    });
  };

  onClickLogout() {
    localStorage.clear();
    history.push('/');
    window.location.reload();
  }

  createLinks = routes =>
    routes.map((prop, key) => {
      if (prop.invisible) return null;

      return (
        <NavItem key={key}>
          <NavLink
            to={prop.path}
            tag={NavLinkRRD}
            onClick={this.onClose}
          >
            <i className={`tim-icons ${prop.icon}`} />
            {i18next.t(prop.name)}
          </NavLink>
        </NavItem>
      );
    });

  render() {
    return (
      <>
        <Navbar
          className="navbar-horizontal navbar-dark"
          expand="md"
          id="navbar-main"
          style={{ padding: '0' }}
        >
          <Container fluid>
            <Form className="navbar-search navbar-search-dark form-inline">
              <Link to={'/'} className="ml-3">
                <img
                  className="navbar-brand-img"
                  alt={'logo'}
                  src={logo}
                  style={{ width: '130px' }}
                />
              </Link>
            </Form>
            <Nav
              className="align-items-center d-none d-md-flex"
              navbar
            >
              <UncontrolledDropdown nav>
                <DropdownToggle className="pr-0" nav>
                  <Media className="align-items-center">
                    <Media className="ml-2 d-none d-lg-block">
                      <span
                        style={{ background: '#f5365c' }}
                        className="avatar avatar-sm rounded-circle"
                      >
                        <i
                          style={{
                            fontSize: '15pt',
                            marginLeft: '10px',
                            fontWeight: 'bold',
                          }}
                          className="tim-icons icon-button-power"
                        />
                      </span>
                    </Media>
                  </Media>
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu-arrow" right>
                  <DropdownItem
                    style={{ cursor: 'pointer' }}
                    onClick={() => this.changeLanguage()}
                  >
                    <i style={{ cursor: 'pointer' }} />
                    {this.state.changeLng === 'English' ? (
                      <img
                        src={ENflag}
                        className="tim-icons"
                        style={{ width: '20px' }}
                        alt=""
                      />
                    ) : (
                      <img
                        src={FRflag}
                        className="tim-icons"
                        style={{ width: '20px' }}
                        alt=""
                      />
                    )}{' '}
                    {this.state.changeLng}
                  </DropdownItem>
                  <SignOutButton {...this.props} />
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Container>
        </Navbar>
      </>
    );
  }
}

Header.defaultProps = {
  routes: [{}],
};

Header.propTypes = {
  routes: PropTypes.arrayOf(PropTypes.object),
  logo: PropTypes.shape({
    innerLink: PropTypes.string,
    outterLink: PropTypes.string,
    imgSrc: PropTypes.string.isRequired,
    imgAlt: PropTypes.string.isRequired,
  }),
};

export default withFirebase(Header);
