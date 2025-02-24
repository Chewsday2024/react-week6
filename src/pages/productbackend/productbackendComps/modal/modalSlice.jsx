import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';





const baseUrl = import.meta.env.VITE_BASE_URL;
const apiPath = import.meta.env.VITE_API_PATH;


 
 
 
const initialState = { 
  defaultValue: {
    imageUrl: '',
    title: '',
    category: '',
    unit: '',
    origin_price: '',
    price: '',
    description: '',
    content: '',
    is_enabled: 0,
    imagesUrl: []
  },
  modalMove: '',
  status: 'idle',
  error: null
};





export const uploadPic = createAsyncThunk('modal/uploadPic', async (pic) => {
  const formData = new FormData();
  formData.append('file-to-upload', pic);

  const res = await axios.post(`${baseUrl}/v2/api/${apiPath}/admin/upload`, formData);

  return res.data;
})



 
 
const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    handleInputValue (state, action) {
      const { move, item } = action.payload;
      state.modalMove = move;


      switch (move) {
        case 'create':
          state.defaultValue = {
            ...state.defaultValue,
            imageUrl: '',
            title: '',
            category: '',
            unit: '',
            origin_price: '',
            price: '',
            description: '',
            content: '',
            is_enabled: 0,
            imagesUrl: []};
          break;

        case 'edit':
          state.defaultValue = {
            ...item,
            imageUrl: item.imageUrl,
            title: item.title,
            category: item.category,
            unit: item.unit,
            origin_price: item.origin_price,
            price: item.price,
            description: item.description,
            content: item.content,
            is_enabled: item.is_enabled,
            imagesUrl: item.imagesUrl
          }
          
          break;


        case 'del':
          state.defaultValue = item;
          
          break;
      
        default:
          break;
      }
    },
    setValue (state, action) {
      const { name, value, type, checked, del } = action.payload;

      if (name === 'imagesUrl') {
        state.defaultValue = {...state.defaultValue,
          imagesUrl: [value, ...state.defaultValue.imagesUrl || []]
        }
      } else if (del === 'del') {
        state.defaultValue.imageUrl = null;
      } else {
        state.defaultValue = {...state.defaultValue,
                            [name]: type === 'checkbox' ? checked 
                            : value
                           }
      }
    },
    filterImages (state, action) {
      state.defaultValue.imagesUrl = [...state.defaultValue.imagesUrl.filter(img => img !== action.payload)]
    }
  },
  extraReducers ( builder ) {
    builder
      .addCase(uploadPic.pending, state => {
        state.status = 'loading';
      })
      .addCase(uploadPic.fulfilled, (state, action) => {
        state.status = 'succeded';

        state.defaultValue.imageUrl = action.payload.imageUrl;
      })
      .addCase(uploadPic.rejected, (state, action) => {
        state.status = 'failed';

        state.error = action.error.message;
      })
  }
});





export const getInputValue = state => state.modal.defaultValue;

export const getModalMove = state => state.modal.modalMove;




export const { handleInputValue, setValue, filterImages } = modalSlice.actions;




export default modalSlice.reducer;