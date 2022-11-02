import { configureStore } from '@reduxjs/toolkit';
import {composeWithDevTools} from 'redux-devtools-extension';
import {productsListSlice, productDetailSlice } from './redux-toolkit/reducers/productReducer';

export const store = configureStore({
  reducer: {
    productsList: productsListSlice.reducer,
    productDetail: productDetailSlice.reducer
  },undefined,
  devTools: true,
})

