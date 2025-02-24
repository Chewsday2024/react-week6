import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
 
 
const baseUrl = import.meta.env.VITE_BASE_URL;
const apiPath = import.meta.env.VITE_API_PATH;


 
const initialState = { 
  product: {},
  status: 'idle',
  error: null,
};



export const getOneProduct = createAsyncThunk('ProductDetail/getOneProduct', async (id) => {
  
  const res = await axios.get(`${baseUrl}/v2/api/${apiPath}/product/${id}`);

  
  return res.data.product;
})
 
 
 
const productDetailSlice = createSlice({
  name: 'productDetail',
  initialState,
  reducers: {
    
  },
  extraReducers ( builder ) {
    builder
      .addCase(getOneProduct.pending, state => {
        state.status = 'loading';
      })
      .addCase(getOneProduct.fulfilled, (state, action) => {
        state.status = 'succeded';

        state.product = {...action.payload};
      })
      .addCase(getOneProduct.rejected, (state, action) => {
        state.status = 'failed';

        state.error = action.error.message;
      })
  }
});




export const oneProduct = state => state.productDetail.product;
export const detailstatus = state => state.productDetail.status;



export default productDetailSlice.reducer;