import React from 'react'
import { Card, ListGroup } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';

export default function Profile() {
  const {userInfo:{name,email}} = useSelector(state=>state.auth);
  
  return (
    <FormContainer>
       <Card>
      <Card.Img variant="top" src="https://images.pexels.com/photos/4560086/pexels-photo-4560086.jpeg?auto=compress&cs=tinysrgb&w=1260&h=500&dpr=1" />
      <Card.Body>
        <Card.Title><h2>{name}</h2></Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>{email}</ListGroup.Item>
      </ListGroup>
      <Card.Body>
        <Link to="/profile/edit">Edit Profile</Link> |
        <Link to="/profile">Delete Profile</Link>
      </Card.Body>
    </Card>
    </FormContainer>
  )
}
