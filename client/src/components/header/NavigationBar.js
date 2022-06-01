import React from 'react'

import { Link, Redirect, withRouter } from 'react-router-dom'

import { Navbar, Nav, NavDropdown, Form, FormControl, Button, Container } from 'react-bootstrap'

import { isAuthenticated, signout } from '../../apiCalls/auth'


export const NavigationBar = () => {
    return(
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Container>
            <Navbar.Brand href="/">NCET Exam Portal</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
              
                <Nav className="me-auto">
                </Nav>
    
                <Nav>
    
                  {isAuthenticated() && isAuthenticated.apply().user.role ===1 && (
                    <Nav.Link >
                      <Link to="/admin/dashboard" className="text-reset text-decoration-none mx-1">
                      Admin Dashboard
                      </Link>
                  </Nav.Link>
                  )}
      

                  {!isAuthenticated() && (
                    <>
                    <Nav.Link >
                      <Link to="/signup" className="text-reset text-decoration-none mx-1">
                      Sign Up
                      </Link>
                    </Nav.Link>
                    <Nav.Link >
                      <Link to="/signin" className="text-reset text-decoration-none mx-1">
                      Sign In
                      </Link>
                    </Nav.Link>
                    </>
                  )}
      
                  {isAuthenticated() && (
                    <Nav.Link >
                    <Link to="/" onClick={() => {
                      signout(() => {
                        <Redirect to="/" />
                      })
                    }} className="text-reset text-decoration-none mx-1">
                    Sign Out
                    </Link>
                  </Nav.Link>
                  )}

                </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
    )
}

export default withRouter(NavigationBar);