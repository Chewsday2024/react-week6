import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
 
 


const baseUrl = import.meta.env.VITE_BASE_URL;
const apiPath = import.meta.env.VITE_API_PATH;


 
const initialState = { 
  productlist: [],
  status: 'idle',
  error: null
};



export const getProductList = createAsyncThunk('ProductList/getProductList', async () => {
  const res = await axios.get(`${baseUrl}/v2/api/${apiPath}/products`);

  return res.data.products;
});



export const addCart = createAsyncThunk('ProductList/addCart', async ({ id, qty }) => {
  await axios.post(`${baseUrl}/v2/api/${apiPath}/cart`, {
    data: {
      product_id: id,
      qty: Number(qty)
    }
  });
})
 
 
 
const productlistSlice = createSlice({
  name: 'productlist',
  initialState,
  reducers: {
  
  },
  extraReducers( builder ) {
    builder
      .addCase(getProductList.pending, state => {
        state.status = 'loading';
      })
      .addCase(getProductList.fulfilled, (state, action) => {
        state.status = 'succeded';

        state.productlist = [...action.payload];
      })
      .addCase(getProductList.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })



      .addCase(addCart.pending, (state, action) => {
       
        state.status = action.meta.arg.id;
      })
      .addCase(addCart.fulfilled, state => {
        state.status = 'succeded';
      })
      .addCase(addCart.rejected, (state, action) => {
        state.status = 'failed';

        state.error = action.error.message;
      })
  }
});



export const allProducts = state => state.productlist.productlist;


export const productStatus = state => state.productlist.status;



export default productlistSlice.reducer;