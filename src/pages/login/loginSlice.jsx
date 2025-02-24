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


const token = document.cookie.replace(/(?:(?:^|.*;\s*)dogfood\s*\=\s*([^;]*).*$)|^.*$/,"$1",);
  
axios.defaults.headers.common['Authorization'] = token;

    

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    userLogOut (state) {
      state.status = 'idle';
    }
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
  }
});



export const userStatus = state => state.login.status;


export const { userLogOut } = loginSlice.actions;




export default loginSlice.reducer;