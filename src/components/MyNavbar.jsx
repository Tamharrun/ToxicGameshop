import React from "react";
import { Navbar, Container, Nav, NavDropdown, FormControl, Button, Form, NavItem } from 'react-bootstrap'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { logoutUser } from '../redux/actions/user'

class MyNavbar extends React.Component {

    render() {
        return (
            <Navbar bg="dark" expand="lg" variant="dark">
                <Container>
                    <Navbar.Brand href="/">
                        <img
                        src="https://www.seekpng.com/png/full/40-404719_biohazard-logo-black-and-white-white-photo-for.png"
                        alt=""
                        width={"30"}
                        height={"30"}
                        className="d-inline-block align-top"/>
                        TOXIC GAMESHOP
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                        <Form className="d-flex">
                            <FormControl
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"/>
                            <Button variant="outline-light">Search</Button>
                        </Form>
                        </Nav>
                            {
                                this.props.userGlobal.username ?
                                <>
                            <Navbar.Text className="ms-4">Hello {this.props.userGlobal.username}</Navbar.Text>
                            <NavDropdown title="Profile" id="basic-nav-dropdown">
                                <NavDropdown.Item as={Link} to={"/cart"}>Cart ({this.props.cartGlobal.cartList.length})</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to={"/history"}>History</NavDropdown.Item>
                                {
                                    this.props.userGlobal.role === "admin" ?
                                    <NavDropdown.Item as={Link} to={"/admin"}>Admin</NavDropdown.Item>
                                    : null
                                }
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={this.props.logoutUser}>Log Out</NavDropdown.Item>
                            </NavDropdown>
                                </> :
                                <NavItem>
                                    <Navbar.Text>
                                        <Link to="/login">Login</Link> | <Link to="/register">Register</Link>
                                    </Navbar.Text>
                                </NavItem>
                            }
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userGlobal: state.user,
        cartGlobal: state.cart,
    }    
}

const mapDispatchToProps = {
    logoutUser,
}

export default connect(mapStateToProps, mapDispatchToProps)(MyNavbar);