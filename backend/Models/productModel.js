import mongoose from 'mongoose';
const reviewschema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: [true]
  },
  Comment: {
    type: Number
  },
}, {
  timestamps: true
})


const productschema = new mongoose.Schema
  ({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    image: {
      type: String,
      required: [true],
    },
    name: {
      type: String,
      required: [true],
    },
    brand: {
      type: String,
      required: [true],
    },
    catagory: {
      type: String,
      required: [true]
    },
    description: {
      type: String,
      required: [true]
    },
    rating: {
      type: Number,
      required: [true]
    },
    reviews: [reviewschema],
    numReviews: {
      type: Number,
      required: [true]
    },
    price: {
      type: Number,
      required: [true]
    },
    countInStock: {
      type: Number,
      required: [true]
    }
  }, {
    timestamps: true
  })

const Product = mongoose.model('Product', productschema);


export default Product;