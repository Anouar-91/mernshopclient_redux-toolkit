import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const createOrder = createAsyncThunk(
    'order/create',
    async (order, {getState}) => {
        const {userLogin: {userInfo}} = getState()
        const config = {
            headers:{
                'Content-Type' : 'application/json',
                Authorization: 'Bearer ' +userInfo.token
            }
        }
        try {
            const {data} = await axios.post(process.env.REACT_APP_API_URL + 'orders',  order, config)
            const payload = {
                data
            }
            return payload
        } catch (error) {
            console.log(error)
        }

    }
)
export const orderCreateSlice = createSlice({
    name: "orderCreate",
    initialState: {
    },
    reducers: {
    },
        extraReducers: (builder) => {
            // Add reducers for additional action types here, and handle loading state as needed
            builder
            .addCase(createOrder.pending, (state) => {
                return { loading: true };
              })
              .addCase(createOrder.fulfilled, (state, action) => {
                const {_id} = action.payload.data
                if(_id){
                  return  {                 
                    loading: false,
                    success : true,
                    order:action.payload.data
                };
                }else{
                  return {
                    loading: false,
                    error: action.payload
                }
                }
              })
        },
    });

