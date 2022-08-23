
import { useNavigate, Link } from 'react-router-dom'
import { ListGroup, Button, Row, Col, Image } from 'react-bootstrap'
import { useSelector } from 'react-redux';
import CheckoutSteps from '../components/CheckoutSteps';
import Message from '../components/Message';
import { useDispatch } from 'react-redux';
import { CreateOrder } from '../features/orderCreateSlice';
import { SavePrices } from '../features/cartSlice';
import { useEffect } from 'react';





const PlaceOrderScreen = () => {


  const dispatch = useDispatch();



  const { shippingAddress,
    paymentOption,
    cartItems,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice
  } = useSelector(store => store.cart);

  const { isLoading, orderSuccess, orderError } = useSelector(store => store.orderCreate);


  //calculatePrice

  const iPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const sPrice = iPrice > 100 ? 10 : 5;
  const taPrice = Number((0.15 * iPrice).toFixed(2))
  const toPrice = Number((iPrice + sPrice + taPrice).toFixed(2));

  useEffect(() => {
    dispatch(SavePrices({ iPrice, sPrice, taPrice, toPrice }))
  }, [dispatch, iPrice, sPrice, taPrice, toPrice])


  // console.log(itemsPrice,
  //   taxPrice,
  //   shippingPrice,
  //   totalPrice)

  const placeOrderHandler = (e) => {
    e.preventDefault();
    dispatch(CreateOrder({
      orderItems: cartItems,
      shippingAddress,
      paymentOption,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice

    }))

    navigate('/')
  }
  const navigate = useNavigate();
  const submitHandler = (e) => {
    e.preventDefault();

    navigate('/payment')
  }



  return (
    <>

      <CheckoutSteps step1 step2 step3 step4 />
      <h1>Place order</h1>
      <Row>
        <Col md={8}>
          <ListGroup.Item>
            <h2>Shipping</h2>
            <p>
              <strong>Address : </strong>
              {shippingAddress.address}
              {shippingAddress.city},
              {shippingAddress.postalCode},
              {shippingAddress.country}
            </p>

          </ListGroup.Item>
          <ListGroup.Item>
            <h2>Payment Method</h2>
            <p>
              <strong>Method : </strong>
              {paymentOption}
            </p>

          </ListGroup.Item>
          <ListGroup.Item>
            <h2>Cart Items</h2>
            {
              (cartItems.length === 0) ?
                <Message> Your Cart is Empty</Message>
                : (
                  <ListGroup variant='flush'>

                    {cartItems.map(item => (

                      <ListGroup.Item key={item.id}>

                        <Row>


                          <Col md={2}>
                            <Image src={item.image} alt={item.name} fluid rounded />
                          </Col>


                          <Col md={3}>
                            <Link to={`/products/${item.id}`}>{item.name}</Link>
                          </Col>


                          <Col md={4}>
                            {item.quantity} X ${item.price} = {item.quantity * item.price}
                          </Col>

                        </Row>


                      </ListGroup.Item>

                    ))}


                  </ListGroup>

                )
            }
          </ListGroup.Item>

        </Col>
        <Col md={4}>
          <ListGroup variant="flush">


            <ListGroup.Item>
              <h2>Order Summery</h2>
            </ListGroup.Item>


            <ListGroup.Item>
              <Row>
                <Col>Items</Col>
                <Col>${itemsPrice}</Col>
              </Row>
            </ListGroup.Item>


            <ListGroup.Item>
              <Row>
                <Col>Shipping</Col>
                <Col>${shippingPrice}</Col>
              </Row>
            </ListGroup.Item>


            <ListGroup.Item>
              <Row>
                <Col>Tax</Col>
                <Col>${taxPrice}</Col>
              </Row>
            </ListGroup.Item>


            <ListGroup.Item>
              <Row>
                <Col>Total</Col>
                <Col>${totalPrice}</Col>
              </Row>
            </ListGroup.Item>

            <ListGroup.Item>
              {orderError && <Message variant={'danger'}>{orderError}</Message>}
              {isLoading && <Message variant={'flush'}>Creating Order...</Message>}
            </ListGroup.Item>

            <ListGroup.Item>
              <Button type='button' className='btn-block' disabled={cartItems.length === 0} onClick={e => placeOrderHandler(e)}>Place Order</Button>
            </ListGroup.Item>
          </ListGroup>


        </Col>
      </Row>
    </>


  )
}

export default PlaceOrderScreen