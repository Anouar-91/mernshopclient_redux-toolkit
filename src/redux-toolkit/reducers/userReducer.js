import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const login = createAsyncThunk("user/login", async (auth) => {
  const {email, password} = auth;
  const config = {
    headers: {
      'Content-Type': 'application/json',
    }
  }
  try {
    const { data } = await axios.post(process.env.REACT_APP_API_URL + 'users/login', {
      email, password
    }, config)
    return data;
  } catch (error) {
    return error.response && error.response.data.message
      ? error.response.data.message
      : error.message
  }
});

export const userLoginSlice = createSlice({
  name: "userLogin",
  initialState: {
  },
  reducers: {
    logout: (state, { payload }) => {
      state = {}
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        return { loading: true };
      })
      .addCase(login.fulfilled, (state, action) => {
        const {_id} = action.payload
        if(_id){
          return  { loading: false, userInfo: action.payload };
        }else{
          return {error:action.payload }
        }
      })
  },
});

export const { logout } = userLoginSlice.actions;