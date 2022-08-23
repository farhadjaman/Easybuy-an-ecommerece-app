import { config } from 'dotenv';
import app from './app.js';
import mongoose from 'mongoose'
import colors from 'colors'
config()


process.on('uncaughtException', err => {//handle all the errors in an synchronus code that has not be previously handled
  console.log('Uncaught Exception! Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

const DB = process.env.MONGO_URI
mongoose.connect(DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log(`MongoDB Connected`.cyan.underline))
  .catch(error => {
    console.log(`ERROR : ${error.message}`.red.underline.bold)
  })


const PORT = process.env.PORT || 3001

app.listen(PORT, console.log(`Server is in ${process.env.NODE_ENV} mode running on ${PORT} `))