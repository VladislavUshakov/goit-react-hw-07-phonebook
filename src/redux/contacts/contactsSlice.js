import { createSlice } from '@reduxjs/toolkit';
import { addContact, fetchContacts, removeContact } from './contactsOperations';

const pendingReducer = state => {
  state.isLoading = true;
};

const rejectedReducer = ({ isLoading, error }, { payload }) => {
  isLoading = false;
  error = payload;
};

const fetchContactsReducer = ({ isLoading, items, error }, { payload }) => {
  isLoading = false;
  items = payload;
  error = null;
};

const addContactReducer = ({ isLoading, items, error }, { payload }) => {
  isLoading = false;
  items.push(payload);
  error = null;
};

const removeContactReducer = ({ isLoading, items, error }, { payload }) => {
  isLoading = false;
  const index = items.findIndex(contact => contact.id === payload.id);
  items.splice(index, 1);
  error = null;
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
