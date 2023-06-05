import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
  contact: [],
  searchTerm: ''
};

export const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    setSearchTerm: (state, {payload}) => {
        state.searchTerm = payload
    }
    }
});

export const { setSearchTerm } = contactSlice.actions;
export default contactSlice.reducer;
