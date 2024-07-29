// src/formSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialFormState = {
  formData: null,
};

const formSlice = createSlice({
  name: 'form',
  initialState: initialFormState,
  reducers: {
    submitForm(state, action) {
      state.formData = action.payload;
    }
  }
});

export const { submitForm } = formSlice.actions;
export default formSlice.reducer;
