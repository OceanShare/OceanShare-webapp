import React from 'react';
import {
    Collapse, Navbar, NavbarToggler, NavbarBrand, Nav,
    Dropdown, DropdownToggle, DropdownMenu, DropdownItem,
    Container
} from 'reactstrap';
import { createBrowserHistory } from 'history';
import dashboardRoutes from '../../routes/dashboard';

const history = createBrowserHistory();
class Header extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            dropdownOpen: false,
            color: "transparent"
        };
        this.toggle = this.toggle.bind(this);
        this.dropdownToggle = this.dropdownToggle.bind(this);
    }

    toggle() {
        if(this.state.isOpen){
            this.setState({
                color: "transparent"
            });
        } else {
            this.setState({
                color: "white"
            });
        }
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    dropdownToggle(e){
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    getBrand(){
        var name;
        dashboardRoutes.map((prop,key) => {
            if(prop.collapse){
                 prop.views.map((prop,key) => {
                    if(prop.path === this.props.location.pathname){
                        name = prop.name;
                    }
                    return null;
                })
            } else {
                if(prop.redirect){
                    if(prop.path === this.props.location.pathname){
                        name = prop.name;
                    }
                }else{
                    if(prop.path === this.props.location.pathname){
                        name = prop.name;
                    }
                }
            }
            return null;
        })
        return name;
    }

    openSidebar(){
        document.documentElement.classList.toggle('nav-open');
        this.refs.sidebarToggle.classList.toggle('toggled');
    }

    // function that adds color white/transparent to the navbar on resize (this is for the collapse)
    updateColor(){
        if(window.innerWidth < 993 && this.state.isOpen){
            this.setState({
                color: "white"
            });
        } else {
            this.setState({
                color: "transparent"
            });
        }
    }

    onClickAccount(){
        if (localStorage.getItem("email") !== null) {
        history.push('/profil')
        window.location.reload()
        }
    }

    onClickLogout(){
        localStorage.removeItem("email");
        localStorage.removeItem("token");
        history.push('/login');
        window.location.reload()
    }


    componentDidMount(){
        window.addEventListener("resize", this.updateColor.bind(this));
    }

    componentDidUpdate(e){
        if(window.innerWidth < 993 && e.history.location.pathname !== e.location.pathname && document.documentElement.className.indexOf('nav-open') !== -1){
            document.documentElement.classList.toggle('nav-open');
            this.refs.sidebarToggle.classList.toggle('toggled');
        }
    }

    render(){
        return (
            <Navbar
                color={this.props.location.pathname.indexOf('full-screen-maps') !== -1 ? "white":this.state.color} expand="lg"
                className={
                    this.props.location.pathname.indexOf('full-screen-maps') !== -1 ?
                    "navbar-absolute fixed-top":"navbar-absolute fixed-top " + (this.state.color === "transparent" ? "navbar-transparent ":"")}>
                <Container fluid>
                    <div className="navbar-wrapper">
                        <div className="navbar-toggle">
                            <button type="button" ref="sidebarToggle" className="navbar-toggler" onClick={() => this.openSidebar()}>
                                <span className="navbar-toggler-bar bar1"></span>
                                <span className="navbar-toggler-bar bar2"></span>
                                <span className="navbar-toggler-bar bar3"></span>
                            </button>
                        </div>
                        <NavbarBrand href="/">{this.getBrand()}</NavbarBrand>
                    </div>
                    <NavbarToggler onClick={this.toggle}>
                        <span className="navbar-toggler-bar navbar-kebab"></span>
                        <span className="navbar-toggler-bar navbar-kebab"></span>
                        <span className="navbar-toggler-bar navbar-kebab"></span>
                    </NavbarToggler>
                    <Collapse isOpen={this.state.isOpen} navbar className="justify-content-end">
                        <Nav navbar>
                            <Dropdown nav isOpen={this.state.dropdownOpen} toggle={(e) => this.dropdownToggle(e)}>
                                <DropdownToggle caret nav>
                                    <i className="now-ui-icons users_single-02"></i>
                                    <p>
            							<span className="d-lg-none d-md-block">Some Actions</span>
            						</p>
                                </DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem tag="a" style={{ cursor: 'pointer' }}onClick={this.onClickAccount}>My account</DropdownItem>
                                    <DropdownItem tag="a"><p style={{ color: 'red', cursor: 'pointer' }} onClick={() => this.onClickLogout()}>Logout</p></DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </Nav>
                    </Collapse>
                </Container>
            </Navbar>
        );
    }
}

export default Header;
