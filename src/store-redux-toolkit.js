import { $CombinedState, configureStore } from '@reduxjs/toolkit';
import {productsListSlice, productDetailSlice } from './redux-toolkit/reducers/productReducer';
import {cartSlice } from './redux-toolkit/reducers/cartReducer';
import {userRegisterSlice, userDetailsSlice, userLoginSlice, userUpdateProfileSlice, } from './redux-toolkit/reducers/userReducer';
import {orderCreateSlice, orderDetailsSlice, orderPaySlice } from './redux-toolkit/reducers/orderReducer'

export const store = configureStore({
  reducer: {
    productsList: productsListSlice.reducer,
    productDetail: productDetailSlice.reducer,
    cart: cartSlice.reducer,
    userLogin: userLoginSlice.reducer,
    userRegister: userRegisterSlice.reducer,
    userDetails: userDetailsSlice.reducer,
    userUpdateProfile : userUpdateProfileSlice.reducer,
    orderCreate: orderCreateSlice.reducer,
    orderDetails: orderDetailsSlice.reducer,
    orderPay: orderPaySlice.reducer
  },undefined,
  devTools: true,
})

