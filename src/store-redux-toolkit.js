import { CombinedState, configureStore } from '@reduxjs/toolkit';
import {productsListSlice, productDetailSlice, productDeleteSlice, productCreateSlice, productUpdateSlice } from './redux-toolkit/reducers/productReducer';
import {cartSlice } from './redux-toolkit/reducers/cartReducer';
import {userRegisterSlice, userDetailsSlice, userLoginSlice, userUpdateProfileSlice, userListSlice, userDeleteSlice, userUpdateSlice, } from './redux-toolkit/reducers/userReducer';
import {orderCreateSlice, orderDetailsSlice, orderListMySlice, orderPaySlice } from './redux-toolkit/reducers/orderReducer'

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
    orderPay: orderPaySlice.reducer,
    orderListMy: orderListMySlice.reducer,
    userList: userListSlice.reducer,
    userDelete: userDeleteSlice.reducer,
    userUpdate:userUpdateSlice.reducer,
    productDelete: productDeleteSlice.reducer,
    productCreate: productCreateSlice.reducer,
    productUpdate: productUpdateSlice.reducer
  },undefined,
  devTools: true,
})

