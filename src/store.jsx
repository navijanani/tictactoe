// src/store.js
import { configureStore } from "@reduxjs/toolkit";
import GameReducer from './reducer/GameReducer'; // Ensure the path is correct
const store = configureStore({
  reducer: {
    game: GameReducer, // Game state is handled by GameReducer
  },
});

export default store;
