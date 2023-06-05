import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../redux/authApi";
import authSlice from "../redux/authSlice";
import { contactApi } from "../redux/contactApi";
import contactSlice from "../redux/contactSlice";

export const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [contactApi.reducerPath]: contactApi.reducer,
        authSlice: authSlice,
        contactSlice: contactSlice
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, contactApi.middleware),
})