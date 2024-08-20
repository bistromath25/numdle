import { createSlice } from '@reduxjs/toolkit';
import { shuffle } from '@/app/utils/utils';
import { sort } from '@/app/utils/utils';

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
    loadSaved: (state, action) => {
      state.numbers = action.payload.numbers;
      state.correctOrdering = sort(action.payload.numbers);
      state.guessesRemaining = action.payload.guessesRemaining;
      state.guessResults = action.payload.guessResults;
    },
    makeGuess: (state, action) => {
      if (state.guessesRemaining > 0) {
        state.numbers = action.payload;
        state.guessesRemaining = state.guessesRemaining - 1;
      }
    },
    updateGuessResults: (state, action) => {
      state.guessResults = [...state.guessResults, parseInt(action.payload)];
    },
    reset: () => initialState,
  },
});

export const { initialize, loadSaved, makeGuess, updateGuessResults, reset } =
  gameSlice.actions;
export default gameSlice.reducer;
