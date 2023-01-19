import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const listProducts = createAsyncThunk("product/list", async (test, { getState }) => {
  try {
    const { data } = await axios.get(process.env.REACT_APP_API_URL + 'products')
    return data;
  } catch (error) {
    return error.response && error.response.data.message
      ? error.response.data.message
      : error.message
  }
})


export const productsListSlice = createSlice({
  name: "productsList",
  initialState: {
    products: [],
    loading:true
  },
  reducers: {
    setProductData: (state, { payload }) => {
      state.products = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(listProducts.pending, (state) => {
        return { loading: true };
      })
      .addCase(listProducts.fulfilled, (state, action) => {

        if (action.payload.length) {
          return {
            loading: false,
            products: action.payload
          }
        } else {
          return {
            loading: false,
            products: [],
            error: action.payload
          }
        }
      })
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