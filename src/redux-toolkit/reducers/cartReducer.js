import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const fetchProductById = createAsyncThunk(
    'cart/fetchProduct',
    async (product) => {
        const { data } = await axios.get(process.env.REACT_APP_API_URL + 'products/' + product.id)
        const payload = {
            product: data._id,
            name: data.name,
            image: data.image,
            price: data.price,
            countInStock: data.countInStock,
            qty: product.qty
        }
        return payload
    }
)
const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []
const shippingAddress = localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : {}

export const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cartItems: cartItemsFromStorage,
        shippingAddress:shippingAddress
    },
    reducers: {
        removeFromCartById: (state, { payload }) => {
            return {
                ...state,
                cartItems: state.cartItems.filter(x => x.product !== payload)
            }
        },
        saveShippingAddress:(state, {payload}) => {
            localStorage.setItem('shippingAddress', JSON.stringify(payload))
            return {
                ...state,
                shppingAddress:  payload
            }
        }
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(fetchProductById.fulfilled, (state, action) => {
            const item = action.payload

            const existItem = state.cartItems.find(x => x.product === item.product)
            if (existItem) {
                return  {
                    ...state,
                    cartItems: state.cartItems.map(x => x.product === existItem.product ? item : x)
                }
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item]
                }
            }
        })
    },
});

  export const {removeFromCartById, saveShippingAddress}  = cartSlice.actions;