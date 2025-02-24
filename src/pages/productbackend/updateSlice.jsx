import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { getAdminProducts } from './productbackendSlice';



const baseUrl = import.meta.env.VITE_BASE_URL;
const apiPath = import.meta.env.VITE_API_PATH;


 

const initialState = {
  status: 'idle',
  error: null
};






export const createProduct = createAsyncThunk ('backend/createProduct', async (_, thunkAPI ) => {
  const state = thunkAPI.getState().modal;

  const { dispatch } = thunkAPI;

  await axios.post(`${baseUrl}/v2/api/${apiPath}/admin/product`, {
    data: {
      ...state.defaultValue,
      origin_price: Number(state.defaultValue.origin_price),
      price: Number(state.defaultValue.price),
      is_enabled: state.defaultValue.is_enabled ? 1 : 0
    }
  });

  dispatch(getAdminProducts());
});







export const editProduct = createAsyncThunk ('backend/editProduct', async (_, thunkAPI ) => {
  const state = thunkAPI.getState().modal;

  const { dispatch } = thunkAPI;

  await axios.put(`${baseUrl}/v2/api/${apiPath}/admin/product/${state.defaultValue.id}`, {
    data: {
      ...state.defaultValue,
      origin_price: Number(state.defaultValue.origin_price),
      price: Number(state.defaultValue.price),
      is_enabled: state.defaultValue.is_enabled ? 1 : 0
    }
  });

  dispatch(getAdminProducts());
});






export const delProduct = createAsyncThunk ('backend/delProduct', async (_, thunkAPI ) => {
  const state = thunkAPI.getState().modal;

  const { dispatch } = thunkAPI;

  await axios.delete(`${baseUrl}/v2/api/${apiPath}/admin/product/${state.defaultValue.id}`);

  dispatch(getAdminProducts());
});




 
const updateSlice = createSlice({
  name: 'update',
  initialState,
  reducers: {

  },
  extraReducers( builder ) {
    builder
      .addCase(createProduct.pending, state => {
        state.status = 'loading';
      })
      .addCase(createProduct.fulfilled, state => {
        state.status = 'succeded';


      })



      .addCase(editProduct.pending, state => {
        state.status = 'loading';
      })
      .addCase(editProduct.fulfilled, state => {
        state.status = 'succeded';
      })



      .addCase(delProduct.pending, state => {
        state.status = 'loading';
      })
      .addCase(delProduct.fulfilled, state => {
        state.status = 'succeded';
      })
      .addCase(delProduct.rejected, (state, action) => {
        state.status = 'failed';

        state.error = action.error.message;
      })
  }
});



export const getUpdateStatus = state => state.update.status;


export default updateSlice.reducer;