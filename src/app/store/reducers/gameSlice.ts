import { shuffle } from '@/app/utils/shuffle';
import { createSlice } from '@reduxjs/toolkit';

interface State {
  numbers: { description: string; value: string }[];
  correctOrdering: { description: string; value: string }[];
  guessesRemaining: number;
  guessResults: number[];
}

const initialState: State = {
  numbers: [],
  correctOrdering: [],
  guessesRemaining: 5,
  guessResults: [],
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    initialize: (state, action) => {
      state.correctOrdering = action.payload.numbers;
      state.numbers = shuffle(state.correctOrdering);
      state.guessesRemaining = initialState.guessesRemaining;
      state.guessResults = initialState.guessResults;
    },
    makeGuess: (state) => {
      if (state.guessesRemaining > 0) {
        state.guessesRemaining = state.guessesRemaining - 1;
      }
    },
    updateGuessResults: (state, action) => {
      state.guessResults = [...state.guessResults, parseInt(action.payload)];
    },
    reset: () => initialState,
  },
});

export const { initialize, makeGuess, updateGuessResults, reset } =
  gameSlice.actions;
export default gameSlice.reducer;
