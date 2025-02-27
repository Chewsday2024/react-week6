import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";



const baseUrl = import.meta.env.VITE_BASE_URL;


const initialState = {
  status: 'idle',
  error: null
};


export const userlogin = createAsyncThunk('login/userlogin', async (account) => {
  const res = await axios.post(`${baseUrl}/v2/admin/signin`, account);
  return res.data;
});



export const userlogout = createAsyncThunk('login/userlogout', async () => {
  await axios.post(`${baseUrl}/v2/logout`);
});


export const checkislogin = createAsyncThunk('login/checkislogin', async () => {
  await axios.post(`${baseUrl}/v2/api/user/check`);
})

    

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {

  },
  extraReducers( builder ) {
    builder
      .addCase(userlogin.pending, state => {
        state.status = 'loading';
      })
      .addCase(userlogin.fulfilled, (state, action) => {
        state.status = 'succeded';

        const { token, expired } = action.payload;

        document.cookie = `dogfood=${token}; expires=${new Date(expired)}`;

      })
      .addCase(userlogin.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })


      .addCase(userlogout.pending, state => {
        state.status = 'loading';
      })
      .addCase(userlogout.fulfilled, state => {
        state.status = 'logout';
      })


      
      .addCase(checkislogin.rejected, (state, action) => {
        state.status = action.meta.rejectedWithValue;
        state.error = action.error.message;
      })
  }
});



export const userStatus = state => state.login.status;


export const { userLogOut } = loginSlice.actions;




export default loginSlice.reducer;