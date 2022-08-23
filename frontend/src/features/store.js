import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./productSlice";
import singleProductReducer from "./singleProductSlice"
import cartReducer from "./cartSlice"
import userLoginReducer from "./userLoginSlice"
import userRegisterReducer from "./userRegisterSlice"
import orderCreateReducer from "./orderCreateSlice";
import orderDetailsReducer from "./orderDetailsSlice";
import orderPayReducer from "./orderPaySlice";
export const store = configureStore({
  reducer: {
    product: productReducer,
    singleProduct: singleProductReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer
  }
});