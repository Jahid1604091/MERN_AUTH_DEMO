import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useDispatch, useSelector } from 'react-redux';
import { useLogoutMutation } from '../slices/userApiSlice';
import { logout } from '../slices/authSlice';
import { Link, useNavigate } from 'react-router-dom';

function Header() {
  const {userInfo} = useSelector(state=>state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApi] = useLogoutMutation();

  const logoutHandler = async()=>{
    try {
      await logoutApi().unwrap();
      dispatch(logout());
      navigate('/login');
    } catch (error) {
      console.log(error.message)
    }
  }
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">Sample Auth </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/about">About </Nav.Link>
            <Nav.Link href="/pricing">Pricing</Nav.Link>

          </Nav>

          <Nav>
            {
              userInfo ?       
              <NavDropdown title={userInfo?.name} id="collasible-nav-dropdown">
              <NavDropdown.Item>
                <Link to='/profile'>Profile</Link>
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={logoutHandler}>
                Logout
              </NavDropdown.Item>
            </NavDropdown> : 
              <>
            <Nav.Link href="/login">Sign In</Nav.Link>
            <Nav.Link eventKey={2} href="/register">
              Sign Up
            </Nav.Link>
              
              </>
            }
          </Nav>
          
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;