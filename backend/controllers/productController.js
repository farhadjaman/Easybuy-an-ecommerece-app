import Product from './../Models/productModel.js'
import { getAll, getOne, createOne, updateOne, deleteOne } from './handlerFactory.js'
import catchAsync from './../utills/catchAsync.js'
// export const getAllProducts = getAll(Product)
// export const getProduct = getOne(Product, "reviews")
// export const createProduct = createOne(Product)
// //Do not UPDATE PASSWORD with this!
// export const updateProduct = updateOne(Product);
// export const deleteProduct = deleteOne(Product);



export const getAllProducts = catchAsync(async (req, res) => {
  const product = await Product.find({})

  if (product)
    res.status(200).json(product)
  else {
    res.status(404)
    throw new Error('Product not found')
  }
})

export const getProduct = catchAsync(async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (product)
    res.status(200).json(product)
  else {
    res.status(404)
    throw new Error('Product not found')
  }
})