import { createSlice } from "@reduxjs/toolkit";

  export const productsListSlice = createSlice({
    name: "productsList",
    initialState: {
      products: [],
    },
    reducers: {
      setProductData: (state, { payload }) => {
        state.products = payload;
      },
    },
  });
  
  export const { setProductData } = productsListSlice.actions;

  export const productDetailSlice = createSlice({
    name: "productDetail",
    initialState: {
      product: {},
    },
    reducers: {
      getDetail: (state, { payload }) => {
        state.product = payload;
      },
    },
  });
  
  export const { getDetail } = productDetailSlice.actions;
  
/* import { createAction, createReducer } from '@reduxjs/toolkit'

export const setProductData = createAction('product/setProductData')

const initialState = { products: [] }

const productReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setProductData, (state, {payload}) => {
      state.products = payload;
    })

})

export default productReducer; */