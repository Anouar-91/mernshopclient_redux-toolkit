import { createSlice } from "@reduxjs/toolkit";

export const userLoginSlice = createSlice({
    name: "userLogin",
    initialState: {
    },
    reducers: {
      login: (state, { payload }) => {
        state = {userInfo: payload}
      },
      logout: (state, { payload }) => {
        state = {}
      },
    },
  });
  
  export const { login,logout } = userLoginSlice.actions;