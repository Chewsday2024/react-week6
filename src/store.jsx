import { configureStore } from "@reduxjs/toolkit";


import loginReducer from './pages/login/loginSlice';
import productlistReducer from './pages/productlist/productlistSlice';
import ordersReducer from './pages/cart/cartComps/order/ordersSlice';
import productDetailReducer from './pages/productlist/productComps/productDetailSlice';
import formReducer from './pages/cart/cartComps/form/formSlice';
import productbackendReducer from './pages/productbackend/productbackendSlice';
import modalReducer from './pages/productbackend/productbackendComps/modal/modalSlice';
import updateReducer from './pages/productbackend/updateSlice';



const store = configureStore({
  reducer: {
    login: loginReducer,
    productlist: productlistReducer,
    productDetail: productDetailReducer,
    orders: ordersReducer,
    form: formReducer,
    backend: productbackendReducer,
    modal: modalReducer,
    update: updateReducer
  }
});





export default store;