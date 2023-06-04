import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../redux/authApi";
import authSlice from "../redux/authSlice";

export const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        authSlice: authSlice
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
})