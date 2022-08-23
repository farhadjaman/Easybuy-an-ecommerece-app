import jwt from 'jsonwebtoken'
import User from '../Models/userModel.js'
import catchAsync from '../utills/catchAsync.js'

export const protect = catchAsync(async (req, res, next) => {

  // console.log("hello", req.headers.authorization)
  let token
  if (req.headers.authorization) {
    try {

      token = req.headers.authorization.split(' ')[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password')

    } catch (error) {
      // console.error(error);
      res.status(401)
      throw new Error('Not authorized,Token is not valid', 401)
    }
  }

  if (!token) {
    res.status(401)
    throw new Error('Not authorized,Token is not valid', 401)
  }

  next()
})