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
export const deleteProduct = createAsyncThunk("product/delete", async (id, { getState }) => {
  try {
    const {userLogin: {userInfo}} = getState()
    const config = {
        headers:{
            Authorization: 'Bearer ' +userInfo.token
        }
    }
    const {data} = await axios.delete(process.env.REACT_APP_API_URL + 'products/' + id, config)
    
    return data;
  } catch (error) {
    return error.response && error.response.data.message
      ? error.response.data.message
      : error.message
  }
})
export const createProduct = createAsyncThunk("product/create", async (test, { getState }) => {
  try {
    const {userLogin: {userInfo}} = getState()
    const config = {
        headers:{
          'Content-Type': 'application/json',
            Authorization: 'Bearer ' +userInfo.token
        }
    }
    const {data} = await axios.post(process.env.REACT_APP_API_URL + 'products/',{} ,config)
    
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



export const productDeleteSlice = createSlice({
  name: "productDelete",
  initialState: {loading:true},
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteProduct.pending, (state) => {
        return { loading: true };
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {

        if (action.payload.message == "product removed") {
          return {
            loading:false, 
            success: true
        }
        } else {
          return {
            loading:false, 
            error: action.payload
        }
        }
      })
  },
});

export const productCreateSlice = createSlice({
  name: "productCreate",
  initialState: {loading:true},
  reducers: {
    resetProductCreate: (state, { payload }) => {
      return {}
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createProduct.pending, (state) => {
        return { loading: true };
      })
      .addCase(createProduct.fulfilled, (state, action) => {

        if (action.payload._id) {
          return {
            loading:false, 
            success: true,
            product: action.payload
        }
        } else {
          return {
            loading:false, 
            error: action.payload
        }
        }
      })
  },
});

export const { getDetail } = productDetailSlice.actions;
export const {resetProductCreate} = productCreateSlice.actions
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