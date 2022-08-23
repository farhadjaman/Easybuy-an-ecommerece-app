import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setUserInfo } from '../features/userLoginSlice';

const Header = () => {
  const { userInfo, isLoading, loginError } = useSelector(store => store.userLogin)
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(setUserInfo(null))
  }
  return (
    <Navbar bg="dark" variant='dark' expand="lg" collapseOnSelect>
      <Container>

        <LinkContainer to="/">
          <Navbar.Brand >ProShop</Navbar.Brand>
        </LinkContainer>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">

            <LinkContainer to="/cart">
              <Nav.Link >
                <i className="fas fa-shopping-cart"></i>
                <span className='ms-1'>
                  Cart
                </span>
              </Nav.Link>
            </LinkContainer>


            {userInfo ? (
              <NavDropdown title={userInfo.name} id='username'>
                <LinkContainer to='/profile'>
                  <NavDropdown.Item>Profile</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
              </NavDropdown>

            )
              :
              (<LinkContainer to="/login">
                <Nav.Link >
                  <i className="fas fa-user"></i>
                  <span className='ms-1'>
                    Sign In
                  </span>
                </Nav.Link>
              </LinkContainer>)
            }



          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header