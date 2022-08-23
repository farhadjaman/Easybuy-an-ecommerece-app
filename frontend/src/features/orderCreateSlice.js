import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  order: {},
  isLoading: false,
  orderSuccess: null,
  orderError: null
}


const orderCreateSlice = createSlice({
  name: 'Order',
  initialState,
  reducers: {
    AddOrder: (state, { payload }) => {
      // console.log(payload)
      state.order = payload
    },
    setStatus: (state, { payload }) => {
      state.isLoading = payload
    },
    setSuccess(state, { payload }) {
      state.orderSuccess = payload;
    },
    setError(state, { payload }) {
      state.orderError = payload;
    },
  }
});


export const { AddOrder, setStatus, setError, isLoading, orderSuccess, orderError } = orderCreateSlice.actions;
export default orderCreateSlice.reducer;//.reducer will modify the states

export function CreateOrder(data) {

  return async function fetchProductThunk(dispatch, getState) {
    dispatch(setStatus(true));
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));


    console.log(userInfo)

    // console.log(data)

    // dispatch(setStatus(true));

    fetch('/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      },
      body: JSON.stringify(data),
    })
      .then(res => res.json())
      .then(res => {
        //console.log("getting the data from here", res)
        dispatch(setStatus(false));
        dispatch(AddOrder(res));
        // localStorage.setItem('orderItem', JSON.stringify(res));

      })
      .catch(error => {
        dispatch(setError(error.response && error.response.data.message
          ? error.response.data.message
          : error.message))
        dispatch(setStatus(false));
      })





  };
}

export function getOrderedItem(id) {

  return async function fetchProductThunk(dispatch, getState) {
    dispatch(setStatus(true));
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    fetch(`/api/orders/${id}`, {
      method: 'get',
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    })
      .then(res => res.json())
      .then(res => {
        //console.log("getting the data from here", res)
        dispatch(setStatus(false));
        dispatch(AddOrder(res));
        //    localStorage.setItem('userInfo', JSON.stringify(res));


      })
      .catch(error => {
        dispatch(setError(error.response && error.response.data.message
          ? error.response.data.message
          : error.message))
        dispatch(setStatus(false));
      })


  };
}

// export const removeFromCart = (id) => (dispatch, getState) => {
//   dispatch(RemoveCartItem(id))
//   //console.log(getState.cart.cartItems)
//   localStorage.setItem('cartItems', JSON.stringify(getState.cart.cartItems));
// }

