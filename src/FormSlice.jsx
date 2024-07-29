import { createSlice } from '@reduxjs/toolkit';

const initialFormState = {
  formData: null,
};
// Création d'un slice Redux pour la gestion du formulaire
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