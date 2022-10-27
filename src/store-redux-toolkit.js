import { configureStore } from '@reduxjs/toolkit';
import {composeWithDevTools} from 'redux-devtools-extension';
import {productListReducer} from './redux-toolkit/reducers/productReducer';


export const store = configureStore({
  reducer: {
    productListReducer
  },
}, )

