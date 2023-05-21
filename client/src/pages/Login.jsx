import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FormContainer from '../components/FormContainer';
import { useEffect, useState } from 'react';
import { Row,Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation } from '../slices/userApiSlice';
import { setCredentials } from '../slices/authSlice';

function Login() {

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [login, {isLoading}] = useLoginMutation();
    const {userInfo} = useSelector(state=>state.auth);
   

    useEffect(()=>{
        if(userInfo){
            navigate('/')
        }
    },[userInfo,navigate]);

    const handleSubmit = async(e) =>{
        e.preventDefault();
        try {
            const res = await login({email,password}).unwrap();
            dispatch(setCredentials({...res.data}));
            navigate('/');
            
        } catch (error) {
            console.log(error?.data?.message || error.error);
        }
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