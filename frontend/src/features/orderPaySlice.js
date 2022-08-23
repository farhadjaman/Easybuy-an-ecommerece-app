import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  order: {},
  isLoading: true,
  SuccessPay: null,
  ErrorPay: null
}


const orderPaySlice = createSlice({
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
      state.SuccessPay = payload;
    },
    setError(state, { payload }) {
      state.ErrorPay = payload;
    },
  }
});


export const { AddOrder, setStatus, setError, isLoading, Success, Error } = orderPaySlice.actions;
export default orderPaySlice.reducer;//.reducer will modify the states


export function payOrder(OrderId, paymentResult) {

  return async function fetchProductThunk(dispatch, getState) {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    fetch(`/api/orders/${OrderId}/pay`, {
      method: 'put',
      headers: {
        'Content-Type': 'application.json',
        Authorization: `Bearer ${userInfo.token}`
      },
      body: JSON.stringify(paymentResult),
    })
      .then(res => res.json())
      .then(res => {
        // console.log("getting the data from here", res)

        dispatch(AddOrder(res));
        dispatch(setStatus(false));
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

