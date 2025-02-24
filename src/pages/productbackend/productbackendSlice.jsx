import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
 
 


const baseUrl = import.meta.env.VITE_BASE_URL;
const apiPath = import.meta.env.VITE_API_PATH;


 
const initialState = { 
  allProducts: [],
  pageInfo: {},
  status: 'idle',
  error: null
};




export const getAdminProducts = createAsyncThunk('productbackend/getAdminProducts', async ( page = 1 ) => {
  const res = await axios.get(`${baseUrl}/v2/api/${apiPath}/admin/products?page=${page}`);

  return res.data;
})
 
 
 
const productbackendSlice = createSlice({
  name: 'productbackend',
  initialState,
  reducers: {
  
  },
  extraReducers( builder ) {
    builder
      .addCase(getAdminProducts.pending, state => {
        state.status = 'loading';
      })
      .addCase(getAdminProducts.fulfilled, (state, action) => {
        state.status = 'succeded';

        state.allProducts = [...action.payload.products];

        state.pageInfo = {...action.payload.pagination};
      })
      .addCase(getAdminProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
  }
});



export const getAllProducts = state => state.backend.allProducts;

export const getPageInfo = state => state.backend.pageInfo;

export const getAdminProductsStatus = state => state.backend.status;


export default productbackendSlice.reducer;