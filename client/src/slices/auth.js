import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../services/authService";
import { setMessage } from "./message";

export const register = createAsyncThunk(
  "auth/register",
  async ({ name, email, pwd, phone }, thunkAPI) => {
    try {
      const response = await authService.register(name, email, pwd, phone);
      thunkAPI.dispatch(setMessage(response.data));
      return response.data;
    } catch (error) {
      const message = error.response.data;
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const otpVerification = createAsyncThunk(
  "auth/otpVerify",
  async (val, thunkAPI) => {
    try {
      const response = await authService.otpVerification(val);
      thunkAPI.dispatch(setMessage(response.data));
      return response.data;
    } catch (err) {
      const message = err.response.data;
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

// export const verifyOtp = createAsyncThunk(
//   "auth/verifyOtp",
//   async (number)
// )
const initialState = {
  user: "",
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: {
    [register.fulfilled]: (state, action) => {
      state.isLoggeIn = false;
      state.user = action.payload.user;
    },
    [register.rejected]: (state, action) => {
      state.isLoggeIn = true;
    },
    [otpVerification.fulfilled]: (state, action) => {
      state.isLoggedIn = false;
    },
    [otpVerification.rejected]: (state, action) => {
      state.isLoggedIn = false;
    },
  },
});

const { reducer } = authSlice;
export default reducer;
