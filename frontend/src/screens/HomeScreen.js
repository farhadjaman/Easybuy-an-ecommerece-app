import { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import Product from '../components/Product'
import { useDispatch, useSelector } from 'react-redux';
import { getProductItems, setIsLoading } from '../features/productSlice';
import Loader from '../components/Loader';

const HomeScreen = () => {

  const { productItems: products, isLoading } = useSelector(store => store.product)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProductItems('/api/products'));
  }, [dispatch]);



  // const [products, setProducts] = useState([])

  // const fetchProducts = async () => {
  //   const url = await fetch(
  //     "/api/products"
  //   );
  //   const data = await url.json();
  //   setProducts(data);
  // };
  // useEffect(() => {
  //   fetchProducts();
  // }, [setProducts])

  if (isLoading)
    return (
      <>
        <Loader />
      </>

    )

  return (
    <>
      <h1>Latest Products</h1>
      <Row>
        {products.map(product => (
          <Col sm={12} md={6} lg={4} xl={3} key={product._id} >
            <Product product={product} />
          </Col>
        ))}
      </Row>

    </>
  )
}

export default HomeScreen