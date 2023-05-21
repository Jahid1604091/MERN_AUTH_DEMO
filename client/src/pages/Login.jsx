import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FormContainer from '../components/FormContainer';
import { useState } from 'react';
import { Row,Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Login() {

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    const handleSubmit = (e) =>{
        e.preventDefault();
        console.log(email,password);
    }
  return (
    <FormContainer>

    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" 
        placeholder="Enter email" 
        value={email}
        onChange={e=>setEmail(e.target.value)}
        />
       
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" 
        placeholder="Enter password" 
        value={password}
        onChange={e=>setPassword(e.target.value)}
        />
      </Form.Group>


      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>

    <Row>
        <Col>
        <p>New Customer ? <Link to='/register'>Register</Link></p>
        </Col>
    </Row>

    </FormContainer>
  );
}

export default Login;