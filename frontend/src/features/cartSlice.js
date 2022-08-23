import { createSlice } from "@reduxjs/toolkit";

const cartItemsFromLocalStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [];
const shippingAddressFromLocalStorage = localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : {};
const paymentOptionFromLocalStorage = localStorage.getItem('paymentOption') ? JSON.parse(localStorage.getItem('paymentOption')) : null;

const initialState = {
  cartItems: cartItemsFromLocalStorage,
  shippingAddress: shippingAddressFromLocalStorage,
  paymentoption: paymentOptionFromLocalStorage,
  itemsPrice: 0,
  taxPrice: 0,
  shippingPrice: 0,
  totalPrice: 0
}


const cartSlice = createSlice({
  name: 'Cart',
  initialState,
  reducers: {
    AddCartItem: (state, { payload }) => {
      // console.log(payload)
      const newItem = payload.item



      const existItem = state.cartItems.find(item => item.id === newItem.id)
      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map(item => item.id === newItem.id ? newItem : item)
        }

      }
      else {
        state.cartItems.push(newItem)
      }


    },
    RemoveCartItem: (state, { payload }) => {
      const productId = payload;
      return {
        ...state,
        cartItems: state.cartItems.filter(item => item.id !== productId)
      }

    },
    SavePrices: (state, { payload }) => {
      return {
        ...state,
        itemsPrice: payload.iPrice,
        taxPrice: payload.taPrice,
        shippingPrice: payload.sPrice,
        totalPrice: payload.toPrice
      }
    },


    SaveShippingAddress: (state, { payload }) => {
      return {
        ...state,
        shipppingAddress: payload
      }

    },
    SavePaymentOption: (state, { payload }) => {
      return {
        ...state,
        paymentOption: payload
      }

    },
  }
});


export const { AddCartItem, RemoveCartItem, setStatus, SaveShippingAddress, SavePaymentOption, SavePrices, itemsPrice,
  taxPrice,
  shippingPrice,
  totalPrice } = cartSlice.actions;
export default cartSlice.reducer;//.reducer will modify the states

export function fetchProducts(id, quantity = 1) {
  return async function fetchProductThunk(dispatch, getState) {
    try {

      const res = await fetch(`/api/products/${id}`);
      const product = await res.json();
      const item = {
        id: product._id,
        image: product.image,
        name: product.name,
        brand: product.brand,
        description: product.description,
        price: product.price,
        countInStock: product.countInStock,
        quantity: Number(quantity)
      };

      dispatch(AddCartItem({ item, qty: quantity }))
      console.log("cartItems", getState.cart.cartItems)
      localStorage.setItem('cartItems', JSON.stringify(getState.cart.cartItems));


    } catch (err) {
      console.log(err);
    }
  };
}

export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch(RemoveCartItem(id))
  //console.log(getState.cart.cartItems)
  localStorage.setItem('cartItems', JSON.stringify(getState.cart.cartItems));
}

export function addShippingAddress(address) {
  return (dispatch, getState) => {
    //  console.log(address)
    dispatch(SaveShippingAddress(address))
    localStorage.setItem('shippingAddress', JSON.stringify(address));
  }
}

export function addPaymentMethod(data) {
  return (dispatch, getState) => {
    dispatch(SavePaymentOption(data))
    localStorage.setItem('paymentOption', JSON.stringify(data));
  }
}
