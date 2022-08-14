import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth";

const reducer = {
  auth: authReducer,
};

const store = configureStore({
  reducer,
  devTools: true,
});

export default store;
