import { createSlice } from "@reduxjs/toolkit";
import { setUserInfo } from "./userLoginSlice";
const userInfoFromLocalStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;

const initialState = {
  userInfo: userInfoFromLocalStorage,
  isLoading: false,
  registrationError: null
}





const userRegisterSlice = createSlice({
  name: 'userLogin',
  initialState,
  reducers: {
    setUserRegistrationInfo(state, { payload }) {
      state.userInfo = payload
    },
    setUserRegistrationStatus(state, { payload }) {
      state.status = payload;
    }
  },
  setUserRegistrationError(state, { payload }) {
    state.loginError = payload;
  },
});

export const { setUserRegistrationInfo, setUserRegistrationStatus, setUserRegistrationError } = userRegisterSlice.actions
export default userRegisterSlice.reducer;//.reducer will modify the states

//fetch All the product
export function register(name, email, password) {
  return async function fetchProductThunk(dispatch, getState) {
    dispatch(setUserRegistrationStatus(true));

    fetch('/api/users/login', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    })
      .then(res => res.json())
      .then(res => {

        dispatch(setUserRegistrationInfo(res));
        dispatch(setUserInfo(res))
        setUserRegistrationStatus(false)
        localStorage.setItem('userInfo', JSON.stringify(res));

      })
      .catch(error => {
        dispatch(setUserRegistrationError(error.response && error.response.data.message
          ? error.response.data.message
          : error.message))
        dispatch(setUserRegistrationStatus(false));
      })





  };
}

// export function getUserDetails(id) {
//   return async function fetchProductThunk(dispatch, getState) {
//     dispatch(setUserRegistrationStatus(true));

//     fetch('/api/users/login', {
//       method: 'POST', // or 'PUT'
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ name, email, password }),
//     })
//       .then(res => res.json())
//       .then(res => {

//         dispatch(setUserRegistrationInfo(res));
//         dispatch(setUserInfo(res))
//         setUserRegistrationStatus(false)
//         localStorage.setItem('userInfo', JSON.stringify(res));

//       })
//       .catch(error => {
//         dispatch(setUserRegistrationError(error.response && error.response.data.message
//           ? error.response.data.message
//           : error.message))
//         dispatch(setUserRegistrationStatus(false));
//       })





//   };
// }
