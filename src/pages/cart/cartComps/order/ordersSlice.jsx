import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
 


const baseUrl = import.meta.env.VITE_BASE_URL;
const apiPath = import.meta.env.VITE_API_PATH;

 
const initialState = {
  orders: [],
  OGTotal: 0,
  DCTotal: 0,
  status: 'idle',
  error: null,
  brush: 1
};



export const getOrders = createAsyncThunk('orders/getOrder', async () => {
  const res = await axios.get(`${baseUrl}/v2/api/${apiPath}/cart`);

  return res.data.data.carts;
});



export const delOrder = createAsyncThunk('orders/delOrder', async (id) => {
  await axios.delete(`${baseUrl}/v2/api/${apiPath}/cart/${id}`);
});



export const editOrder = createAsyncThunk('orders/editOrder', async ({orderId, productId, orderQty}) => {
  const res = await axios.put(`${baseUrl}/v2/api/${apiPath}/cart/${orderId}`, {
    data: {
      product_id: productId,
      qty: Number(orderQty)
    }
  });

  return res.data.data;
}) 





export const zeroOrder = createAsyncThunk('orders/zeroOrder', async () => {
  await axios.delete(`${baseUrl}/v2/api/${apiPath}/carts`);
})




 

 
const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
   
  },
  extraReducers( builder ) {
    builder
      .addCase(getOrders.pending, state => {
        state.status = 'loading';
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.status = 'succeded';


        action.payload && (state.orders = [...action.payload]);

        action.payload && (state.DCTotal = action.payload.reduce((total, cart) => total + cart.total, 0));

        action.payload && (state.OGTotal = action.payload.reduce((total, cart) => total + (cart.product.origin_price * cart.qty), 0));
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.status = 'failed';

        state.error = action.error.message;
      })



      .addCase(delOrder.pending, state => {
        state.status = 'loading';
      })
      .addCase(delOrder.fulfilled, state => {
        state.status = 'succeded';

        state.brush = (state.brush + 1) % 2;
      })
      .addCase(delOrder.rejected, (state, action) => {
        state.status = 'failed';

        state.error = action.error.message;
      })



      .addCase(editOrder.pending, state => {
        state.status = 'loading';
      })
      .addCase(editOrder.fulfilled, (state) => {
        state.status = 'succeded';
        
        state.brush = (state.brush + 1) % 2;
      })
      .addCase(editOrder.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })



      .addCase(zeroOrder.pending, state => {
        state.status = 'loading';
      })
      .addCase(zeroOrder.fulfilled, (state) => {
        state.status = 'succeded';

        state.brush = (state.brush + 1) % 2;
      })
      .addCase(zeroOrder.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
  }
});



export const allOrders = state => state.orders.orders;

export const getOrderStatus = state => state.orders.status;

export const OGTotal = state => state.orders.OGTotal;

export const DCTotal = state => state.orders.DCTotal;

export const brushPage = state => state.orders.brush;




export default ordersSlice.reducer;