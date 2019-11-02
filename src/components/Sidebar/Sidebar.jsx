import React from 'react';
import { NavLink as NavLinkRRD, Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import i18next from 'i18next';

import {
  Button,
  Container,
  Col,
  Collapse,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Row,
} from 'reactstrap';
import { createBrowserHistory } from 'history';
import logo from '../../assets/logo.png';

const history = createBrowserHistory();

class Sidebar extends React.Component {
  state = {
    modal: false,
    collapseOpen: false,
  };
  constructor(props) {
    super(props);
    this.activeRoute.bind(this);
  }

  activeRoute(routeName) {
    return this.props.location.pathname.indexOf(routeName) > -1 ? 'active' : '';
  }

  toggleCollapse = () => {
    console.log('Toogled');
    this.setState({
      collapseOpen: !this.state.collapseOpen,
    });
  };

  closeCollapse = () => {
    this.setState({
      collapseOpen: false,
    });
  };

  toggle = () => {
    this.setState((prevState) => ({
      modal: !prevState.modal,
    }));
  };

  onClickLogout() {
    localStorage.clear();
    history.push('/');
    window.location.reload();
  }

  changeLanguage = () => {
    i18next.changeLanguage('en').then((t) => {
      t('fr'); // -> same as i18next.t
    });
  };

  createLinks = (routes) => {
    return routes.map((prop, key) => {
      if (
        prop.name === 'Edit' ||
        prop.name === 'Real' ||
        prop.name === 'Billing' ||
        prop.name === 'New Campaign' ||
        prop.name === 'Profil'
      ) {
        return null;
      }
      return (
        <NavItem key={key}>
          <NavLink to={prop.path} tag={NavLinkRRD} onClick={this.closeCollapse}>
            <i className={'tim-icons ' + prop.icon} />
            {i18next.t(prop.name)}
          </NavLink>
        </NavItem>
      );
    });
  };
  render() {
    const { routes } = this.props;
    let navbarBrandProps;
    if (logo && logo.innerLink) {
      navbarBrandProps = {
        to: logo.innerLink,
        tag: Link,
      };
    } else if (logo && logo.outterLink) {
      navbarBrandProps = {
        href: logo.outterLink,
        target: '_blank',
      };
    }
    return (
      <>
        <Modal isOpen={this.state.modal}>
          <ModalHeader toggle={this.toggle} />
          <ModalBody>
            <h2 style={{ color: '#f5365c' }} className='text-center'>
              You want to leave?
            </h2>
          </ModalBody>
          <ModalFooter>
            <Button color='secondary' onClick={this.toggle}>
              Cancel
            </Button>
            <Button color='danger' onClick={this.onClickLogout}>
              Yes !
            </Button>
          </ModalFooter>
        </Modal>

        <Navbar
          className='navbar-vertical fixed-left navbar-light bg-white'
          expand='md'
          id='sidenav-main'>
          <Container fluid>
            <Button
              style={{ zIndex: '4000' }}
              className='navbar-toggler'
              onClick={this.toggleCollapse}>
              <span className='navbar-toggler-icon' />
            </Button>

            <NavbarBrand className='pt-0' {...navbarBrandProps}>
              <Link to={'/'}>
                <img className='navbar-brand-img' alt={'logo'} src={logo} />
              </Link>
            </NavbarBrand>

            <Collapse navbar isOpen={this.state.collapseOpen}>
              <div className='navbar-collapse-header d-md-none'>
                <Row>
                  <Col className='collapse-close' xs='6'>
                    <button
                      className='navbar-toggler'
                      type='button'
                      onClick={this.toggleCollapse}
                    />
                  </Col>
                  <Col align='right' className='collapse-brand' xs='6'>
                    <NavLink to={'/'}>
                      <img alt={'logo'} src={logo} />
                    </NavLink>
                  </Col>
                </Row>
              </div>
              <Form className='mt-4 mb-3 d-md-none'>
                <InputGroup className='input-group-rounded input-group-merge'>
                  <Input
                    aria-label='Search'
                    className='form-control-rounded form-control-prepended'
                    placeholder='Search'
                    type='search'
                  />
                  <InputGroupAddon addonType='prepend'>
                    <InputGroupText>
                      <span className='fa fa-search' />
                    </InputGroupText>
                  </InputGroupAddon>
                </InputGroup>
              </Form>

              <Nav navbar>{this.createLinks(routes)}</Nav>
              <Nav className='mt-md-9 px-3' navbar>
                <Container fluid>
                  <Button
                    size='xs'
                    color='secondary'
                    type='button'
                    className='btn btn-round block'
                    style={{
                      position: 'absolute',
                      bottom: '15px',
                      width: '85%',
                      left: '18px',
                    }}
                    onClick={this.toggle}>
                    <i
                      style={{ color: 'red', cursor: 'pointer' }}
                      className={'tim-icons icon-button-power'}
                    />{' '}
                    Settings
                  </Button>
                </Container>
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </>
    );
  }
}

Sidebar.defaultProps = {
  routes: [{}],
};

Sidebar.propTypes = {
  routes: PropTypes.arrayOf(PropTypes.object),
  logo: PropTypes.shape({
    innerLink: PropTypes.string,
    outterLink: PropTypes.string,
    imgSrc: PropTypes.string.isRequired,
    imgAlt: PropTypes.string.isRequired,
  }),
};

export default Sidebar;
