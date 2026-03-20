import { configureStore } from "@reduxjs/toolkit";
import { baseAPI } from "../../services/baseAPI";
import { authSlice } from "../slices/authSlice/authSlice";

export const store = configureStore({
  reducer: {
    [baseAPI.reducerPath]: baseAPI.reducer,
    auth: authSlice.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseAPI.middleware),
});