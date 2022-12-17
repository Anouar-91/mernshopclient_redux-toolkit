import { configureStore } from '@reduxjs/toolkit';
import {productsListSlice, productDetailSlice } from './redux-toolkit/reducers/productReducer';
import {cartSlice } from './redux-toolkit/reducers/cartReducer';
import {userLoginSlice } from './redux-toolkit/reducers/userReducer';
import {userRegisterSlice } from './redux-toolkit/reducers/userReducer';

export const store = configureStore({
  reducer: {
    productsList: productsListSlice.reducer,
    productDetail: productDetailSlice.reducer,
    cart: cartSlice.reducer,
    userLogin: userLoginSlice.reducer,
    userRegister: userRegisterSlice.reducer
  },undefined,
  devTools: true,
})

