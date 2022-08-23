import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../features/userRegisterSlice';
import Message from './../components/Message'
import Loader from './../components/Loader'
import FormContainer from '../components/FormContainer';

const RegisterScreen = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')


  const location = document.location;
  const redirect = location.search ? location.search.split('=')[1] : '/'
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { userInfo, isLoading, registrationError } = useSelector(store => store.userRegister)

  useEffect(() => {
    if (userInfo) {
      navigate(redirect)
    }
  }, [redirect, userInfo, navigate])


  const submitHandler = (e) => {
    e.preventDefault()

    if (password != confirmPassword) {
      setMessage('Password do not match!')
    }

    dispatch(register(name, email, password))
  }

  return (
    <FormContainer>
      <h1>Sign Up</h1>
      {isLoading && <Loader />}
      {message && <Message variant='danger' >{message}</Message>}
      {registrationError && <Message variant='danger' >{registrationError}</Message>}
      <Form onSubmit={(e) => submitHandler(e)}>


        <Form.Group controlId='name'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter your name'
            value={name} onChange={(e) => setName((e.target.value))} />
        </Form.Group>


        <Form.Group controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            value={email} onChange={(e) => setEmail((e.target.value))} />
        </Form.Group>


        <Form.Group controlId='password'>
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
        </Form.Group>


        <Button type='submit' variant='primary'>Register</Button>
      </Form>

      <Row className='py-3'>
        <Col>Have an Account?
          <Link className='px-2' to={redirect ? `/login?redirect=${redirect}` : '/register'}>Login</Link>
        </Col>

      </Row>
    </FormContainer>)
}

export default RegisterScreen