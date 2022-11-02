import { createSlice } from "@reduxjs/toolkit";

  export const productSlice = createSlice({
    name: "products",
    initialState: {
      products: [],
    },
    reducers: {
      setProductData: (state, { payload }) => {
        state.products = payload;
      },
    },
  });
  
  export const { setProductData } = productSlice.actions;
  export default productSlice.reducer;
  
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