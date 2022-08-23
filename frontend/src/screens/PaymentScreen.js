import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import { addPaymentMethod } from '../features/cartSlice';
import CheckoutSteps from '../components/CheckoutSteps';


const PaymentScreen = () => {
  const { shippingAddress, paymentOption } = useSelector(store => store.cart);
  const navigate = useNavigate();


  console.log(shippingAddress)
  useEffect(() => {


    if (!Object.keys(shippingAddress).length) {

      navigate('/shipping')
    }

  }, [shippingAddress, navigate])


  const [paymentMethod, setPaymentMethod] = useState('payment')

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(paymentMethod)
    dispatch(addPaymentMethod(paymentMethod));
    navigate('/placeorder')

  }
  return (
    <FormContainer>

      <CheckoutSteps step1 step2 step3 />
      <h1>Payment</h1>
      <Form onSubmit={submitHandler}>

        <Form.Group controlId='address'>
          <Form.Label as='legend'>Select Method</Form.Label>
          <Form.Select aria-label="Payment method" onChange={e => setPaymentMethod(e.target.value)}>
            <option>Payment Methods</option>
            <option value="Paypal" >Paypal</option>
            <option value="Bkash" >Bkash</option>
            <option value="Nagad">Nagad</option>
          </Form.Select>
        </Form.Group>
        <Button type='submit' variant='primary'>Continue</Button>

      </Form>
    </FormContainer>
  )
}

export default PaymentScreen