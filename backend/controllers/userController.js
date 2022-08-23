import catchAsync from "../utills/catchAsync.js";
import User from "./../Models/userModel.js"
import bcrypt from 'bcryptjs'
import generateToken from "../utills/generateToken.js";


//Register a new User
export const registerNewUser = catchAsync(async (req, res) => {
  const { name, email, password } = req.body

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400)
    throw new Error("User Already Exists")
  }
  const newUser = await User.create({
    name,
    email,
    password
  })
  if (newUser) {
    res.status(200).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
      token: generateToken(newUser._id)

    })
  }
  else {
    res.status(400);
    throw new Error(" Invalid user data", 400)
  }

  res.send({ email, password })
})

//authenticate user and get token
export const authUser = catchAsync(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email });
  //user.password = bcrypt.hashSync("123456", 10);
  const misMatched = await user.matchPassword(password)
  if (user && misMatched) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id)
    })
  }
  else {
    res.status(404);
    throw new Error(" Invalid Email or Password,Try again", 404)
  }

  // res.send({ email, password })
})


//get user profile
export const getUserProfile = catchAsync(async (req, res) => {


  //console.log("working");
  const user = await User.findById(req.user._id);
  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,

    })
  }
  else {
    res.status(404);
    throw new Error(" User not found", 404)
  }
})

//update user profile
export const updateUserProfile = catchAsync(async (req, res) => {

  console.log(req.body)
  //console.log("working");
  const updatedUser = await User.findByIdAndUpdate(req.user.id, req.body,
    {
      new: true,
      runValidators: true
    })
  if (updatedUser) {
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id)

    })
  }
  else {
    res.status(404);
    throw new Error(" User not found", 404)
  }
})