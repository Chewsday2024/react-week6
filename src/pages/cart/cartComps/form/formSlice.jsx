import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
 


const baseUrl = import.meta.env.VITE_BASE_URL;
const apiPath = import.meta.env.VITE_API_PATH;
 
 
const initialState = { 
  status: 'idle',
  error: null,
  formKey: 1
};
 

export const checkOut = createAsyncThunk('form/checkOut', async (formValue) => {
  await axios.post(`${baseUrl}/v2/api/${apiPath}/order`, {
    data: {
      user: {...formValue},
      message: formValue.message
    }
  });
});
 
 
const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
  
  },
  extraReducers( builder ) {
    builder
      .addCase(checkOut.pending, state => {
        state.status = 'loading';
      })
      .addCase(checkOut.fulfilled, state => {
        state.status = 'succeded';

        
        state.formKey = (state.formKey + 1) % 2;
      })
      .addCase(checkOut.rejected, (state, action) => {
        state.status = 'failed';

        state.error = action.error.message;
      })
  }
});


export const getFormKey = state => state.form.formKey;


export default formSlice.reducer;