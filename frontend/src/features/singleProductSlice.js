import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";
const initialState = {
  singleProductItem: null,
  isLoading: true
}

//fetch All the product
export const getAProductItem = createAsyncThunk('product/getAProductItem',
  async (_name, thunkAPI) => {
    try {
      const res = await fetch(_name);
      return await res.json();

    } catch (err) {
      return thunkAPI.rejectWithValue('something went wrong');
    }
  })


const singleProductSlice = createSlice({
  name: 'singleProduct',
  initialState,
  // reducers: {
  //   test: (state, { payload }) => {
  //     const item = payload;
  //     console.log(item)
  //   }
  // },
  extraReducers: {
    [getAProductItem.pending]: (state) => {
      state.isLoading = true;
    },
    [getAProductItem.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.singleProductItem = payload;

    },
    [getAProductItem.rejected]: (state) => {
      state.isLoading = false;
    }
  }
});
export const { singleProductItem } = singleProductSlice.actions
export default singleProductSlice.reducer;//.reducer will modify the states