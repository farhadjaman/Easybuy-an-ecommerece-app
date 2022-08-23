
import { useNavigate, Link, useParams } from 'react-router-dom'
import { ListGroup, Button, Row, Col, Image } from 'react-bootstrap'
import { useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { useDispatch } from 'react-redux';
import { getOrderedItem, setStatus } from '../features/orderDetailsSlice';
import { useEffect } from 'react';
import { useState } from 'react';




const OrderScreen = () => {
  const { id } = useParams()
  const orderId = id
  const dispatch = useDispatch();
  let PaypalClientId;

  const [clientId, setClientId] = useState('')
  const [sdkReady, setsdkReady] = useState(false)

  const { order, isLoading, orderSuccess, orderError, setStatus } = useSelector(store => store.orderDetails);
  const { SuccessPay, ErrorPay } = useSelector(store => store.orderPay);


  useEffect(() => {
    // const addPayPalScript = async () => {
    //   try {
    //     const response = await fetch('/api/config/paypal');
    //     const data = Promise.resolve(response.json())
    //     data.then((val) => {
    //       setClientId(val.client_Id)
    //     })
    //     const script = document.createElement('script')
    //     script.type = 'text/javascript'
    //     script.src = `${clientId}`
    //     script.async = true
    //     script.onload = () => {
    //       setsdkReady(true)
    //     }
    //     document.body.appendChild(script)

    //     if (!order || SuccessPay) {
    //       dispatch(getOrderedItem(orderId))
    //     }
    //   }
    //   catch (err) {
    //     console.log(err)
    //   }

    // }


    // if (!order)
    dispatch(getOrderedItem(orderId))
  }, [orderId, dispatch])


  console.log(clientId)

  // console.log(itemsPrice,
  //   taxPrice,
  //   shippingPrice,
  //   totalPrice)

  console.log(order, isLoading)



  return isLoading ?
    <Loader /> :
    (
      <Row>
        <Col md={8}>
          <ListGroup.Item>
            <h2>Shipping</h2>
            <p>
              <strong>Name: </strong>
              {order.user.name}
            </p>
            <p>
              <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
            </p>

            a
            <p>
              <strong>Address : </strong>
              {order.shippingAddress.address}
              {order.shippingAddress.city},
              {order.shippingAddress.postalCode},
              {order.shippingAddress.country}
            </p>
            {
              order.isDelivered ?
                <Message variant='success'>Delivered</Message> :
                <Message variant='danger'>Not Delivered</Message>
            }

          </ListGroup.Item>

          <ListGroup.Item>
            <h2>Payment Method</h2>
            <p><strong>Method: </strong>
              {order.paymentMethod}
            </p>
            {order.isPaid ?
              <Message variant='success'>Paid on {order.paidAt}</Message> :
              <Message variant='danger'>Not Paid</Message>
            }
          </ListGroup.Item>

          <ListGroup.Item>
            <h2>Payment Method</h2>
            <p>
              <strong>Method : </strong>
              {order.paymentOption}
            </p>

          </ListGroup.Item>
          <ListGroup.Item>
            <h2>Cart Items</h2>
            {
              (order.OrderedItems.length === 0) ?
                <Message> Your Cart is Empty</Message>
                : (
                  <ListGroup variant='flush'>

                    {order.OrderedItems.map(item => (

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
                <Col>${order.itemsPrice}</Col>
              </Row>
            </ListGroup.Item>

            <ListGroup.Item>
              <Row>
                <Col>Paypal_Client_Id</Col>
                <Col>{PaypalClientId}</Col>
              </Row>
            </ListGroup.Item>


            <ListGroup.Item>
              <Row>
                <Col>Shipping</Col>
                <Col>${order.shippingPrice}</Col>
              </Row>
            </ListGroup.Item>


            <ListGroup.Item>
              <Row>
                <Col>Tax</Col>
                <Col>${order.taxPrice}</Col>
              </Row>
            </ListGroup.Item>


            <ListGroup.Item>
              <Row>
                <Col>Total</Col>
                <Col>${order.totalPrice}</Col>
              </Row>
            </ListGroup.Item>
          </ListGroup>


        </Col>
      </Row>
      // <h1>"order"</h1>
    )
}


export default OrderScreen