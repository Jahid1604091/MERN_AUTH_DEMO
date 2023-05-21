import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useDispatch, useSelector } from 'react-redux';
import { useLogoutMutation } from '../slices/userApiSlice';
import { logout } from '../slices/authSlice';
import { useNavigate } from 'react-router-dom';

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
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
            <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>

          <Nav>
            {
              userInfo ? <Nav.Link onClick={logoutHandler}>Logout</Nav.Link> : 
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