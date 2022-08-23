import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../features/userLoginSlice';
import Message from './../components/Message'
import Loader from './../components/Loader'
import FormContainer from '../components/FormContainer';

const LoginScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const location = document.location;
  const redirect = location.search ? location.search.split('=')[1] : '/'
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { userInfo, isLoading, loginError } = useSelector(store => store.userLogin)

  useEffect(() => {
    if (userInfo) {
      navigate(redirect)
    }
  }, [redirect, userInfo, navigate])


  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(login(email, password))
  }

  return (
    <FormContainer>
      <h1>Sign In</h1>
      {isLoading && <Loader />}
      {loginError && <Message variant='danger' >{loginError}</Message>}
      <Form onSubmit={(e) => submitHandler(e)}>
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
        <Button type='submit' variant='primary'>Sign In</Button>
      </Form>

      <Row className='py-3'>
        <Col>New Customer?
          <Link className='px-2' to={redirect ? `/register?redirect=${redirect}` : '/register'}>Register</Link>
        </Col>

      </Row>
    </FormContainer>)
}

export default LoginScreen