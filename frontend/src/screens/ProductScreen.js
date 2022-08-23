import { Link } from "react-router-dom"
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import { useParams, useNavigate } from "react-router-dom"
import Rating from "../components/Rating"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux';
import { getAProductItem } from '../features/singleProductSlice';
import Loader from '../components/Loader';
import { AddCartItem } from "../features/cartSlice"

const ProductScreen = () => {
  const [quantity, setQuantity] = useState(1)
  const { id } = useParams();
  const { singleProductItem: product, isLoading } = useSelector(store => store.singleProduct)
  const dispatch = useDispatch();
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getAProductItem(`/api/products/${id}`));
  }, [dispatch, id]);


  const AddToCartHandler = (id, qty) => {
    navigate(`/cart/${id}?q=${qty}`)
  }





  if (isLoading)
    return (
      <>
        <Loader />
      </>
    )

  return (
    <>
      <Link className="btn btn-dark my-3" to='/' >Go Back</Link>
      <Row>

        <Col md={6}>
          <Image src={product.image} alt={product.name} fluid />
        </Col>


        <Col md={3}>
          <ListGroup varient='flush'>
            <ListGroup.Item>
              <h3>{product.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating rating={product.rating} numReviews={product.numReviews} />
            </ListGroup.Item>
            <ListGroup.Item>
              <div>
                Description:
              </div>
              {product.description}
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={3}>
          <Card>
            <ListGroup varient='flush'>
              <ListGroup.Item>
                <Row>
                  <Col>
                    price :
                  </Col>
                  <Col>
                    <strong> ${product.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>
                    Status :
                  </Col>
                  <Col>
                    {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                  </Col>
                </Row>
              </ListGroup.Item>
              {product.countInStock > 0 && (
                <ListGroup.Item>
                  <Row>
                    <Col>Qty</Col>
                    <Col>
                      <Form.Control
                        as='select'
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}>
                        {
                          [...Array(product.countInStock).keys()].map(x => (
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
                  </Row>
                </ListGroup.Item>
              )}
              <ListGroup.Item>
                <Button
                  className='btn-dark w-100'
                  type='button'
                  disabled={!product.countInStock}
                  onClick={() => AddToCartHandler(product._id, quantity)}
                >
                  Add to cart
                </Button>

              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default ProductScreen


//fetch product
  // const [product, setProduct] = useState(null);

  // const fetchProducts = async () => {
  //   try {
  //     const fetchedData = await fetch(`/api/products/${id}`);
  //     const data = await fetchedData.json();

  //     setProduct(data);
  //   }
  //   catch (err) {
  //     console.log(err)
  //   }

  // };
  // useEffect(() => {
  //   fetchProducts();
  // }, [id])