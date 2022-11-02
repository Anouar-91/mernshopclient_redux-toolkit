import { configureStore } from '@reduxjs/toolkit';
import {composeWithDevTools} from 'redux-devtools-extension';
import productReducer from './redux-toolkit/reducers/productReducer';

export const store = configureStore({
  reducer: {
    products: productReducer
  },undefined,
  devTools: true,
})

