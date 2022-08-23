import Product from '../Models/productModel.js'
import { getAll, getOne, createOne, updateOne, deleteOne } from './handlerFactory.js'
import catchAsync from './../utills/catchAsync.js'
import Order from '../Models/orderModel.js'



export const addOrderItems = catchAsync(async (req, res) => {
  const { orderItems,
    shippingAddress,
    paymentOption,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice } = req.body;

  if (orderItems && addOrderItems.length === 0) {
    res.status(400)
    throw new Error('No Order items');
  }
  else {
    const order = new Order({
      OrderedItems: orderItems,
      user: req.user._id,
      shippingAddress,
      paymentOption,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice

    })
    const createdOrder = await order.save()
    res.status(201).json(createdOrder)
  }
})

export const getOrderById = catchAsync(async (req, res) => {
  console.log(req.params.id);
  const order = await Order.findById(req.params.id)
  if (order) {
    res.status(201).json(order)
  }
  else {
    res.status(404);
    throw new Error('Order not found');
  }
})

export const updateOrderToPaid = catchAsync(async (req, res) => {
  const order = await Order.findById(req.params.id)
  if (order) {
    console.log(req.body)

    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.payer.email_address
      }
    }
    const updatedOrder = await order.save()
    res.status(201).json(updatedOrder)
  }
  else {
    res.status(404);
    throw new Error('Order not found');
  }
})