import React from 'react'
import { Card } from 'react-bootstrap'
import Rating from './Rating'
import { Link } from 'react-router-dom'
const Product = ({ product }) => {
  return (
    <Card className='my-3 p-3 rounded' >

      <Link to={`/products/${product._id}`}>
        <Card.Img src={product.image} className='rounded' />
      </Link>

      <Card.Body>

        <Link to={`/products/${product._id}`} >
          <Card.Title as='div'>
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as='div'>
          <Rating rating={product.rating} numReviews={product.numReviews} />
        </Card.Text>

        <Card.Text as='h3'>
          ${product.price}
        </Card.Text>

      </Card.Body>

    </Card>
  )
}

export default Product