import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../services/authService";

export const register = createAsyncThunk(
  "auth/register",
  async ({ name, email, pwd, phone }, thunkAPI) => {
    try {
      const response = await authService.register(name, email, pwd, phone);
      return response.data;
    } catch (error) {
      const message = error.response.data;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const otpVerification = createAsyncThunk(
  "auth/otpVerify",
  async (val, thunkAPI) => {
    try {
      const response = await authService.otpVerification(val);
      return response.data;
    } catch (err) {
      const message = err.response.data;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, pwd }, thunkAPI) => {
    try {
      const response = await authService.login(email, pwd);
      return response.data;
    } catch (err) {
      const message = err.response.data;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const emailVerifiaction = createAsyncThunk(
  "auth/emailVerifiaction",
  async ({ email }, thunkAPI) => {
    try {
      const response = await authService.emailVerify(email);
      console.log(response, "response");
      return response.data;
    } catch (err) {
      const message = err.response.data;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const resetPassword = createAsyncThunk(
  "auth/restPwd",
  async ({ pwd }, thunkAPI) => {
    try {
      const response = await authService.resetPasswd(pwd);
      return response.data;
    } catch (err) {
      const message = err.response.data;
      return thunkAPI.rejectWithValue(message);
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
  accessToken: "",
  message: "",
  status: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.message = "";
      state.status = "";
    },
  },
  extraReducers: {
    [register.fulfilled]: (state, action) => {
      state.isLoggedIn = false;
      state.user = action.payload.user;
      state.message = action.payload.message;
      state.status = action.payload.status;
    },
    [register.rejected]: (state, action) => {
      state.isLoggedIn = false;
      state.message = action.payload.message;
      state.status = action.payload.status;
    },
    [otpVerification.fulfilled]: (state, action) => {
      state.isLoggedIn = false;
      state.message = action.payload.message;
      state.status = action.payload.status;
    },
    [otpVerification.rejected]: (state, action) => {
      state.isLoggedIn = false;
      state.message = action.payload.message;
      state.status = action.payload.status;
    },
    [login.fulfilled]: (state, action) => {
      state.isLoggedIn = true;
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
      state.message = action.payload.message;
      state.status = action.payload.status;
    },
    [login.rejected]: (state, action) => {
      state.isLoggedIn = false;
      state.message = action.payload.message;
      state.status = action.payload.status;
    },
    [emailVerifiaction.fulfilled]: (state, action) => {
      state.isLoggedIn = false;
      state.user = action.payload.user;
      state.accessToken = "";
      state.message = action.payload.message;
      state.status = action.payload.status;
    },
    [emailVerifiaction.rejected]: (state, action) => {
      state.isLoggedIn = false;
      state.user = "";
      state.accessToken = "";
      state.message = action.payload.message;
      state.status = action.payload.status;
    },
    [resetPassword.fulfilled]: (state, action) => {
      state.isLoggedIn = false;
      state.user = "";
      state.accessToken = "";
      state.message = action.payload.message;
      state.status = action.payload.status;
    },
    [resetPassword.rejected]: (state, action) => {
      state.isLoggedIn = false;
      state.user = "";
      state.accessToken = "";
      state.message = action.payload.message;
      state.status = action.payload.status;
    },
  },
});

const { reducer } = authSlice;
export const { reset } = authSlice.actions;
export default reducer;
