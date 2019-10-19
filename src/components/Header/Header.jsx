import React from "react";
import { PropTypes } from "prop-types";

import {
  Form,
  Container,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  Media,
  Navbar,
  Nav,
  UncontrolledDropdown
} from "reactstrap";

import FRflag from "../../assets/locales/fr/fr.svg";
import ENflag from "../../assets/locales/en/en.svg";

import { createBrowserHistory } from "history";
const history = createBrowserHistory();

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      logged: false,
      isOpen: false,
      dropdownOpen: false,
      collapseOpen: false,
      color: "white",
      currentLng: "",
      changeLng: ""
    };
  }

  componentDidMount() {
    this.setState({ currentLng: localStorage.getItem("i18nextLng") });
    localStorage.getItem("i18nextLng") === "fr"
      ? this.setState({ changeLng: "English" })
      : this.setState({ changeLng: "Français" });
  }

  changeLanguage = () => {
    if (localStorage.getItem("i18nextLng") === "fr") {
      localStorage.setItem("i18nextLng", "en");
      window.location.reload();
    } else {
      localStorage.setItem("i18nextLng", "fr");
      window.location.reload();
    }
  };

  onClickLogout() {
    localStorage.clear();
    history.push("/");
    window.location.reload();
  }

  render() {
    return (
      <>
        <Navbar
          className="navbar-horizontal navbar-dark"
          expand="md"
          id="navbar-main"
          style={{ padding: "0" }}
        >
          <Container fluid>
            <Form className="navbar-search navbar-search-dark form-inline">
              </Form>

            <Nav className="align-items-center d-none d-md-flex" navbar>
              <UncontrolledDropdown nav>
                <DropdownToggle className="pr-0" nav>
                  <Media className="align-items-center">
                    <Media className="ml-2 d-none d-lg-block">
                      <span
                        style={{ background: "#009fe3" }}
                        className="avatar avatar-sm rounded-circle"
                      >
                        <i
                          style={{
                            fontSize: "15pt",
                            marginLeft: "10px",
                            fontWeight: "bold"
                          }}
                          className="tim-icons icon-button-power"
                        />
                      </span>
                    </Media>
                  </Media>
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu-arrow" right>
                  <DropdownItem
                    style={{ cursor: "pointer" }}
                    onClick={() => this.changeLanguage()}
                  >
                    <i style={{ cursor: "pointer" }} />{ this.state.changeLng === "English" ?  <img src={ENflag} className="tim-icons" style={{width:"20px"}} alt="" /> :  <img src={FRflag}  className="tim-icons"style={{width:"20px"}} alt="" /> } {this.state.changeLng}
                  </DropdownItem>

                  <DropdownItem
                    style={{ cursor: "pointer" }}
                    onClick={() => this.onClickLogout()}
                  >
                    <i
                      style={{ color: "#f5365c", cursor: "pointer" }}
                      className={"tim-icons icon-button-power"}
                      color="danger"
                    />{" "}
                    Log out
                  </DropdownItem>
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
  routes: [{}]
};

Header.propTypes = {
  routes: PropTypes.arrayOf(PropTypes.object),
  logo: PropTypes.shape({
    innerLink: PropTypes.string,
    outterLink: PropTypes.string,
    imgSrc: PropTypes.string.isRequired,
    imgAlt: PropTypes.string.isRequired
  })
};

export default Header;
