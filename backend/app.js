
import express from 'express';
// import cors from 'cors'
import productRouter from './routes/productRouter.js'
import userRouter from './routes/userRouter.js'
import orderRouter from './routes/orderRouter.js'
import { notFound, errorHandler } from './controllers/errorController.js';
const app = express();

app.use(express.json())
app.enable('trust proxy')



// app.use(cors())

app.use('/api/products', productRouter);
app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);
app.get('/api/config/paypal', (req, res) => {
  res.json({ client_Id: process.env.PAYPAL_CLIENT_ID })
})
app.use(notFound)
app.use(errorHandler)



export default app;
