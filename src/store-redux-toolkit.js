import { configureStore } from '@reduxjs/toolkit';
import {productsListSlice, productDetailSlice } from './redux-toolkit/reducers/productReducer';
import {cartSlice } from './redux-toolkit/reducers/cartReducer';

export const store = configureStore({
  reducer: {
    productsList: productsListSlice.reducer,
    productDetail: productDetailSlice.reducer,
    cart: cartSlice.reducer
  },undefined,
  devTools: true,
})

