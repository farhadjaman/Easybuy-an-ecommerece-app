import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import { addShippingAddress } from '../features/cartSlice';
import CheckoutSteps from '../components/CheckoutSteps';

const ShippingScreen = () => {
  const { shippingAddress } = useSelector(store => store.cart);

  const navigate = useNavigate();
  const [address, setAddress] = useState(shippingAddress.address ? shippingAddress.address : '');
  const [city, setCity] = useState(shippingAddress.city ? shippingAddress.city : '');
  const [postalCode, setPostelCode] = useState(shippingAddress.postalCode ? shippingAddress.postalCode : '');
  const [country, setCountry] = useState(shippingAddress.country ? shippingAddress.country : '');


  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(addShippingAddress({ address, city, postalCode, country }))
    navigate('/payment')
  }
  return (
    <FormContainer>

      <CheckoutSteps step1 step2 />
      <h1>Shipping</h1>
      <Form onSubmit={submitHandler}>

        <Form.Group controlId='address'>
          <Form.Label>Address</Form.Label>
          <Form.Control
            type='address'
            placeholder='Enter Address'
            required
            value={address} onChange={(e) => setAddress(e.target.value)} />
        </Form.Group>

        <Form.Group controlId='city'>
          <Form.Label>City</Form.Label>
          <Form.Control
            type='city'
            placeholder='Enter City'
            required
            value={city} onChange={(e) => setCity(e.target.value)} />
        </Form.Group>


        <Form.Group controlId='postalCode'>
          <Form.Label>postal Code</Form.Label>
          <Form.Control
            type='postalCode'
            placeholder='Enter postal code'
            required
            value={postalCode} onChange={(e) => setPostelCode(e.target.value)} />
        </Form.Group>


        <Form.Group controlId='country'>
          <Form.Label>Country</Form.Label>
          <Form.Control
            type='country'
            placeholder='Enter Country Name'
            required
            value={country} onChange={(e) => setCountry(e.target.value)} />
        </Form.Group>
        <Button type='submit' variant='primary'>Continue</Button>

      </Form>
    </FormContainer>
  )
}

export default ShippingScreen