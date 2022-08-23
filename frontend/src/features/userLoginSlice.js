import { createSlice } from "@reduxjs/toolkit";
const userInfoFromLocalStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;

const initialState = {
  userInfo: userInfoFromLocalStorage,
  isLoading: false,
  loginError: null
}





const userLoginSlice = createSlice({
  name: 'userLogin',
  initialState,
  reducers: {
    setUserInfo(state, { payload }) {
      state.userInfo = payload
    },
    setStatus(state, { payload }) {
      state.status = payload;
    }
  },
  setError(state, { payload }) {
    state.loginError = payload;
  },
});
export const { setUserInfo, setStatus, setError } = userLoginSlice.actions
export default userLoginSlice.reducer;//.reducer will modify the states

//fetch All the product
export function login(email, password) {
  return async function fetchProductThunk(dispatch, getState) {
    dispatch(setStatus(true));

    fetch('/api/users/login', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
      .then(res => res.json())
      .then(res => {
        console.log("getting the data from here", res)
        dispatch(setUserInfo(res));
        localStorage.setItem('userInfo', JSON.stringify(res));

      })
      .catch(error => {
        dispatch(setError(error.response && error.response.data.message
          ? error.response.data.message
          : error.message))
        dispatch(setStatus(false));
      })





  };
}


//fetch All the product
export function update(name, email) {

  return async function fetchProductThunk(dispatch, getState) {
    console.log(getState.userInfo)
    let body = {};
    if (email) {
      body.email = email
    }
    if (name) {
      body.name = name
    }
    // console.log(body)
    dispatch(setStatus(true));

    fetch('/api/users/profile', {
      method: 'PUT', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfoFromLocalStorage.token}`
      },
      body: JSON.stringify(body),
    })
      .then(res => res.json())
      .then(res => {
        console.log("getting the data from here", res)
        dispatch(setUserInfo(res));
        localStorage.setItem('userInfo', JSON.stringify(res));

      })
      .catch(error => {
        dispatch(setError(error.response && error.response.data.message
          ? error.response.data.message
          : error.message))
        dispatch(setStatus(false));
      })





  };
}

