import mongoose from 'mongoose';
import dotenv from 'dotenv'
import colors from 'colors'
import products from './products.js'
import users from './users.js'
import Product from './../Models/productModel.js'
import User from './../Models/userModel.js'
dotenv.config({ path: './../../.env' });



const DB = process.env.MONGO_URI
mongoose.connect(DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log(`MongoDB Connected`.cyan.underline))
  .catch(error => {
    console.log(`ERROR : ${error.message}`.red.underline.bold)
  })



//Read JSON FIle
const importData = async (Model, data) => {
  try {
    await Model.create(data, { validateBeforeSave: false });//it will set the validator off.Remove it and try to import user,you will understand
    console.log('Data succesfully loaded');

  }
  catch (err) {
    console.log(err);

  }
  process.exit();
};
//Delete all data from DB
const deleteData = async (Model) => {
  try {
    await Model.deleteMany();
    console.log('Data succesfully Deleted');

  } catch (err) {
    console.log(err);

  }
  process.exit();
};

if (process.argv[2] === '--import-products') {
  importData(Product, products)
}
if (process.argv[2] === '--import-users') {
  importData(User, users)
}


if (process.argv[2] === '--delete-product') {
  deleteData(Product)
}
if (process.argv[2] === '--delete-users') {
  deleteData(User)
}