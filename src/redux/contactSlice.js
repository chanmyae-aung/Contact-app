import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  contact: [],
  searchTerm: '',
  show: false
};

export const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    addContact: (state, {payload}) => {
      state.contact = payload
    },
    setSearchTerm: (state, {payload}) => {
        state.searchTerm = payload
    },
    setShow: (state) => {
      state.show = !state.show
    }
    }
});

export const { setSearchTerm, addContact, setShow } = contactSlice.actions;
export default contactSlice.reducer;
