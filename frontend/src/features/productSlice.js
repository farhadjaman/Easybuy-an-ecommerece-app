import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const initialState = {
  productItems: [],
  isLoading: true
}

//fetch All the product
export const getProductItems = createAsyncThunk('product/getproductItems',
  async (_name, thunkAPI) => {
    try {
      const res = await fetch(_name);
      return await res.json();

    } catch (err) {
      return thunkAPI.rejectWithValue('something went wrong');
    }
  })




const productSlice = createSlice({
  name: 'products',
  initialState,
  // reducers: {
  //   test: (state, { payload }) => {
  //     const item = payload;
  //     console.log(item)
  //   }
  // },
  extraReducers: {
    [getProductItems.pending]: (state) => {
      state.isLoading = true;
    },
    [getProductItems.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.productItems = payload;

    },
    [getProductItems.rejected]: (state) => {
      state.isLoading = false;
    }
  }
});
export const { productItems } = productSlice.actions
export default productSlice.reducer;//.reducer will modify the states