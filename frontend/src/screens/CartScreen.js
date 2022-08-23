import { Row, Col, ListGroup, Image, Form, Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from './../components/Message'
import { AddCartItem, removeFromCart } from "../features/cartSlice"
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { fetchProducts } from '../features/cartSlice'
import { useNavigate } from 'react-router-dom'

const CartScreen = () => {

  const location = document.location;
  const { cartItems } = useSelector(store => store.cart)
  //console.log("check cart", cartItems)
  const dispatch = useDispatch()
  const { id } = useParams()
  const quantity = location.search.split('=')[1]
  const navigate = useNavigate();

  useEffect(() => {

    if (id) {
      dispatch(fetchProducts(id, quantity))
    }
  }, [id, quantity, dispatch])



  const checkoutHandler = () => {
    navigate('/shipping')

  }

  const removeFromHandler = (id) => {
    dispatch(removeFromCart(id));
  }

  // const checkoutHandler = () => {
  //   history.pushState('login?redirect=shipping')
  // }
  return (
    <Row>

      <Col md={8}>
        <h1>Shopping Cart</h1>

        {cartItems.length === 0 ?
          (<Message>
            <div>Your cart is empty</div>
            <Link to='/'>Go Back</Link>
          </Message>)
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


                    <Col md={2}>
                      ${item.price}
                    </Col>


                    <Col md={2}>
                      <Form.Control
                        as='select'
                        value={item.quantity}

                        onChange={(e) => dispatch(fetchProducts(item.id, Number(e.target.value)))}>
                        {
                          [...Array(item.countInStock).keys()].map(x => (
                            <option
                              key={x + 1}
                              value={x + 1}
                            >
                              {x + 1}
                            </option>
                          ))
                        }
                      </Form.Control>
                    </Col>


                    <Col md={2}>
                      <Button
                        type='button'
                        variant='light'
                        onClick={() => {
                          removeFromHandler(item.id)
                        }} > <i className='fas fa-trash'></i>
                      </Button>
                    </Col>





                  </Row>


                </ListGroup.Item>

              ))}


            </ListGroup>
          )
        }
      </Col>
      <Col md={4}>


        <Card>


          <ListGroup variant='flush'>

            <ListGroup.Item>
              <h2>Subtotal ({cartItems.reduce((acc, item) => acc + item.quantity, 0)})Items</h2>
              ${cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0).toFixed(2)}
            </ListGroup.Item>


            <ListGroup.Item>
              <Button type='button' className='btn-dark w-100' disabled={cartItems.length === 0} onClick={checkoutHandler}>
                Proceed TO Checkout
              </Button>
            </ListGroup.Item>

          </ListGroup>
        </Card>


      </Col>


      {/* <Col md={2}>
      </Col>
      <Col md={2}>
      </Col> */}

    </Row>
  )
}

export default CartScreen