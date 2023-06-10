import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  contact: [],
  searchTerm: '',
  openModal: false
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
    }
});

export const { setSearchTerm, addContact, createContactModal } = contactSlice.actions;
export default contactSlice.reducer;
