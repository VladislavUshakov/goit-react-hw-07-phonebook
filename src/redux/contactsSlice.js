import { createSlice, nanoid } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'contacts',
  storage,
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: { list: [] },
  reducers: {
    addContact: {
      reducer(state, action) {
        state.list.push(action.payload);
      },
      prepare(contact) {
        return {
          payload: {
            id: nanoid(),
            name: contact.name,
            number: contact.number,
          },
        };
      },
    },
    removeContact(state, action) {
      const index = state.list.findIndex(
        contact => contact.id === action.payload
      );
      state.list.splice(index, 1);
    },
  },
});

export const contactsReducer = persistReducer(
  persistConfig,
  contactsSlice.reducer
);

export const { addContact, removeContact } = contactsSlice.actions;
