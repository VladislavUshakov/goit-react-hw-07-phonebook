import { createSlice } from '@reduxjs/toolkit';
import { addContact, fetchContacts, removeContact } from './contactsOperations';

const pendingReducer = state => {
  state.isLoading = true;
};

const rejectedReducer = (state, { payload }) => {
  state.isLoading = false;
  state.error = payload;
};

const fetchContactsReducer = (state, { payload }) => {
  state.isLoading = false;
  state.items = payload;
  state.error = null;
};

const addContactReducer = (state, { payload }) => {
  state.isLoading = false;
  state.items.push(payload);
  state.error = null;
};

const removeContactReducer = (state, { payload }) => {
  state.isLoading = false;
  const index = state.items.findIndex(contact => contact.id === payload.id);
  state.items.splice(index, 1);
  state.error = null;
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    items: [],
    isLoading: false,
    error: null,
  },

  extraReducers: builder =>
    builder
      .addCase(fetchContacts.pending, pendingReducer)
      .addCase(fetchContacts.fulfilled, fetchContactsReducer)
      .addCase(fetchContacts.rejected, rejectedReducer)
      .addCase(addContact.pending, pendingReducer)
      .addCase(addContact.fulfilled, addContactReducer)
      .addCase(addContact.rejected, rejectedReducer)
      .addCase(removeContact.pending, pendingReducer)
      .addCase(removeContact.fulfilled, removeContactReducer)
      .addCase(removeContact.rejected, rejectedReducer),
});

export const contactsReducer = contactsSlice.reducer;
