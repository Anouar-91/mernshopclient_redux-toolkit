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

export const register = createAsyncThunk("user/register", async (auth, thunkAPI) => {
  const {name, email, password} = auth;
  const config = {
    headers: {
      'Content-Type': 'application/json',
    }
  }
  try {
    const {data} = await axios.post(process.env.REACT_APP_API_URL + 'users/register', {
      name, email, password
  }, config)
    thunkAPI.dispatch(login({email,password }))
    return data;
  } catch (error) {
    return error.response && error.response.data.message
      ? error.response.data.message
      : error.message
  }
})

export const getUserDetails = createAsyncThunk("user/profile", async (id, {getState}) => {
  try {
    const {userLogin: {userInfo}} = getState()
    const config = {
        headers:{
            'Content-Type' : 'application/json',
            Authorization: 'Bearer ' +userInfo.token
        }
    }
    const {data} = await axios.get(process.env.REACT_APP_API_URL + 'users/' + id, config)

    return data;
  } catch (error) {
    return error.response && error.response.data.message
      ? error.response.data.message
      : error.message
  }
})

export const updateUserProfile = createAsyncThunk("user/profile/update", async (user, {getState, dispatch}) => {
  try {
    const {userLogin: {userInfo}} = getState()
    const config = {
        headers:{
            'Content-Type' : 'application/json',
            Authorization: 'Bearer ' +userInfo.token
        }
    }
  
    const {data} = await axios.put(process.env.REACT_APP_API_URL + 'users/profile',  user, config)
    try {
      dispatch(userLoginSlice.actions.update(data));

    } catch (error) {
      console.log(error)
    }
    localStorage.setItem('userInfo', JSON.stringify(data))
    return data;
  } catch (error) {
    return error.response && error.response.data.message
      ? error.response.data.message
      : error.message
  }
})

const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null

export const userLoginSlice = createSlice({
  name: "userLogin",
  initialState: {
    userInfo:userInfoFromStorage
  },
  reducers: {
    logout: (state, { payload }) => {
      localStorage.removeItem('userInfo')
      return {}
    },
    update: (state, { payload }) => {
      console.log(payload, "je suis dans update")
      return {
       userInfo: {...state.userInfo, ...payload}
      }
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
          localStorage.setItem("userInfo", JSON.stringify(action.payload) )
          return  { loading: false, userInfo: action.payload };
        }else{
          return {error:action.payload }
        }
      })

  },
});


export const userRegisterSlice = createSlice({
  name: "userRegister",
  initialState: {
    userInfo:null
  },
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        return { loading: true };
      })
      .addCase(register.fulfilled, (state, action) => {
        const {_id} = action.payload
        if(_id){
          localStorage.setItem("userInfo", JSON.stringify(action.payload) )
          return  { loading: false, userInfo: action.payload };
        }else{
          return {error:action.payload }
        }
      })
  },
});

export const userDetailsSlice = createSlice({
  name: "userDetails",
  initialState: {
    user:{}
  },
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserDetails.pending, (state) => {
        return {...state,  loading: true };
      })
      .addCase(getUserDetails.fulfilled, (state, action) => {
        const {_id} = action.payload
        if(_id){
          return  {loading: false, user: action.payload};
        }else{
          return {loading: false, error: action.payload}
        }
      })
  },
});

export const userUpdateProfileSlice = createSlice({
  name: "userUpdateProfile",
  initialState: {
    user:{}
  },
  reducers: {
    reset: (state, { payload }) => {
      return {}
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateUserProfile.pending, (state) => {
        return  {loading: true};
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        const {_id} = action.payload
        if(_id){
          return  {loading: false, user: action.payload, success: true};
        }else{
          return {loading: false, error: action.payload}
        }
      })
  },
});

export const { logout, update } = userLoginSlice.actions;
export const { reset } = userUpdateProfileSlice.actions;