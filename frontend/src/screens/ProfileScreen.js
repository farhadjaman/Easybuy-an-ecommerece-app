import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../features/userRegisterSlice';
import Message from './../components/Message'
import Loader from './../components/Loader'
import FormContainer from '../components/FormContainer';
import { update } from '../features/userLoginSlice';

const ProfileScreen = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')


  const location = document.location;
  const redirect = location.search ? location.search.split('=')[1] : '/'
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { userInfo, isLoading } = useSelector(store => store.userLogin)

  useEffect(() => {
    if (!userInfo) {
      navigate('/login')
    }
  }, [redirect, userInfo, navigate])


  const submitHandler = (e) => {
    e.preventDefault()
    console.log("going there")
    dispatch(update(name, email))
  }

  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>
        {isLoading && <Loader />}
        {message && <Message variant='success' >{message}</Message>}


        {/* {registrationError && <Message variant='danger' >{registrationError}</Message>} */}
        <Form onSubmit={(e) => submitHandler(e)}>

          <Form.Group controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type='text'
              placeholder={userInfo.name}
              value={name} onChange={(e) => setName((e.target.value))} />
          </Form.Group>


          <Form.Group controlId='email'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type='email'
              placeholder={userInfo.email}
              value={email} onChange={(e) => setEmail((e.target.value))} />
          </Form.Group>


          {/* <Form.Group controlId='password'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Enter password'
              value={password}
              onChange={(e) => setPassword((e.target.value))} />
          </Form.Group>

          <Form.Group controlId='confirmPassword'>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Confirm password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword((e.target.value))} />
          </Form.Group> */}


          <Button type='submit' variant='primary'>Save Settings</Button>
        </Form>


      </Col>
      <Col md={9}>
        <h2>My Orders</h2>
      </Col>

    </Row>
  )
}
export default ProfileScreen