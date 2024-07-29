// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import formReducer from './FormSlice';

// Fonction pour sauvegarder l'état dans le localStorage
const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('formState', serializedState);
  } catch (e) {
    console.error("Could not save state", e);
  }
};

// Fonction pour charger l'état depuis le localStorage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem('formState');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (e) {
    console.error("Could not load state", e);
    return undefined;
  }
};

const preloadedState = loadState();

const store = configureStore({
  reducer: {
    form: formReducer,
  },
  preloadedState
});

// Sauvegarder l'état à chaque changement
store.subscribe(() => {
  saveState({
    form: store.getState().form
  });
});

export default store;
